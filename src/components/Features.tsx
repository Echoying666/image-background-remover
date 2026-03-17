export default function Features() {
  const features = [
    {
      title: 'E-commerce Product Photos',
      description: 'Perfect for removing backgrounds from product images. Create clean, professional product photos for your online store.',
      icon: '🛍️',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Design Materials',
      description: 'Create transparent backgrounds for logos, graphics, and design elements. Perfect for designers and content creators.',
      icon: '🎨',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Social Media Avatars',
      description: 'Remove backgrounds from profile pictures and create perfect avatars for social media platforms.',
      icon: '👤',
      color: 'bg-green-100 text-green-800'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Perfect For
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center p-6 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center text-2xl mx-auto mb-4`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-500">
          Powered by advanced AI technology for accurate background removal
        </p>
      </div>
    </div>
  )
}