# 🚀 快速开始指南

## 5分钟部署图片背景移除工具

### 步骤 1: 准备工作

```bash
# 1. 安装 Wrangler CLI
npm install -g wrangler

# 2. 登录 Cloudflare
wrangler login

# 3. 进入项目目录
cd image-background-remover
```

### 步骤 2: 获取 API Key

1. 访问 [remove.bg](https://www.remove.bg/zh/api)
2. 注册账号并获取免费 API Key
3. 配置 API Key：

```bash
wrangler secret put REMOVE_BG_API_KEY
# 输入你的 API Key
```

### 步骤 3: 一键部署

```bash
# 使用增强版本（推荐）
./deploy-enhanced.sh

# 或手动部署
wrangler pages deploy .
```

### 步骤 4: 使用工具

1. 访问部署后的网站
2. 使用演示账号登录：
   - 邮箱: `demo@remove.bg`
   - 密码: `password123`
3. 选择处理模式（单张/批量）
4. 上传图片并处理

## 🎯 功能特性

### 基础版本 (`index.html`)
- 单张图片处理
- 拖拽上传
- 实时预览
- PNG 下载

### 增强版本 (`index-enhanced.html`)
- ✅ **批量处理**: 一次处理多张图片
- ✅ **用户系统**: 登录和使用统计
- ✅ **进度显示**: 实时处理进度
- ✅ **错误处理**: 完善的错误提示
- ✅ **响应式设计**: 完美适配移动端

## 📱 使用演示

### 单张处理
1. 选择"单张处理"模式
2. 拖拽或点击上传图片
3. 等待处理完成
4. 查看对比效果并下载

### 批量处理
1. 选择"批量处理"模式
2. 上传多张图片
3. 点击"批量处理"
4. 查看所有结果并下载

## 🔧 常见问题

### Q: Remove.bg API Key 如何获取？
A: 访问 [remove.bg](https://www.remove.bg/zh/api) 注册并获取免费 Key

### Q: 免费额度是多少？
A: 每月 50 张免费图片，超出后 $0.20/张

### Q: 如何升级到付费版？
A: 在 remove.bg 官网升级付费计划，限额提升至 500次/月

### Q: 支持哪些图片格式？
A: JPG、PNG、WebP，最大 10MB

## 🎉 完成！

现在你拥有了一个功能完整的图片背景移除网站！

**访问地址**: https://你的项目名称.pages.dev

**🌟 享受专业的 AI 背景移除服务！**