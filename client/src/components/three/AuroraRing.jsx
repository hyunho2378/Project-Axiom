import { useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// brand.700 #1E5672, brand.600 #2A6885, neon.cyan #00D4FF, brand.100 #C0F0FF, brand.400 #5A9AB5
const GLOW_COUNT = 120;

function makeGlowTex(inner, outer, size = 256) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    g.addColorStop(0,    inner);
    g.addColorStop(0.2,  inner.replace('1)', '0.5)'));
    g.addColorStop(0.55, outer.replace('1)', '0.15)'));
    g.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
}

function RingScene() {
    const objs = useMemo(() => {
        const glowTex = makeGlowTex('rgba(0,212,255,1)', 'rgba(30,86,114,1)', 256);  // neon.cyan, brand.700
        const coreTex = makeGlowTex('rgba(192,240,255,1)', 'rgba(0,160,200,1)', 512); // brand.100

        const ringGroup = new THREE.Group();

        // main ring — crystal/glass (brand.700 color, neon.cyan emissive)
        const mainRing = new THREE.Mesh(
            new THREE.TorusGeometry(2.0, 0.065, 64, 256),
            new THREE.MeshPhysicalMaterial({
                color: new THREE.Color('#1E5672'),
                emissive: new THREE.Color('#00D4FF'),
                emissiveIntensity: 0.8,
                metalness: 0.95, roughness: 0.03,
                clearcoat: 1.0, clearcoatRoughness: 0.01,
                envMapIntensity: 2.5, reflectivity: 1.0,
            })
        );
        mainRing.rotation.x = Math.PI / 2;
        ringGroup.add(mainRing);

        // inner ring — brand.600, neon.cyanBright emissive
        const innerRing = new THREE.Mesh(
            new THREE.TorusGeometry(1.72, 0.035, 48, 256),
            new THREE.MeshPhysicalMaterial({
                color: new THREE.Color('#2A6885'),
                emissive: new THREE.Color('#00E0FF'),
                emissiveIntensity: 1.2,
                metalness: 0.95, roughness: 0.02,
                clearcoat: 1.0, clearcoatRoughness: 0.01,
                transparent: true, opacity: 0.85,
            })
        );
        innerRing.rotation.x = Math.PI / 2;
        ringGroup.add(innerRing);

        // outer ring — brand.800, brand.600 emissive
        const outerRing = new THREE.Mesh(
            new THREE.TorusGeometry(2.35, 0.022, 32, 256),
            new THREE.MeshPhysicalMaterial({
                color: new THREE.Color('#0B3545'),
                emissive: new THREE.Color('#2A6885'),
                emissiveIntensity: 0.5,
                metalness: 0.92, roughness: 0.05,
                clearcoat: 1.0,
                transparent: true, opacity: 0.6,
            })
        );
        outerRing.rotation.x = Math.PI / 2;
        ringGroup.add(outerRing);

        // translucent disc (Saturn ring feel)
        const discMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#0A2535'),
            emissive: new THREE.Color('#1E5672'),
            emissiveIntensity: 0.15,
            metalness: 0.6, roughness: 0.25,
            transparent: true, opacity: 0.12,
            side: THREE.DoubleSide, depthWrite: false,
        });
        const disc = new THREE.Mesh(new THREE.RingGeometry(1.65, 2.42, 128), discMat);
        disc.rotation.x = -Math.PI / 2;
        ringGroup.add(disc);

        // glow sprites orbiting the rings
        const glowSprites = [];
        for (let i = 0; i < GLOW_COUNT; i++) {
            const angle    = (i / GLOW_COUNT) * Math.PI * 2;
            const rVariant = Math.random() < 0.5 ? 2.0 : (Math.random() < 0.5 ? 1.72 : 2.35);
            const spread   = (Math.random() - 0.5) * 0.15;

            const mat = new THREE.SpriteMaterial({
                map: glowTex,
                color: new THREE.Color(Math.random() > 0.7 ? 0xC0F0FF : 0x00D4FF),
                transparent: true, opacity: 0.25 + Math.random() * 0.25,
                blending: THREE.AdditiveBlending, depthWrite: false,
            });
            const sprite = new THREE.Sprite(mat);
            const sz = 0.15 + Math.random() * 0.2;
            sprite.scale.set(sz, sz, 1);
            sprite.position.set(
                Math.cos(angle) * (rVariant + spread),
                (Math.random() - 0.5) * 0.08,
                Math.sin(angle) * (rVariant + spread)
            );
            ringGroup.add(sprite);
            glowSprites.push({ sprite, baseAngle: angle, radius: rVariant + spread, speed: 0.015 + Math.random() * 0.02 });
        }

        // center glow — brand.600
        const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({
            map: coreTex, color: new THREE.Color(0x2A6885),
            transparent: true, opacity: 0.25,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        coreGlow.scale.set(5, 5, 1);
        ringGroup.add(coreGlow);

        // ring reflection glow below — brand.700
        const reflGlow = new THREE.Sprite(new THREE.SpriteMaterial({
            map: coreTex, color: new THREE.Color(0x1E5672),
            transparent: true, opacity: 0.12,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        reflGlow.scale.set(6, 2, 1);
        reflGlow.position.y = -1.5;
        ringGroup.add(reflGlow);

        // core point light inside ring
        const coreLight = new THREE.PointLight(0x2A6885, 6, 6, 2);
        coreLight.position.set(0, 0, 0);
        ringGroup.add(coreLight);

        // background stars — brand.400
        const BG = 900;
        const bgGeo = new THREE.BufferGeometry();
        const bgPos = new Float32Array(BG * 3);
        for (let i = 0; i < BG; i++) {
            const r     = 10 + Math.random() * 18;
            const theta = Math.random() * Math.PI * 2;
            const phi   = Math.acos(2 * Math.random() - 1);
            bgPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
            bgPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
            bgPos[i*3+2] = r * Math.cos(phi);
        }
        bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
        const bgStars = new THREE.Points(bgGeo, new THREE.PointsMaterial({
            color: 0x5A9AB5, size: 0.022,
            transparent: true, opacity: 0.45,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending, depthWrite: false,
        }));

        // scene lights
        const ambientLight = new THREE.AmbientLight(0x040C14, 0.6);
        const keyLight     = new THREE.PointLight(0xC0F0FF, 18, 20, 1.8); // brand.100
        keyLight.position.set(-2, 7, 3);
        const rimLight  = new THREE.PointLight(0x00D4FF, 14, 16, 1.6);    // neon.cyan
        rimLight.position.set(3, -3, -4);
        const fillLight = new THREE.PointLight(0x1E5672, 5, 14, 2);       // brand.700
        fillLight.position.set(-5, 0, 2);

        return {
            ringGroup, mainRing, innerRing, outerRing, discMat,
            glowSprites, coreGlow,
            bgStars, ambientLight, keyLight, rimLight, fillLight,
            textures: [glowTex, coreTex],
        };
    }, []);

    useEffect(() => () => { objs.textures.forEach(t => t.dispose()); }, [objs]);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        const { ringGroup, mainRing, innerRing, outerRing, discMat, glowSprites, coreGlow, keyLight } = objs;

        // rotation + tilt
        ringGroup.rotation.y += delta * 0.5;
        ringGroup.rotation.x = 0.35 + Math.sin(t * 0.10) * 0.03;
        ringGroup.position.y = Math.sin(t * 0.18) * 0.12;

        // emissive pulse
        mainRing.material.emissiveIntensity  = 0.8  * (0.92 + Math.sin(t * 0.3) * 0.08);
        innerRing.material.emissiveIntensity = 1.2  * (0.92 + Math.sin(t * 0.25 + 1) * 0.08);
        outerRing.material.emissiveIntensity = 0.5  * (0.92 + Math.sin(t * 0.2 + 2) * 0.08);
        discMat.opacity = 0.10 + Math.sin(t * 0.22) * 0.03;

        // sprites orbit
        glowSprites.forEach(({ sprite, baseAngle, radius, speed }) => {
            const a = baseAngle + t * speed;
            sprite.position.x = Math.cos(a) * radius;
            sprite.position.z = Math.sin(a) * radius;
            sprite.material.opacity = 0.22 + Math.sin(t * 0.4 + baseAngle) * 0.12;
        });

        coreGlow.material.opacity = 0.22 + Math.sin(t * 0.25) * 0.05;
        coreGlow.scale.setScalar(5 + Math.sin(t * 0.18) * 0.3);

        keyLight.position.x = -2 + Math.sin(t * 0.06) * 0.5;
    });

    const { ringGroup, bgStars, ambientLight, keyLight, rimLight, fillLight } = objs;
    return (
        <>
            <primitive object={ambientLight} />
            <primitive object={keyLight} />
            <primitive object={rimLight} />
            <primitive object={fillLight} />
            <primitive object={ringGroup} />
            <primitive object={bgStars} />
        </>
    );
}

export default function AuroraRing() {
    return (
        <Canvas
            frameloop="always"
            camera={{ fov: 36, position: [0, 2.8, 6.5], near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            onCreated={({ gl }) => {
                gl.toneMapping         = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.6;
            }}
        >
            <RingScene />
        </Canvas>
    );
}
