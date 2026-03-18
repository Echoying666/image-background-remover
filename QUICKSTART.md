# 🚀 快速入门指南

## 5 分钟部署你的图片背景移除工具

### 第一步：获取 API Key（2 分钟）

1. 访问 https://www.remove.bg/zh/api
2. 点击 "Get API Key free"
3. 注册账号并获取免费 API Key（每月 50 张免费额度）

### 第二步：安装工具（1 分钟）

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login
```

### 第三步：配置并部署（2 分钟）

```bash
# 进入项目目录
cd bg-remover

# 配置 API Key（粘贴第一步获取的 Key）
wrangler secret put REMOVE_BG_API_KEY

# 一键部署
./deploy.sh
```

或者手动部署：

```bash
wrangler pages deploy .
```

### 第四步：测试（1 分钟）

1. 访问 Cloudflare Dashboard: https://dash.cloudflare.com/
2. 进入 Workers & Pages → bg-remover
3. 获取你的网站 URL
4. 上传测试图片，查看效果

## 🎯 功能验证

### ✅ 基础功能测试

- [ ] 打开网站，页面正常显示
- [ ] 点击上传区域，可以选择图片
- [ ] 拖拽图片到上传区域，可以上传
- [ ] 上传后显示处理进度
- [ ] 处理完成后显示对比效果
- [ ] 点击下载按钮，可以下载图片
- [ ] 点击重新上传，可以清空并重新开始

### 🔧 边界测试

- [ ] 上传 JPG 图片 - 正常处理
- [ ] 上传 PNG 图片 - 正常处理
- [ ] 上传 WebP 图片 - 正常处理
- [ ] 上传非图片文件 - 显示错误提示
- [ ] 上传超过 10MB 的图片 - 显示错误提示
- [ ] 网络断开时 - 显示友好错误提示

## 📱 移动端测试

在手机浏览器中测试：

- [ ] 页面自适应显示
- [ ] 触摸上传功能正常
- [ ] 图片可以正常下载
- [ ] 交互体验流畅

## 🔍 常见问题快速解决

### 问题：API Key 无效

**错误信息**: `Remove.bg API Key 无效或已过期`

**解决方案**:
1. 检查 API Key 是否复制正确
2. 重新访问 https://www.remove.bg/zh/api 获取新 Key
3. 更新配置: `wrangler secret put REMOVE_BG_API_KEY`

### 问题：额度不足

**错误信息**: `Remove.bg API 额度不足`

**解决方案**:
1. 查看免费额度是否用完
2. 升级付费计划: https://www.remove.bg/zh/pricing
3. 等待下月额度重置

### 问题：部署失败

**错误信息**: `Error: Project already exists`

**解决方案**:
```bash
# 直接部署，不需要重新创建项目
wrangler pages deploy .
```

### 问题：Functions 不工作

**解决方案**:
1. 检查 `_routes.json` 是否正确
2. 检查 `functions/api/` 目录结构
3. 查看 Cloudflare Dashboard 中的 Functions 日志

## 💡 使用技巧

### 1. 最佳上传图片格式

- **推荐**: PNG（质量好）
- **也可以**: JPG（文件小）
- **不推荐**: WebP（兼容性稍差）

### 2. 图片尺寸建议

- **最小**: 500x500 像素
- **推荐**: 1000x1000 - 2000x2000 像素
- **最大**: 4000x4000 像素

### 3. 文件大小控制

- **最佳**: 1-2 MB
- **最大**: 10 MB
- **建议**: 上传前压缩图片

## 📊 成本估算

### 免费方案（推荐测试使用）

| 项目 | 价格 | 数量 |
|------|------|------|
| Cloudflare Pages | 免费 | 无限 |
| Cloudflare Workers | 免费 | 100,000 请求/天 |
| Remove.bg API | 免费 | 50 张/月 |

**总计**: $0/月

### 付费方案（生产环境）

| 项目 | 价格 | 说明 |
|------|------|------|
| Remove.bg API | $0.20/张 | 批量折扣 |
| Workers Pro | $5/月 | 1000万请求/月 |

**示例**: 1000 张/月 = $200（Remove.bg）+ $5（Workers）

## 🔗 有用的链接

- [Cloudflare Dashboard](https://dash.cloudflare.com/)
- [Remove.bg API 文档](https://www.remove.bg/zh/api)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)

## 📞 需要帮助？

遇到问题？

1. 查看 [README.md](./README.md) - 完整文档
2. 查看 [DEVELOPMENT.md](./DEVELOPMENT.md) - 开发指南
3. 查看 [STRUCTURE.md](./STRUCTURE.md) - 项目结构
4. 在 GitHub 提交 Issue

## 🎉 恭喜！

如果你已经完成了以上步骤，恭喜你成功部署了你的图片背景移除工具！

**下一步建议**:
- 自定义页面样式
- 添加更多功能（批量处理、历史记录等）
- 优化用户体验
- 分享给朋友使用

---

**Made with ❤️ using Cloudflare + Remove.bg**
