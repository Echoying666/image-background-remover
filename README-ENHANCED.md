# 图片背景移除工具 - 增强版 🚀

基于 Cloudflare Pages + Workers + Remove.bg API 的图片背景移除工具，支持**批量处理**和**用户账户系统**。

## ✨ 新增特性

### 🎯 核心功能
- 🖼️ **单张处理**: 传统的单张图片背景移除
- 📦 **批量处理**: 一次处理多张图片，提高效率
- 👤 **用户系统**: 登录功能和使用限额管理
- 📊 **使用统计**: 实时显示使用情况和剩余次数
- 🎨 **现代化UI**: 支持拖拽上传和响应式设计

### 🔧 技术特性
- ⚡ **快速处理**: Cloudflare Workers 边缘计算
- 🔒 **安全认证**: 用户身份验证和 API Key 保护
- 📱 **移动友好**: 完全响应式设计
- 🎯 **错误处理**: 完善的错误提示和用户反馈
- 💾 **无存储**: 图片在内存中处理，保护隐私

## 📦 技术栈

- **前端**: 纯 HTML + CSS + JavaScript（无需框架）
- **后端**: Cloudflare Workers（边缘计算）
- **API**: Remove.bg（背景移除 AI 服务）
- **部署**: Cloudflare Pages
- **认证**: 简单的用户认证系统

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
cd image-background-remover
wrangler secret put REMOVE_BG_API_KEY
```

然后输入你的 Remove.bg API Key。

### 5. 部署到 Cloudflare Pages

```bash
# 创建 Cloudflare Pages 项目
wrangler pages project create bg-remover-enhanced

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
image-background-remover/
├── index.html                      # 基础前端页面
├── index-enhanced.html             # 增强版前端页面（推荐）
├── functions/
│   ├── api/
│   │   ├── _middleware.js         # 基础路由中间件
│   │   ├── _middleware-enhanced.js # 增强版路由中间件
│   │   ├── remove-bg.js           # 基础背景移除 API
│   │   └── remove-bg-enhanced.js   # 增强版背景移除 API
│   └── _routes.json                # Pages 路由配置
├── _routes.json                    # Pages 路由配置
├── wrangler.toml                   # Workers 配置
├── README.md                       # 基础说明文档
└── README-ENHANCED.md              # 增强版说明文档
```

## 🎯 使用方法

### 基础版本 (index.html)

1. 访问部署后的网站
2. 点击或拖拽上传图片
3. 等待处理（通常 2-5 秒）
4. 查看对比效果
5. 下载透明背景的 PNG 图片

### 增强版本 (index-enhanced.html)

#### 用户登录
1. 访问网站后显示登录界面
2. 使用演示账号登录：
   - 邮箱：`demo@remove.bg`
   - 密码：`password123`
3. 登录后查看用户信息和使用统计

#### 单张处理模式
1. 选择"单张处理"模式
2. 点击或拖拽上传一张图片
3. 等待处理完成
4. 查看结果并下载

#### 批量处理模式
1. 选择"批量处理"模式
2. 点击或拖拽上传多张图片
3. 查看文件列表，可以单独处理或批量处理
4. 批量处理完成后查看所有结果
5. 单独下载或批量下载所有图片

## 🔧 配置说明

### Remove.bg API Key

- **免费额度**: 每月 50 张
- **付费计划**: $0.20/张（批量折扣）
- **申请地址**: https://www.remove.bg/zh/api

### 用户系统配置

#### 演示用户
- **邮箱**: demo@remove.bg
- **密码**: password123
- **套餐**: 免费（50次/月）
- **限额**: 50次/月

#### 生产环境配置
在 `remove-bg-enhanced.js` 中修改用户数据：

```javascript
const users = {
    'user1': {
        id: 'user1',
        name: '用户1',
        email: 'user1@example.com',
        plan: 'free', // 或 'pro'
        monthlyUsage: 0,
        lastReset: new Date().toISOString()
    }
};
```

### 用户套餐设置

#### 免费套餐 (free)
- 每月 50 次处理
- 基础功能
- 单张处理

#### 付费套餐 (pro)
- 每月 500 次处理
- 批量处理
- 优先处理

## 📊 使用统计功能

### 统计信息
- **本月使用**: 当前已使用次数
- **剩余次数**: 剩余可用次数
- **限额**: 根据套餐显示

### 限额管理
- 每月 1 日自动重置免费用户限额
- 付费用户限额更高
- 超出限额时提示升级

## 🚀 批量处理功能

### 支持特性
- **多文件上传**: 一次选择多个图片文件
- **进度显示**: 实时显示处理进度
- **错误处理**: 单独处理失败文件
- **批量下载**: 一键下载所有处理结果

### 使用限制
- 单次最多处理 10 张图片
- 单张图片最大 10MB
- 支持 JPG、PNG、WebP 格式

## 🔒 安全建议

### API Key 保护
1. 使用 Wrangler Secrets 存储敏感信息
2. 不要将 API Key 提交到 Git
3. 定期轮换 API Key

### 用户认证
1. 生产环境应使用真正的数据库
2. 实现密码加密存储
3. 添加会话管理

### 请求限流
- Remove.bg API 有速率限制
- 建议前端添加防抖和节流
- 批量处理添加间隔控制

## 🛠️ 本地开发

### 使用 Wrangler 本地开发服务器

```bash
# 基础版本
wrangler pages dev . --port 8080

# 增强版本
wrangler pages dev . --port 8080
```

访问 http://localhost:8080

### 注意事项
- 本地开发时需要配置 API Key
- Functions 在本地可能无法完全模拟生产环境
- 建议直接部署到 Cloudflare 进行测试

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

有问题？欢迎提 Issue！

---

**Made with ❤️ using Cloudflare + Remove.bg**

**升级版特色**: 批量处理 + 用户系统 + 使用统计 + 现代化UI**