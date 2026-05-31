import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── LAYER CONFIG (from axiom-crystal-v3.html) ─────────────────────────────
// brand palette: #1E8899(brand.700), #3C7795(brand.600), #00D4FF(neon.cyan)
const LAYERS = [
    { n:5,  len:0.55, wid:0.14, crv:0.10, elev:82, y: 0.18, ca:0x1E8899, cb:0x00C4EF, ea:0x00D4FF, eb:0x80EEFF, ei:2.0 },
    { n:7,  len:0.88, wid:0.23, crv:0.15, elev:62, y: 0.06, ca:0x0D4A5E, cb:0x1E8899, ea:0x1E88AA, eb:0x00C4EF, ei:0.9 },
    { n:9,  len:1.25, wid:0.31, crv:0.20, elev:40, y:-0.08, ca:0x082B38, cb:0x0D4A5E, ea:0x0D4A5E, eb:0x1E8899, ei:0.5 },
    { n:11, len:1.65, wid:0.37, crv:0.25, elev:20, y:-0.22, ca:0x040F16, cb:0x082B38, ea:0x061E2A, eb:0x0D4A5E, ei:0.25 },
    { n:13, len:2.05, wid:0.42, crv:0.30, elev:7,  y:-0.36, ca:0x010508, cb:0x040F16, ea:0x030A10, eb:0x061E2A, ei:0.10 },
];

// ── GLOW TEXTURE FACTORY (CanvasTexture + radial gradient) ────────────────
function makeGlowTexture(innerColor, outerColor, size = 256) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const half = size / 2;
    const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0,    innerColor);
    grad.addColorStop(0.15, innerColor.replace('1)', '0.85)'));
    grad.addColorStop(0.4,  outerColor.replace('1)', '0.4)'));
    grad.addColorStop(0.7,  outerColor.replace('1)', '0.12)'));
    grad.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
}

// ── GLOW SPRITE FACTORY (AdditiveBlending + Sprite) ──────────────────────
function makeGlowSprite(tex, size, opacity, color) {
    const mat = new THREE.SpriteMaterial({
        map: tex,
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(size, size, 1);
    return sprite;
}

// ── PETAL GEOMETRY (bezier shape + Z-curve deformation) ──────────────────
function makePetalGeo(len, wid, curve, segs = 20) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(-wid * 0.55, len * 0.28, -wid, len * 0.58, 0, len);
    shape.bezierCurveTo( wid, len * 0.58,  wid * 0.55, len * 0.28, 0, 0);
    const geo = new THREE.ShapeGeometry(shape, segs);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const t = pos.getY(i) / len;
        pos.setZ(i, Math.sin(Math.PI * t) * curve);
        pos.setX(i, pos.getX(i) * (1 - t * 0.12));
    }
    geo.computeVertexNormals();
    return geo;
}

function makeMat(colorHex, emitHex, emitInt, metal, rough) {
    return new THREE.MeshPhysicalMaterial({
        color:            new THREE.Color(colorHex),
        emissive:         new THREE.Color(emitHex),
        emissiveIntensity: emitInt,
        metalness:        metal,
        roughness:        rough,
        clearcoat:        1.0,
        clearcoatRoughness: 0.03,
        side:             THREE.DoubleSide,
    });
}

