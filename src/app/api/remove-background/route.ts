import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('=== Remove.bg API Processing Started ===')
    
    // Check environment variable
    const apiKey = process.env.REMOVEBG_API_KEY
    console.log('API Key check:', apiKey ? 'Key found' : 'Key missing')
    
    if (!apiKey) {
      console.error('REMOVEBG_API_KEY is not set in environment variables')
      return NextResponse.json(
        { error: 'Server configuration error: API key not configured' },
        { status: 500 }
      )
    }

    const { image } = await request.json()
    console.log('Request received, image data type:', typeof image)

    if (!image) {
      console.error('No image data provided in request')
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    // Validate base64 format
    if (!image.startsWith('data:image/') || !image.includes('base64,')) {
      console.error('Invalid base64 image format:', image.substring(0, 100))
      return NextResponse.json(
        { error: 'Invalid image format. Expected base64 data URL.' },
        { status: 400 }
      )
    }

    try {
      // Extract base64 data and convert to buffer
      const base64Data = image.split(',')[1]
      console.log('Base64 data length:', base64Data.length)
      
      const imageBuffer = Buffer.from(base64Data, 'base64')
      console.log('Image buffer size:', imageBuffer.length, 'bytes')

      // Create blob from buffer
      const blob = new Blob([imageBuffer], { type: 'image/jpeg' })
      console.log('Blob created successfully')

      // Call Remove.bg API using base64 format (more reliable)
      const formData = new FormData()
      formData.append('image_file_b64', base64Data)
      formData.append('size', 'auto')
      formData.append('format', 'png')
      formData.append('type', 'auto')
      
      console.log('Sending request to Remove.bg API...')
      
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: formData,
      })

      console.log('Remove.bg API response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Remove.bg API error details:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        })
        
        let errorMessage = 'Failed to remove background'
        if (response.status === 401) {
          errorMessage = 'Invalid API key'
        } else if (response.status === 413) {
          errorMessage = 'Image too large'
        } else if (response.status === 429) {
          errorMessage = 'API rate limit exceeded'
        }
        
        return NextResponse.json(
          { error: errorMessage, details: errorText },
          { status: response.status === 401 ? 401 : 500 }
        )
      }

      const resultBuffer = await response.buffer()
      console.log('Response buffer size:', resultBuffer.length, 'bytes')
      
      // Convert to base64
      const resultBase64 = `data:image/png;base64,${resultBuffer.toString('base64')}`
      console.log('Result base64 length:', resultBase64.length)

      console.log('=== Remove.bg API Processing Completed Successfully ===')

      return NextResponse.json({
        success: true,
        result: resultBase64,
        format: 'png',
        size: resultBuffer.length
      })

    } catch (conversionError) {
      console.error('Image processing error:', conversionError)
      return NextResponse.json(
        { error: 'Failed to process image data', details: conversionError.message },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('=== API Error ===', {
      error: error,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}