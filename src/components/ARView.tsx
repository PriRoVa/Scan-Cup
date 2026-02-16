import { useEffect, useState } from 'react';

interface ARViewProps {
    onScan: (cardId: string) => void;
    onBack: () => void;
}

export function ARView({ onScan, onBack }: ARViewProps) {
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStarted(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            <div className="w-full h-full absolute top-0 left-0 z-0 bg-linear-to-br from-green-800 via-green-700 to-green-900">
                <div className="absolute inset-0 bg-linear-to-b from-green-600/20 via-transparent to-green-900/40"></div>
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
                    <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-white"></div>
                    <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-white"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white"></div>
                    <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-white"></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-full"></div>
                </div>

                {started && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-64 h-80 border-4 border-white rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.5)] bg-green-900/30 backdrop-blur-sm">
                            {/* Corner Markers - Soccer Style */}
                            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-yellow-400 rounded-tl-lg"></div>
                            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-4 border-r-4 border-yellow-400 rounded-tr-lg"></div>
                            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-4 border-l-4 border-yellow-400 rounded-bl-lg"></div>
                            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-yellow-400 rounded-br-lg"></div>
                            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_20px_rgba(250,204,21,0.8)] animate-scan"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30">
                                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}


            </div>

            <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none flex flex-col justify-between p-6">


                <div className="flex justify-between items-start pointer-events-auto">
                    <button
                        onClick={onBack}
                        className="bg-white/90 text-green-800 p-3 rounded-full border-2 border-white hover:bg-white transition shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {!started && (
                        <div className="bg-white/90 text-green-800 px-4 py-2 rounded-full text-sm font-bold animate-pulse border-2 border-white shadow-lg">
                            Iniciando Cámara...
                        </div>
                    )}
                </div>

                <div className="flex justify-center items-end pointer-events-auto pb-8">
                    <button
                        onClick={() => onScan("MES-10")}
                        className="w-20 h-20 bg-white rounded-full border-4 border-yellow-400 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(250,204,21,0.8)]"
                    >
                        <span className="text-5xl">⚽</span>
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .animate-scan {
                    animation: scan 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
