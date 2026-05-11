// 验证是否是chauncey.work下面的网站
export const isAllowedOrigin = (origin: string) => {
  if (!origin) return false;
  const { hostname } = new URL(origin);
  return hostname.endsWith('chauncey.work');
};
// 提取公共的 CORS 头生成函数
export const getCORSHeaders = (origin: string) => {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
};
// 封装CORS请求
export const handleCORS = (origin: string) => {
  return new Response(null, {
    status: 204,
    headers: {
      ...getCORSHeaders(origin),
    },
  });
};
