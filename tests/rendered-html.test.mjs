import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("publishes one canonical multilingual sitemap", async () => {
  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const setRecords = JSON.parse(await readFile(new URL("../data/large-top500.json", import.meta.url), "utf8"));
  const expectedStaticPages = 11;
  assert.equal((sitemap.match(/<url>/g) ?? []).length, (setRecords.length + expectedStaticPages) * 3);
  assert.match(sitemap, /<loc>http:\/\/localhost:3000\/en\/<\/loc>/);
  assert.match(sitemap, /hreflang="en" href="http:\/\/localhost:3000\/en\/"/);
  assert.match(sitemap, /hreflang="de" href="http:\/\/localhost:3000\/de\/"/);
  assert.match(sitemap, /hreflang="zh" href="http:\/\/localhost:3000\/zh\/"/);
  assert.match(sitemap, /hreflang="x-default" href="http:\/\/localhost:3000\/en\/"/);
  assert.match(sitemap, /<loc>http:\/\/localhost:3000\/en\/about<\/loc>/);
  assert.match(sitemap, /<loc>http:\/\/localhost:3000\/de\/sources<\/loc>/);
  assert.match(sitemap, /<loc>http:\/\/localhost:3000\/zh\/terms<\/loc>/);
  assert.match(sitemap, /<loc>http:\/\/localhost:3000\/zh\/guides\/how-to-measure-a-display-cabinet<\/loc>/);
  assert.doesNotMatch(sitemap, /vercel\.app/);

  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  assert.match(await robotsResponse.text(), /Sitemap: http:\/\/localhost:3000\/sitemap\.xml/);
});

test("keeps the interface compact while preserving horizontal furniture presets", async () => {
  const stylesheet = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(stylesheet, /\.furniture-preset-list \{[^}]*display: flex;[^}]*overflow-x: auto;/);
  assert.match(stylesheet, /\.furniture-preset \{[^}]*width: 190px;[^}]*max-width: 74%;[^}]*flex: 0 0 190px;/);
  assert.doesNotMatch(stylesheet, /grid-auto-columns/);
  assert.match(stylesheet, /\.hero \{[^}]*grid-template-columns: minmax\(0, \.9fr\) minmax\(0, 1\.1fr\);[^}]*align-items: start;/);
  assert.match(stylesheet, /\.hero-copy \{[^}]*position: sticky;[^}]*top: 96px;/);
  assert.match(stylesheet, /\.hero-copy h1 \{[^}]*font-size: clamp\(3\.2rem, 5\.2vw, 5\.2rem\);/);
  assert.match(stylesheet, /\.set-grid \{[^}]*grid-template-columns: repeat\(4, 1fr\);/);
  assert.match(stylesheet, /@media \(max-width: 900px\) \{[\s\S]*?\.hero-copy \{[^}]*position: static;/);
  assert.match(stylesheet, /\.nav-cta \{[^}]*white-space: nowrap;/);
  assert.match(stylesheet, /@media \(max-width: 680px\) \{[\s\S]*?\.nav-cta \{ display: none; \}/);
});

