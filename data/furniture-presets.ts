export type FurniturePreset = {
  id: string;
  brand: "IKEA" | "MUJI";
  name: string;
  articleNumber: string;
  kind: "singleShelf" | "singleCube";
  imagePath: string;
  sourceUrl: string;
  publishedOuterCm: {
    widthCm: number;
    depthCm: number;
    heightCm: number;
  };
  planningClearCm: {
    widthCm: number;
    depthCm: number;
    heightCm: number;
  };
  publishedClearSpace?: true;
};

/**
 * Product dimensions and images come from the linked official product pages.
 * Unless publishedClearSpace is set, planning-clear dimensions are deliberately
 * conservative single-bay starting points rather than manufacturer
 * specifications. Adjustable shelves, doors, hinges and individual assembly
 * tolerances make on-site measurement essential.
 */
export const furniturePresets: FurniturePreset[] = [
  {
    id: "ikea-billy-80",
    brand: "IKEA",
    name: "BILLY",
    articleNumber: "005.220.47",
    kind: "singleShelf",
    imagePath: "/furniture-presets/ikea-billy.jpg",
    sourceUrl: "https://www.ikea.cn/cn/zh/p/billy-bookcase-white-00522047/",
    publishedOuterCm: { widthCm: 80, depthCm: 28, heightCm: 202 },
    planningClearCm: { widthCm: 76, depthCm: 26, heightCm: 30 },
  },
  {
    id: "ikea-kallax-cell",
    brand: "IKEA",
    name: "KALLAX",
    articleNumber: "504.717.19",
    kind: "singleCube",
    imagePath: "/furniture-presets/ikea-kallax.jpg",
    sourceUrl: "https://www.ikea.cn/cn/zh/p/kallax-shelving-unit-white-50471719",
    publishedOuterCm: { widthCm: 76.5, depthCm: 39, heightCm: 146.5 },
    planningClearCm: { widthCm: 33, depthCm: 37, heightCm: 33 },
  },
  {
    id: "ikea-baggebo",
    brand: "IKEA",
    name: "BAGGEBO",
    articleNumber: "105.029.92",
    kind: "singleShelf",
    imagePath: "/furniture-presets/ikea-baggebo.jpg",
    sourceUrl: "https://www.ikea.cn/cn/zh/p/baggebo-glass-door-cabinet-metal-white-10502992/",
    publishedOuterCm: { widthCm: 34, depthCm: 30, heightCm: 116 },
    planningClearCm: { widthCm: 30, depthCm: 25, heightCm: 33 },
  },
  {
    id: "ikea-blaliden",
    brand: "IKEA",
    name: "BLÅLIDEN",
    articleNumber: "005.012.43",
    kind: "singleShelf",
    imagePath: "/furniture-presets/ikea-blaliden.jpg",
    sourceUrl: "https://www.ikea.com/us/en/p/blaliden-glass-door-cabinet-white-00501243/",
    publishedOuterCm: { widthCm: 34.9, depthCm: 32.1, heightCm: 151.1 },
    planningClearCm: { widthCm: 30, depthCm: 27, heightCm: 33 },
  },
  {
    id: "ikea-rudsta-tall",
    brand: "IKEA",
    name: "RUDSTA",
    articleNumber: "904.501.35",
    kind: "singleShelf",
    imagePath: "/furniture-presets/ikea-rudsta.jpg",
    sourceUrl: "https://www.ikea.cn/cn/zh/p/rudsta-lu-de-si-ta-bo-li-men-gui-qian-qing-lu-se-90450135/",
    publishedOuterCm: { widthCm: 42, depthCm: 37, heightCm: 155 },
    planningClearCm: { widthCm: 38, depthCm: 32, heightCm: 34 },
  },
  {
    id: "ikea-milsbo-tall",
    brand: "IKEA",
    name: "MILSBO",
    articleNumber: "103.964.25",
    kind: "singleShelf",
    imagePath: "/furniture-presets/ikea-milsbo.jpg",
    sourceUrl: "https://www.ikea.cn/cn/zh/p/milsbo-mi-si-bo-bo-li-men-ju-bai-se-10396425/",
    publishedOuterCm: { widthCm: 73, depthCm: 42, heightCm: 175 },
    planningClearCm: { widthCm: 68, depthCm: 36, heightCm: 35 },
  },
  {
    id: "muji-stacking-shelf",
    brand: "MUJI",
    name: "Stacking Shelf",
    articleNumber: "4550002850234",
    kind: "singleCube",
    imagePath: "/furniture-presets/muji-stacking-shelf.jpg",
    sourceUrl: "https://www.muji.us/collections/storage-organizers/products/stacking-shelf-walnut-3-tiers-b8s5103",
    publishedOuterCm: { widthCm: 42, depthCm: 28.5, heightCm: 121 },
    planningClearCm: { widthCm: 37.5, depthCm: 28.5, heightCm: 37.5 },
    publishedClearSpace: true,
  },
];
