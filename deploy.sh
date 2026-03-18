#!/bin/bash

# 图片背景移除工具 - 快速部署脚本
# 使用前请确保已安装 wrangler CLI: npm install -g wrangler

set -e

echo "🚀 开始部署图片背景移除工具..."
echo ""

# 检查是否安装了 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ 未安装 wrangler CLI"
    echo "请运行: npm install -g wrangler"
    exit 1
fi

# 检查是否已登录
if ! wrangler whoami &> /dev/null; then
    echo "📝 请先登录 Cloudflare..."
    wrangler login
fi

echo "✅ Wrangler 已安装并登录"
echo ""

# 配置 API Key
echo "🔑 配置 Remove.bg API Key..."
echo "请访问 https://www.remove.bg/zh/api 获取免费 API Key"
echo ""
wrangler secret put REMOVE_BG_API_KEY

echo ""
echo "✅ API Key 配置完成"
echo ""

# 询问是否创建 Pages 项目
read -p "是否创建新的 Cloudflare Pages 项目? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "📦 创建 Cloudflare Pages 项目..."
    wrangler pages project create bg-remover --production-branch=main
fi

echo ""
echo "🚀 部署到 Cloudflare Pages..."
wrangler pages deploy .

echo ""
echo "✅ 部署完成！"
echo ""
echo "📝 下一步:"
echo "1. 访问 Cloudflare Dashboard: https://dash.cloudflare.com/"
echo "2. 进入 Workers & Pages → bg-remover"
echo "3. 检查部署状态"
echo "4. 访问你的网站并测试功能"
echo ""
echo "🎉 恭喜！你的图片背景移除工具已上线！"
