# AI Background Remover

A Next.js web application that removes backgrounds from images using AI.

## Features

- 🎯 **Easy to use**: Drag and drop interface
- 🚀 **Fast processing**: Powered by Remove.bg API
- 🎨 **Multiple formats**: Supports JPG, PNG, WebP
- 📱 **Responsive design**: Works on all devices
- 💾 **Free to use**: No registration required

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Image Processing**: Remove.bg API
- **Upload**: React Dropzone

## Getting Started

### Prerequisites

- Node.js 18 or later
- Remove.bg API Key (get one from [Remove.bg](https://www.remove.bg/api))

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your Remove.bg API key to `.env.local`:
   ```
   REMOVEBG_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Upload an image by dragging and dropping or clicking to select
2. Click "Remove Background" to process the image
3. Download the result with transparent background

## API

### Remove Background

Endpoint: `POST /api/remove-background`

Request body:
```json
{
  "image": "data:image/jpeg;base64,..."
}
```

Response:
```json
{
  "success": true,
  "result": "data:image/png;base64,...",
  "format": "png"
}
```

## License

MIT License