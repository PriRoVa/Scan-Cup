import { useEffect, useState } from 'react';
import type { Card } from '../types';
import { CardStats } from './CardStats';

interface ScanResultProps {
    card: Card;
    onAdd: () => void;
    onDiscard: () => void;
}

export function ScanResult({ card, onAdd, onDiscard }: ScanResultProps) {
    const [animate, setAnimate] = useState(false);
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
                <div className={`w-full max-w-md bg-wc-light-bg rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl transform transition-transform duration-500 ease-out ${animate ? 'translate-y-0' : 'translate-y-full'}`}>

                    <div className="flex justify-between items-center p-6 pb-2">
                        <button onClick={onDiscard} className="p-2 rounded-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="text-[10px] font-bold text-wc-red uppercase tracking-widest bg-wc-red/10 px-3 py-1 rounded-full">
                            Auto Increíble • Edición Legendaria
                        </div>|
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>

                    <div className="px-6 pb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Carta Escaneada</h2>

                        <div className="mt-10 mb-10 relative flex justify-center">
                            <div className="absolute inset-0 bg-wc-red/20 blur-3xl rounded-full scale-150 animate-pulse"></div>

                            <div className="relative z-10 w-72 aspect-3/4 rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition duration-500 bg-white p-2 border border-gray-100">
                                <div className="w-full h-full rounded-xl overflow-hidden relative">
                                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white text-left">
                                        <div className="text-2xl font-bold">{card.name}</div>
                                        <div className="text-xs opacity-80">{card.country} • {card.position}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-8 mb-10">
                            <div className="text-center">
                                <div className="text-sm font-bold text-gray-400 mb-2">RITMO</div>
                                <div className="text-3xl font-black text-wc-green">{card.stats?.speed || 88}</div>
                                <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-wc-green" style={{ width: `${card.stats?.speed || 88}%` }}></div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-bold text-gray-400 mb-2">TIRO</div>
                                <div className="text-3xl font-black text-yellow-500">{card.stats?.shooting || 85}</div>
                                <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-yellow-500" style={{ width: `${card.stats?.shooting || 85}%` }}></div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-bold text-gray-400 mb-2">FÍSICO</div>
                                <div className="text-3xl font-black text-wc-red">{card.stats?.power || 90}</div>
                                <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-wc-red" style={{ width: `${card.stats?.power || 90}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <button
                                onClick={onAdd}
                                className="py-6 px-6 rounded-2xl bg-wc-green border-2 border-wc-green text-white font-bold hover:bg-green-700 hover:border-green-700 transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                <span className="text-base">Agregar a Colección</span>
                            </button>
                            <button
                                onClick={() => setShowStats(true)}
                                className="py-6 px-6 rounded-2xl bg-white border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span className="text-base">Ver Estadísticas</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showStats && (
                <CardStats
                    card={card}
                    onClose={() => setShowStats(false)}
                />
            )}
        </>
    );
}
