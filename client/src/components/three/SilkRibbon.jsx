import { useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// brand.700 #1E5672, brand.800 #0B3545, brand.600 #2A6885, brand.400 #5A9AB5, neon.cyan #00D4FF
const SEG_LENGTH = 120;

function makeGlowTex(inner, outer, size = 128) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    g.addColorStop(0,    inner);
    g.addColorStop(0.3,  inner.replace('1)', '0.4)'));
    g.addColorStop(0.7,  outer.replace('1)', '0.1)'));
    g.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
}

const RIBBON_CONFIGS = [
    { yOff: 0,     amp: 1.2, freq: 1.0, phase: 0,   width: 0.38, color: '#1E5672', emis: '#00D4FF', ei: 0.9,  opacity: 0.75 },
    { yOff: -0.15, amp: 0.9, freq: 1.3, phase: 1.8, width: 0.28, color: '#0B3545', emis: '#2A6885', ei: 0.55, opacity: 0.55 },
    { yOff: 0.12,  amp: 0.7, freq: 0.8, phase: 3.5, width: 0.22, color: '#2A6885', emis: '#5A9AB5', ei: 0.40, opacity: 0.45 },
];

function RibbonScene() {
    const objs = useMemo(() => {
        const glowTex = makeGlowTex('rgba(0,212,255,1)', 'rgba(30,86,114,1)', 128); // neon.cyan, brand.700

        const ribbonGroup = new THREE.Group();
        const ribbons = [];

        RIBBON_CONFIGS.forEach((cfg) => {
            // PlaneGeometry: width=cfg.width, height=6, widthSegs=1, heightSegs=SEG_LENGTH
            const geo      = new THREE.PlaneGeometry(cfg.width, 6, 1, SEG_LENGTH);
            const posAttr  = geo.attributes.position;
            const basePositions = Float32Array.from(posAttr.array);

            const mat = new THREE.MeshPhysicalMaterial({
                color:    new THREE.Color(cfg.color),
                emissive: new THREE.Color(cfg.emis),
                emissiveIntensity: cfg.ei,
                metalness: 0.88, roughness: 0.08,
                clearcoat: 1.0, clearcoatRoughness: 0.03,
                side: THREE.DoubleSide,
                transparent: true, opacity: cfg.opacity,
            });
            const mesh = new THREE.Mesh(geo, mat);
            ribbonGroup.add(mesh);

            // edge glow sprites (AdditiveBlending)
            const edgeCount  = 30;
            const edgeSprites = [];
            for (let i = 0; i < edgeCount; i++) {
                const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
                    map: glowTex, color: new THREE.Color(cfg.emis),
                    transparent: true, opacity: 0.2,
                    blending: THREE.AdditiveBlending, depthWrite: false,
                }));
                sprite.scale.set(0.18, 0.18, 1);
                mesh.add(sprite);
                edgeSprites.push(sprite);
            }

            ribbons.push({ mat, geo, posAttr, basePositions, cfg, edgeSprites });
        });

        // background stars — brand.400
        const BG    = 600;
        const bgGeo = new THREE.BufferGeometry();
        const bgPos = new Float32Array(BG * 3);
        for (let i = 0; i < BG; i++) {
            const r     = 8 + Math.random() * 14;
            const theta = Math.random() * Math.PI * 2;
            const phi   = Math.acos(2 * Math.random() - 1);
            bgPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
            bgPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
            bgPos[i*3+2] = r * Math.cos(phi);
        }
        bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
        const bgStars = new THREE.Points(bgGeo, new THREE.PointsMaterial({
            color: 0x5A9AB5, size: 0.02,
            transparent: true, opacity: 0.4,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));

        const ambientLight = new THREE.AmbientLight(0x040C14, 0.8);
        const keyLight     = new THREE.PointLight(0xC0F0FF, 14, 18, 1.8); // brand.100
        keyLight.position.set(-3, 5, 4);
        const rimLight  = new THREE.PointLight(0x00D4FF, 10, 14, 1.6);    // neon.cyan
        rimLight.position.set(3, -2, -4);
        const fillLight = new THREE.PointLight(0x1E5672, 5, 12, 2);       // brand.700
        fillLight.position.set(0, -4, 2);

        return { ribbonGroup, ribbons, bgStars, ambientLight, keyLight, rimLight, fillLight, textures: [glowTex] };
    }, []);

    useEffect(() => () => { objs.textures.forEach(t => t.dispose()); }, [objs]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const { ribbonGroup, ribbons, keyLight } = objs;

        // vertex animation — silk flowing in the air
        ribbons.forEach(({ mat, geo, posAttr, basePositions, cfg, edgeSprites }, ri) => {
            const arr  = posAttr.array;
            const cols = 2;            // widthSegments=1 → 2 columns
            const rows = SEG_LENGTH + 1;

            for (let row = 0; row < rows; row++) {
                const rowT  = row / SEG_LENGTH;      // 0(top) → 1(bottom)
                const baseY = (0.5 - rowT) * 6;

                // X wave (lateral ripple)
                const waveX = Math.sin(rowT * Math.PI * cfg.freq * 2   + t * 0.4 + cfg.phase) * cfg.amp * 0.5
                            + Math.sin(rowT * Math.PI * cfg.freq * 3.5 + t * 0.25 + cfg.phase * 1.3) * cfg.amp * 0.2;
                // Z wave (depth ripple)
                const waveZ = Math.cos(rowT * Math.PI * cfg.freq * 1.8 + t * 0.3 + cfg.phase * 0.7) * cfg.amp * 0.35
                            + Math.sin(rowT * Math.PI * cfg.freq * 2.8 + t * 0.2) * cfg.amp * 0.12;

                for (let col = 0; col < cols; col++) {
                    const idx   = (row * cols + col) * 3;
                    const origX = basePositions[idx];

                    // twist increases top→bottom
                    const twist  = rowT * Math.PI * 0.6 + t * 0.15;
                    const twistX = origX * Math.cos(twist);
                    const twistZ = origX * Math.sin(twist);

                    arr[idx]     = twistX + waveX;
                    arr[idx + 1] = baseY + cfg.yOff;
                    arr[idx + 2] = twistZ + waveZ;
                }
            }
            posAttr.needsUpdate = true;
            geo.computeVertexNormals();

            mat.emissiveIntensity = cfg.ei * (0.88 + Math.sin(t * 0.3 + ri * 1.5) * 0.12);

            // update right-edge sprite positions
            edgeSprites.forEach((sprite, si) => {
                const row = Math.floor((si / edgeSprites.length) * SEG_LENGTH);
                const idx = (row * cols + 1) * 3; // right edge
                sprite.position.set(arr[idx], arr[idx+1], arr[idx+2]);
                sprite.material.opacity = 0.15 + Math.sin(t * 0.35 + si * 0.5) * 0.08;
            });
        });

        ribbonGroup.rotation.y = t * 0.06;
        ribbonGroup.rotation.x = Math.sin(t * 0.08) * 0.08;
        ribbonGroup.position.y = Math.sin(t * 0.2) * 0.15;

        keyLight.position.x = -3 + Math.sin(t * 0.07) * 0.6;
        keyLight.position.z =  4 + Math.cos(t * 0.07) * 0.6;
    });

    const { ribbonGroup, bgStars, ambientLight, keyLight, rimLight, fillLight } = objs;
    return (
        <>
            <primitive object={ambientLight} />
            <primitive object={keyLight} />
            <primitive object={rimLight} />
            <primitive object={fillLight} />
            <primitive object={ribbonGroup} />
            <primitive object={bgStars} />
        </>
    );
}

export default function SilkRibbon() {
    return (
        <Canvas
            camera={{ fov: 38, position: [0, 0, 5.5], near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            onCreated={({ gl }) => {
                gl.toneMapping         = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.5;
            }}
        >
            <RibbonScene />
        </Canvas>
    );
}
