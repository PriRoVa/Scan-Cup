
import type { User } from '../types';

interface HomeProps {
    user: User;
    onScanClick: () => void;
    onViewCollection: () => void;
}

export function Home({ user, onScanClick, onViewCollection }: HomeProps) {
    return (
        <div className="min-h-screen bg-wc-light-bg pb-20">
            {/* Header Section */}
            <div className="bg-wc-red rounded-b-[40px] pt-16 pb-20 px-6 relative shadow-xl z-0">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-2">
                        <div className="bg-white/20 p-2 rounded-full">
                            <span className="text-white font-bold text-sm">⚽ WC26</span>
                        </div>
                        <span className="text-white/80 text-sm font-medium">APP OFICIAL</span>
                    </div>
                    <div className="relative">
                        <button className="text-white p-2 rounded-full hover:bg-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-white leading-tight mb-2">
                    Arma tu<br />Equipo Soñado.
                </h1>

                {/* Scan Button - Floating */}
                <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 z-10">
                    <button
                        onClick={onScanClick}
                        className="w-28 h-28 bg-wc-green-light rounded-full border-4 border-white flex items-center justify-center shadow-xl active:scale-95 transition-transform hover:shadow-2xl"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                    </button>
                    <div className="text-base font-bold text-wc-green-light text-center mt-3">ESCANEAR</div>
                </div>
            </div>

            {/* Stats / Activity Section */}
            <div className="px-6 mt-20 mb-8">
                <div className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-4">Actividad Reciente</div>
                <div className="bg-wc-dark-bg text-white rounded-2xl p-6 shadow-lg flex justify-between items-center relative overflow-hidden">
                    {/* Decorative background blur */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-20"></div>

                    <div className="flex-1">
                        <div className="text-gray-400 text-sm font-medium mb-2">COLECCIÓN</div>
                        <div className="text-4xl font-bold flex items-baseline">
                            {user.collectionCount} <span className="text-base font-normal text-wc-red ml-2">Cartas</span>
                        </div>
                        <div className="w-16 h-1.5 bg-gray-700 rounded-full mt-3">
                            <div className="h-full bg-wc-red rounded-full" style={{ width: '13%' }}></div>
                        </div>
                    </div>

                    <div className="h-14 w-px bg-gray-700"></div>

                    <div className="text-right flex-1">
                        <div className="text-gray-400 text-sm font-medium mb-2">RANGO</div>
                        <div className="text-4xl font-bold text-yellow-500">#{user.rank} <span className="text-xl">🏆</span></div>
                        <div className="text-sm text-wc-red font-bold mt-2">▼ TOP 5%</div>
                    </div>
                </div>
            </div>

            <div className="px-6">
                <button onClick={onViewCollection} className="w-full py-4 bg-wc-red text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg">
                    Ver Mi Colección
                </button>
            </div>
        </div>
    );
}
