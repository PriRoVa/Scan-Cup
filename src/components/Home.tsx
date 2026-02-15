
import type { Card, User } from '../types';

interface HomeProps {
    user: User;
    onScanClick: () => void;
    onViewCollection: () => void;
    trendingCards: Card[];
}

export function Home({ user, onScanClick, onViewCollection, trendingCards }: HomeProps) {
    return (
        <div className="min-h-screen bg-wc-light-bg pb-20">
            {/* Header Section */}
            <div className="bg-wc-red rounded-b-[40px] pt-12 pb-16 px-6 relative shadow-xl z-0">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <div className="bg-white/20 p-1 rounded-full">
                            <span className="text-white font-bold text-xs">⚽ WC26</span>
                        </div>
                        <span className="text-white/80 text-xs font-medium">APP OFICIAL</span>
                    </div>
                    <div className="relative">
                        <button className="text-white p-2 rounded-full hover:bg-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full"></div>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-white leading-tight mb-2">
                    Arma tu<br />Equipo Soñado.
                </h1>

                {/* Scan Button - Floating */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <button
                        onClick={onScanClick}
                        className="w-16 h-16 bg-wc-green-light rounded-full border-4 border-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                    </button>
                    <div className="text-xs font-bold text-wc-green-light text-center mt-1">ESCANEAR</div>
                </div>
            </div>

            {/* Stats / Activity Section */}
            <div className="px-6 mt-12 mb-6">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-3">Actividad Reciente</div>
                <div className="bg-wc-dark-bg text-white rounded-2xl p-5 shadow-lg flex justify-between items-center relative overflow-hidden">
                    {/* Decorative background blur */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-20"></div>

                    <div>
                        <div className="text-gray-400 text-xs font-medium mb-1">COLECCIÓN</div>
                        <div className="text-3xl font-bold flex items-baseline">
                            {user.collectionCount} <span className="text-sm font-normal text-wc-red ml-1">Cartas</span>
                        </div>
                        <div className="w-12 h-1 bg-gray-700 rounded-full mt-2">
                            <div className="h-full bg-wc-red rounded-full" style={{ width: '40%' }}></div>
                        </div>
                    </div>

                    <div className="h-10 w-px bg-gray-700"></div>

                    <div className="text-right">
                        <div className="text-gray-400 text-xs font-medium mb-1">RANGO</div>
                        <div className="text-3xl font-bold text-yellow-500">#{user.rank} <span className="text-lg">🏆</span></div>
                        <div className="text-xs text-wc-red font-bold mt-1">▼ TOP 5%</div>
                    </div>
                </div>
            </div>

            {/* Trending Cards Section */}
            <div className="px-6">
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Tendencias <span className="text-wc-red">•</span></h2>
                    <button onClick={onViewCollection} className="text-wc-red text-sm font-bold">Ver Todo</button>
                </div>

                <div className="flex space-x-4 overflow-x-auto pb-6 scrollbar-hide">
                    {trendingCards.slice(0, 3).map((card) => (
                        <div key={card.id} className="min-w-[160px] bg-white rounded-xl shadow-md overflow-hidden relative group">
                            <div className="h-28 bg-gray-200 relative">
                                <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                                {card.rarity === 'legendary' && (
                                    <div className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">LEYENDA</div>
                                )}
                            </div>
                            <div className="p-3">
                                <h3 className="font-bold text-gray-800 text-sm truncate">{card.name}</h3>
                                <p className="text-xs text-gray-500">{card.country}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Drop Notification */}
            <div className="px-6 mb-4">
                <div className="bg-white rounded-xl p-3 flex items-center shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <span className="text-xl">🇧🇷</span>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-sm">Neymar Jr</h4>
                        <div className="text-xs text-gray-500">Sobre Oro • hace 3m</div>
                    </div>
                    <div className="text-right">
                        <div className="text-wc-red font-bold text-sm">+50 XP</div>
                        <div className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-1 rounded inline-block mt-0.5">RARO</div>
                    </div>
                </div>
            </div>

            <div className="px-6">
                <button onClick={onViewCollection} className="w-full py-3 border-2 border-dashed border-wc-red/30 text-wc-red font-bold rounded-xl hover:bg-wc-red/5 transition">
                    Ver Historial de Colección
                </button>
            </div>
        </div>
    );
}
