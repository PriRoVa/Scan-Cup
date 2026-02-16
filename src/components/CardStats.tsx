import { useEffect, useState } from 'react';
import type { Card } from '../types';

interface CardStatsProps {
    card: Card;
    onClose: () => void;
    onAddFilters?: () => void;
}

export function CardStats({ card, onClose, onAddFilters }: CardStatsProps) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    // Extended stats (using existing stats or defaults)
    const stats = {
        ritmo: card.stats?.speed || 88,
        tiro: card.stats?.shooting || 85,
        fisico: card.stats?.power || 90,
        defensa: 82,
        pase: 87,
        regate: 91
    };

    const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
        <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-600 w-16">{label}</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color.replace('text-', 'bg-')} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${value}%` }}
                ></div>
            </div>
            <span className={`text-sm font-bold ${color} w-8 text-right`}>{value}</span>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className={`w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 ease-out ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col md:flex-row">
                    {/* Left Side - Large Card Image */}
                    <div className="md:w-1/2 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-8 flex flex-col items-center justify-center relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Large Card Display */}
                        <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 mb-4">
                            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Card Info */}
                        <h2 className="text-2xl font-bold text-white text-center mb-1">{card.name}</h2>
                        <p className="text-white/70 text-sm mb-3">{card.country} • {card.position}</p>

                        {/* Rarity Badge */}
                        {card.rarity && (
                            <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold ${card.rarity === 'legendary' ? 'bg-yellow-400 text-black' :
                                    card.rarity === 'rare' ? 'bg-purple-500 text-white' :
                                        'bg-gray-400 text-white'
                                }`}>
                                {card.rarity === 'legendary' ? '⭐ LEGENDARIA' : card.rarity.toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Right Side - Compact Stats */}
                    <div className="md:w-1/2 p-6 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-wc-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Estadísticas
                        </h3>

                        {/* Compact Stats */}
                        <div className="space-y-3 mb-6">
                            <StatBar label="RITMO" value={stats.ritmo} color="text-wc-green" />
                            <StatBar label="TIRO" value={stats.tiro} color="text-yellow-500" />
                            <StatBar label="PASE" value={stats.pase} color="text-blue-500" />
                            <StatBar label="REGATE" value={stats.regate} color="text-purple-500" />
                            <StatBar label="DEFENSA" value={stats.defensa} color="text-orange-500" />
                            <StatBar label="FÍSICO" value={stats.fisico} color="text-wc-red" />
                        </div>

                        {/* Overall Rating - Compact */}
                        <div className="bg-linear-to-r from-wc-green to-wc-green-light rounded-xl p-4 text-center text-white mb-6">
                            <div className="text-xs font-bold mb-1 opacity-90">VALORACIÓN GENERAL</div>
                            <div className="text-3xl font-black">
                                {Math.round((stats.ritmo + stats.tiro + stats.pase + stats.regate + stats.defensa + stats.fisico) / 6)}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2 mt-auto">
                            <button
                                onClick={onAddFilters}
                                className="w-full py-3 bg-linear-to-r from-wc-red to-red-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Agregar Filtros
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-gray-100 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
