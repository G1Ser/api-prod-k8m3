import { Env } from '@/types/env';
import { PORTFOLIO_CACHE_CONFIG } from '@/config/providers/portfolio';
import { getCORSHeaders } from '@/utils/cors';
import { createErrorResponse, createSuccessResponse } from '@/utils/response';
import AssetsJSON from '@/json/assets.json';

export const handleAssetsQuery = async (request: Request, env: Env, origin: string) => {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || '';
  if (!type) {
    return createErrorResponse('Missing Parameters', "'type' parameters is required.", 400);
  }
  const cacheKey = `portfolio_assets:${type}`;
  const cacheTtl = PORTFOLIO_CACHE_CONFIG.ASSETS;
  const cacheData = await env.RESUME.get(cacheKey);
  if (cacheData) {
    return createSuccessResponse(cacheData, {
      ...getCORSHeaders(origin),
      'X-Cache': 'HIT',
      'Cache-Control': `public, max-age=${cacheTtl.browser}`,
    });
  }
  const results = AssetsJSON.filter(item => item.type.toLowerCase() === type.toLowerCase());
  const json = JSON.stringify({ status: 200, data: results });
  if (results.length) {
    await env.RESUME.put(cacheKey, json, {
      expirationTtl: cacheTtl.kv,
    });
  }
  return createSuccessResponse(json, {
    ...getCORSHeaders(origin),
    'X-Cache': 'MISS',
    'Cache-Control': `public, max-age=${cacheTtl.browser}`,
  });
};
