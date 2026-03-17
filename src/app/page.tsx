'use client'

import { useState, useRef } from 'react'
import ImageUpload from '@/components/ImageUpload'
import ImagePreview from '@/components/ImagePreview'
import Features from '@/components/Features'

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (imageUrl: string) => {
    setOriginalImage(imageUrl)
    setProcessedImage(null)
    setError(null)
  }

  const handleImageProcess = async () => {
    if (!originalImage) return

    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/remove-background', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: originalImage }),
      })

      if (!response.ok) {
        throw new Error('Failed to process image')
      }

      const data = await response.json()
      setProcessedImage(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            AI Background Remover
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Remove backgrounds from images with AI - Free, fast, and easy to use
          </p>
        </div>

        {/* Main content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Upload Your Image
              </h2>
              <ImageUpload onImageUpload={handleImageUpload} />
              
              {originalImage && (
                <div className="mt-6">
                  <button
                    onClick={handleImageProcess}
                    disabled={isProcessing}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                  >
                    {isProcessing ? 'Processing...' : 'Remove Background'}
                  </button>
                </div>
              )}
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Preview
              </h2>
              <ImagePreview 
                originalImage={originalImage}
                processedImage={processedImage}
                isProcessing={isProcessing}
                error={error}
              />
            </div>
          </div>

          {/* Features Section */}
          <Features />
        </div>
      </div>
    </main>
  )
}