import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Add type definition for the global MINDAR object
declare global {
    interface Window {
        MINDAR: {
            IMAGE: {
                MindARThree: any;
            };
        };
    }
}

interface ARViewProps {
    onScan: (cardId: string) => void;
    onBack: () => void;
}

export function ARView({ onScan, onBack }: ARViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        console.log("Initializing MindAR...");

        // Use the global window object to access MindAR
        const MindARThree = window.MINDAR.IMAGE.MindARThree;

        const mindarThree = new MindARThree({
            container: containerRef.current,
            imageTargetSrc: "https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.mind",
            uiScanning: "yes",
            uiLoading: "yes",
        });

        const { renderer, scene, camera } = mindarThree;

        const date = new Date();
        const year = date.getFullYear();

        // Add a simple 3D object to the first target anchor
        const anchor = mindarThree.addAnchor(0);

        // Create a plane to show as overlay
        const geometry = new THREE.PlaneGeometry(1, 0.55);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
        const plane = new THREE.Mesh(geometry, material);
        anchor.group.add(plane);

        // Text Texture for "Player Found" effect (Simplification for now using geometry)
        // In a real app we'd load a 3D model or a nice texture

        const start = async () => {
            try {
                await mindarThree.start();
                renderer.setAnimationLoop(() => {
                    renderer.render(scene, camera);
                });
                setStarted(true);
            } catch (err) {
                console.error("Failed to start MindAR", err);
            }
        };

        start();

        return () => {
            console.log("Cleaning up MindAR...");
            renderer.setAnimationLoop(null);
            try {
                mindarThree.stop();
            } catch (e) {
                console.warn("Error stopping MindAR:", e);
            }
        };
    }, []); // Run once on mount

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* Camera Container */}
            <div ref={containerRef} className="w-full h-full absolute top-0 left-0 z-0" />

            {/* UI Overlay */}
            <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none flex flex-col justify-between p-6">

                {/* Header */}
                <div className="flex justify-between items-start pointer-events-auto">
                    <button
                        onClick={onBack}
                        className="bg-midnight-grid/80 text-pure-signal p-3 rounded-full border border-cyan-pulse/50 backdrop-blur-md hover:bg-midnight-grid transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {!started && (
                        <div className="bg-carbon-core/80 text-cyan-pulse px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                            Iniciando Cámara...
                        </div>
                    )}
                </div>

                {/* Footer Instructions */}
                <div className="text-center pointer-events-auto pb-8">
                    <p className="text-pure-signal bg-midnight-grid/50 inline-block px-6 py-3 rounded-xl backdrop-blur-md border border-pure-signal/10">
                        Apunta a la estampa para ver la magia ✨
                    </p>

                    {/* Mock Trigger Button for Testing without image */}
                    <div className="mt-4">
                        <button
                            onClick={() => onScan("MES-10")}
                            className="text-xs text-pure-signal/30 underline hover:text-cyan-pulse transition"
                        >
                            (Simular Escaneo)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
