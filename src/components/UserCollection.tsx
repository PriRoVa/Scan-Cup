import { useState } from 'react';
import type { Card } from '../types';

interface UserCollectionProps {
    cards: Card[];
}

export function UserCollection({ cards }: UserCollectionProps) {
    const [activeFilter, setActiveFilter] = useState('Todas');

    // Calculate stats
    const totalCards = cards.length; // In a real app this would be the database total
    const collectedCount = cards.filter(c => c.isCollected).length;
    const progressPercentage = Math.round((collectedCount / totalCards) * 100);

    // Filter logic
    const countries = Array.from(new Set(cards.map(c => c.country).filter(Boolean)));
    const filters = ['Todas', ...countries];

    const filteredCards = activeFilter === 'Todas'
        ? cards
        : cards.filter(c => c.country === activeFilter);

    // Group by country if "Todas" is selected, otherwise just show list
    const groupedCards = activeFilter === 'Todas'
        ? countries.reduce((acc, country) => {
            acc[country as string] = cards.filter(c => c.country === country);
            return acc;
        }, {} as Record<string, Card[]>)
        : { [activeFilter]: filteredCards };

    return (
        <div className="min-h-screen bg-wc-light-bg pb-24 px-6 pt-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Mi Colección</h1>
                <button className="p-3 bg-white rounded-full shadow-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-10">
                <div className="flex justify-between text-sm font-bold text-gray-500 mb-3">
                    <span>PROGRESO TOTAL</span>
                    <span className="text-wc-green">{collectedCount}/{totalCards} ({progressPercentage}%)</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-linear-to-r from-wc-green to-wc-green-light rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex space-x-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                {filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter as string)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeFilter === filter
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-600 border border-gray-200'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Card Sections */}
            <div className="space-y-8">
                {Object.entries(groupedCards).map(([country, countryCards]) => (
                    <div key={country} className="bg-white rounded-2xl p-4 shadow-sm">
                        {/* Section Header */}
                        <div className="flex justify-between items-center mb-4 bg-wc-red/10 p-3 rounded-xl border border-wc-red/10">
                            <div className="flex items-center space-x-3">
                                {/* Flag Placeholder - simplified */}
                                <div className="w-8 h-8 bg-wc-red rounded-full flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm">
                                    {country.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-wc-red font-extrabold text-sm uppercase tracking-wide">{country}</h3>
                                    <div className="text-[10px] text-gray-500 font-bold">
                                        {countryCards.filter(c => c.isCollected).length}/{countryCards.length} OBTENIDAS
                                    </div>
                                </div>
                            </div>
                            <button className="bg-wc-red text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-red-600 transition">
                                VER ÁLBUM
                            </button>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            {countryCards.map(card => (
                                <div key={card.id} className="relative group">
                                    {card.isCollected ? (
                                        // Collected Card
                                        <div className={`relative aspect-3/4 rounded-xl overflow-hidden shadow-md border-2 ${card.rarity === 'legendary' ? 'border-yellow-400' : 'border-transparent'}`}>
                                            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />

                                            {/* Rarity & Rating Overlay */}
                                            <div className="absolute top-1 left-1 right-1 flex justify-between">
                                                {card.rarity === 'legendary' && (
                                                    <span className="bg-yellow-400 text-[8px] font-bold px-1 rounded text-black shadow-sm">LEYENDA</span>
                                                )}
                                            </div>

                                            <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black via-black/70 to-transparent p-2 pt-6">
                                                <div className="text-white text-[10px] font-bold truncate leading-tight">{card.name}</div>
                                                <div className="text-gray-300 text-[8px]">{card.position} • 94 GRL</div>
                                            </div>
                                        </div>
                                    ) : (
                                        // Missing / Locked Card
                                        <div className="aspect-3/4 bg-red-50 rounded-xl border-2 border-dashed border-red-200 flex flex-col items-center justify-center p-2 text-center opacity-70">
                                            <div className="w-8 h-8 rounded-full bg-red-100 text-wc-red flex items-center justify-center mb-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            <div className="text-wc-red font-bold text-[10px] uppercase">FALTA</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