test("uses a neutral model color and reserves red for no-fit states", async () => {
  const stylesheet = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(stylesheet, /\.fit-cuboid-set \{[^}]*color: rgba\(69,88,105,\.88\);/);
  assert.match(stylesheet, /\.set-swatch \{[^}]*border: 1px solid #52687a;[^}]*rgba\(118,139,158,\.28\);/);
  assert.match(stylesheet, /\.fit-cuboid-set\[data-status="no"\] \.cuboid-face \{[^}]*#b52e18;[^}]*rgba\(220,57,31,\.24\);/);
});

test("server-renders the English large-set homepage", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /Know the footprint before you build/);
  assert.match(html, /bricksfit/);
  assert.doesNotMatch(html, /Set(?:Fit)/);
  assert.match(html, /Will this set fit in your cabinet\?/);
  assert.match(html, /<link rel="icon" href="[^"]*\/favicon\.svg" type="image\/svg\+xml"/);
  assert.match(html, /clear internal dimensions of your cabinet or shelf/);
  assert.match(html, /Proportional cabinet preview/);
  assert.match(html, /Search by set name or number/);
  assert.match(html, /class="set-combobox-selected-image"/);
  assert.match(html, /class="fit-cuboid fit-cuboid-set" data-status="[^"]+" data-orientation="standard"/);
  assert.match(html, /class="cuboid-face cuboid-face-front" data-media="true"/);
  assert.match(html, /src="\/set-images\/10294-1\.jpg"/);
  assert.match(html, /aria-label="3D preview zoom"/);
  assert.match(html, /aria-label="Zoom in"/);
  assert.match(html, /Three-dimensional proportional cabinet and set preview/);
  assert.match(html, /Size comparison/);
  assert.match(html, /Choose how the set faces the cabinet/);
  assert.match(html, /aria-label="Set placement direction"/);
  assert.match(html, /aria-pressed="true">Standard orientation<\/button>/);
  assert.match(html, /Start with a cabinet preset/);
  assert.match(html, /Custom size/);
  assert.match(html, /Published outside size/);
  assert.match(html, /Estimated clear space/);
  assert.match(html, /Published clear space/);
  assert.match(html, /large display case/);
  assert.match(html, /\/furniture-presets\/moduspace-sixth165\.jpg/);
  assert.match(html, /\/furniture-presets\/ikea-billy\.jpg/);
  assert.match(html, /\/furniture-presets\/muji-stacking-shelf\.jpg/);
  assert.equal((html.match(/class="furniture-preset(?: |")/g) ?? []).length, 12);
  assert.ok(html.indexOf("furniture-preset-custom") < html.indexOf("/furniture-presets/ikea-billy.jpg"));
  assert.ok(html.indexOf("/furniture-presets/ikea-billy.jpg") < html.indexOf("/furniture-presets/muji-stacking-shelf.jpg"));
  assert.ok(html.indexOf("/furniture-presets/muji-stacking-shelf.jpg") < html.indexOf("/furniture-presets/moduspace-sixth165.jpg"));
  assert.doesNotMatch(html, /Official product page|href="https:\/\/(?:[^"/]+\.)?(?:ikea|muji|moduspace)\./i);
  assert.match(html, /<dt>433<\/dt><dd>built H\/W\/D records<\/dd>/);
  assert.match(html, /Titanic retail package/);
  assert.match(html, /Measure the cabinet space that really counts/);
  assert.match(html, /href="\/en\/guides\/how-to-measure-a-display-cabinet"/);
  assert.match(html, /alt="Sagrada Família LEGO Set 21065"/);
  assert.match(html, /🇺🇸 English/);
  assert.match(html, /🇩🇪 Deutsch/);
  assert.match(html, /🇨🇳 中文/);
  assert.equal((html.match(/class="header-unit-toggle"/g) ?? []).length, 1);
  assert.match(html, /aria-label="Measurement unit"/);
  assert.match(html, /aria-pressed="true">IN<\/button>/);
  assert.doesNotMatch(html, /class="unit-toggle"/);
  assert.doesNotMatch(html, /2026-07-19/);
  assert.doesNotMatch(html.replaceAll("中文", ""), /[\u4e00-\u9fff]/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("renders the set library in progressive batches", async () => {
  const response = await render("/en/sets");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.equal((html.match(/class="set-card"/g) ?? []).length, 24);
  assert.match(html, /Load more(?:<!-- -->)? \((?:<!-- -->)?24(?:<!-- -->)?\)/);
  assert.doesNotMatch(html, /Top 500|Five hundred/);
  assert.doesNotMatch(html, /2026-07-19/);
});

test("renders a product page with plain built dimensions", async () => {
  const response = await render("/en/sets/10294-titanic-dimensions");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /<h1 class="detail-title">Titanic<\/h1>/);
  assert.match(html, /<title>Titanic 10294 \| bricksfit<\/title>/);
  assert.match(html, /Built H × W × D/);
  assert.match(html, /17\.3(?:<!-- -->)? H × (?:<!-- -->)?6\.3(?:<!-- -->)? W × (?:<!-- -->)?53\.1(?:<!-- -->)? D in/);
  assert.match(html, /alt="Titanic LEGO Set 10294"/);
  assert.match(html, /Will this set fit in your cabinet\?/);
  assert.match(html, /Internal width/);
  assert.doesNotMatch(html, /API field documentation/);
  assert.doesNotMatch(html, /Brickset owners/);
  assert.doesNotMatch(html, /2026-07-19/);
});

test("uses description-derived H/W/D without a visible grade", async () => {
  const response = await render("/en/sets/10316-the-lord-of-the-rings-rivendell-dimensions");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /<h1 class="detail-title">The Lord of the Rings: Rivendell<\/h1>/);
  assert.match(html, /15\.4(?:<!-- -->)? H × (?:<!-- -->)?29\.5(?:<!-- -->)? W × (?:<!-- -->)?19\.7(?:<!-- -->)? D in/);
  assert.match(html, /About the dimensions for The Lord of the Rings: Rivendell/);
  assert.match(html, /Reference reliability: high/);
  assert.match(html, /Will this set fit in your cabinet\?/);
  assert.doesNotMatch(html, />A ·|>B ·|axes unverified/);
});

