import { useEffect, useState } from "react"
import type { Card } from "../types"
import { CardStats } from "./CardStats"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Modelo from "./Modelo"

interface ScanResultProps {
  card: Card
  modelId?: string | null
  onAdd: () => void
  onDiscard: () => void
  onStartTrivia: () => void
}

export function ScanResult({
  card,
  modelId,
  onAdd,
  onDiscard,
  onStartTrivia
}: ScanResultProps) {

  const [animate, setAnimate] = useState(false)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
        <div
          className={`w-full max-w-md bg-white rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl transform transition-transform duration-500 ease-out ${
            animate ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center p-6 pb-2">
            <button onClick={onDiscard} className="p-2 rounded-full hover:bg-gray-100">
              ✖
            </button>

            <div className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-100 px-3 py-1 rounded-full">
              Auto Increíble • Edición Legendaria
            </div>

            <div className="w-8" />
          </div>

          {/* CONTENIDO */}
          <div className="px-6 pb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Carta Escaneada
            </h2>

            {/* MODELO / IMAGEN */}
            <div className="mt-10 mb-10 relative flex justify-center">

              <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>

              <div className="relative z-10 w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white">

                {modelId ? (
                  <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <OrbitControls enableZoom enablePan={false} />
                    <Modelo textureId={modelId} />
                  </Canvas>
                ) : (
                  <div className="w-full h-full relative">
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white text-left">
                      <div className="text-2xl font-bold">{card.name}</div>
                      <div className="text-xs opacity-80">
                        {card.country} • {card.position}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* BOTONES */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button
                onClick={onAdd}
                className="py-6 px-6 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all shadow-lg active:scale-95"
              >
                Agregar
              </button>

              <button
                onClick={() => setShowStats(true)}
                className="py-6 px-6 rounded-2xl bg-white border border-gray-300 font-bold hover:bg-gray-100 transition-all shadow-lg active:scale-95"
              >
                Estadísticas
              </button>
            </div>
          </div>
        </div>
      </div>

      {showStats && (
        <CardStats
          card={card}
          onClose={() => {
            setShowStats(false)
            onStartTrivia()
          }}
        />
      )}
    </>
  )
}
