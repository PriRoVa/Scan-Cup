import { useState } from 'react'
import type { Card, User } from './types'
import { UserCollection } from './components/UserCollection'
import { CatalogCollection } from './components/CatalogCollection'
import { UserProfile } from './components/UserProfile'
import { ARView } from './components/ARView'

const mockUser: User = {
  id: "8821",
  name: "Carlos Montalvo",
  email: "carlos@scancup.com",
  avatarUrl: "https://images.unsplash.com/photo-1546519638-68e109498ee3?q=80&w=2670&auto=format&fit=crop",
  level: 12,
  points: 4500
};

const mockCards: Card[] = [
  {
    id: "MES-10",
    name: "Lionel Messi",
    description: "El capitán legendario, maestro del regate y la visión.",
    imageUrl: "https://images.unsplash.com/photo-1621977717297-c60f49298d07?q=80&w=2670&auto=format&fit=crop",
    isCollected: true
  },
  {
    id: "CR7-07",
    name: "Cristiano Ronaldo",
    description: "Potencia física y capacidad goleadora sin igual.",
    imageUrl: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=2892&auto=format&fit=crop",
    isCollected: false
  },
  {
    id: "MBP-09",
    name: "Kylian Mbappé",
    description: "Velocidad explosiva y definición letal.",
    imageUrl: "https://images.unsplash.com/photo-1560933566-f44697955c4d?q=80&w=2670&auto=format&fit=crop",
    isCollected: true
  },
  {
    id: "NEY-11",
    name: "Neymar Jr",
    description: "Magia brasileña, creatividad y alegría en el campo.",
    imageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d6dbd?q=80&w=2670&auto=format&fit=crop",
    isCollected: false
  },
  {
    id: "MOD-10",
    name: "Luka Modrić",
    description: "El motor del mediocampo, elegancia y precisión.",
    imageUrl: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=2564&auto=format&fit=crop",
    isCollected: true
  }
];

function App() {
  const [view, setView] = useState<'welcome' | 'scan' | 'user-collection' | 'catalog' | 'profile' | 'ar'>('welcome');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Logic to start scanning would go here
    console.log("Scanning started...");

    // Simulate a brief "preparing" state then switch to AR
    setTimeout(() => {
      setIsScanning(false);
      setView('ar');
    }, 1000);
  };

  const handleARScan = (cardId: string) => {
    // Logic when card is found in AR
    console.log("Card found in AR:", cardId);
    // Maybe show a modal, add to collection, etc.
    // For now, let's just go to user collection to "show" it
    alert(`¡Jugador Encontrado! ${cardId}`);
    setView('user-collection');
  };

  if (view === 'ar') {
    return <ARView onScan={handleARScan} onBack={() => setView('welcome')} />;
  }

  if (view === 'user-collection') {
    return <UserCollection cards={mockCards} onBack={() => setView('welcome')} />;
  }

  if (view === 'catalog') {
    return <CatalogCollection cards={mockCards} onBack={() => setView('welcome')} />;
  }

  if (view === 'profile') {
    return <UserProfile user={mockUser} onBack={() => setView('welcome')} />;
  }

  if (view === 'welcome') {
    return (
      <div className="min-h-screen bg-midnight-grid flex flex-col items-center justify-center p-6 text-pure-signal text-center relative">
        {/* Profile Button Top Right */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setView('profile')}
            className="flex items-center space-x-2 bg-carbon-core/50 backdrop-blur-md p-2 pl-3 pr-4 rounded-full hover:bg-carbon-core/80 transition hover:scale-105 border border-cyan-pulse/30 shadow-lg shadow-cyan-pulse/10"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-cyan-pulse">
              <img src={mockUser.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-semibold text-pure-signal">Mi Perfil</span>
          </button>
        </div>

        <div className="animate-fade-in-up space-y-8 max-w-lg">
          <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-2xl text-pure-signal">
            ScanCup
          </h1>
          <p className="text-2xl font-light text-cyan-pulse">
            Colecciona a las leyendas del fútbol mundial.
          </p>
          <div className="mt-10 flex flex-col space-y-4">
            <button
              onClick={() => setView('scan')}
              className="px-10 py-4 bg-cyan-pulse text-midnight-grid text-xl font-bold rounded-full shadow-[0_0_20px_rgba(0,209,178,0.4)] hover:bg-white hover:scale-105 transition transform duration-200 ease-in-out uppercase tracking-wider"
            >
              Escanear Estampa
            </button>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => setView('user-collection')}
                className="px-6 py-3 bg-carbon-core backdrop-blur-md text-pure-signal font-semibold rounded-full hover:bg-carbon-core/80 transition ring-1 ring-cyan-pulse/30 hover:ring-cyan-pulse"
              >
                Mi Equipo
              </button>
              <button
                onClick={() => setView('catalog')}
                className="px-6 py-3 bg-carbon-core backdrop-blur-md text-pure-signal font-semibold rounded-full hover:bg-carbon-core/80 transition ring-1 ring-pure-signal/30 hover:ring-pure-signal"
              >
                Ver Álbum
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-grid flex flex-col items-center justify-center p-4 text-pure-signal">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => setView('welcome')}
          className="text-pure-signal/80 hover:text-cyan-pulse flex items-center space-x-2 transition p-2 rounded-lg hover:bg-carbon-core"
        >
          <span>← Regresar</span>
        </button>
      </div>

      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-md text-pure-signal">
            Escanear Jugador
          </h1>
          <p className="text-xl text-cyan-pulse/80">
            Apunta tu cámara al código de la estampa.
          </p>
        </div>

        <div className="bg-carbon-core/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-cyan-pulse/20">
          <div className="aspect-square bg-midnight-grid/50 rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-cyan-pulse/30 relative overflow-hidden">
            {isScanning && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-pulse/20 to-transparent animate-scan"></div>
            )}
            <span className="text-gray-400 text-sm z-10">
              {isScanning ? "Procesando..." : "Área de Escaneo"}
            </span>
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className={`w-full py-4 px-6 rounded-xl text-lg font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg ${isScanning
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-cyan-pulse text-midnight-grid hover:bg-white'
              }`}
          >
            {isScanning ? 'Escaneando...' : 'Escanear Ahora'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
