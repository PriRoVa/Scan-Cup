import type { Card } from '../types';

interface UserCollectionProps {
    cards: Card[];
    onBack: () => void;
}

export function UserCollection({ cards, onBack }: UserCollectionProps) {
    const collectedCards = cards.filter((card) => card.isCollected);

    return (
        <div className="min-h-screen bg-midnight-grid text-pure-signal p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <button
                        onClick={onBack}
                        className="mr-4 p-2 rounded-full hover:bg-carbon-core/50 transition border border-cyan-pulse/20"
                    >
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
                    <h1 className="text-3xl font-bold text-pure-signal">Mi Equipo</h1>
                </div>

                {collectedCards.length === 0 ? (
                    <div className="text-center py-20 bg-carbon-core rounded-xl border border-cyan-pulse/20">
                        <p className="text-xl text-pure-signal/60">Aún no tienes jugadores en tu equipo.</p>
                        <p className="mt-2 text-cyan-pulse/80">¡Escanea estampas para armar tu selección!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {collectedCards.map((card) => (
                            <div
                                key={card.id}
                                className="bg-carbon-core rounded-xl overflow-hidden shadow-lg border border-cyan-pulse/20 hover:border-cyan-pulse transition duration-300 hover:shadow-[0_0_15px_rgba(0,209,178,0.3)]"
                            >
                                <div className="aspect-[3/4] relative bg-midnight-grid/50">
                                    <img
                                        src={card.imageUrl}
                                        alt={card.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-cyan-pulse text-midnight-grid text-xs font-bold px-2 py-1 rounded-full">
                                        #{card.id}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg truncate text-pure-signal">{card.name}</h3>
                                    <p className="text-sm text-pure-signal/60 line-clamp-2 mt-1">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
