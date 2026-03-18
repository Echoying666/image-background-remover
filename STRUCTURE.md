# 项目结构说明

```
bg-remover/
│
├── index.html                      # 前端主页面
│   ├── HTML 结构
│   ├── CSS 样式（内嵌）
│   └── JavaScript 逻辑（内嵌）
│
├── functions/                      # Cloudflare Functions 目录
│   └── api/                        # API 路由
│       ├── _middleware.js          # 路由中间件
│       │   └── 处理 /api/* 路由请求
│       │
│       └── remove-bg.js            # 背景移除 API
│           ├── onRequestPost()     # 处理 POST 请求
│           └── onRequestOptions()  # 处理 OPTIONS 预检请求
│
├── _routes.json                    # Cloudflare Pages 路由配置
│   ├── include: ["/*"]             # 包含所有静态文件路由
│   └── exclude: ["/api/*"]        # 排除 API 路由（由 Functions 处理）
│
├── wrangler.toml                   # Wrangler 配置文件
│   ├── name: 项目名称
│   ├── main: Functions 入口文件
│   └── compatibility_date: 兼容日期
│
├── .gitignore                      # Git 忽略文件
│   ├── 环境变量文件
│   ├── 依赖目录
│   ├── IDE 配置
│   └── 临时文件
│
├── deploy.sh                       # 部署脚本
│   ├── 检查环境
│   ├── 配置 API Key
│   └── 部署到 Cloudflare
│
├── README.md                       # 项目说明文档
│   ├── 项目介绍
│   ├── 快速开始
│   ├── 使用方法
│   └── 故障排除
│
└── DEVELOPMENT.md                  # 开发指南
    ├── 本地开发
    ├── 调试技巧
    └── 部署流程
```

## 核心文件说明

### 1. index.html - 前端页面

**功能**:
- 图片上传（点击 + 拖拽）
- 图片预览（原图 vs 处理后）
- 调用 API 处理
- 下载结果图片

**技术要点**:
- 纯 HTML/CSS/JavaScript，无需框架
- 响应式设计，支持移动端
- 使用 FormData 上传图片
- Blob URL 处理图片显示

### 2. functions/api/_middleware.js - 路由中间件

**功能**:
- 路由分发
- 动态导入处理函数
- 404 处理

**路由规则**:
- `POST /api/remove-bg` → remove-bg.js
- `OPTIONS /api/remove-bg` → remove-bg.js
- 其他 → 404

### 3. functions/api/remove-bg.js - 背景移除 API

**功能**:
- 接收图片上传
- 验证文件类型和大小
- 转发到 Remove.bg API
- 返回处理结果

**错误处理**:
- API Key 未配置
- API Key 无效
- API 额度不足
- 请求频率限制
- 服务器错误

### 4. _routes.json - 路由配置

**作用**:
- 告诉 Cloudflare Pages 哪些请求由静态文件处理
- 哪些请求由 Functions 处理

**规则**:
- `/` → index.html
- `/*` → 对应的静态文件
- `/api/*` → Functions

### 5. wrangler.toml - 配置文件

**配置项**:
- `name`: 项目名称
- `main`: Functions 入口文件
- `compatibility_date`: Workers API 兼容日期
- `[vars]`: 环境变量（非敏感信息）

**敏感信息**:
- 使用 `wrangler secret` 命令配置
- 不在 wrangler.toml 中存储

## 请求流程

```
用户上传图片
    ↓
前端 JavaScript
    ↓
POST /api/remove-bg
    ↓
Cloudflare Workers (_middleware.js)
    ↓
路由到 remove-bg.js
    ↓
验证文件类型和大小
    ↓
转发到 Remove.bg API
    ↓
Remove.bg 处理图片
    ↓
返回处理后的图片
    ↓
前端显示结果
    ↓
用户下载图片
```

## 部署流程

```
本地开发
    ↓
测试功能
    ↓
配置 API Key (wrangler secret)
    ↓
部署到 Cloudflare (wrangler pages deploy)
    ↓
配置环境变量（Dashboard）
    ↓
测试线上功能
    ↓
✅ 上线
```

## 数据流

```
上传 → 内存处理 → 返回 → 下载
  ↓
不存储（保护隐私）
```

## 安全措施

1. **API Key 保护**
   - 使用 Wrangler Secrets
   - 不在代码中硬编码
   - 不提交到 Git

2. **文件验证**
   - 类型验证（仅允许图片）
   - 大小限制（最大 10MB）
   - 后端二次验证

3. **CORS 配置**
   - 允许跨域请求
   - 限制方法和头部
   - OPTIONS 预检处理

4. **错误处理**
   - 详细的错误信息
   - 友好的用户提示
   - 日志记录

## 性能优化

1. **边缘计算**: Cloudflare Workers 全球分布
2. **CDN 加速**: 静态资源自动缓存
3. **内存处理**: 不存储用户图片
4. **异步处理**: 非阻塞请求
5. **图片优化**: 限制上传大小
