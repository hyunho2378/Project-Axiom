import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Float, Environment, ContactShadows, Html } from '@react-three/drei';

function Model({ url, scale, position, rotation, isFixed }) {
    const { scene } = useGLTF(url);
    if (isFixed) {
        return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
    }
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <primitive object={scene} scale={scale} position={position} rotation={rotation} />
        </Float>
    );
}

// Added 'fov' prop for lens control
export default function Scene3D({ modelUrl, height = "100%", scale = 2, position = [0, -1, 0], rotation = [0, 0, 0], isFixed = false, cameraPos = [0, 0, 10], fov = 25 }) {
    return (
        <div style={{ height: height, width: '100%' }} className="relative z-0">
            <Canvas camera={{ position: cameraPos, fov: fov }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={1.2} />
                <spotLight position={[10, 5, 10]} angle={0.15} penumbra={1} intensity={2} color="#00E0FF" />
                <spotLight position={[-10, -5, -10]} intensity={1.5} color="#F3A2E3" />
                <Environment preset="city" />

                <Suspense fallback={null}>
                    <Model
                        url={modelUrl}
                        scale={scale}
                        position={position}
                        rotation={rotation}
                        isFixed={isFixed}
                    />
                </Suspense>
                {/* Adjusted Shadows to be subtle and distinct from a "floor" */}
                <ContactShadows position={[0, position[1] - 0.5, 0]} opacity={0.4} scale={10} blur={3} far={4} color="#000000" />
            </Canvas>
        </div>
    );
}
