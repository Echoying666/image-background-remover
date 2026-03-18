export async function onRequest(context) {
  const { url } = context.request;
  const { pathname } = new URL(url);

  // 路由到不同的处理函数
  if (pathname === '/api/remove-bg' && context.request.method === 'POST') {
    const removeBgHandler = (await import('./remove-bg.js'));
    return removeBgHandler.onRequestPost(context);
  } else if (pathname === '/api/remove-bg' && context.request.method === 'OPTIONS') {
    const removeBgHandler = (await import('./remove-bg.js'));
    return removeBgHandler.onRequestOptions(context);
  }

  // 404
  return new Response('Not Found', { status: 404 });
}