test("uses completed planning dimensions when API size was missing", async () => {
  const response = await render("/en/sets/10189-taj-mahal-dimensions");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /16\.1(?:<!-- -->)? H × (?:<!-- -->)?20\.1(?:<!-- -->)? W × (?:<!-- -->)?20\.1(?:<!-- -->)? D in/);
  assert.match(html, /Will this set fit in your cabinet\?/);
});

test("does not force multiple models into one fixed size", async () => {
  const response = await render("/en/sets/72153-venusaur-charizard-and-blastoise-dimensions");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /No single fixed size/);
  assert.match(html, /separate models, modules or parts/);
  assert.match(html, /Plan a multi-model product without inventing one size/);
  assert.match(html, /Choose the modules or individual models you actually intend to display together/);
  assert.match(html, /How to measure the cabinet correctly/);
  assert.doesNotMatch(html, /Will this set fit in your cabinet\?/);
  assert.doesNotMatch(html.replaceAll("中文", ""), /[\u4e00-\u9fff]/);
});

test("renders a separately indexable German version", async () => {
  const response = await render("/de/sets/10294-titanic-dimensions");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /<html lang="de"/);
  assert.match(html, /<h1 class="detail-title">Titanic<\/h1>/);
  assert.doesNotMatch(html, /Brickset-Besitzer/);
  assert.match(html, /Passt dieses Set in deinen Schrank\?/);
  assert.match(html, /bricksfit/);
  assert.doesNotMatch(html, /Set(?:Fit)/);
  assert.match(html, /aria-label="Maßeinheit"/);
  assert.match(html, /aria-pressed="true">CM<\/button>/);
  assert.match(html, /44(?:<!-- -->)? H × (?:<!-- -->)?16(?:<!-- -->)? B × (?:<!-- -->)?135(?:<!-- -->)? T cm/);
  assert.match(html, /hrefLang="en"/);
  assert.match(html, /hrefLang="de"/);
  assert.match(html, /rel="canonical" href="http:\/\/localhost(?::3000)?\/de\/sets\/10294-titanic-dimensions"/);
  assert.doesNotMatch(html.replaceAll("中文", ""), /[\u4e00-\u9fff]/);
});

test("renders a separately indexable Simplified Chinese version", async () => {
  const response = await render("/zh/sets/10294-titanic-dimensions");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /<html lang="zh"/);
  assert.match(html, /<h1 class="detail-title">泰坦尼克号<\/h1>/);
  assert.match(html, /<title>泰坦尼克号 10294 \| bricksfit<\/title>/);
  assert.match(html, /alt="泰坦尼克号 LEGO 套装 10294"/);
  assert.doesNotMatch(html, /位 Brickset 拥有者/);
  assert.match(html, /柜子是否能装得下/);
  assert.match(html, /bricksfit/);
  assert.doesNotMatch(html, /Set(?:Fit)/);
  assert.match(html, /aria-label="测量单位"/);
  assert.match(html, /aria-pressed="true">CM<\/button>/);
  assert.match(html, /44(?:<!-- -->)? 高 × (?:<!-- -->)?16(?:<!-- -->)? 宽 × (?:<!-- -->)?135(?:<!-- -->)? 深 cm/);
  assert.match(html, /请输入柜子或书架可用的内部净尺寸/);
  assert.match(html, /内部净宽/);
  assert.match(html, /按比例展示柜内空间/);
  assert.match(html, /按套装名称或编号搜索/);
  assert.match(html, /aria-label="3D 预览缩放"/);
  assert.match(html, /柜子与套装的三维比例预览/);
  assert.match(html, /尺寸对比/);
  assert.match(html, /选择套装朝向/);
  assert.match(html, /aria-label="套装摆放方向"/);
  assert.match(html, /自定义尺寸/);
  assert.match(html, /从柜架预设开始/);
  assert.match(html, /公开外部尺寸/);
  assert.match(html, /预估内部净空/);
  assert.match(html, /公开内部净空/);
  assert.match(html, /大型展示柜/);
  assert.match(html, /最终决定前，请实测组装后的柜体/);
  assert.match(html, /hrefLang="en"/);
  assert.match(html, /hrefLang="de"/);
  assert.match(html, /hrefLang="zh"/);
  assert.match(html, /rel="canonical" href="http:\/\/localhost(?::3000)?\/zh\/sets\/10294-titanic-dimensions"/);
  assert.match(html, /🇨🇳 中文/);
  assert.doesNotMatch(html, /Will this set fit in your cabinet\?|Passt dieses Set in deinen Schrank\?/);
  assert.doesNotMatch(html, /2026-07-19/);
});

