import { useState } from 'react';

interface EditVideosProps {
    video: any;
    onBack: () => void;
}

export function EditVideos({ video, onBack }: EditVideosProps) {
    const [activeFilter, setActiveFilter] = useState('none');

    const filters = [
        { id: 'none', label: 'Normal', style: {} },
        { id: 'pixelate', label: 'Pixelado', style: { filter: 'url(#pixelate)' } }, // Note: SVG filter needs to be defined
        { id: 'vintage', label: 'Vintage', style: { filter: 'sepia(0.5) contrast(1.2)' } },
        { id: 'blur', label: 'Desenfoque', style: { filter: 'blur(4px)' } },
        { id: 'thermal', label: 'Térmica', style: { filter: 'invert(1) hue-rotate(180deg) contrast(1.5)' } },
        { id: 'color', label: 'Color', style: { filter: 'saturate(2) contrast(1.1) hue-rotate(15deg)' } },
    ];

    // SVG Filter definition for pixelate effect
    const SvgFilters = () => (
        <svg className="hidden">
            <defs>
                <filter id="pixelate" x="0" y="0">
                    <feFlood x="2" y="2" height="1" width="1" />
                    <feComposite width="4" height="4" />
                    <feTile result="a" />
                    <feComposite in="SourceGraphic" in2="a" operator="in" />
                    <feMorphology operator="dilate" radius="2" />
                </filter>
            </defs>
        </svg>
    );

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <SvgFilters />

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center bg-linear-to-b from-black/80 to-transparent">
                <button onClick={onBack} className="p-2 text-white/80 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-white font-bold text-sm uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full">Editor de Video</h2>
                <button className="text-wc-green font-bold text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition">
                    GUARDAR
                </button>
            </div>

            {/* Video Preview Area */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                <div
                    className="w-full max-w-md aspect-video bg-gray-900 shadow-2xl relative overflow-hidden transition-all duration-500 ease-in-out flex items-center justify-center"
                >
                    <span className="text-gray-500 font-bold uppercase tracking-widest">Vista Previa</span>
                </div>
            </div>

            {/* Filter Controls */}
            <div className="h-48 bg-gray-900 pb-8 pt-4">
                <div className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Filtros</div>

                <div className="flex overflow-x-auto px-6 space-x-4 pb-4 custom-scrollbar snap-x">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`shrink-0 flex flex-col items-center space-y-2 group snap-center ${activeFilter === filter.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <div className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all p-0.5 ${activeFilter === filter.id ? 'border-wc-green scale-110' : 'border-transparent group-hover:border-white/30'
                                }`}>
                                <div className="w-full h-full rounded-lg bg-gray-800 overflow-hidden relative flex items-center justify-center">
                                    <span className="text-[8px] text-gray-500 uppercase">Filtro</span>
                                </div>
                            </div>
                            <span className={`text-[10px] font-bold uppercase transition-colors ${activeFilter === filter.id ? 'text-wc-green' : 'text-gray-500'
                                }`}>
                                {filter.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
