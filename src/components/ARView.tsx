import { useEffect, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Modelo from './Modelo'
import jsQR from 'jsqr'

interface ARViewProps {
  onScan: (cardId: string) => void
  onBack: () => void
}

export function ARView({ onScan, onBack }: ARViewProps) {
  const [modelId, setModelId] = useState<string | null>(null)
  const [qrData, setQrData] = useState<any>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef<number>()
  const missCounter = useRef(0)
  const frameSkip = useRef(0)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    }).then(stream => {

      streamRef.current = stream

      if (!videoRef.current) return
      videoRef.current.srcObject = stream
      videoRef.current.play()

      const scan = () => {

        frameSkip.current++

        if (frameSkip.current % 3 !== 0) {
            animationRef.current = requestAnimationFrame(scan)
            return
        }

        const video = videoRef.current
        const canvas = canvasRef.current

        if (!video || !canvas || video.videoWidth === 0) {
            animationRef.current = requestAnimationFrame(() => {
                setTimeout(scan, 0) // deja respirar al main thread
            })
          return
        }

        // ESCANEO A RESOLUCIÓN REDUCIDA (MUCHO MÁS RÁPIDO)
        const scale = 0.75 // 0.6 es 400, 1 para qr más pequeños
        const scanWidth = video.videoWidth * scale
        const scanHeight = video.videoHeight * scale

        canvas.width = scanWidth
        canvas.height = scanHeight

        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return

        ctx.drawImage(video, 0, 0, scanWidth, scanHeight)

        const imageData = ctx.getImageData(0, 0, scanWidth, scanHeight)

        const code = jsQR(
          imageData.data,
          scanWidth,
          scanHeight,
          { inversionAttempts: "attemptBoth" }
        )

        if (code) {
          if (!modelId) setModelId(code.data)

          // ESCALAMOS COORDENADAS A RESOLUCIÓN REAL
          const scaleX = video.videoWidth / scanWidth
          const scaleY = video.videoHeight / scanHeight

          const scaledLocation = {
            topLeftCorner: {
              x: code.location.topLeftCorner.x * scaleX,
              y: code.location.topLeftCorner.y * scaleY
            },
            topRightCorner: {
              x: code.location.topRightCorner.x * scaleX,
              y: code.location.topRightCorner.y * scaleY
            },
            bottomRightCorner: {
              x: code.location.bottomRightCorner.x * scaleX,
              y: code.location.bottomRightCorner.y * scaleY
            }
          }

          setQrData(scaledLocation)
          missCounter.current = 0
        } else {
          missCounter.current++
          if (missCounter.current > 15) {
            setQrData(null)
          }
        }

        animationRef.current = requestAnimationFrame(scan)
      }

      scan()
    })

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
        streamRef.current = null
      }
    }
  }, [])

  const handleBack = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    onBack()
  }

return (
  <div className="relative w-full h-screen bg-black overflow-hidden">

    {/* VIDEO */}
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="absolute inset-0 w-full h-full object-cover"
      style={{ transform: 'scaleX(-1)' }}
    />

    <canvas ref={canvasRef} className="hidden" />

    {/* AR 3D */}
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      {modelId && (
        <Modelo
          textureId={modelId}
          qrData={qrData}
        />
      )}
    </Canvas>

    {/* MARCO VISUAL */}
    <div className="absolute inset-0 z-10 pointer-events-none">

      {/* Borde exterior */}
      <div className="absolute inset-4 border-4 border-yellow-400 shadow-[0_0_60px_rgba(255,215,0,0.5)]" />

      {/* Glow interior sutil */}
      <div className="absolute inset-4 rounded-3xl ring-2 ring-white/10" />

      {/* Viñeta oscura suave */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />

    </div>

    {/* BOTONES */}
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6">
      <div className="flex justify-between pointer-events-auto">
        <button
          onClick={handleBack}
          className="bg-white/90 text-green-800 p-3 rounded-full border-2 border-white shadow-lg"
        >
          ✖
        </button>
      </div>

      <div className="flex justify-center pointer-events-auto pb-8">
        <button
          onClick={() => modelId && onScan(modelId)}
          disabled={!modelId}
          className="w-20 h-20 bg-white rounded-full border-4 border-yellow-400 shadow-2xl flex items-center justify-center disabled:opacity-50 text-5xl"
        >
          ⚽
        </button>
      </div>
    </div>
  </div>
)
}
