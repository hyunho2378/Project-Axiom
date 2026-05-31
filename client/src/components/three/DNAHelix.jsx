import { useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// brand.700 #1E5672, neon.cyan #00D4FF, brand.900 #082B35
const HELIX_LENGTH = 12;
const TURNS        = 4;
const RADIUS       = 0.7;
const SPHERES_PER  = 80;
const RUNG_COUNT   = 40;

function makeGlowTex(inner, outer, size = 256) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    g.addColorStop(0,   inner);
    g.addColorStop(0.3, inner.replace('1)', '0.6)'));
    g.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
}

function helixPos(strand, t) {
    const angle = t * TURNS * Math.PI * 2 + (strand === 0 ? 0 : Math.PI);
    const y = (0.5 - t) * HELIX_LENGTH;
    return new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS);
}

function HelixScene() {
    const objs = useMemo(() => {
        // neon.cyan glow texture (CanvasTexture + AdditiveBlending)
        const glowTex = makeGlowTex('rgba(0,212,255,1)', 'rgba(8,43,53,1)', 256);

        const helix = new THREE.Group();
        const strandSpheres = [[], []];
        const sphereGeo = new THREE.SphereGeometry(0.08, 24, 24);

        [0, 1].forEach(strand => {
            for (let i = 0; i < SPHERES_PER; i++) {
                const t   = i / (SPHERES_PER - 1);
                const pos = helixPos(strand, t);
                // brand.700 → neon.cyan gradient
                const color = new THREE.Color('#1E5672').lerp(new THREE.Color('#00D4FF'), t);
                // brand.900 → neon.cyan emissive
                const emis  = new THREE.Color('#082B35').lerp(new THREE.Color('#00D4FF'), t);

                const mat = new THREE.MeshPhysicalMaterial({
                    color, emissive: emis, emissiveIntensity: 0.6,
                    metalness: 0.85, roughness: 0.15,
                    clearcoat: 1.0, clearcoatRoughness: 0.05,
                });
                const sphere = new THREE.Mesh(sphereGeo, mat);
                sphere.position.copy(pos);

                const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
                    map: glowTex, color,
                    transparent: true, opacity: 0.6,
                    blending: THREE.AdditiveBlending, depthWrite: false,
                }));
                sprite.scale.set(0.35, 0.35, 1);
                sphere.add(sprite);
                helix.add(sphere);
                strandSpheres[strand].push({ sphere, baseT: t, mat });
            }
        });

        // horizontal rungs (CylinderGeometry)
        const rungs = [];
        for (let i = 0; i < RUNG_COUNT; i++) {
            const t  = i / (RUNG_COUNT - 1);
            const p0 = helixPos(0, t);
            const p1 = helixPos(1, t);
            const len = p0.distanceTo(p1);
            const geo  = new THREE.CylinderGeometry(0.015, 0.015, len, 8);
            const mat  = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color('#2A6885'),    // brand.600
                emissive: new THREE.Color('#1E5672'), // brand.700
                emissiveIntensity: 0.3,
                metalness: 0.8, roughness: 0.25,
                transparent: true, opacity: 0.7,
            });
            const rung = new THREE.Mesh(geo, mat);
            rung.position.lerpVectors(p0, p1, 0.5);
            rung.lookAt(p1);
            rung.rotateX(Math.PI / 2);
            helix.add(rung);
            rungs.push({ rung, baseT: t });
        }

        // background stars — brand.400 #5A9AB5
        const STARS  = 600;
        const starGeo = new THREE.BufferGeometry();
        const starPos = new Float32Array(STARS * 3);
        for (let i = 0; i < STARS; i++) {
            const r     = 6 + Math.random() * 12;
            const theta = Math.random() * Math.PI * 2;
            const phi   = Math.acos(2 * Math.random() - 1);
            starPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
            starPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
            starPos[i*3+2] = r * Math.cos(phi);
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
            color: 0x5A9AB5, size: 0.025,
            transparent: true, opacity: 0.5,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));

        // lights
        const ambientLight = new THREE.AmbientLight(0x06141A, 1.0);
        const keyLight  = new THREE.PointLight(0x8AAEC0, 12, 20, 1.8); // brand.300
        keyLight.position.set(-4, 5, 4);
        const rimLight  = new THREE.PointLight(0x00D4FF, 18, 18, 1.5); // neon.cyan
        rimLight.position.set(3, -3, -4);
        const topLight  = new THREE.PointLight(0x5A9AB5, 6, 14, 2);    // brand.400
        topLight.position.set(0, 6, 2);

        return { helix, strandSpheres, rungs, stars, ambientLight, keyLight, rimLight, topLight, textures: [glowTex] };
    }, []);

    useEffect(() => () => { objs.textures.forEach(t => t.dispose()); }, [objs]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const { helix, strandSpheres, rungs, stars } = objs;

        // helix rotation + bob (speed ×1.8)
        helix.rotation.y = t * 0.11;
        helix.rotation.x = Math.sin(t * 0.22) * 0.04;
        helix.position.y = Math.sin(t * 0.36) * 0.25;

        // sphere emissive wave (light flows top→bottom, speed ×1.8)
        strandSpheres.forEach(strand => {
            strand.forEach(({ sphere, baseT, mat }) => {
                const wave = Math.sin((baseT * 4 - t * 0.63) * Math.PI);
                mat.emissiveIntensity = 0.4 + Math.max(0, wave) * 0.6;
                const sprite = sphere.children[0];
                if (sprite) {
                    sprite.material.opacity = 0.35 + Math.max(0, wave) * 0.4;
                    const sz = 0.28 + Math.max(0, wave) * 0.20;
                    sprite.scale.set(sz, sz, 1);
                }
            });
        });

        rungs.forEach(({ rung, baseT }) => {
            const wave = Math.sin((baseT * 4 - t * 0.63) * Math.PI);
            rung.material.emissiveIntensity = 0.2 + Math.max(0, wave) * 0.4;
            rung.material.opacity = 0.5 + Math.max(0, wave) * 0.3;
        });

        stars.rotation.y = t * 0.018;
        stars.rotation.x = Math.sin(t * 0.009) * 0.1;
    });

    const { helix, stars, ambientLight, keyLight, rimLight, topLight } = objs;
    return (
        <>
            <fogExp2 attach="fog" args={['#000000', 0.04]} />
            <primitive object={ambientLight} />
            <primitive object={keyLight} />
            <primitive object={rimLight} />
            <primitive object={topLight} />
            <primitive object={helix} />
            <primitive object={stars} />
        </>
    );
}

export default function DNAHelix() {
    return (
        <Canvas
            camera={{ fov: 40, position: [0, 0, 7], near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            onCreated={({ gl }) => {
                gl.toneMapping         = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.4;
            }}
        >
            <HelixScene />
        </Canvas>
    );
}
