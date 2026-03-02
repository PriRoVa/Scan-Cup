import { useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Modelo from './Modelo'

interface TriviaProps {
    modelId?: string | null;
}

export function Trivia({ modelId }: TriviaProps) {
    const questions = [
        {
            id: 1,
            number: 1,
            total: 2,
            level: 'Pro',
            streak: 12,
            text: "¿En qué club hizo su debut senior este jugador?",
            options: [
                { id: 'A', text: "West Ham United" },
                { id: 'B', text: "Manchester United" },
                { id: 'C', text: "Arsenal FC" },
                { id: 'D', text: "Liverpool FC" }
            ],
            correct: 'B'
        },
        {
            id: 2,
            number: 2,
            total: 2,
            level: 'Pro',
            streak: 13,
            text: "¿Cuántos goles anotó en la temporada 2022-2023?",
            options: [
                { id: 'A', text: "15" },
                { id: 'B', text: "22" },
                { id: 'C', text: "30" },
                { id: 'D', text: "40" }
            ],
            correct: 'C'
        }
    ];

    const player = {
        name: "M. Rashford",
        position: "DEL",
        team: "ENG",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d6dbd?q=80&w=2670&auto=format&fit=crop"
    };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    const question = questions[currentQuestionIndex];

    const handleAnswer = (id: string) => {
        setSelectedAnswer(id);

        // Wait a moment before moving to the next question
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
            } else {
                setIsFinished(true);
            }
        }, 1000);
    };

    if (isFinished) {
        return (
            <div className="min-h-screen bg-[#022c22] text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-wc-green-light blur-[150px] opacity-20 -z-10"></div>
                <h2 className="text-4xl font-bold text-center mb-4 text-wc-green drop-shadow-lg">¡Trivia Completada!</h2>
                <p className="text-gray-300 text-lg mb-8 text-center max-w-xs">Has respondido las dos preguntas perfectamente.</p>
                <button
                    onClick={() => window.location.reload()} // O podrías usar un onBack si lo pasas por props
                    className="py-4 px-10 rounded-full bg-wc-green text-white font-bold hover:bg-green-500 transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] active:scale-95"
                >
                    Volver al Inicio
                </button>
            </div>
        );
    }

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
                    <div className="relative w-48 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 transform transition duration-500">
                        {/* Glow detrás */}
                        <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full scale-150 animate-pulse"></div>

                        {/* Render del Modelo 3D */}
                        <div className="absolute inset-0 z-10">
                            <Canvas
                                camera={{ position: [0, 0, 4.5], fov: 50 }}
                                gl={{ alpha: true, antialias: true }}
                            >
                                <hemisphereLight intensity={0.7} groundColor="#555555" />
                                <directionalLight position={[3, 4, 5]} intensity={0.9} />
                                <directionalLight position={[-3, -2, 5]} intensity={0.4} />
                                <directionalLight position={[0, 2, -5]} intensity={0.35} />

                                <group scale={0.75} position={[0, -0.2, 0]} rotation={[50.2, -26.5, 49.85]}>
                                    {modelId && <Modelo textureId={modelId} />}
                                </group>

                                <OrbitControls enableZoom={false} enablePan={false} />
                            </Canvas>
                        </div>

                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-20 pointer-events-none"></div>

                        <div className="absolute bottom-3 left-3 text-left z-30 pointer-events-none">
                            <div className="font-bold text-lg leading-none">{player.name}</div>
                            <div className="text-[10px] text-gray-300">{player.position} • {player.team}</div>
                        </div>

                        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/20 z-30 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-wc-green-light blur-2xl opacity-20 -z-10"></div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-8 leading-tight drop-shadow-lg">
                    {question.text}
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
