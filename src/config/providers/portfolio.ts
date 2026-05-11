import { handleAssetsQuery } from '@/handlers/portfolio';
import { DAY } from '../constants';
const PORTFOLIO_ROUTES_MAP = {
  '/portfolio/assets': handleAssetsQuery,
};
const PORTFOLIO_CACHE_CONFIG = {
  ASSETS: {
    kv: 365 * 68 * DAY,
    browser: 365 * 34 * DAY,
  },
};
export { PORTFOLIO_ROUTES_MAP, PORTFOLIO_CACHE_CONFIG };
