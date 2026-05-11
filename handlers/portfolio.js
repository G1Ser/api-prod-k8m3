/**
 * @openapi
 * /portfolio/assets:
 *   get:
 *     summary: 资产获取
 *     tags: [Portfolio]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [Draft, Icon, KOFWarrior, MetalSlugCommander, TopGirl]
 *           example: Icon
 *         description: 资产类型
 *     responses:
 *       200:
 *         description: 成功返回资产列表
 *       400:
 *         description: 缺少必要参数
 *       403:
 *         description: 请求来源不在白名单
 */
