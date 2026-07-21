import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the English large-set homepage", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /Know the footprint before you build/);
  assert.match(html, /bricksfit/);
  assert.doesNotMatch(html, /Set(?:Fit)/);
  assert.match(html, /Will this set fit in your cabinet\?/);
  assert.match(html, /clear internal dimensions of your cabinet or shelf/);
  assert.match(html, /Proportional cabinet preview/);
  assert.match(html, /Three-dimensional proportional cabinet and set preview/);
  assert.match(html, /Size comparison/);
  assert.match(html, /<dt>433<\/dt><dd>built H\/W\/D records<\/dd>/);
  assert.match(html, /Titanic retail package/);
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
  assert.match(html, /<h1 class="detail-title">Titanic<\/h1>/);
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
  assert.match(html, /柜子与套装的三维比例预览/);
  assert.match(html, /尺寸对比/);
  assert.match(html, /hrefLang="en"/);
  assert.match(html, /hrefLang="de"/);
  assert.match(html, /hrefLang="zh"/);
  assert.match(html, /rel="canonical" href="http:\/\/localhost(?::3000)?\/zh\/sets\/10294-titanic-dimensions"/);
  assert.match(html, /🇨🇳 中文/);
  assert.doesNotMatch(html, /Will this set fit in your cabinet\?|Passt dieses Set in deinen Schrank\?/);
  assert.doesNotMatch(html, /2026-07-19/);
});

test("explains that saved cabinet dimensions stay in the browser", async () => {
  const response = await render("/en/privacy");
  assert.equal(response.status, 200);
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.match(html, /cabinet or shelf measurements and selected unit are stored only in this browser’s local storage/);
  assert.match(html, /they are not sent to a server/);
  assert.match(html, /Optional product analytics/);
  assert.match(html, /asks for permission before analytics starts/);
  assert.match(html, /session replay, exception capture, heatmaps and performance capture are disabled/);
});
