export async function onRequest(context) {
  const { url, method } = context.request;
  const { pathname } = new URL(url);

  // 路由到不同的处理函数
  if (pathname === '/api/remove-bg' && method === 'POST') {
    const removeBgHandler = (await import('./remove-bg-enhanced.js'));
    return removeBgHandler.onRequestPost(context);
  } else if (pathname === '/api/remove-bg' && method === 'OPTIONS') {
    const removeBgHandler = (await import('./remove-bg-enhanced.js'));
    return removeBgHandler.onRequestOptions(context);
  } else if (pathname === '/api/batch' && method === 'POST') {
    const removeBgHandler = (await import('./remove-bg-enhanced.js'));
    return removeBgHandler.onRequestBatch(context);
  } else if (pathname === '/api/auth' && method === 'POST') {
    const authHandler = (await import('./remove-bg-enhanced.js'));
    return authHandler.onRequestAuth(context);
  } else if (pathname === '/api/auth' && method === 'GET') {
    const authHandler = (await import('./remove-bg-enhanced.js'));
    return authHandler.onRequestAuth(context);
  } else if (pathname === '/api/auth' && method === 'OPTIONS') {
    const authHandler = (await import('./remove-bg-enhanced.js'));
    return authHandler.onRequestOptions(context);
  }

  // 404
  return new Response('Not Found', { status: 404 });
}