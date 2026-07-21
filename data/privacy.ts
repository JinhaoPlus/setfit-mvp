import type { Locale } from "@/config/site";

type PrivacyLink = {
  href: string;
  label: string;
  external: boolean;
};

type PrivacySection = {
  title: string;
  paragraphs: readonly string[];
  links: readonly PrivacyLink[];
};

type PrivacyContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  copy: string;
  sections: readonly PrivacySection[];
};

export const privacyContent = {
  en: {
    metaTitle: "Privacy",
    metaDescription: "How bricksfit stores display-planning preferences and uses Vercel and consent-based PostHog analytics.",
    eyebrow: "Privacy and data use",
    title: "What stays in your browser—and what does not.",
    copy: "bricksfit has no user accounts and does not accept private submissions. This notice describes the browser preferences and website measurement tools currently present on the site; Google AdSense is not currently installed.",
    sections: [
      {
        title: "Cabinet measurements, unit and language",
        paragraphs: [
          "The clear cabinet or shelf dimensions you enter and your selected measurement unit are saved in this browser’s local storage so the calculator remains useful after a refresh. bricksfit does not send those measurements to its server.",
          "When you change language, bricksfit stores a first-party language cookie for up to one year so future visits can keep that choice. You can clear both preferences through your browser settings.",
        ],
        links: [],
      },
      {
        title: "Vercel Web Analytics and Speed Insights",
        paragraphs: [
          "Vercel Web Analytics sends page-view data for aggregated traffic reporting. Vercel states that its Web Analytics data points are anonymous, are not tied to an individual or IP address, and do not use third-party cookies. Data points can include the route, referrer, filtered query parameters, approximate geography, browser, operating system and device type.",
          "Vercel Speed Insights sends real-user Web Vitals and related route, device and country dimensions so site performance can be measured. These tools load on site pages independently of the optional PostHog control described below.",
        ],
        links: [
          { href: "https://vercel.com/docs/analytics/privacy-policy", label: "Vercel Web Analytics privacy information", external: true },
          { href: "https://vercel.com/docs/speed-insights", label: "Vercel Speed Insights documentation", external: true },
        ],
      },
      {
        title: "Optional PostHog product analytics",
        paragraphs: [
          "If a PostHog project token is configured, bricksfit displays a separate analytics choice. Product analytics events and analytics persistence are disabled by default and start only after you allow them. If allowed, PostHog records page URLs, basic interactions, and browser and device information.",
          "The current configuration masks visible text and element attributes, does not collect form values through autocapture, and disables session recording, surveys, exception capture, heatmaps and performance capture. You can allow or withdraw this choice at any time through Analytics settings in the footer; rejecting analytics stores the opt-out state used by PostHog.",
        ],
        links: [{ href: "https://posthog.com/privacy", label: "PostHog privacy information", external: true }],
      },
      {
        title: "Advertising and AdSense status",
        paragraphs: [
          "bricksfit does not currently load Google AdSense code, serve Google ads or set advertising cookies. This notice must be updated before that changes.",
          "Before ads are served to visitors where consent is required, the operator must configure an appropriate Google-certified consent management platform, describe the advertising data use and provide the required consent choices. The existing PostHog analytics choice is not a substitute for an advertising CMP.",
        ],
        links: [{ href: "https://support.google.com/adsense/answer/7670013", label: "Google AdSense CMP guidance", external: true }],
      },
      {
        title: "External links and contact",
        paragraphs: [
          "Links to Brickset, LEGO, furniture manufacturers, GitHub and other sites take you to services with their own privacy practices. bricksfit does not control those external sites.",
          "For a privacy question or correction, use the documented contact channel and do not include personal information in a public issue.",
        ],
        links: [{ href: "/contact", label: "Contact bricksfit", external: false }],
      },
    ],
  },
  de: {
    metaTitle: "Datenschutz",
    metaDescription: "Wie bricksfit Einstellungen zur Stellflächenplanung speichert und Vercel- sowie einwilligungsbasierte PostHog-Analysen nutzt.",
    eyebrow: "Datenschutz und Datennutzung",
    title: "Was im Browser bleibt – und was nicht.",
    copy: "bricksfit hat keine Benutzerkonten und nimmt keine privaten Einsendungen entgegen. Diese Hinweise beschreiben die Browser-Einstellungen und Messwerkzeuge, die derzeit auf der Website vorhanden sind; Google AdSense ist aktuell nicht installiert.",
    sections: [
      {
        title: "Schrankmaße, Einheit und Sprache",
        paragraphs: [
          "Die von dir eingegebenen freien Schrank- oder Regalinnenmaße und die gewählte Maßeinheit werden im lokalen Speicher dieses Browsers abgelegt, damit der Rechner nach dem Neuladen weiter nutzbar ist. bricksfit sendet diese Maße nicht an seinen Server.",
          "Wenn du die Sprache wechselst, speichert bricksfit bis zu einem Jahr lang ein Erstanbieter-Sprach-Cookie, damit diese Wahl bei späteren Besuchen erhalten bleibt. Beide Einstellungen kannst du über die Browser-Einstellungen löschen.",
        ],
        links: [],
      },
      {
        title: "Vercel Web Analytics und Speed Insights",
        paragraphs: [
          "Vercel Web Analytics sendet Seitenaufrufdaten für zusammengefasste Zugriffsberichte. Laut Vercel sind die Datenpunkte anonym, weder mit einer Person noch einer IP-Adresse verknüpft und verwenden keine Drittanbieter-Cookies. Datenpunkte können Route, Referrer, gefilterte Abfrageparameter, ungefähre Region, Browser, Betriebssystem und Gerätetyp enthalten.",
          "Vercel Speed Insights sendet reale Web-Vitals-Messwerte und zugehörige Angaben zu Route, Gerät und Land, damit die Website-Leistung gemessen werden kann. Diese Werkzeuge werden unabhängig von der unten beschriebenen optionalen PostHog-Steuerung geladen.",
        ],
        links: [
          { href: "https://vercel.com/docs/analytics/privacy-policy", label: "Datenschutzinformationen zu Vercel Web Analytics", external: true },
          { href: "https://vercel.com/docs/speed-insights", label: "Dokumentation zu Vercel Speed Insights", external: true },
        ],
      },
      {
        title: "Optionale PostHog-Produktanalyse",
        paragraphs: [
          "Ist ein PostHog-Projekttoken konfiguriert, zeigt bricksfit eine eigene Analyseauswahl. Produktanalyse-Ereignisse und Analysespeicherung sind standardmäßig deaktiviert und beginnen erst nach deiner Zustimmung. Danach erfasst PostHog Seiten-URLs, grundlegende Interaktionen sowie Browser- und Geräteinformationen.",
          "Die aktuelle Konfiguration maskiert sichtbare Texte und Elementattribute, erfasst über Autocapture keine Formularwerte und deaktiviert Sitzungsaufzeichnungen, Umfragen, Fehler-, Heatmap- und Leistungserfassung. Über die Analyse-Einstellungen in der Fußzeile kannst du die Auswahl jederzeit erlauben oder widerrufen; bei Ablehnung speichert PostHog den dafür verwendeten Opt-out-Status.",
        ],
        links: [{ href: "https://posthog.com/privacy", label: "PostHog-Datenschutzinformationen", external: true }],
      },
      {
        title: "Werbung und AdSense-Status",
        paragraphs: [
          "bricksfit lädt derzeit keinen Google-AdSense-Code, liefert keine Google-Anzeigen aus und setzt keine Werbe-Cookies. Vor einer Änderung muss dieser Hinweis aktualisiert werden.",
          "Bevor Besucherinnen und Besucher in Regionen mit Einwilligungspflicht Anzeigen sehen, muss der Betreiber eine geeignete, von Google zertifizierte Consent-Management-Plattform konfigurieren, die Werbedatennutzung beschreiben und die vorgeschriebenen Wahlmöglichkeiten bereitstellen. Die vorhandene PostHog-Analyseauswahl ersetzt keine Werbe-CMP.",
        ],
        links: [{ href: "https://support.google.com/adsense/answer/7670013", label: "Google-AdSense-Hinweise zu CMPs", external: true }],
      },
      {
        title: "Externe Links und Kontakt",
        paragraphs: [
          "Links zu Brickset, LEGO, Möbelherstellern, GitHub und anderen Websites führen zu Diensten mit eigenen Datenschutzpraktiken. bricksfit kontrolliert diese externen Websites nicht.",
          "Nutze für Datenschutzfragen oder Korrekturen den dokumentierten Kontaktweg und veröffentliche in einem öffentlichen Issue keine personenbezogenen Daten.",
        ],
        links: [{ href: "/contact", label: "bricksfit kontaktieren", external: false }],
      },
    ],
  },
  zh: {
    metaTitle: "隐私",
    metaDescription: "说明 bricksfit 如何保存展示规划偏好，并使用 Vercel 与经用户同意后启用的 PostHog 网站分析。",
    eyebrow: "隐私与数据使用",
    title: "哪些数据留在浏览器里，哪些不会。",
    copy: "bricksfit 没有用户账户，也不接收私人资料。本说明覆盖网站当前使用的浏览器偏好与网站测量工具；目前尚未安装 Google AdSense。",
    sections: [
      {
        title: "柜架尺寸、单位与语言",
        paragraphs: [
          "你输入的柜子或书架内部净尺寸，以及所选测量单位，会保存在当前浏览器的本地存储中，以便刷新后继续使用计算器。bricksfit 不会把这些尺寸发送到自身服务器。",
          "切换语言时，bricksfit 会保存一个最长有效期为一年的第一方语言 Cookie，让之后的访问保留该选择。你可以通过浏览器设置清除这两类偏好。",
        ],
        links: [],
      },
      {
        title: "Vercel Web Analytics 与 Speed Insights",
        paragraphs: [
          "Vercel Web Analytics 会发送页面访问数据，用于汇总流量报告。Vercel 说明，这些数据点是匿名的，不与个人或 IP 地址关联，也不使用第三方 Cookie。数据点可能包含路由、来源页、经过过滤的查询参数、大致地区、浏览器、操作系统和设备类型。",
          "Vercel Speed Insights 会发送真实用户的 Web Vitals 及相关路由、设备和国家维度，用于衡量网站性能。这两项工具的加载不受下方 PostHog 可选控制影响。",
        ],
        links: [
          { href: "https://vercel.com/docs/analytics/privacy-policy", label: "Vercel Web Analytics 隐私说明", external: true },
          { href: "https://vercel.com/docs/speed-insights", label: "Vercel Speed Insights 文档", external: true },
        ],
      },
      {
        title: "可选的 PostHog 产品分析",
        paragraphs: [
          "如果配置了 PostHog 项目令牌，bricksfit 会单独显示网站分析选择。产品分析事件与分析数据存储默认关闭，只有你允许后才开始。允许后，PostHog 会记录页面网址、基础交互以及浏览器和设备信息。",
          "当前配置会遮蔽可见文字和元素属性，不通过自动采集记录表单值，并关闭会话录屏、问卷、异常、热图与性能采集。你可以随时通过页脚中的“分析设置”允许或撤回；拒绝时，PostHog 会保存其用于停止采集的退出状态。",
        ],
        links: [{ href: "https://posthog.com/privacy", label: "PostHog 隐私信息", external: true }],
      },
      {
        title: "广告与 AdSense 状态",
        paragraphs: [
          "bricksfit 目前不加载 Google AdSense 代码、不展示 Google 广告，也不设置广告 Cookie。若状态改变，必须先更新本隐私说明。",
          "在依法需要同意的地区展示广告之前，运营者必须配置合适的 Google 认证同意管理平台，说明广告相关数据用途，并提供规定的同意选项。现有的 PostHog 网站分析选择不能代替广告 CMP。",
        ],
        links: [{ href: "https://support.google.com/adsense/answer/7670013", label: "Google AdSense CMP 指南", external: true }],
      },
      {
        title: "外部链接与联系",
        paragraphs: [
          "前往 Brickset、LEGO、家具品牌、GitHub 及其他网站的链接会进入各自拥有独立隐私规则的服务；bricksfit 无法控制这些外部网站。",
          "如需咨询隐私或提出纠错，请使用已说明的联系渠道，并且不要在公开 Issue 中包含个人信息。",
        ],
        links: [{ href: "/contact", label: "联系 bricksfit", external: false }],
      },
    ],
  },
} as const satisfies Record<Locale, PrivacyContent>;
