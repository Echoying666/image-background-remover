/**
 * Cloudflare Worker - Background Removal API Proxy
 * 代理请求到 Remove.bg API
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // 验证 API Key
    if (!env.REMOVE_BG_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Remove.bg API Key 未配置' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 解析表单数据
    const formData = await request.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return new Response(
        JSON.stringify({ error: '未找到图片文件' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 验证文件类型
    const contentType = imageFile.type;
    if (
      !contentType.match(/image\/(jpeg|png|webp)/)
    ) {
      return new Response(
        JSON.stringify({ error: '不支持的图片格式，请使用 JPG、PNG 或 WebP' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 验证文件大小（10MB）
    const maxSize = 10 * 1024 * 1024;
    if (imageFile.size > maxSize) {
      return new Response(
        JSON.stringify({ error: '图片大小不能超过 10MB' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 转发请求到 Remove.bg API
    const removeBgFormData = new FormData();
    removeBgFormData.append('image_file', imageFile);
    removeBgFormData.append('size', 'auto');

    const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': env.REMOVE_BG_API_KEY,
      },
      body: removeBgFormData,
    });

    if (!removeBgResponse.ok) {
      const errorText = await removeBgResponse.text();
      console.error('Remove.bg API Error:', errorText);

      if (removeBgResponse.status === 401) {
        return new Response(
          JSON.stringify({ error: 'Remove.bg API Key 无效或已过期' }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } else if (removeBgResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Remove.bg API 额度不足' }),
          {
            status: 402,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } else if (removeBgResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: '请求过于频繁，请稍后重试' }),
          {
            status: 429,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } else {
        return new Response(
          JSON.stringify({ error: '背景移除失败，请稍后重试' }),
          {
            status: removeBgResponse.status,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // 获取处理后的图片
    const resultBlob = await removeBgResponse.blob();

    // 返回处理结果
    return new Response(resultBlob, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="removed-bg.png"',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('Worker Error:', error);
    return new Response(
      JSON.stringify({ error: '服务器内部错误' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// 处理 OPTIONS 预检请求
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
