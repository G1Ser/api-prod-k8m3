import swaggerJsdoc from "swagger-jsdoc";
import { writeFileSync, mkdirSync, copyFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "后端 API",
      version: "1.0.0",
      description: "我的后端API接口文档",
    },
    servers: [
      {
        url: "https://wt-prod-k8m3.chauncey.work",
        description: "生产环境",
      },
    ],
    tags: [
      { name: "IP", description: "IP 地理定位" },
      { name: "Geo", description: "地理编码" },
      { name: "Amap", description: "高德地图 API（地理编码、国内天气）" },
      { name: "Bmap", description: "百度地图 API（全国天气）" },
      {
        name: "QWeather",
        description:
          "和风天气 API（全国实况、预报、指数、天文、预警、空气质量）",
      },
      {
        name: "OpenWeather",
        description: "OpenWeather API（全国天气、预报、空气质量、地图瓦片）",
      },
      {
        name: "Portfolio",
        description: "资产项目 API（资产数据获取）",
      },
    ],
  },
  apis: [join(__dirname, "../handlers/*.js")],
};

const spec = swaggerJsdoc(options);

// 生成本地预览用的静态 HTML（spec 内嵌，直接用浏览器打开）
const docsDir = join(__dirname, "../docs");
mkdirSync(docsDir, { recursive: true });
copyFileSync(
  join(__dirname, "../public/favicon.ico"),
  join(docsDir, "favicon.ico"),
);

const htmlOutput = `<!doctype html>
<html>
  <head>
    <title>后端 API 文档</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="./favicon.ico" />
  </head>
  <body>
    <script id="api-reference" type="application/json">
${JSON.stringify(spec, null, 2)}
    </script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  </body>
</html>`;

writeFileSync(join(docsDir, "index.html"), htmlOutput);
