import { useState } from 'react';

export function Trivia() {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const question = {
        number: 4,
        total: 10,
        level: 'Pro',
        streak: 12,
        text: "¿En qué club hizo su debut senior este jugador en 2016?",
        player: {
            name: "M. Rashford",
            position: "DEL",
            team: "ENG",
            image: "https://images.unsplash.com/photo-1517466787929-bc90951d6dbd?q=80&w=2670&auto=format&fit=crop" // Using existing image for demo
        },
        options: [
            { id: 'A', text: "West Ham United" },
            { id: 'B', text: "Manchester United" },
            { id: 'C', text: "Arsenal FC" },
            { id: 'D', text: "Liverpool FC" }
        ]
    };

    const handleAnswer = (id: string) => {
        setSelectedAnswer(id);
    };

    return (
        <div className="min-h-screen bg-[#022c22] text-white p-6 pb-24 relative overflow-hidden">
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-green-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-wc-green-light rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <button className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="text-right">
                    <div className="text-xs font-bold text-wc-red tracking-widest uppercase mb-1">RACHA</div>
                    <div className="text-xl font-bold flex items-center justify-end space-x-1">
                        <span>🔥</span>
                        <span>{question.streak}</span>
                    </div>
                </div>
            </div>

            <div className="mb-8 relative z-10">
                <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
                    <span className="text-wc-red">Pregunta {question.number}/{question.total}</span>
                    <span>Nivel: {question.level}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-wc-red w-[40%] rounded-full shadow-[0_0_10px_rgba(230,57,70,0.5)]"></div>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex justify-center mb-8 relative">
                    <div className="relative w-48 aspect-3/4 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 transform -rotate-2 hover:rotate-0 transition duration-500">
                        <img src={question.player.image} alt={question.player.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>

                        <div className="absolute bottom-3 left-3 text-left">
                            <div className="font-bold text-lg leading-none">{question.player.name}</div>
                            <div className="text-[10px] text-gray-300">{question.player.position} • {question.player.team}</div>
                        </div>

                        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-wc-green-light blur-2xl opacity-20 -z-10"></div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-8 leading-tight drop-shadow-lg">
                    ¿En qué club hizo su debut senior este <span className="text-wc-red">jugador en 2016</span>?
                </h2>

                <div className="space-y-3">
                    {question.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleAnswer(option.id)}
                            className={`w-full p-4 rounded-xl flex items-center justify-between font-bold transition-all duration-200 group relative overflow-hidden ${selectedAnswer === option.id
                                ? 'bg-wc-green text-white shadow-lg transform scale-[1.02]'
                                : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10'
                                }`}
                        >
                            <div className="flex items-center space-x-4 relative z-10 w-full">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${selectedAnswer === option.id
                                    ? 'bg-white text-wc-green'
                                    : 'bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white'
                                    }`}>
                                    {option.id}
                                </div>
                                <span>{option.text}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
