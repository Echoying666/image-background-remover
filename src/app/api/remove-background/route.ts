import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(image.split(',')[1], 'base64')

    // Create blob from buffer
    const blob = new Blob([imageBuffer], { type: 'image/jpeg' })

    // Call Remove.bg API
    const formData = new FormData()
    formData.append('image', blob, 'input.jpg')
    formData.append('size', 'auto')
    formData.append('format', 'png')

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.REMOVEBG_API_KEY || '',
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Remove.bg API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to remove background' },
        { status: 500 }
      )
    }

    const resultBuffer = await response.buffer()
    
    // Convert to base64
    const resultBase64 = `data:image/png;base64,${resultBuffer.toString('base64')}`

    return NextResponse.json({
      success: true,
      result: resultBase64,
      format: 'png'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}