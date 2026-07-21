import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const sourcePath = new URL("../data/large-top500.json", import.meta.url);
const outputPath = new URL("../data/set-localized-names.json", import.meta.url);
const endpoint = "https://www.lego.com/api/graphql";
// LEGO currently accepts at most 10 calls to this field in one GraphQL operation.
const batchSize = 10;
const localeSources = [
  { siteLocale: "de", legoLocale: "de-DE" },
  { siteLocale: "zh", legoLocale: "zh-CN" },
];

function buildQuery(setNumbers) {
  const fields = setNumbers.map((setNumber, index) => `
    set${index}: getBuildingInstructionsForSet(setNumber: ${JSON.stringify(setNumber)}) {
      status
      data { name setNumber year }
    }`).join("");

  return `query LocalizedSetNames {
    customerService {${fields}
    }
  }`;
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function isUsableProductName(name) {
  // A few legacy records expose an English marketing sentence in this field.
  // It is official data, but not a localized product name, so English fallback is safer.
  return !/^Build the .+!$/i.test(name);
}

async function fetchBatch(setNumbers, legoLocale) {
  const query = buildQuery(setNumbers);
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-locale": legoLocale,
        },
        body: JSON.stringify({ operationName: "LocalizedSetNames", query }),
        signal: AbortSignal.timeout(30_000),
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(`LEGO API returned HTTP ${response.status}: ${details.slice(0, 500)}`);
      }
      const payload = await response.json();
      if (payload.errors?.length) throw new Error(payload.errors.map(({ message }) => message).join("; "));

      const customerService = payload.data?.customerService;
      if (!customerService) throw new Error("LEGO API response did not include customerService data");

      return new Map(setNumbers.map((setNumber, index) => [setNumber, customerService[`set${index}`]]));
    } catch (error) {
      lastError = error;
      if (attempt < 3) await wait(500 * attempt);
    }
  }

  throw lastError;
}

async function fetchLocaleNames(setNumbers, legoLocale) {
  const results = new Map();

  for (let index = 0; index < setNumbers.length; index += batchSize) {
    const batch = setNumbers.slice(index, index + batchSize);
    const batchResults = await fetchBatch(batch, legoLocale);
    for (const [setNumber, result] of batchResults) results.set(setNumber, result);
    process.stdout.write(`\r${legoLocale}: ${Math.min(index + batch.length, setNumbers.length)}/${setNumbers.length}`);
  }

  process.stdout.write("\n");
  return results;
}

const sourceRecords = JSON.parse(await readFile(sourcePath, "utf8"));
if (!Array.isArray(sourceRecords)) throw new Error("Expected data/large-top500.json to contain an array");

const setNumberCounts = new Map();
for (const set of sourceRecords) {
  setNumberCounts.set(set.set_number, (setNumberCounts.get(set.set_number) ?? 0) + 1);
}

const duplicateSetNumbers = new Set(
  [...setNumberCounts].filter(([, count]) => count > 1).map(([setNumber]) => setNumber),
);
const uniqueSetNumbers = [...setNumberCounts.keys()].filter((setNumber) => !duplicateSetNumbers.has(setNumber));
const localizedNames = {};

for (const { siteLocale, legoLocale } of localeSources) {
  const officialResults = await fetchLocaleNames(uniqueSetNumbers, legoLocale);
  const localeMap = {};

  for (const set of sourceRecords) {
    if (duplicateSetNumbers.has(set.set_number)) continue;
    const result = officialResults.get(set.set_number);
    const name = result?.data?.name?.trim();
    if (result?.status === "ok" && result.data?.setNumber === set.set_number && name && isUsableProductName(name)) {
      localeMap[set.set_id] = name;
    }
  }

  if (Object.keys(localeMap).length < sourceRecords.length / 2) {
    throw new Error(`${legoLocale} returned too few valid names; refusing to replace the mapping`);
  }

  localizedNames[siteLocale] = localeMap;
  console.log(`${siteLocale}: ${Object.keys(localeMap).length}/${sourceRecords.length} official names`);
}

const output = {
  schema_version: 1,
  source: {
    provider: "LEGO",
    endpoint,
    operation: "customerService.getBuildingInstructionsForSet",
    field: "data.name",
    locale_headers: Object.fromEntries(localeSources.map(({ siteLocale, legoLocale }) => [siteLocale, legoLocale])),
    generated_by: "npm run names:update",
    fallback: "The English name in data/large-top500.json",
  },
  locales: localizedNames,
};

await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${fileURLToPath(outputPath).replace(projectRoot, "")}`);
if (duplicateSetNumbers.size) {
  console.log(`Skipped ambiguous duplicate set numbers: ${[...duplicateSetNumbers].join(", ")}`);
}
