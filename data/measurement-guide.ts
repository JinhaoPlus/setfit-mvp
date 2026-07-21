import type { Locale } from "@/config/site";

type MeasurementGuideSection = {
  title: string;
  paragraphs: readonly string[];
  items: readonly string[];
};

type MeasurementGuide = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  asideTitle: string;
  asideCopy: string;
  sections: readonly MeasurementGuideSection[];
  calculatorTitle: string;
  calculatorCopy: string;
  calculatorLink: string;
  teaserEyebrow: string;
  teaserTitle: string;
  teaserCopy: string;
  teaserLink: string;
};

export const measurementGuideContent = {
  en: {
    metaTitle: "How to measure a display cabinet for brick sets",
    metaDescription: "Measure clear cabinet width, depth, height, door openings and obstructions before checking whether a built brick set fits.",
    eyebrow: "Original measuring guide",
    title: "How to measure a cabinet for a built brick set.",
    intro: "Furniture listings usually lead with outside dimensions. A display decision needs the smallest clear space the completed model can actually pass through and occupy.",
    asideTitle: "Record five things",
    asideCopy: "Clear width, clear depth with doors closed, clear height, the usable door opening, and the position of every hinge or shelf support that enters that space.",
    sections: [
      {
        title: "1. Empty one real shelf bay",
        paragraphs: [
          "Measure the exact bay you plan to use after the furniture is assembled and leveled. Product drawings are a useful starting point, but shelf pins, frames, back panels and adjustable shelf positions can change the usable opening.",
          "Use a rigid tape measure and take each dimension in at least two places. Keep the smaller result when the cabinet is not perfectly square.",
        ],
        items: [
          "Width: measure between the nearest side walls, shelf supports or door hardware.",
          "Height: measure from the top surface of the shelf to the lowest obstruction above it.",
          "Depth: measure from the back panel to the inside face of the closed door—not to the outer front edge.",
        ],
      },
      {
        title: "2. Measure the route into the cabinet",
        paragraphs: [
          "A model can fit inside a cabinet yet fail to pass through its doors. Record the narrowest open-door width and height, then check whether the model can be tilted or rotated safely during insertion.",
          "Sliding doors overlap at the center; hinged doors and concealed hinges intrude near the sides. Removable shelves may also need to be installed after the model is placed.",
        ],
        items: [
          "Open every door as far as it will normally travel.",
          "Measure between the door edges, frame and hinges at the narrowest point.",
          "Plan a safe lifting grip instead of assuming the model can be pushed from one fragile end.",
        ],
      },
      {
        title: "3. Decide the display posture first",
        paragraphs: [
          "Built dimensions usually describe one posture. Wings, cranes, sails, antennas, rotating turrets and opening walls can extend beyond the recorded rectangular envelope.",
          "Choose the viewing angle and movable-part position you actually want. If the model will be rotated 90 degrees, swap width and depth in your check but keep height unchanged.",
        ],
        items: [
          "Use the dimension source on the set page to identify the measured configuration.",
          "For modular or multi-model products, measure each intended arrangement rather than combining unrelated parts.",
          "Leave access for dusting, lighting cables and future repositioning.",
        ],
      },
      {
        title: "4. Add clearance after strict fit",
        paragraphs: [
          "First confirm that the model envelope is smaller than the clear cabinet dimensions. Then add planning clearance. bricksfit uses 5 cm on each axis as a practical starting point, not a universal rule.",
          "A custom acrylic case may use a tighter, carefully verified tolerance. A frequently opened cabinet or a model with flexible parts usually benefits from more room.",
        ],
        items: [
          "Do not subtract clearance twice: compare the model to clear internal space, then review the remaining gap.",
          "Treat equal measurements as no margin, even if rounding makes the calculator show a mathematical fit.",
          "Re-measure before ordering made-to-size furniture or a display case.",
        ],
      },
    ],
    calculatorTitle: "Use the measured clear space",
    calculatorCopy: "Return to the shelf calculator, enter the smallest clear width, depth and height you recorded, and compare both normal and rotated orientations. The result is a shortlist for a final physical check.",
    calculatorLink: "Open the shelf calculator",
    teaserEyebrow: "Measuring guide",
    teaserTitle: "Measure the cabinet space that really counts.",
    teaserCopy: "Outside furniture dimensions are not usable display space. Record doors, hinges and the route into the cabinet before checking fit.",
    teaserLink: "Read the measuring guide",
  },
  de: {
    metaTitle: "Vitrine oder Schrank für Klemmbausteinsets ausmessen",
    metaDescription: "Miss freie Schrankbreite, -tiefe, -höhe, Türöffnung und Hindernisse, bevor du die Passform eines gebauten Modells prüfst.",
    eyebrow: "Eigener Messratgeber",
    title: "So misst du einen Schrank für ein gebautes Klemmbausteinset.",
    intro: "Möbelangebote nennen meist zuerst die Außenmaße. Für die Präsentation zählt der kleinste freie Raum, durch den das fertige Modell tatsächlich hindurchpasst und in dem es stehen kann.",
    asideTitle: "Fünf Werte notieren",
    asideCopy: "Freie Breite, freie Tiefe bei geschlossenen Türen, freie Höhe, nutzbare Türöffnung sowie die Position aller Scharniere und Regalbodenträger, die in diesen Raum hineinragen.",
    sections: [
      {
        title: "1. Räume ein echtes Regalfach frei",
        paragraphs: [
          "Miss genau das Fach, das du verwenden willst, nachdem das Möbel aufgebaut und ausgerichtet ist. Produktzeichnungen sind ein guter Ausgangspunkt, doch Regalstifte, Rahmen, Rückwände und verstellbare Bodenpositionen verändern die nutzbare Öffnung.",
          "Nutze ein stabiles Maßband und miss jede Richtung an mindestens zwei Stellen. Ist der Schrank nicht ganz rechtwinklig, behalte den kleineren Wert.",
        ],
        items: [
          "Breite: zwischen den nächstgelegenen Seitenwänden, Bodenträgern oder Türbeschlägen messen.",
          "Höhe: von der Regaloberfläche bis zum niedrigsten Hindernis darüber messen.",
          "Tiefe: von der Rückwand bis zur Innenseite der geschlossenen Tür messen – nicht bis zur äußeren Vorderkante.",
        ],
      },
      {
        title: "2. Miss den Weg in den Schrank",
        paragraphs: [
          "Ein Modell kann innen Platz haben und trotzdem nicht durch die Türen passen. Notiere die kleinste Breite und Höhe der geöffneten Tür und prüfe, ob sich das Modell beim Einsetzen sicher kippen oder drehen lässt.",
          "Schiebetüren überlappen in der Mitte; Drehtüren und verdeckte Scharniere ragen seitlich hinein. Herausnehmbare Regalböden müssen eventuell erst nach dem Modell eingesetzt werden.",
        ],
        items: [
          "Öffne alle Türen so weit, wie sie im Alltag aufgehen.",
          "Miss an der engsten Stelle zwischen Türkanten, Rahmen und Scharnieren.",
          "Plane einen sicheren Griff zum Anheben, statt das Modell an einem empfindlichen Ende hineinzuschieben.",
        ],
      },
      {
        title: "3. Lege zuerst die Präsentationshaltung fest",
        paragraphs: [
          "Modellmaße beschreiben meist eine bestimmte Haltung. Flügel, Kräne, Segel, Antennen, drehbare Türme und aufklappbare Wände können über den angegebenen rechteckigen Hüllraum hinausragen.",
          "Wähle Blickwinkel und Stellung der beweglichen Teile, die du wirklich zeigen möchtest. Bei einer Drehung um 90 Grad vertauschst du in der Prüfung Breite und Tiefe; die Höhe bleibt gleich.",
        ],
        items: [
          "Öffne auf der Set-Seite die Maßquelle, um die gemessene Konfiguration zu erkennen.",
          "Miss bei modularen Produkten oder mehreren Modellen jede gewünschte Anordnung, statt unabhängige Teile künstlich zusammenzufassen.",
          "Lass Zugang zum Entstauben, für Lichtkabel und spätere Positionsänderungen.",
        ],
      },
      {
        title: "4. Erst strenge Passform, dann Abstand",
        paragraphs: [
          "Prüfe zuerst, ob der Modell-Hüllraum kleiner als die freien Schrankmaße ist. Füge danach Planungsabstand hinzu. bricksfit verwendet 5 cm je Achse als praktischen Ausgangspunkt, nicht als allgemeingültige Regel.",
          "Eine maßgefertigte Acrylhaube kann mit sorgfältig geprüfter Toleranz enger sitzen. Ein oft geöffneter Schrank oder ein Modell mit flexiblen Teilen profitiert meist von mehr Platz.",
        ],
        items: [
          "Ziehe den Abstand nicht doppelt ab: Vergleiche das Modell mit dem freien Innenraum und bewerte anschließend den verbleibenden Spalt.",
          "Behandle gleiche Maße als null Spielraum, auch wenn Rundung rechnerisch eine Passform anzeigt.",
          "Miss erneut, bevor du maßgefertigte Möbel oder eine Vitrine bestellst.",
        ],
      },
    ],
    calculatorTitle: "Nutze den gemessenen freien Raum",
    calculatorCopy: "Kehre zum Regalrechner zurück, gib die kleinste gemessene freie Breite, Tiefe und Höhe ein und vergleiche normale sowie gedrehte Ausrichtung. Das Ergebnis ist eine Vorauswahl für die abschließende Prüfung am echten Möbel.",
    calculatorLink: "Regalrechner öffnen",
    teaserEyebrow: "Messratgeber",
    teaserTitle: "Miss den Schrankraum, der wirklich zählt.",
    teaserCopy: "Außenmaße des Möbels sind keine nutzbare Stellfläche. Erfasse Türen, Scharniere und den Weg in den Schrank, bevor du die Passform prüfst.",
    teaserLink: "Messratgeber lesen",
  },
  zh: {
    metaTitle: "如何为积木成品测量展示柜内部尺寸",
    metaDescription: "检查积木成品能否放入之前，先测量柜体内部净宽、净深、净高、门框开口和障碍物。",
    eyebrow: "原创测量指南",
    title: "如何为积木拼装成品测量柜体空间。",
    intro: "家具页面通常首先展示外部尺寸，但真正决定能否摆放的，是成品可以顺利通过并长期占用的最小内部净空间。",
    asideTitle: "记录五项数据",
    asideCopy: "内部净宽、柜门关闭后的内部净深、内部净高、可用门框开口，以及所有伸入空间的铰链和层板固定件位置。",
    sections: [
      {
        title: "1. 腾空一个实际要使用的柜格",
        paragraphs: [
          "等家具完成组装和调平后，测量你真正准备使用的那一格。产品图纸可以作为起点，但层板钉、门框、背板和可调层板位置都会改变实际开口。",
          "使用硬质卷尺，并在每个方向至少测两处。如果柜体并非完全方正，就采用较小的测量值。",
        ],
        items: [
          "宽度：测量两侧最靠近的侧板、层板固定件或门五金之间的距离。",
          "高度：从层板上表面量到上方最低障碍物。",
          "深度：从背板量到关闭后柜门的内侧，不要量到柜体最前方的外边缘。",
        ],
      },
      {
        title: "2. 测量成品进入柜体的路径",
        paragraphs: [
          "成品可能在柜子内部放得下，却过不了柜门。记录柜门打开后的最窄宽度和高度，再判断搬入时能否安全倾斜或旋转。",
          "推拉门会在中间重叠；平开门和隐藏式铰链会占用两侧空间。有些可拆层板可能需要先放入模型，再重新安装。",
        ],
        items: [
          "把每扇柜门打开到日常能够达到的最大角度。",
          "测量门边、门框和铰链之间最窄的位置。",
          "提前考虑安全托举的位置，不要假设可以从脆弱的一端把模型推进去。",
        ],
      },
      {
        title: "3. 先确定实际展示姿态",
        paragraphs: [
          "拼装成品尺寸通常对应一种特定姿态。机翼、吊臂、帆、天线、旋转炮塔和可开启墙体都可能伸出记录的矩形外包络。",
          "先确定你真正想要的观看角度和活动部件位置。如果模型水平旋转 90°，检查时交换宽度与深度，高度保持不变。",
        ],
        items: [
          "打开套装详情页中的尺寸来源，确认测量所对应的模型配置。",
          "对于模块化或多模型产品，应分别测量计划采用的摆法，不要强行合并无关部件。",
          "为除尘、灯光线缆和以后调整位置保留操作空间。",
        ],
      },
      {
        title: "4. 先检查严格适配，再增加余量",
        paragraphs: [
          "先确认模型外包络小于柜体内部净尺寸，再增加规划余量。bricksfit 在三个方向各加 5 cm 作为实用起点，但这不是适用于所有场景的固定规则。",
          "经过精确核验的定制亚克力罩可以使用更小余量；经常开关的柜体或带柔性部件的模型通常更需要宽松空间。",
        ],
        items: [
          "不要重复扣除余量：先把模型与内部净空间比较，再查看剩余间隙。",
          "若模型和柜体数值相等，应视为没有余量，即使四舍五入后计算器显示数值上可以放入。",
          "订购定制家具或展示罩前，务必再次实测。",
        ],
      },
    ],
    calculatorTitle: "把实测的内部净尺寸用于计算",
    calculatorCopy: "回到柜架适配计算器，输入记录中最小的内部净宽、净深和净高，再比较常规与旋转摆放。计算结果用于缩小范围，最终仍要用实物核验。",
    calculatorLink: "打开柜架适配计算器",
    teaserEyebrow: "测量指南",
    teaserTitle: "量清真正决定能否摆放的柜内空间。",
    teaserCopy: "家具外部尺寸不等于可用展示空间。检查适配前，请把柜门、铰链和成品进入柜体的路径一起量清。",
    teaserLink: "阅读测量指南",
  },
} as const satisfies Record<Locale, MeasurementGuide>;

export function getMeasurementGuide(locale: Locale) {
  return measurementGuideContent[locale];
}
