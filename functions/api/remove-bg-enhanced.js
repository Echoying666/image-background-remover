/**
 * Cloudflare Worker - Enhanced Background Removal API
 * 支持批量处理和用户认证
 */

// 用户数据存储（演示用，生产环境应使用数据库）
const users = {
    'demo': {
        id: 'demo',
        name: '演示用户',
        email: 'demo@remove.bg',
        plan: 'free',
        monthlyUsage: 0,
        lastReset: new Date().toISOString()
    }
};

// 演示用户认证
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
        const userId = formData.get('userId') || 'demo';

        // 验证用户
        const user = users[userId];
        if (!user) {
            return new Response(
                JSON.stringify({ error: '用户不存在' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // 检查使用限额
        if (user.monthlyUsage >= (user.plan === 'free' ? 50 : 500)) {
            return new Response(
                JSON.stringify({ error: user.plan === 'free' ? '本月免费额度已用完，请升级付费计划或等待下月重置' : '使用限额已用完' }),
                {
                    status: 402,
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

        // 更新用户使用统计
        user.monthlyUsage++;

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

// 批量处理 API
export async function onRequestBatch(context) {
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

        // 解析 JSON 数据
        const data = await request.json();
        const { files, userId } = data;
        const user = users[userId || 'demo'];

        if (!user) {
            return new Response(
                JSON.stringify({ error: '用户不存在' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // 检查使用限额
        const requiredQuota = files.length;
        const availableQuota = (user.plan === 'free' ? 50 : 500) - user.monthlyUsage;
        
        if (requiredQuota > availableQuota) {
            return new Response(
                JSON.stringify({ 
                    error: user.plan === 'free' 
                        ? `免费额度不足。需要 ${requiredQuota} 次，剩余 ${availableQuota} 次。请升级付费计划或等待下月重置。`
                        : `使用限额不足。需要 ${requiredQuota} 次，剩余 ${availableQuota} 次。`
                }),
                {
                    status: 402,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const results = [];
        const errors = [];

        // 处理每个文件
        for (let i = 0; i < files.length; i++) {
            try {
                const fileData = files[i];
                const base64Data = fileData.data.replace(/^data:image\/[a-z]+;base64,/, '');
                const imageBlob = base64ToBlob(base64Data, fileData.type);

                // 验证文件
                if (!imageBlob.type.match(/image\/(jpeg|png|webp)/)) {
                    errors.push({
                        index: i,
                        filename: fileData.name,
                        error: '不支持的图片格式'
                    });
                    continue;
                }

                if (imageBlob.size > 10 * 1024 * 1024) {
                    errors.push({
                        index: i,
                        filename: fileData.name,
                        error: '图片大小超过 10MB'
                    });
                    continue;
                }

                // 调用 Remove.bg API
                const removeBgFormData = new FormData();
                removeBgFormData.append('image_file', imageBlob);
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
                    errors.push({
                        index: i,
                        filename: fileData.name,
                        error: '处理失败'
                    });
                    continue;
                }

                const resultBlob = await removeBgResponse.blob();
                const base64Result = blobToBase64(resultBlob);

                results.push({
                    index: i,
                    filename: fileData.name,
                    success: true,
                    data: base64Result,
                    size: resultBlob.size
                });

                // 更新用户统计
                user.monthlyUsage++;

            } catch (error) {
                console.error('Error processing file:', error);
                errors.push({
                    index: i,
                    filename: files[i].name,
                    error: '处理失败'
                });
            }
        }

        return new Response(
            JSON.stringify({
                success: true,
                results: results,
                errors: errors,
                totalProcessed: results.length,
                totalErrors: errors.length,
                userUsage: user.monthlyUsage
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );

    } catch (error) {
        console.error('Batch Worker Error:', error);
        return new Response(
            JSON.stringify({ error: '批量处理失败，请稍后重试' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}

// 用户认证 API
export async function onRequestAuth(context) {
    try {
        const { request } = context;
        const { method } = request;

        if (method === 'POST') {
            const data = await request.json();
            const { email, password } = data;

            // 演示登录逻辑
            if (email === 'demo@remove.bg' && password === 'password123') {
                const user = users['demo'];
                return new Response(
                    JSON.stringify({
                        success: true,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            plan: user.plan,
                            monthlyUsage: user.monthlyUsage,
                            quota: user.plan === 'free' ? 50 : 500
                        }
                    }),
                    {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            } else {
                return new Response(
                    JSON.stringify({ error: '邮箱或密码错误' }),
                    {
                        status: 401,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }
        } else if (method === 'GET') {
            // 获取当前用户信息
            const userId = request.headers.get('X-User-Id') || 'demo';
            const user = users[userId];

            if (user) {
                return new Response(
                    JSON.stringify({
                        success: true,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            plan: user.plan,
                            monthlyUsage: user.monthlyUsage,
                            quota: user.plan === 'free' ? 50 : 500,
                            remaining: (user.plan === 'free' ? 50 : 500) - user.monthlyUsage
                        }
                    }),
                    {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            } else {
                return new Response(
                    JSON.stringify({ error: '用户不存在' }),
                    {
                        status: 404,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }
        }

        return new Response('Method Not Allowed', { status: 405 });

    } catch (error) {
        console.error('Auth Worker Error:', error);
        return new Response(
            JSON.stringify({ error: '认证失败，请稍后重试' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}

// 工具函数：Base64 转 Blob
function base64ToBlob(base64Data, contentType) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
}

// 工具函数：Blob 转 Base64
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// 处理 OPTIONS 预检请求
export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}