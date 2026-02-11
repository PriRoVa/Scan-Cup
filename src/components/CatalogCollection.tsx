import type { Card } from '../types';

interface CatalogCollectionProps {
    cards: Card[];
    onBack: () => void;
}

export function CatalogCollection({ cards, onBack }: CatalogCollectionProps) {
    return (
        <div className="min-h-screen bg-midnight-grid text-pure-signal p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <button
                        onClick={onBack}
                        className="mr-4 p-2 rounded-full hover:bg-carbon-core/50 transition border border-cyan-pulse/20"
                    >
                        {/* Back Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-cyan-pulse"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                    </button>
                    <h1 className="text-3xl font-bold text-pure-signal">Álbum Mundial</h1>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`relative rounded-xl overflow-hidden shadow-lg transition duration-300 ${card.isCollected
                                ? 'bg-carbon-core border-2 border-cyan-pulse hover:border-cyan-pulse/80 hover:shadow-[0_0_15px_rgba(0,209,178,0.3)]'
                                : 'bg-carbon-core/50 border border-pure-signal/10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                                }`}
                        >
                            <div className="aspect-[3/4] relative bg-midnight-grid/50">
                                <img
                                    src={card.imageUrl}
                                    alt={card.name}
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full ${card.isCollected ? 'bg-cyan-pulse text-midnight-grid' : 'bg-carbon-core text-gray-400'
                                        }`}
                                >
                                    #{card.id}
                                </div>
                                {card.isCollected && (
                                    <div className="absolute bottom-2 right-2 bg-cyan-pulse text-midnight-grid p-1 rounded-full">
                                        {/* Check Icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg truncate text-pure-signal">{card.name}</h3>
                                <p className="text-sm text-pure-signal/60 line-clamp-2 mt-1">
                                    {card.description}
                                </p>
                                {!card.isCollected && (
                                    <div className="mt-2 text-xs text-center text-pure-signal/40 uppercase font-semibold tracking-wider">
                                        Bloqueado
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
