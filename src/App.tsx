import { useState } from 'react'

function App() {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Logic to start scanning would go here
    console.log("Scanning started...");
    setTimeout(() => setIsScanning(false), 2000); // Mock scanning duration
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 text-white">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-md">
            ScanCup
          </h1>
          <p className="text-xl text-blue-100">
            Escanea tu tarjeta.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="aspect-square bg-gray-900/50 rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-white/30">
            <span className="text-gray-400 text-sm">
              {isScanning ? "Escaneando..." : "Área de Escaneo"}
            </span>
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className={`w-full py-4 px-6 rounded-xl text-lg font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg ${isScanning
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
          >
            {isScanning ? 'Escaneando...' : 'Escanear'}
          </button>
        </div>

        <p className="text-sm text-blue-200 opacity-80">
          Asegúrate de tener buena iluminación.
        </p>
      </div>
    </div>
  )
}

export default App
