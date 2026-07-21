import type { Locale } from "@/config/site";

type DetailGuidance = {
  multiModelTitle: string;
  multiModelItems: readonly string[];
  limitsTitle: string;
  limitsCopy: string;
  measureLink: string;
};

export const detailGuidance = {
  en: {
    multiModelTitle: "Plan a multi-model product without inventing one size",
    multiModelItems: [
      "Choose the modules or individual models you actually intend to display together.",
      "Measure the widest, deepest and tallest points of that arrangement, including stands and movable parts.",
      "Check the door opening and save those real measurements in the shelf calculator using a comparable single-model set as a temporary reference.",
    ],
    limitsTitle: "Before committing to a shelf or display case",
    limitsCopy: "The recorded H/W/D is a rectangular planning envelope. Measure the narrowest clear furniture space, then account for doors, hinges, shelf supports, lighting and the model’s chosen posture.",
    measureLink: "How to measure the cabinet correctly",
  },
  de: {
    multiModelTitle: "Mehrere Modelle planen, ohne eine Gesamtgröße zu erfinden",
    multiModelItems: [
      "Lege fest, welche Module oder Einzelmodelle du tatsächlich gemeinsam präsentieren willst.",
      "Miss die breiteste, tiefste und höchste Stelle dieser Anordnung einschließlich Ständer und beweglicher Teile.",
      "Prüfe die Türöffnung und speichere die echten Schrankmaße im Regalrechner; als vorläufige Referenz kannst du ein ähnlich großes Einzelmodell wählen.",
    ],
    limitsTitle: "Vor der Entscheidung für Regal oder Vitrine",
    limitsCopy: "Die angegebene H/B/T ist ein rechteckiger Planungshüllraum. Miss den engsten freien Möbelraum und berücksichtige anschließend Türen, Scharniere, Regalbodenträger, Beleuchtung und die gewählte Modellhaltung.",
    measureLink: "Schrank richtig ausmessen",
  },
  zh: {
    multiModelTitle: "不要虚构一个整体尺寸，按实际摆法规划多模型产品",
    multiModelItems: [
      "先确定你真正准备同时展示的模块或独立模型。",
      "测量该摆法最宽、最深和最高的位置，并把支架与活动部件算在内。",
      "检查柜门开口，并把实测柜体净尺寸保存到计算器；可暂时选择尺寸相近的单一模型作对照。",
    ],
    limitsTitle: "确定书架或展示柜之前",
    limitsCopy: "这里记录的高/宽/深是矩形规划外包络。请测量家具最窄的内部净空间，并继续考虑柜门、铰链、层板固定件、灯光和你选择的模型姿态。",
    measureLink: "如何正确测量柜体",
  },
} as const satisfies Record<Locale, DetailGuidance>;
