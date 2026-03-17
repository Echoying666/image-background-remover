export default function Features() {
  const features = [
    {
      title: '电商产品图片',
      description: '非常适合从产品图片中移除背景。为您的在线商店创建干净、专业的产品照片。',
      icon: '🛍️',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: '设计素材',
      description: '为标志、图形和设计元素创建透明背景。非常适合设计师和内容创作者。',
      icon: '🎨',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: '社交媒体头像',
      description: '从个人资料图片中移除背景，为社交媒体平台创建完美的头像。',
      icon: '👤',
      color: 'bg-green-100 text-green-800'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        适用场景
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
          由先进的AI技术驱动，实现精确的背景移除
        </p>
      </div>
    </div>
  )
}