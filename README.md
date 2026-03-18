# 图片背景移除工具 🖼️

基于 Cloudflare Pages + Workers + Remove.bg API 的图片背景移除工具。

## ✨ 特性

- 🚀 **零服务器成本**: 完全基于 Cloudflare 免费套餐
- 🎨 **简洁美观**: 现代化 UI 设计
- ⚡ **快速响应**: Cloudflare 全球 CDN 加速
- 💾 **无存储**: 图片在内存中处理，保护隐私
- 📱 **响应式**: 支持移动端和桌面端
- 🔒 **安全**: 请求通过 Cloudflare Worker 代理，保护 API Key

## 📦 技术栈

- **前端**: 纯 HTML + CSS + JavaScript（无需框架）
- **后端**: Cloudflare Workers（边缘计算）
- **API**: Remove.bg（背景移除 AI 服务）
- **部署**: Cloudflare Pages

## 🚀 快速开始

### 1. 获取 Remove.bg API Key

1. 访问 [remove.bg](https://www.remove.bg/zh/api)
2. 注册账号并获取免费 API Key
3. 免费账号每月有 50 张免费额度

### 2. 安装 Wrangler CLI

```bash
npm install -g wrangler
```

### 3. 登录 Cloudflare

```bash
wrangler login
```

### 4. 配置 API Key

在项目根目录执行：

```bash
cd bg-remover
wrangler secret put REMOVE_BG_API_KEY
```

然后输入你的 Remove.bg API Key。

### 5. 部署到 Cloudflare Pages

```bash
# 创建 Cloudflare Pages 项目
wrangler pages project create bg-remover

# 部署
wrangler pages deploy .
```

或者使用 Cloudflare Dashboard：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 "Workers & Pages"
3. 点击 "Create application" → "Pages"
4. 选择 "Upload assets" 或连接 Git 仓库
5. 上传项目文件
6. 在 Settings → Functions → Environment variables 中添加 `REMOVE_BG_API_KEY`

## 📁 项目结构

```
bg-remover/
├── index.html                      # 前端页面
├── functions/
│   └── api/
│       ├── _middleware.js          # 路由中间件
│       └── remove-bg.js            # 背景移除 API
├── _routes.json                    # Pages 路由配置
├── wrangler.toml                   # Workers 配置
└── README.md                       # 说明文档
```

## 🎯 使用方法

1. 访问部署后的网站
2. 点击或拖拽上传图片
3. 等待处理（通常 2-5 秒）
4. 查看对比效果
5. 下载透明背景的 PNG 图片

## 🔧 配置说明

### Remove.bg API Key

- **免费额度**: 每月 50 张
- **付费计划**: $0.20/张（批量折扣）
- **申请地址**: https://www.remove.bg/zh/api

### Cloudflare 免费套餐限制

- **Pages**: 每月 500 次构建
- **Workers**: 每天 100,000 次请求
- **带宽**: 无限制

## 💰 成本估算

| 项目 | 免费套餐 |
|------|---------|
| Cloudflare Pages | 免费 |
| Cloudflare Workers | 免费 |
| Remove.bg API | 50 张/月 |

超出免费额度后：
- Remove.bg API: $0.20/张
- Cloudflare Workers Pro: $5/月（1000万请求/月）

## 🛠️ 本地开发

### 使用 Wrangler 本地开发服务器

```bash
wrangler pages dev . --port 8080
```

访问 http://localhost:8080

### 注意事项

- 本地开发时需要配置 API Key
- Functions 在本地可能无法完全模拟生产环境
- 建议直接部署到 Cloudflare 进行测试

## 🔒 安全建议

1. **API Key 保护**
   - 使用 Wrangler Secrets 存储敏感信息
   - 不要将 API Key 提交到 Git
   - 定期轮换 API Key

2. **请求限流**
   - Remove.bg API 有速率限制
   - 建议前端添加防抖和节流

3. **文件验证**
   - 后端验证文件类型和大小
   - 防止恶意文件上传

## 📊 性能优化建议

1. **图片压缩**: 上传前压缩图片（建议 < 2MB）
2. **CDN 缓存**: Cloudflare 自动缓存静态资源
3. **懒加载**: 优化图片加载体验
4. **批量处理**: 如需批量功能，考虑使用队列系统

## 🐛 故障排除

### 问题 1: API Key 无效

```
错误: Remove.bg API Key 无效或已过期
解决: 检查 API Key 是否正确，或重新申请
```

### 问题 2: 额度不足

```
错误: Remove.bg API 额度不足
解决: 升级付费计划或等待下月重置
```

### 问题 3: Workers 请求失败

```
错误: 服务器内部错误
解决: 检查 Cloudflare Workers 日志
```

## 📝 更新日志

### v1.0.0 (2024-01-01)
- ✨ 初始版本发布
- 🎨 现代化 UI 设计
- ⚡ Cloudflare Workers 集成
- 🔒 API Key 安全管理

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

有问题？欢迎提 Issue！

---

**Made with ❤️ using Cloudflare + Remove.bg**
