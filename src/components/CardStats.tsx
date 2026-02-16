import { useEffect, useState } from 'react';
import type { Card } from '../types';

interface CardStatsProps {
    card: Card;
    onClose: () => void;
}

export function CardStats({ card, onClose }: CardStatsProps) {
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
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-700">{label}</span>
                <span className={`text-2xl font-black ${color}`}>{value}</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color.replace('text-', 'bg-')} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className={`w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 ease-out ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}>
                {/* Header */}
                <div className="relative bg-linear-to-br from-wc-red to-red-700 p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{card.name}</h2>
                            <p className="text-white/80 text-sm">{card.country} • {card.position}</p>
                            {card.rarity && (
                                <div className="inline-block mt-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                                    {card.rarity.toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-wc-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Estadísticas Detalladas
                    </h3>

                    <StatBar label="RITMO" value={stats.ritmo} color="text-wc-green" />
                    <StatBar label="TIRO" value={stats.tiro} color="text-yellow-500" />
                    <StatBar label="PASE" value={stats.pase} color="text-blue-500" />
                    <StatBar label="REGATE" value={stats.regate} color="text-purple-500" />
                    <StatBar label="DEFENSA" value={stats.defensa} color="text-orange-500" />
                    <StatBar label="FÍSICO" value={stats.fisico} color="text-wc-red" />

                    {/* Overall Rating */}
                    <div className="mt-8 bg-linear-to-r from-wc-green to-wc-green-light rounded-2xl p-6 text-center text-white">
                        <div className="text-sm font-bold mb-2 opacity-90">VALORACIÓN GENERAL</div>
                        <div className="text-5xl font-black">
                            {Math.round((stats.ritmo + stats.tiro + stats.pase + stats.regate + stats.defensa + stats.fisico) / 6)}
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-full mt-6 py-4 bg-gray-100 border-2 border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