test("uses official localized set-name mappings with an English fallback", async () => {
  const nameConfig = JSON.parse(await readFile(new URL("../data/set-localized-names.json", import.meta.url), "utf8"));
  assert.equal(nameConfig.source.provider, "LEGO");
  assert.equal(nameConfig.source.operation, "customerService.getBuildingInstructionsForSet");
  assert.equal(nameConfig.locales.de["31203-1"], "Weltkarte");
  assert.equal(nameConfig.locales.zh["21065-1"], "圣家族大教堂");
  assert.equal(nameConfig.locales.zh["10294-1"], "泰坦尼克号");
  assert.equal(nameConfig.locales.zh["5491-1"], undefined);
  assert.equal(nameConfig.locales.zh["5491-2"], undefined);

  const fallbackResponse = await render("/zh/sets/10189-taj-mahal-dimensions");
  assert.equal(fallbackResponse.status, 200);
  const fallbackHtml = (await fallbackResponse.text()).replaceAll("<!-- -->", "");
  assert.match(fallbackHtml, /<h1 class="detail-title">Taj Mahal<\/h1>/);
});

test("publishes an accurate privacy and advertising status notice", async () => {
  const response = await render("/en/privacy");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /clear cabinet or shelf dimensions you enter and your selected measurement unit are saved in this browser’s local storage/);
  assert.match(html, /does not send those measurements to its server/);
  assert.match(html, /first-party language cookie/);
  assert.match(html, /Vercel Web Analytics and Speed Insights/);
  assert.match(html, /data points are anonymous/);
  assert.match(html, /Product analytics events and analytics persistence are disabled by default/);
  assert.match(html, /disables session recording, surveys, exception capture, heatmaps and performance capture/);
  assert.match(html, /does not currently load Google AdSense code/);
  assert.match(html, /Google-certified consent management platform/);
  assert.match(html, /existing PostHog analytics choice is not a substitute for an advertising CMP/);
});

test("publishes localized trust and legal pages", async () => {
  const expectations = [
    ["/en/about", /Display planning built around one practical question/, /The site does not currently load Google AdSense code/],
    ["/de/contact", /Ein Maßfehler oder ein Rechteproblem gefunden/, /Korrekturanfrage auf GitHub öffnen/],
    ["/zh/sources", /数据和图片来自哪里/, /仅注明来源并不会自动取得许可/],
    ["/en/terms", /Use bricksfit as a planning reference/, /No fit or accuracy warranty/],
  ];

  for (const [path, title, detail] of expectations) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = (await response.text()).replaceAll("<!-- -->", "");
    assert.match(html, title);
    assert.match(html, detail);
    assert.match(html, /rel="canonical"/);
  }
});

test("publishes the original cabinet measuring guide in every locale", async () => {
  const expectations = [
    ["/en/guides/how-to-measure-a-display-cabinet", /How to measure a cabinet for a built brick set/, /Record five things/],
    ["/de/guides/how-to-measure-a-display-cabinet", /So misst du einen Schrank für ein gebautes Klemmbausteinset/, /Fünf Werte notieren/],
    ["/zh/guides/how-to-measure-a-display-cabinet", /如何为积木拼装成品测量柜体空间/, /记录五项数据/],
  ];

  for (const [path, title, aside] of expectations) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = (await response.text()).replaceAll("<!-- -->", "");
    assert.match(html, title);
    assert.match(html, aside);
    assert.match(html, /5 cm/);
    assert.match(html, /hrefLang="x-default"/);
  }
});

test("turns the legacy BILLY guide into a selectable cabinet fit table", async () => {
  const response = await render("/zh/guides/sets-for-ikea-billy");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /哪些大型套装能放进你的柜架尺寸/);
  assert.match(html, /选择柜架尺寸/);
  assert.match(html, /<option value="custom">自定义尺寸<\/option>/);
  assert.match(html, /IKEA · BILLY/);
  assert.match(html, /MUJI · Stacking Shelf/);
  assert.match(html, /Moduspace · SIXTH165/);
  assert.match(html, /class="guide-set-thumbnail"/);
  assert.match(html, /src="\/set-images\/21065-1\.jpg"/);
  assert.match(html, /适配结果/);
  assert.doesNotMatch(html, /href="https:\/\/(?:[^"/]+\.)?(?:ikea|muji|moduspace)\./i);
});

test("adds set thumbnails to the shallow cabinet guide", async () => {
  const response = await render("/zh/guides/large-brick-sets-under-30cm-deep");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /class="guide-set-thumbnail"/);
  assert.match(html, /LEGO 套装 40179/);
  assert.match(html, /src="\/set-images\/40179-1\.jpg"/);
});
