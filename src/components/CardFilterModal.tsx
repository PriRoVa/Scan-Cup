import { useState } from 'react';
import type { Card } from '../types';

interface CardFilterModalProps {
    card: Card;
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: (filters: FilterOptions) => void;
}

export interface FilterOptions {
    rarity?: string[];
    country?: string[];
    position?: string[];
    minRating?: number;
    maxRating?: number;
}

export function CardFilterModal({ card, isOpen, onClose, onApplyFilters }: CardFilterModalProps) {
    const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number>(0);
    const [maxRating, setMaxRating] = useState<number>(100);

    if (!isOpen) return null;

    const rarities = ['common', 'rare', 'epic', 'legendary'];
    const positions = ['Portero', 'Defensa', 'Mediocampista', 'Delantero'];

    const toggleSelection = (item: string, list: string[], setter: (list: string[]) => void) => {
        if (list.includes(item)) {
            setter(list.filter(i => i !== item));
        } else {
            setter([...list, item]);
        }
    };

    const handleApply = () => {
        const filters: FilterOptions = {
            rarity: selectedRarities.length > 0 ? selectedRarities : undefined,
            country: selectedCountries.length > 0 ? selectedCountries : undefined,
            position: selectedPositions.length > 0 ? selectedPositions : undefined,
            minRating: minRating > 0 ? minRating : undefined,
            maxRating: maxRating < 100 ? maxRating : undefined,
        };
        onApplyFilters(filters);
        onClose();
    };

    const handleReset = () => {
        setSelectedRarities([]);
        setSelectedCountries([]);
        setSelectedPositions([]);
        setMinRating(0);
        setMaxRating(100);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-linear-to-br from-midnight-grid via-carbon-core to-midnight-grid border-2 border-cyan-pulse/30 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-carbon-core/95 backdrop-blur-sm border-b border-cyan-pulse/20 p-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-20 rounded-lg overflow-hidden border-2 border-cyan-pulse/50 shadow-lg">
                            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-pure-signal">{card.name}</h2>
                            <p className="text-sm text-cyan-pulse">{card.position} • {card.country}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-cyan-pulse/10 rounded-full transition text-pure-signal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Rarity Filter */}
                    <div>
                        <h3 className="text-lg font-bold text-pure-signal mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Rareza
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {rarities.map(rarity => (
                                <button
                                    key={rarity}
                                    onClick={() => toggleSelection(rarity, selectedRarities, setSelectedRarities)}
                                    className={`px-4 py-2 rounded-lg font-bold text-sm transition ${selectedRarities.includes(rarity)
                                        ? 'bg-cyan-pulse text-midnight-grid shadow-lg shadow-cyan-pulse/30'
                                        : 'bg-carbon-core/50 text-pure-signal/60 border border-pure-signal/10 hover:border-cyan-pulse/50'
                                        }`}
                                >
                                    {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Position Filter */}
                    <div>
                        <h3 className="text-lg font-bold text-pure-signal mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Posición
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {positions.map(position => (
                                <button
                                    key={position}
                                    onClick={() => toggleSelection(position, selectedPositions, setSelectedPositions)}
                                    className={`px-4 py-2 rounded-lg font-bold text-sm transition ${selectedPositions.includes(position)
                                        ? 'bg-cyan-pulse text-midnight-grid shadow-lg shadow-cyan-pulse/30'
                                        : 'bg-carbon-core/50 text-pure-signal/60 border border-pure-signal/10 hover:border-cyan-pulse/50'
                                        }`}
                                >
                                    {position}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Rating Range */}
                    <div>
                        <h3 className="text-lg font-bold text-pure-signal mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Rango de Calificación
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-pure-signal/70 mb-2 block">Mínimo: {minRating}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={minRating}
                                    onChange={(e) => setMinRating(Number(e.target.value))}
                                    className="w-full h-2 bg-carbon-core rounded-lg appearance-none cursor-pointer accent-cyan-pulse"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-pure-signal/70 mb-2 block">Máximo: {maxRating}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={maxRating}
                                    onChange={(e) => setMaxRating(Number(e.target.value))}
                                    className="w-full h-2 bg-carbon-core rounded-lg appearance-none cursor-pointer accent-cyan-pulse"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 bg-carbon-core/95 backdrop-blur-sm border-t border-cyan-pulse/20 p-6 flex justify-between gap-4">
                    <button
                        onClick={handleReset}
                        className="px-6 py-3 rounded-lg font-bold text-pure-signal/70 border border-pure-signal/20 hover:border-cyan-pulse/50 hover:text-pure-signal transition"
                    >
                        Restablecer
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-lg font-bold text-pure-signal/70 hover:bg-carbon-core/50 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleApply}
                            className="px-8 py-3 rounded-lg font-bold bg-linear-to-r from-cyan-pulse to-cyan-pulse/80 text-midnight-grid shadow-lg shadow-cyan-pulse/30 hover:shadow-cyan-pulse/50 transition"
                        >
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
