interface ImagePreviewProps {
  originalImage: string | null
  processedImage: string | null
  isProcessing: boolean
  error: string | null
}

export default function ImagePreview({
  originalImage,
  processedImage,
  isProcessing,
  error
}: ImagePreviewProps) {
  if (error) {
    return (
      <div className="text-center">
        <div className="text-red-500 text-lg mb-4">❌ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Try again
        </button>
      </div>
    )
  }

  if (!originalImage) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">🖼️</div>
          <p>Upload an image to see preview</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Original Image */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Original</h3>
        <div className="border rounded-lg overflow-hidden">
          <img
            src={originalImage}
            alt="Original"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Removing background...</p>
        </div>
      )}

      {/* Processed Image */}
      {processedImage && !isProcessing && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Result</h3>
          <div className="border rounded-lg overflow-hidden mb-4">
            <img
              src={processedImage}
              alt="Processed"
              className="w-full h-48 object-cover"
            />
          </div>
          
          {/* Download Button */}
          <a
            href={processedImage}
            download="background-removed.png"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Result
          </a>
        </div>
      )}
    </div>
  )
}