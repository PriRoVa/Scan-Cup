import type { User } from '../types';

interface UserProfileProps {
    user: User;
    onBack: () => void;
}

export function UserProfile({ user, onBack }: UserProfileProps) {
    return (
        <div className="min-h-screen bg-midnight-grid text-pure-signal p-6 flex flex-col items-center">
            <div className="w-full max-w-md">
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
                    <h1 className="text-3xl font-bold text-pure-signal">Mi Perfil</h1>
                </div>

                <div className="bg-carbon-core rounded-2xl p-8 shadow-xl border border-cyan-pulse/20 flex flex-col items-center text-center space-y-6 relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-pulse to-transparent opacity-50"></div>

                    <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-pulse shadow-[0_0_20px_rgba(0,209,178,0.3)]">
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 bg-midnight-grid text-cyan-pulse text-xs font-bold px-3 py-1 rounded-full border-2 border-cyan-pulse">
                            Nvl {user.level}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-pure-signal">{user.name}</h2>
                        <p className="text-pure-signal/60">{user.email}</p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-midnight-grid/50 p-4 rounded-xl shadow-inner border border-pure-signal/5">
                            <p className="text-pure-signal/60 text-sm">Puntos</p>
                            <p className="text-2xl font-bold text-cyan-pulse">{user.points}</p>
                        </div>
                        <div className="bg-midnight-grid/50 p-4 rounded-xl shadow-inner border border-pure-signal/5">
                            <p className="text-pure-signal/60 text-sm">ID Usuario</p>
                            <p className="text-2xl font-bold text-pure-signal">#{user.id}</p>
                        </div>
                    </div>

                    <div className="w-full pt-4 border-t border-pure-signal/10">
                        <button className="w-full py-3 bg-cyan-pulse text-midnight-grid rounded-xl font-bold hover:bg-white transition shadow-lg hover:shadow-[0_0_15px_rgba(0,209,178,0.4)]">
                            Editar Perfil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
