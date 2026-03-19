#!/bin/bash

# 图片背景移除工具 - 增强版部署脚本
# 自动部署到 Cloudflare Pages

set -e

echo "🚀 开始部署图片背景移除工具增强版..."

# 检查 Wrangler CLI 是否已安装
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI 未安装，正在安装..."
    npm install -g wrangler
fi

# 检查是否已登录 Cloudflare
echo "🔍 检查 Cloudflare 登录状态..."
if ! wrangler whoami &> /dev/null; then
    echo "🔐 请先登录 Cloudflare..."
    wrangler login
fi

# 设置项目名称
PROJECT_NAME="bg-remover-enhanced"
echo "📁 项目名称: $PROJECT_NAME"

# 创建 Cloudflare Pages 项目（如果不存在）
echo "🏗️  检查 Cloudflare Pages 项目..."
if ! wrangler pages project list | grep -q "$PROJECT_NAME"; then
    echo "🆕 创建 Cloudflare Pages 项目..."
    wrangler pages project create "$PROJECT_NAME"
fi

# 检查是否配置了 API Key
echo "🔑 检查 Remove.bg API Key 配置..."
if ! wrangler secret list | grep -q "REMOVE_BG_API_KEY"; then
    echo "⚠️  未配置 Remove.bg API Key"
    echo "请运行以下命令配置 API Key："
    echo "wrangler secret put REMOVE_BG_API_KEY"
    echo "然后输入你的 Remove.bg API Key"
    read -p "是否现在配置？(y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        wrangler secret put REMOVE_BG_API_KEY
    else
        echo "❌ 请先配置 API Key 后再部署"
        exit 1
    fi
fi

# 构建项目
echo "🔨 构建项目..."
# 复制增强版文件到主目录
cp index-enhanced.html index.html
cp functions/api/_middleware-enhanced.js functions/api/_middleware.js
cp functions/api/remove-bg-enhanced.js functions/api/remove-bg.js

echo "✅ 项目构建完成"

# 部署到 Cloudflare Pages
echo "🚀 部署到 Cloudflare Pages..."
wrangler pages deploy .

echo "🎉 部署完成！"
echo "🌐 访问地址: https://$PROJECT_NAME.pages.dev"
echo ""
echo "📋 使用说明:"
echo "1. 访问部署后的网站"
echo "2. 使用演示账号登录:"
echo "   - 邮箱: demo@remove.bg"
echo "   - 密码: password123"
echo "3. 选择处理模式（单张/批量）"
echo "4. 上传图片并处理"
echo ""
echo "📚 更多信息请查看 README-ENHANCED.md"