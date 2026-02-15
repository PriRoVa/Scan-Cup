import type { User } from '../types';

interface UserProfileProps {
    user: User;
    onBack: () => void;
}

export function UserProfile({ user, onBack }: UserProfileProps) {
    const levelProgress = ((user.level % 10) / 10) * 100; // Mock progress to next level
    const achievements = [
        { icon: '🏆', label: 'Coleccionista', unlocked: true },
        { icon: '⚡', label: 'Explorador', unlocked: true },
        { icon: '🎯', label: 'Maestro', unlocked: false },
        { icon: '👑', label: 'Leyenda', unlocked: false },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-wc-dark-bg via-gray-900 to-wc-dark-bg text-white p-4 pb-24">
            <div className="w-full max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={onBack}
                        className="mr-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 border border-wc-green-light/20 hover:border-wc-green-light/40"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-wc-green-light"
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
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-wc-green-light to-wc-green bg-clip-text text-transparent">
                        Mi Perfil
                    </h1>
                </div>

                {/* Profile Card */}
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-wc-green-light/20 relative overflow-hidden mb-6">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-wc-green-light/5 via-transparent to-wc-green/5 animate-pulse"></div>

                    {/* Top decorative line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-wc-green-light to-transparent"></div>

                    <div className="relative z-10">
                        {/* Avatar and Basic Info */}
                        <div className="flex items-start gap-6 mb-6">
                            <div className="relative group">
                                <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-wc-green-light shadow-[0_0_30px_rgba(0,209,178,0.4)] group-hover:shadow-[0_0_40px_rgba(0,209,178,0.6)] transition-all duration-300">
                                    <img
                                        src={user.avatarUrl}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-wc-green to-wc-green-light text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                                    Nvl {user.level}
                                </div>
                            </div>

                            <div className="flex-1 pt-2">
                                <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                                <p className="text-gray-400 text-sm mb-3">{user.email}</p>

                                {/* Rank Badge */}
                                {user.rank && (
                                    <div className="inline-flex items-center gap-2 bg-wc-gold/20 border border-wc-gold/40 px-3 py-1 rounded-full">
                                        <svg className="w-4 h-4 text-wc-gold" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-wc-gold font-semibold text-sm">Rank #{user.rank}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Level Progress Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-400">Progreso al Nivel {user.level + 1}</span>
                                <span className="text-sm font-semibold text-wc-green-light">{levelProgress.toFixed(0)}%</span>
                            </div>
                            <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden border border-gray-600/50">
                                <div
                                    className="h-full bg-gradient-to-r from-wc-green to-wc-green-light rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(0,209,178,0.5)]"
                                    style={{ width: `${levelProgress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="bg-gradient-to-br from-wc-green-light/10 to-wc-green/10 p-4 rounded-xl border border-wc-green-light/20 hover:border-wc-green-light/40 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center justify-center mb-2">
                                    <svg className="w-6 h-6 text-wc-green-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <p className="text-gray-400 text-xs mb-1">Puntos</p>
                                <p className="text-2xl font-bold text-wc-green-light">{user.points.toLocaleString()}</p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center justify-center mb-2">
                                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <p className="text-gray-400 text-xs mb-1">Cartas</p>
                                <p className="text-2xl font-bold text-blue-400">{user.collectionCount || 0}</p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4 rounded-xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center justify-center mb-2">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <p className="text-gray-400 text-xs mb-1">ID</p>
                                <p className="text-xl font-bold text-purple-400">#{user.id}</p>
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <span className="text-wc-gold">🏅</span>
                                Logros
                            </h3>
                            <div className="grid grid-cols-4 gap-3">
                                {achievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-xl border transition-all duration-300 ${achievement.unlocked
                                                ? 'bg-wc-gold/10 border-wc-gold/40 hover:border-wc-gold/60 hover:scale-110'
                                                : 'bg-gray-700/30 border-gray-600/30 opacity-50'
                                            }`}
                                    >
                                        <div className="text-3xl mb-1 text-center">{achievement.icon}</div>
                                        <p className={`text-[10px] text-center font-medium ${achievement.unlocked ? 'text-wc-gold' : 'text-gray-500'
                                            }`}>
                                            {achievement.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button className="py-3 bg-gradient-to-r from-wc-green to-wc-green-light text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,209,178,0.5)] transition-all duration-300 hover:scale-105">
                                Editar Perfil
                            </button>
                            <button className="py-3 bg-white/5 border border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300 hover:scale-105">
                                Compartir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
