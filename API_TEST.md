# Remove.bg API 测试

## 环境变量设置
确保在 `.env.local` 文件中设置：
```
REMOVEBG_API_KEY=W1yGMRp7dfMAss8mvzdp5cSa
```

## API 端点
- URL: `/api/remove-background`
- 方法: POST
- Content-Type: `application/json`

## 请求格式
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

## 响应格式
成功：
```json
{
  "success": true,
  "result": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "format": "png",
  "size": 12345
}
```

错误：
```json
{
  "error": "错误信息",
  "details": "详细错误信息"
}
```

## 测试步骤
1. 启动开发服务器：`npm run dev`
2. 使用 curl 或 Postman 测试 API
3. 检查控制台日志以排查问题

## 已修复的问题
1. ✅ 环境变量正确读取和验证
2. ✅ base64 数据格式验证和错误处理
3. ✅ 使用 Remove.bg API 的正确格式（image_file_b64）
4. ✅ 详细的错误日志和状态码处理
5. ✅ 响应数据大小验证
6. ✅ 所有依赖已正确安装