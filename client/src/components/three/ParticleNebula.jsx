import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// neon.cyan #00D4FF, brand.400 #5A9AB5, brand.100 #C0F0FF, brand.700 #1E5672, brand.600 #2A6885
const COUNT    = 3000;
const SPHERE_R = 1.8;

function makeGlowTex(inner, outer, size = 256) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    g.addColorStop(0,    inner);
    g.addColorStop(0.25, inner.replace('1)', '0.5)'));
    g.addColorStop(0.6,  outer.replace('1)', '0.15)'));
    g.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
}

function NebulaScene({ gathered }) {
    const gatheredRef = useRef(gathered);
    useEffect(() => { gatheredRef.current = gathered; }, [gathered]);
    const morphTRef = useRef(gathered ? 1.0 : 0.0);

    const objs = useMemo(() => {
        const glowTex = makeGlowTex('rgba(0,212,255,1)', 'rgba(30,86,114,1)', 256);  // neon.cyan, brand.700
        const coreTex = makeGlowTex('rgba(192,240,255,1)', 'rgba(0,180,220,1)', 512); // brand.100

        // gathered: sphere distribution (core-dense)
        const gatheredPos = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
            const r     = SPHERE_R * Math.pow(Math.random(), 0.4);
            const theta = Math.random() * Math.PI * 2;
            const phi   = Math.acos(2 * Math.random() - 1);
            gatheredPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
            gatheredPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
            gatheredPos[i*3+2] = r * Math.cos(phi);
        }

        // scattered: wide sphere spread
        const scatteredPos = new Float32Array(COUNT * 3);
        const velocity     = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
            const r     = 4 + Math.random() * 8;
            const theta = Math.random() * Math.PI * 2;
            const phi   = Math.acos(2 * Math.random() - 1);
            scatteredPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
            scatteredPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
            scatteredPos[i*3+2] = r * Math.cos(phi);
            velocity[i*3]   = (Math.random() - 0.5) * 0.3;
            velocity[i*3+1] = (Math.random() - 0.5) * 0.3;
            velocity[i*3+2] = (Math.random() - 0.5) * 0.3;
        }

        // start: gathered
        const current = Float32Array.from(gatheredPos);

        // vertex colors: neon.cyan 40%, brand.400 35%, brand.100 25%
        const colors  = new Float32Array(COUNT * 3);
        const palette = [
            new THREE.Color('#00D4FF'), // neon.cyan
            new THREE.Color('#5A9AB5'), // brand.400
            new THREE.Color('#C0F0FF'), // brand.100
        ];
        for (let i = 0; i < COUNT; i++) {
            const r = Math.random();
            const c = r < 0.40 ? palette[0] : r < 0.75 ? palette[1] : palette[2];
            colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
        }

        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(current, 3));
        pGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

        const pMat = new THREE.PointsMaterial({
            size: 0.04, vertexColors: true,
            transparent: true, opacity: 0.85,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending, depthWrite: false,
        });
        const particles = new THREE.Points(pGeo, pMat);

        // core glow — brand.100 bright center
        const coreSprite = new THREE.Sprite(new THREE.SpriteMaterial({
            map: coreTex, color: new THREE.Color(0xC0F0FF),
            transparent: true, opacity: 0.7,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        coreSprite.scale.set(4, 4, 1);

        // outer ambient glow — brand.600
        const outerGlow = new THREE.Sprite(new THREE.SpriteMaterial({
            map: glowTex, color: new THREE.Color(0x2A6885),
            transparent: true, opacity: 0.35,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        outerGlow.scale.set(9, 9, 1);

        // background stars — brand.400
        const BG     = 800;
        const bgGeo  = new THREE.BufferGeometry();
        const bgPos  = new Float32Array(BG * 3);
        for (let i = 0; i < BG; i++) {
            const r     = 12 + Math.random() * 18;
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

        const ambientLight = new THREE.AmbientLight(0x06141A, 0.8);
        const keyLight     = new THREE.PointLight(0x5A9AB5, 8, 20, 2);
        keyLight.position.set(-4, 5, 4);

        return {
            particles, pGeo, pMat,
            gatheredPos, scatteredPos, velocity,
            coreSprite, outerGlow, bgStars,
            ambientLight, keyLight,
            textures: [glowTex, coreTex],
        };
    }, []);

    useEffect(() => () => { objs.textures.forEach(t => t.dispose()); }, [objs]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const { pGeo, pMat, gatheredPos, scatteredPos, velocity, coreSprite, outerGlow, particles } = objs;

        // lerp morphT toward target
        const target = gatheredRef.current ? 1.0 : 0.0;
        morphTRef.current += (target - morphTRef.current) * 0.018;
        const morphT = morphTRef.current;

        const pos = pGeo.attributes.position.array;
        for (let i = 0; i < COUNT; i++) {
            const i3 = i * 3;
            const gx = gatheredPos[i3],   gy = gatheredPos[i3+1],   gz = gatheredPos[i3+2];
            const sx = scatteredPos[i3],  sy = scatteredPos[i3+1],  sz = scatteredPos[i3+2];

            let tx = gx * morphT + sx * (1 - morphT);
            let ty = gy * morphT + sy * (1 - morphT);
            let tz = gz * morphT + sz * (1 - morphT);

            // gathered: surface micro-flow (galaxy feel)
            if (morphT > 0.5) {
                const flowSpeed = 0.15;
                const angle = t * flowSpeed + i * 0.01;
                tx += Math.sin(angle + gy * 2) * 0.04 * morphT;
                ty += Math.cos(angle + gx * 2) * 0.03 * morphT;
                tz += Math.sin(angle + gz * 2) * 0.04 * morphT;
            }

            // scattered: individual drift
            if (morphT < 0.5) {
                const drift = (1 - morphT) * 0.008;
                tx += velocity[i3]   * Math.sin(t * 0.3 + i) * drift * 10;
                ty += velocity[i3+1] * Math.cos(t * 0.25 + i) * drift * 10;
                tz += velocity[i3+2] * Math.sin(t * 0.2 + i) * drift * 10;
            }

            pos[i3] = tx; pos[i3+1] = ty; pos[i3+2] = tz;
        }
        pGeo.attributes.position.needsUpdate = true;

        particles.rotation.y = t * 0.04;
        particles.rotation.x = Math.sin(t * 0.08) * 0.03;

        coreSprite.material.opacity = morphT * 0.7 * (0.9 + Math.sin(t * 0.6) * 0.1);
        coreSprite.scale.setScalar(3.5 + Math.sin(t * 0.5) * 0.3);

        outerGlow.material.opacity = morphT * 0.30;
        outerGlow.scale.setScalar(8 + Math.sin(t * 0.35) * 0.5);

        pMat.opacity = 0.65 + morphT * 0.25;
    });

    const { particles, coreSprite, outerGlow, bgStars, ambientLight, keyLight } = objs;
    return (
        <>
            <primitive object={ambientLight} />
            <primitive object={keyLight} />
            <primitive object={particles} />
            <primitive object={coreSprite} />
            <primitive object={outerGlow} />
            <primitive object={bgStars} />
        </>
    );
}

export default function ParticleNebula({ gathered = true }) {
    return (
        <Canvas
            camera={{ fov: 42, position: [0, 0, 8], near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            onCreated={({ gl }) => {
                gl.toneMapping         = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.3;
            }}
        >
            <NebulaScene gathered={gathered} />
        </Canvas>
    );
}
