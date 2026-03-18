# 本地开发指南

## 快速测试

### 方法 1: 直接打开 HTML 文件

最简单的方式，直接在浏览器中打开 `index.html`：

```bash
# Linux/Mac
open index.html

# Windows
start index.html
```

**注意**: 这种方式无法测试 API 功能，需要完整的后端环境。

### 方法 2: 使用 Python HTTP 服务器

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然后访问 http://localhost:8000

### 方法 3: 使用 Node.js http-server

```bash
# 全局安装
npm install -g http-server

# 启动服务
http-server -p 8000
```

然后访问 http://localhost:8000

### 方法 4: 使用 Wrangler（推荐用于测试 Functions）

```bash
# 安装 wrangler（如果还没安装）
npm install -g wrangler

# 登录 Cloudflare（如果还没登录）
wrangler login

# 配置 API Key
wrangler secret put REMOVE_BG_API_KEY

# 启动本地开发服务器
wrangler pages dev . --port 8000
```

访问 http://localhost:8000

**注意**: Functions 在本地开发模式下可能有限制，建议直接部署到 Cloudflare 进行完整测试。

## 配置 Remove.bg API Key

### 获取免费 API Key

1. 访问 https://www.remove.bg/zh/api
2. 点击 "Get API Key free"
3. 注册账号（支持邮箱或 Google 账号）
4. 获取 API Key（类似: `abcdefgh1234567890`）

### 配置到 Wrangler

```bash
# 在项目根目录执行
wrangler secret put REMOVE_BG_API_KEY

# 输入你的 API Key 并回车
```

### 测试 API Key

使用 curl 测试：

```bash
curl -X POST https://api.remove.bg/v1.0/removebg \
  -H "X-Api-Key: YOUR_API_KEY" \
  -F "image_file=@test.jpg" \
  -o result.png
```

## 本地开发环境配置

### 使用环境变量文件（仅用于开发）

创建 `.dev.vars` 文件（不要提交到 Git）：

```bash
# .dev.vars
REMOVE_BG_API_KEY=your_api_key_here
```

然后启动开发服务器：

```bash
wrangler pages dev . --port 8000 --env development
```

## 调试技巧

### 1. 查看浏览器控制台

- 按 F12 打开开发者工具
- 查看 Console 标签页的错误信息
- 查看 Network 标签页的请求详情

### 2. 查看 Wrangler 日志

```bash
# 实时查看日志
wrangler tail
```

### 3. 测试 API 端点

使用 curl 测试本地 API：

```bash
# 测试 OPTIONS 预检请求
curl -X OPTIONS http://localhost:8000/api/remove-bg \
  -H "Origin: http://localhost:8000" \
  -v

# 测试 POST 请求
curl -X POST http://localhost:8000/api/remove-bg \
  -F "image_file=@test.jpg" \
  -o result.png \
  -v
```

## 常见问题

### Q: 本地开发时 API 请求失败

A: 检查以下几点：
1. API Key 是否正确配置
2. Wrangler 开发服务器是否正常运行
3. 查看浏览器控制台和终端日志

### Q: Functions 在本地无法正常工作

A: Wrangler 本地开发模式对 Functions 的支持有限，建议：
1. 部署到 Cloudflare 进行完整测试
2. 使用 Cloudflare Dashboard 查看 Workers 日志

### Q: 如何查看 Cloudflare Workers 日志

A: 访问 https://dash.cloudflare.com/ → Workers & Pages → 选择项目 → Logs

## 部署到生产环境

完成本地测试后，使用部署脚本：

```bash
# 在项目根目录执行
./deploy.sh
```

或手动部署：

```bash
# 部署到 Cloudflare Pages
wrangler pages deploy .

# 或使用 Git 连接
git push origin main
```

## 开发建议

1. **代码规范**: 保持代码整洁，添加适当的注释
2. **错误处理**: 添加友好的错误提示
3. **性能优化**: 压缩资源，优化加载速度
4. **安全检查**: 验证用户输入，防止攻击
5. **测试覆盖**: 测试各种边界情况

## 相关资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [Remove.bg API 文档](https://www.remove.bg/zh/api)
