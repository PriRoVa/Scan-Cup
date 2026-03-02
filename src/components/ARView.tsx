import { useEffect, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Modelo from './Modelo'
import jsQR from 'jsqr'
import confetti from 'canvas-confetti'

interface ARViewProps {
  onScan: (cardId: string) => void
  onBack: () => void
}

export function ARView({ onScan, onBack }: ARViewProps) {
  const [modelId, setModelId] = useState<string | null>(null)

  useEffect(() => {
    if (modelId) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF0000', '#008000', '#0000FF']
      })
    }
  }, [modelId])

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef<number>()
  const isActiveRef = useRef(true)
  const missCounter = useRef(0)
  const frameSkip = useRef(0)

  useEffect(() => {
    isActiveRef.current = true

    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    }).then(stream => {

      if (!isActiveRef.current) {
        stream.getTracks().forEach(track => track.stop())
        return
      }

      streamRef.current = stream

      if (!videoRef.current) return
      videoRef.current.srcObject = stream
      videoRef.current.play().catch(e => {
        console.warn("Autoplay was prevented or interrupted:", e);
      })

      const scan = () => {

        if (!isActiveRef.current) return

        frameSkip.current++

        if (frameSkip.current % 3 !== 0) {
          animationRef.current = requestAnimationFrame(scan)
          return
        }

        const video = videoRef.current
        const canvas = canvasRef.current

        if (!video || !canvas || video.videoWidth === 0) {
          animationRef.current = requestAnimationFrame(scan)
          return
        }

        const scale = 0.75
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



          missCounter.current = 0
        } else {
          missCounter.current++
          if (missCounter.current > 15) {
            // No action needed as qrData is removed
          }
        }

        animationRef.current = requestAnimationFrame(scan)
      }

      scan()
    })

    // CLEANUP
    return () => {
      isActiveRef.current = false

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = undefined
      }

      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.srcObject = null
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop()
        })
        streamRef.current = null
      }
    }
  }, [])

  const handleBack = () => {
    isActiveRef.current = false

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = undefined
    }

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.srcObject = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop()
      })
      streamRef.current = null
    }

    onBack()
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />

      <canvas ref={canvasRef} className="hidden" />

      <Canvas className="absolute inset-0 z-20 pointer-events-none">
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        {modelId && (
          <Modelo
            textureId={modelId}
          />
        )}
      </Canvas>

      {/* Scanner Mask Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col">
        {/* Top Mask */}
        <div className="flex-1 bg-black/60 backdrop-blur-[2px]" />

        {/* Center Row with Cutout */}
        <div className="flex h-72 lg:h-96 w-full">
          {/* Left Mask */}
          <div className="flex-1 bg-black/60 backdrop-blur-[2px]" />

          {/* Cutout (Clear center) */}
          <div className="w-72 lg:w-96 relative">
            {/* Corner Indicators */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-wc-gold rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-wc-gold rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-wc-gold rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-wc-gold rounded-br-xl" />

            {/* Scanning Line Animation */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-wc-gold/80 shadow-[0_0_8px_rgba(255,215,0,0.8)] animate-[scan_2.5s_ease-in-out_infinite]" />
          </div>

          {/* Right Mask */}
          <div className="flex-1 bg-black/60 backdrop-blur-[2px]" />
        </div>

        {/* Bottom Mask */}
        <div className="flex-1 bg-black/60 backdrop-blur-[2px] flex items-center justify-center pt-8">
          <span className="text-white/80 font-bold tracking-widest uppercase text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
            Apunta al código de la carta
          </span>
        </div>
      </div>

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
            className="w-20 h-20 bg-white rounded-full border-4 border-wc-gold shadow-[0_0_30px_rgba(255,215,0,0.4)] flex items-center justify-center disabled:opacity-50 disabled:shadow-none transition-all transform hover:scale-105 active:scale-95 text-5xl"
          >
            ⚽
          </button>
        </div>
      </div>
    </div>
  )
}