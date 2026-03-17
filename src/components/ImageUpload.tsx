'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      onImageUpload(imageUrl)
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <div className="text-4xl">📸</div>
        <div>
          <p className="text-lg font-medium text-gray-700">
            {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            or click to select a file
          </p>
        </div>
        <div className="text-sm text-gray-400">
          Supports: JPG, PNG, WebP (Max 10MB)
        </div>
      </div>
    </div>
  )
}