// ── INNER SCENE COMPONENT ─────────────────────────────────────────────────
function CrystalScene({ isMobile }) {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(0, isMobile ? 0.3 : 0.5, isMobile ? 9 : 7);
        camera.lookAt(0, 0, 0);
    }, [isMobile, camera]);

    const objs = useMemo(() => {
        // Glow textures (CanvasTexture)
        const glowTex1 = makeGlowTexture('rgba(255,255,255,1)', 'rgba(0,212,255,1)',   512);
        const glowTex2 = makeGlowTexture('rgba(0,212,255,1)',   'rgba(42,104,133,1)', 512);
        const glowTex3 = makeGlowTexture('rgba(192,240,255,1)', 'rgba(0,180,220,1)',  256);

        // ── FLOWER GROUP ─────────────────────────────────────────────────
        const flower = new THREE.Group();
        const allPetalMats = [];

        LAYERS.forEach((L, li) => {
            const geo     = makePetalGeo(L.len, L.wid, L.crv);
            const tiltX   = THREE.MathUtils.degToRad(90 - L.elev);
            const stagger = li * Math.PI * 0.27;
            for (let i = 0; i < L.n; i++) {
                const t     = i / L.n;
                const color = new THREE.Color(L.ca).lerp(new THREE.Color(L.cb), t);
                const emit  = new THREE.Color(L.ea).lerp(new THREE.Color(L.eb), t);
                const mat   = makeMat(color.getHex(), emit.getHex(), L.ei,
                                      0.82 + li * 0.03, 0.035 + li * 0.022);
                allPetalMats.push({ mat, baseEI: L.ei });
                const mesh  = new THREE.Mesh(geo, mat);
                mesh.castShadow    = true;
                mesh.receiveShadow = true;
                const pivot = new THREE.Group();
                pivot.rotation.y = (i / L.n) * Math.PI * 2 + stagger;
                pivot.position.y = L.y;
                mesh.rotation.x  = tiltX;
                pivot.add(mesh);
                flower.add(pivot);
            }
        });

        // Core sphere — AdditiveBlending
        const core = new THREE.Mesh(
            new THREE.SphereGeometry(0.10, 32, 32),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                transparent: true,
                opacity: 0.95,
            })
        );
        core.position.y = 0.18;
        flower.add(core);

        // ── GLOW GROUP (Sprite + AdditiveBlending) ────────────────────
        const glowGroup = new THREE.Group();
        glowGroup.position.y = 0.18;
        const g1 = makeGlowSprite(glowTex3, 0.6,  1.0,  0xFFFFFF);
        const g2 = makeGlowSprite(glowTex1, 1.8,  0.9,  0x88EEFF);
        const g3 = makeGlowSprite(glowTex2, 3.6,  0.7,  0x00D4FF);
        const g4 = makeGlowSprite(glowTex2, 6.5,  0.35, 0x1E5672);
        glowGroup.add(g1, g2, g3, g4);
        flower.add(glowGroup);

        // ── RINGS ─────────────────────────────────────────────────────
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(0.38, 0.015, 8, 80),
            new THREE.MeshBasicMaterial({
                color: 0x00D4FF, transparent: true, opacity: 0.5,
                blending: THREE.AdditiveBlending, depthWrite: false,
            })
        );
        ring.position.y = 0.18;
        ring.rotation.x = Math.PI / 2;
        flower.add(ring);

        const ring2 = new THREE.Mesh(
            new THREE.TorusGeometry(0.65, 0.007, 6, 100),
            new THREE.MeshBasicMaterial({
                color: 0x2A6885, transparent: true, opacity: 0.25,
                blending: THREE.AdditiveBlending, depthWrite: false,
            })
        );
        ring2.position.y = 0.18;
        ring2.rotation.x = Math.PI / 2;
        flower.add(ring2);

        // Core lights (attached to flower → rotate with it)
        const coreLight = new THREE.PointLight(0x00D4FF, 35, 6, 2.0);
        coreLight.position.set(0, 0.18, 0);
        flower.add(coreLight);
        const coreLight2 = new THREE.PointLight(0xC0F0FF, 20, 3, 2.5);
        coreLight2.position.set(0, 0.18, 0);
        flower.add(coreLight2);

        // ── PARTICLES ─────────────────────────────────────────────────
        const pPos = new Float32Array(280 * 3);
        for (let i = 0; i < 280; i++) {
            const r     = 3.0 + Math.random() * 3.5;
            const theta = Math.random() * Math.PI * 2;
            const phi   = Math.random() * Math.PI * 0.4;
            pPos[i*3]   = r * Math.cos(phi) * Math.cos(theta);
            pPos[i*3+1] = r * Math.sin(phi);
            pPos[i*3+2] = r * Math.cos(phi) * Math.sin(theta);
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
            color: 0x3AAFCC, size: 0.02, transparent: true, opacity: 0.5,
            sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
        }));

        // Position: right side, raised slightly
        flower.position.x = isMobile ? 0 : 1.8;
        flower.position.y = isMobile ? 0.2 : 0.3;
        flower.position.z = 0;
        flower.rotation.y = isMobile ? 0 : -Math.PI / 6;

        // ── SCENE LIGHTS ──────────────────────────────────────────────
        const ambientLight = new THREE.AmbientLight(0x06141A, 1.2);

        // Key light — position animated in useFrame
        const keyLight = new THREE.SpotLight(0xAADDFF, 50, 28, Math.PI / 5, 0.35, 1.5);
        keyLight.position.set(5, 10, 5);
        keyLight.target.position.set(0, 0, 0);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.set(2048, 2048);
        keyLight.shadow.bias   = -0.0005;
        keyLight.shadow.radius = 10;

        const fillLight = new THREE.PointLight(0x1E5672, 8, 18, 2);
        fillLight.position.set(-5, -1, 4);

        const rimLight = new THREE.SpotLight(0x00D4FF, 28, 18, Math.PI / 6, 0.5, 2);
        rimLight.position.set(-2, -5, -4);
        rimLight.target.position.set(0, 0, 0);

        return {
            flower, allPetalMats,
            g1, g2, g3, g4,
            ring, ring2, coreLight, coreLight2,
            particles,
            ambientLight, keyLight, fillLight, rimLight,
            textures: [glowTex1, glowTex2, glowTex3],
        };
    }, [isMobile]);

    // Dispose textures on unmount
    useEffect(() => () => {
        objs.textures.forEach(t => t.dispose());
    }, [objs]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const { flower, allPetalMats, g1, g2, g3, g4,
                ring, ring2, coreLight, coreLight2, particles, keyLight } = objs;

        // Breathing scale + subtle wobble
        flower.scale.setScalar(0.85 + Math.sin(t * 0.55) * 0.015);
        flower.rotation.y += 0.0005;
        flower.rotation.x = 0.6;
        flower.rotation.z = 0;

        // Glow pulse
        const pulse = 0.88 + Math.sin(t * 1.0) * 0.12;
        g1.material.opacity = 1.0 * pulse;
        g2.material.opacity = 0.9 * pulse;
        g3.material.opacity = 0.7 * (0.85 + Math.sin(t * 0.7) * 0.15);
        g4.material.opacity = 0.35 * (0.8 + Math.sin(t * 0.5) * 0.2);

        // Glow scale pulse
        const gs = 1 + Math.sin(t * 1.0) * 0.08;
        g1.scale.set(0.6 * gs, 0.6 * gs, 1);
        g2.scale.set(1.8 * gs, 1.8 * gs, 1);
        g3.scale.set(3.6 * (1 + Math.sin(t * 0.7) * 0.05), 3.6 * (1 + Math.sin(t * 0.7) * 0.05), 1);

        // Core light intensity pulse
        coreLight.intensity  = 35 + Math.sin(t * 1.0) * 12;
        coreLight2.intensity = 20 + Math.sin(t * 0.8) * 8;

        // Petal emissive pulse
        allPetalMats.forEach(({ mat, baseEI }, i) => {
            mat.emissiveIntensity = baseEI * (0.82 + Math.sin(t * 0.65 + i * 0.35) * 0.18);
        });

        // Ring rotation + opacity
        ring.rotation.z  = t * 0.18;
        ring.material.opacity = 0.42 + Math.sin(t * 0.85) * 0.14;
        ring2.rotation.z = -t * 0.10;
        ring2.material.opacity = 0.18 + Math.sin(t * 0.6) * 0.08;

        // Key light drift
        keyLight.position.x = 5 + Math.sin(t * 0.18) * 0.8;
        keyLight.position.z = 5 + Math.cos(t * 0.18) * 0.8;

        // Particle slow rotation
        particles.rotation.y = t * 0.032;
        particles.rotation.x = t * 0.011;
    });

    const { ambientLight, keyLight, fillLight, rimLight, flower, particles } = objs;

    return (
        <>
            <fogExp2 attach="fog" args={['#000000', 0.07]} />
            <primitive object={ambientLight} />
            <primitive object={keyLight} />
            <primitive object={keyLight.target} />
            <primitive object={fillLight} />
            <primitive object={rimLight} />
            <primitive object={rimLight.target} />
            <primitive object={flower} />
            <primitive object={particles} />
        </>
    );
}

// ── PUBLIC COMPONENT ──────────────────────────────────────────────────────
export default function CrystalOrb() {
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        onResize();
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const initCamPos = isMobile ? [0, 0.3, 9] : [0, 0.5, 7];

    return (
        <Canvas
            camera={{ fov: 38, position: initCamPos, near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true }}
            shadows="soft"
            dpr={[1, 2]}
            style={{ pointerEvents: 'none' }}
            onCreated={({ gl }) => {
                gl.toneMapping         = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.6;
            }}
        >
            <CrystalScene isMobile={isMobile} />
        </Canvas>
    );
}
