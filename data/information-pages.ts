import type { Locale } from "@/config/site";

export const informationPageNames = ["about", "contact", "sources", "terms"] as const;

export type InformationPageName = (typeof informationPageNames)[number];

type InformationLink = {
  href: string;
  label: string;
  external: boolean;
};

type InformationSection = {
  title: string;
  paragraphs: readonly string[];
  links: readonly InformationLink[];
};

type InformationPage = {
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly InformationSection[];
};

type InformationPages = Record<InformationPageName, InformationPage>;

const contactEmail = "rowin2013@gmail.com";

function emailHref(subject: string) {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;
}

export const informationPages = {
  en: {
    about: {
      shortTitle: "About",
      metaTitle: "About bricksfit",
      metaDescription: "Why bricksfit exists, how its display-planning information is prepared, and how the project is funded.",
      eyebrow: "About the project",
      title: "Display planning built around one practical question.",
      intro: "bricksfit is an independent reference project for people deciding where a large built brick set can live before they build it or buy furniture for it.",
      sections: [
        {
          title: "What bricksfit does",
          paragraphs: [
            "Retail package dimensions are easy to find but rarely answer whether the completed model fits a shelf. bricksfit keeps package measurements separate from built-model height, width and depth, then provides a rectangular first-pass fit check.",
            "The calculator is a planning aid, not a promise of fit. Doors, shelf pins, movable model parts, viewing angle and measurement tolerances can all reduce usable space.",
          ],
          links: [{ href: "/guides/how-to-measure-a-display-cabinet", label: "Read the cabinet-measuring guide", external: false }],
        },
        {
          title: "Editorial approach",
          paragraphs: [
            "Every set page separates its built-size source from its Brickset package record. Where one meaningful fixed build does not exist, bricksfit says so instead of inventing a combined measurement.",
            "Planning estimates are identified in the dimension information tip, and the methodology page explains the complete evidence hierarchy.",
          ],
          links: [{ href: "/methodology", label: "See the measurement methodology", external: false }],
        },
        {
          title: "Independence and funding",
          paragraphs: [
            "bricksfit is not sponsored, authorized or endorsed by the LEGO Group, Brickset, IKEA or any furniture manufacturer. Product and company names identify the items being compared.",
            "The site does not currently load Google AdSense code or advertising cookies. If advertising is enabled later, the privacy notice and consent controls will be updated before ads are served where consent is required.",
          ],
          links: [{ href: "/sources", label: "Review sources and rights notes", external: false }],
        },
      ],
    },
    contact: {
      shortTitle: "Contact",
      metaTitle: "Contact bricksfit",
      metaDescription: "Report a dimension correction, broken source, technical issue or rights concern to bricksfit.",
      eyebrow: "Contact and corrections",
      title: "Found a size problem or a rights concern?",
      intro: "bricksfit is maintained as a public reference project. Email is the contact channel for corrections, source updates, accessibility problems and removal requests.",
      sections: [
        {
          title: "Dimension and source corrections",
          paragraphs: [
            "Include the set number, the page URL, the value that appears wrong and a public source supporting the correction. Please distinguish built-model dimensions from retail package dimensions.",
            "Send only the information needed to review the correction. Do not include order details, private documents or other sensitive personal information unless they are necessary.",
          ],
          links: [{ href: emailHref("bricksfit dimension or source correction"), label: "Email a correction", external: true }],
        },
        {
          title: "Image, trademark or copyright concerns",
          paragraphs: [
            "A rights holder or authorized representative can request review or removal of an image or reference. Identify the exact page and material, explain your relationship to the rights, and provide a safe way to verify the request without publishing sensitive details.",
          ],
          links: [{ href: emailHref("bricksfit rights-review request"), label: "Email a rights-review request", external: true }],
        },
        {
          title: "Privacy and technical issues",
          paragraphs: [
            "The site has no user accounts or on-site submission form. For a bug, accessibility problem or privacy question about the documented analytics configuration, send an email with the relevant page URL and details.",
          ],
          links: [
            { href: "/privacy", label: "Read the privacy notice", external: false },
            { href: emailHref("bricksfit privacy or technical issue"), label: "Email a privacy or technical question", external: true },
          ],
        },
      ],
    },
    sources: {
      shortTitle: "Sources",
      metaTitle: "Data, image and source notes",
      metaDescription: "How bricksfit uses Brickset, official product pages, model measurements and third-party images.",
      eyebrow: "Sources and rights",
      title: "Where the data and images come from.",
      intro: "bricksfit links the evidence behind its size records and keeps third-party data, images and trademarks clearly attributed. This page explains the boundaries; it is not a license to reuse third-party material.",
      sections: [
        {
          title: "Set and package data",
          paragraphs: [
            "The ranked library begins with public Brickset set records and API data. Piece counts, themes, release details, package measurements and Brickset record links remain traceable to that source.",
            "Built-model measurements are handled separately. Each detail page links to the public product or reference page used for that model record, while the information tip states whether a value is official, direct, inferred or estimated.",
          ],
          links: [
            { href: "https://brickset.com/article/52659/about-brickset", label: "About Brickset and its database", external: true },
            { href: "https://brickset.com/article/52666/brickset-web-services", label: "Brickset web services", external: true },
            { href: "/methodology", label: "bricksfit methodology", external: false },
          ],
        },
        {
          title: "Images and trademarks",
          paragraphs: [
            "Set images are sourced through Brickset and each available image is linked back to its Brickset record. Brickset distinguishes official product images from scans and photos, and directs republishers to the LEGO Group Fair Play policy. bricksfit does not claim ownership of those images.",
            "The LEGO Group Fair Play guidance discusses limited reproduction and trademark use, including non-commercial conditions for some copyrighted material. Adding advertising can change the legal analysis. Attribution alone does not create permission, so commercial use should be reviewed by the operator or qualified counsel before ads are enabled.",
          ],
          links: [
            { href: "https://brickset.com/article/52659/about-brickset", label: "Brickset image terms and attribution", external: true },
            { href: "https://www.lego.com/en-us/legal/notices-and-policies/fair-play", label: "LEGO Group Fair Play policy", external: true },
            { href: "/contact", label: "Request an image or reference review", external: false },
          ],
        },
        {
          title: "Furniture examples",
          paragraphs: [
            "Furniture names, published outside dimensions and product images come from the linked manufacturer product pages. Only presets explicitly marked as published clear space use manufacturer-listed internal measurements; other clear-space values are conservative planning estimates.",
            "Manufacturer pages can change. Measure the assembled furniture, door opening, hinges and shelf position before making a purchase or permanent display decision.",
          ],
          links: [{ href: "/guides/how-to-measure-a-display-cabinet", label: "Measure your actual cabinet", external: false }],
        },
      ],
    },
    terms: {
      shortTitle: "Terms",
      metaTitle: "Terms of use",
      metaDescription: "Terms for using bricksfit display-planning data, calculators, links and third-party material.",
      eyebrow: "Terms of use",
      title: "Use bricksfit as a planning reference.",
      intro: "By using bricksfit, you agree to treat its measurements and calculator results as preliminary planning information rather than a product guarantee, professional service or purchase recommendation.",
      sections: [
        {
          title: "No fit or accuracy warranty",
          paragraphs: [
            "Dimensions can reflect a particular display posture, public-source error, rounding, inference or estimation. The calculator compares rectangular envelopes and cannot account for every hinge, door, cable, baseboard, movable part or assembly variation.",
            "Verify the built model and the clear internal furniture dimensions yourself before ordering a custom case, altering furniture or making another costly decision.",
          ],
          links: [{ href: "/methodology", label: "Understand the measurement method", external: false }],
        },
        {
          title: "Third-party names, images and links",
          paragraphs: [
            "LEGO®, product names, company names, images and linked page content belong to their respective owners. Their appearance identifies or documents the items discussed and does not imply sponsorship, authorization or endorsement.",
            "External websites control their own content, availability, privacy practices and terms. A link from bricksfit is not a warranty or endorsement of that external content.",
          ],
          links: [{ href: "/sources", label: "Read the source and rights notes", external: false }],
        },
        {
          title: "Changes and responsible use",
          paragraphs: [
            "The library, calculations and these terms may change as sources or site features evolve. Do not use the site to violate applicable law, interfere with its operation or misrepresent its data as an official manufacturer specification.",
            "If a correction or rights issue is identified, use the contact channel so the record can be reviewed.",
          ],
          links: [{ href: "/contact", label: "Contact bricksfit", external: false }],
        },
      ],
    },
  },
  de: {
    about: {
      shortTitle: "Über bricksfit",
      metaTitle: "Über bricksfit",
      metaDescription: "Warum es bricksfit gibt, wie die Informationen zur Stellflächenplanung entstehen und wie das Projekt finanziert wird.",
      eyebrow: "Über das Projekt",
      title: "Stellflächenplanung für eine praktische Frage.",
      intro: "bricksfit ist ein unabhängiges Informationsprojekt für alle, die vor dem Bauen oder Möbelkauf klären möchten, wo ein großes gebautes Klemmbausteinmodell Platz findet.",
      sections: [
        {
          title: "Was bricksfit leistet",
          paragraphs: [
            "Verpackungsmaße sind leicht zu finden, beantworten aber selten, ob das fertige Modell in ein Regal passt. bricksfit trennt Verpackungsmaße von Höhe, Breite und Tiefe des gebauten Modells und bietet anschließend einen rechteckigen ersten Passform-Check.",
            "Der Rechner ist eine Planungshilfe und keine Passformgarantie. Türen, Regalbodenträger, bewegliche Modellteile, Blickwinkel und Messtoleranzen können den nutzbaren Raum verkleinern.",
          ],
          links: [{ href: "/guides/how-to-measure-a-display-cabinet", label: "Ratgeber zum Ausmessen lesen", external: false }],
        },
        {
          title: "Redaktioneller Ansatz",
          paragraphs: [
            "Jede Set-Seite trennt die Quelle der Modellmaße vom Brickset-Datensatz zur Verpackung. Gibt es kein sinnvolles festes Gesamtmodell, nennt bricksfit das ausdrücklich, statt ein kombiniertes Maß zu erfinden.",
            "Planungsschätzungen sind im Hinweis zu den Maßen gekennzeichnet; die Methodik erklärt die vollständige Quellenhierarchie.",
          ],
          links: [{ href: "/methodology", label: "Messmethodik ansehen", external: false }],
        },
        {
          title: "Unabhängigkeit und Finanzierung",
          paragraphs: [
            "bricksfit wird weder von der LEGO Gruppe, Brickset, IKEA noch einem Möbelhersteller gesponsert, autorisiert oder unterstützt. Produkt- und Firmennamen identifizieren die verglichenen Gegenstände.",
            "Die Website lädt derzeit weder Google-AdSense-Code noch Werbe-Cookies. Falls später Werbung aktiviert wird, werden Datenschutzhinweise und Einwilligungssteuerung aktualisiert, bevor in Regionen mit Einwilligungspflicht Anzeigen ausgeliefert werden.",
          ],
          links: [{ href: "/sources", label: "Quellen- und Rechtehinweise lesen", external: false }],
        },
      ],
    },
    contact: {
      shortTitle: "Kontakt",
      metaTitle: "Kontakt zu bricksfit",
      metaDescription: "Melde Maßkorrekturen, defekte Quellen, technische Probleme oder Rechtefragen an bricksfit.",
      eyebrow: "Kontakt und Korrekturen",
      title: "Ein Maßfehler oder ein Rechteproblem gefunden?",
      intro: "bricksfit wird als öffentliches Informationsprojekt gepflegt. E-Mail ist der Kontaktweg für Korrekturen, Quellenaktualisierungen, Barrierefreiheitsprobleme und Löschanfragen.",
      sections: [
        {
          title: "Korrekturen an Maßen und Quellen",
          paragraphs: [
            "Nenne Set-Nummer, Seiten-URL, den vermutlich falschen Wert und eine öffentliche Quelle für die Korrektur. Unterscheide bitte zwischen Modell- und Verkaufsverpackungsmaßen.",
            "Sende nur die Angaben, die für die Prüfung nötig sind. Füge keine Bestelldaten, privaten Dokumente oder anderen sensiblen personenbezogenen Angaben bei, sofern sie nicht erforderlich sind.",
          ],
          links: [{ href: emailHref("bricksfit: Korrektur von Maßen oder Quellen"), label: "Korrektur per E-Mail melden", external: true }],
        },
        {
          title: "Bild-, Marken- oder Urheberrechtsfragen",
          paragraphs: [
            "Rechteinhaber oder bevollmächtigte Vertretungen können die Prüfung oder Entfernung eines Bildes beziehungsweise Verweises verlangen. Nenne die genaue Seite und das Material, erläutere deine Beziehung zu den Rechten und ermögliche eine sichere Prüfung, ohne sensible Angaben öffentlich zu machen.",
          ],
          links: [{ href: emailHref("bricksfit: Anfrage zur Rechteprüfung"), label: "Rechteprüfung per E-Mail anfragen", external: true }],
        },
        {
          title: "Datenschutz und technische Probleme",
          paragraphs: [
            "Die Website hat keine Benutzerkonten und kein Einsendeformular. Sende bei Fehlern, Barrieren oder Datenschutzfragen zur dokumentierten Analysekonfiguration eine E-Mail mit der betroffenen Seiten-URL und den nötigen Angaben.",
          ],
          links: [
            { href: "/privacy", label: "Datenschutzhinweise lesen", external: false },
            { href: emailHref("bricksfit: Datenschutz- oder technische Frage"), label: "Datenschutz- oder technische Frage mailen", external: true },
          ],
        },
      ],
    },
    sources: {
      shortTitle: "Quellen",
      metaTitle: "Daten-, Bild- und Quellenhinweise",
      metaDescription: "Wie bricksfit Brickset, offizielle Produktseiten, Modellmaße und Bilder Dritter verwendet.",
      eyebrow: "Quellen und Rechte",
      title: "Woher Daten und Bilder stammen.",
      intro: "bricksfit verlinkt die Belege seiner Maßangaben und kennzeichnet Daten, Bilder und Marken Dritter. Diese Seite erklärt die Grenzen und erteilt keine Lizenz zur Weiterverwendung fremder Inhalte.",
      sections: [
        {
          title: "Set- und Verpackungsdaten",
          paragraphs: [
            "Die Rangliste beginnt mit öffentlichen Brickset-Datensätzen und API-Daten. Teilezahlen, Themen, Veröffentlichungsangaben, Verpackungsmaße und Links zum Brickset-Datensatz bleiben auf diese Quelle zurückführbar.",
            "Maße des gebauten Modells werden getrennt behandelt. Jede Detailseite verlinkt die öffentliche Produkt- oder Referenzseite für den Modell-Datensatz; der Infohinweis kennzeichnet Werte als offiziell, direkt, abgeleitet oder geschätzt.",
          ],
          links: [
            { href: "https://brickset.com/article/52659/about-brickset", label: "Über Brickset und seine Datenbank", external: true },
            { href: "https://brickset.com/article/52666/brickset-web-services", label: "Brickset Web Services", external: true },
            { href: "/methodology", label: "bricksfit-Methodik", external: false },
          ],
        },
        {
          title: "Bilder und Marken",
          paragraphs: [
            "Set-Abbildungen werden über Brickset bezogen und jede verfügbare Abbildung ist mit ihrem Brickset-Datensatz verknüpft. Brickset unterscheidet offizielle Produktbilder von Scans und Fotos und verweist Wiederverwendende auf die Fair-Play-Richtlinie der LEGO Gruppe. bricksfit beansprucht kein Eigentum an diesen Bildern.",
            "Die Fair-Play-Hinweise der LEGO Gruppe behandeln begrenzte Vervielfältigung und Markennutzung, darunter nichtkommerzielle Bedingungen für bestimmte urheberrechtlich geschützte Inhalte. Werbung kann die rechtliche Bewertung verändern. Namensnennung allein schafft keine Erlaubnis; eine kommerzielle Nutzung sollte vor der Anzeigenaktivierung durch den Betreiber oder qualifizierte Rechtsberatung geprüft werden.",
          ],
          links: [
            { href: "https://brickset.com/article/52659/about-brickset", label: "Brickset-Bildhinweise und Namensnennung", external: true },
            { href: "https://www.lego.com/en-us/legal/notices-and-policies/fair-play", label: "Fair-Play-Richtlinie der LEGO Gruppe", external: true },
            { href: "/contact", label: "Prüfung eines Bildes oder Verweises anfragen", external: false },
          ],
        },
        {
          title: "Möbelbeispiele",
          paragraphs: [
            "Möbelnamen, veröffentlichte Außenmaße und Produktbilder stammen von den verlinkten Herstellerseiten. Nur ausdrücklich als veröffentlichter Innenraum gekennzeichnete Presets verwenden Hersteller-Innenmaße; andere Innenraumwerte sind konservative Planungsschätzungen.",
            "Herstellerseiten können sich ändern. Miss das aufgebaute Möbelstück, die Türöffnung, Scharniere und Regalbodenposition, bevor du kaufst oder einen dauerhaften Stellplatz festlegst.",
          ],
          links: [{ href: "/guides/how-to-measure-a-display-cabinet", label: "Eigenen Schrank ausmessen", external: false }],
        },
      ],
    },
    terms: {
      shortTitle: "Nutzungsbedingungen",
      metaTitle: "Nutzungsbedingungen",
      metaDescription: "Bedingungen für die Nutzung von bricksfit-Maßen, Rechnern, Links und fremden Inhalten.",
      eyebrow: "Nutzungsbedingungen",
      title: "Nutze bricksfit als Planungshilfe.",
      intro: "Mit der Nutzung von bricksfit erklärst du dich damit einverstanden, Maße und Rechnerergebnisse als vorläufige Planungsinformation zu behandeln, nicht als Produktgarantie, Fachleistung oder Kaufempfehlung.",
      sections: [
        {
          title: "Keine Passform- oder Genauigkeitsgarantie",
          paragraphs: [
            "Maße können sich auf eine bestimmte Präsentationshaltung beziehen oder Quellenfehler, Rundungen, Ableitungen und Schätzungen enthalten. Der Rechner vergleicht rechteckige Hüllräume und kann nicht jedes Scharnier, jede Tür, jedes Kabel, jede Sockelleiste, jedes bewegliche Teil oder jede Aufbauvariante berücksichtigen.",
            "Prüfe das gebaute Modell und die freien Innenmaße selbst, bevor du eine Maßvitrine bestellst, Möbel veränderst oder eine andere kostspielige Entscheidung triffst.",
          ],
          links: [{ href: "/methodology", label: "Messmethode verstehen", external: false }],
        },
        {
          title: "Namen, Bilder und Links Dritter",
          paragraphs: [
            "LEGO®, Produktnamen, Firmennamen, Bilder und verlinkte Seiteninhalte gehören ihren jeweiligen Rechteinhabern. Ihr Erscheinen identifiziert oder dokumentiert die besprochenen Gegenstände und bedeutet keine Förderung, Autorisierung oder Unterstützung.",
            "Externe Websites bestimmen ihre eigenen Inhalte, Verfügbarkeit, Datenschutzpraktiken und Bedingungen. Ein Link von bricksfit ist keine Garantie oder Empfehlung für diese externen Inhalte.",
          ],
          links: [{ href: "/sources", label: "Quellen- und Rechtehinweise lesen", external: false }],
        },
        {
          title: "Änderungen und verantwortliche Nutzung",
          paragraphs: [
            "Bibliothek, Berechnungen und diese Bedingungen können sich mit Quellen oder Funktionen ändern. Nutze die Website nicht rechtswidrig, störe ihren Betrieb nicht und stelle ihre Daten nicht als offizielle Herstellerspezifikation dar.",
            "Melde Korrektur- oder Rechtefragen über den Kontaktweg, damit der Datensatz geprüft werden kann.",
          ],
          links: [{ href: "/contact", label: "bricksfit kontaktieren", external: false }],
        },
      ],
    },
  },
  zh: {
    about: {
      shortTitle: "关于",
      metaTitle: "关于 bricksfit",
      metaDescription: "了解 bricksfit 的用途、展示空间数据整理方式，以及项目的独立性与资金说明。",
      eyebrow: "关于本项目",
      title: "围绕一个实际问题做展示空间规划。",
      intro: "bricksfit 是一个独立参考项目，帮助你在动手搭建或购买家具之前，先判断大型积木成品可以摆在哪里。",
      sections: [
        {
          title: "bricksfit 能做什么",
          paragraphs: [
            "零售包装尺寸很容易找到，却通常无法回答拼装成品能否放进书架。bricksfit 始终把包装尺寸与成品的高、宽、深分开，再用矩形外包络做第一步适配检查。",
            "计算结果只是规划参考，不是放得下的承诺。柜门、层板固定件、模型活动部件、观看角度和测量误差都可能减少实际可用空间。",
          ],
          links: [{ href: "/guides/how-to-measure-a-display-cabinet", label: "阅读柜体测量指南", external: false }],
        },
        {
          title: "内容整理原则",
          paragraphs: [
            "每个套装详情页都会把成品尺寸来源与 Brickset 包装记录分开。若产品不存在一个有实际意义的固定整体尺寸，bricksfit 会明确说明，而不会虚构一组组合尺寸。",
            "规划估值会在尺寸信息提示中标明；方法说明页解释完整的证据层级。",
          ],
          links: [{ href: "/methodology", label: "查看尺寸整理方法", external: false }],
        },
        {
          title: "独立性与资金说明",
          paragraphs: [
            "bricksfit 未获 LEGO 集团、Brickset、IKEA 或任何家具品牌赞助、授权或认可。产品名和公司名仅用于识别被比较的对象。",
            "网站目前没有加载 Google AdSense 代码，也没有广告 Cookie。若将来启用广告，会先更新隐私说明与同意控制，再在依法需要同意的地区展示广告。",
          ],
          links: [{ href: "/sources", label: "查看来源与权利说明", external: false }],
        },
      ],
    },
    contact: {
      shortTitle: "联系",
      metaTitle: "联系 bricksfit",
      metaDescription: "向 bricksfit 反馈尺寸纠错、来源失效、技术问题或权利相关事项。",
      eyebrow: "联系与纠错",
      title: "发现尺寸问题或权利相关事项？",
      intro: "bricksfit 以公开参考项目的方式维护。数据纠错、来源更新、无障碍问题和移除请求均通过电子邮件联系。",
      sections: [
        {
          title: "尺寸与来源纠错",
          paragraphs: [
            "请提供套装编号、页面网址、疑似有误的数值，以及支持纠正的公开来源；请明确区分拼装成品尺寸与零售包装尺寸。",
            "请只发送审核纠错所需的信息；除非确有必要，请勿附带订单资料、私人文件或其他敏感个人信息。",
          ],
          links: [{ href: emailHref("bricksfit：尺寸或来源纠错"), label: "发送纠错邮件", external: true }],
        },
        {
          title: "图片、商标或版权事项",
          paragraphs: [
            "权利人或经授权的代表可以请求审核或移除图片及引用。请指出具体页面与材料，说明你与相关权利的关系，并提供不会公开敏感信息的安全核验方式。",
          ],
          links: [{ href: emailHref("bricksfit：权利审核请求"), label: "发送权利审核邮件", external: true }],
        },
        {
          title: "隐私与技术问题",
          paragraphs: [
            "网站没有用户账户，也没有站内提交表单。若要反馈故障、无障碍问题，或咨询已公开说明的网站分析配置，请通过邮件提供相关页面网址和必要说明。",
          ],
          links: [
            { href: "/privacy", label: "阅读隐私说明", external: false },
            { href: emailHref("bricksfit：隐私或技术问题"), label: "发送隐私或技术问题邮件", external: true },
          ],
        },
      ],
    },
    sources: {
      shortTitle: "来源",
      metaTitle: "数据、图片与来源说明",
      metaDescription: "说明 bricksfit 如何使用 Brickset、品牌官方产品页、模型尺寸与第三方图片。",
      eyebrow: "来源与权利",
      title: "数据和图片来自哪里。",
      intro: "bricksfit 会链接尺寸记录背后的依据，并清楚标注第三方数据、图片和商标。本页用于说明边界，不构成对第三方材料的再使用许可。",
      sections: [
        {
          title: "套装与包装数据",
          paragraphs: [
            "套装排名资料库以公开的 Brickset 套装记录和 API 数据为起点。零件数、主题、发布信息、包装尺寸和 Brickset 记录链接都可追溯到该来源。",
            "拼装成品尺寸单独处理。每个详情页都会链接该模型记录所依据的公开产品页或参考页；信息提示会标明数值属于官方、直接摘录、推断或估算。",
          ],
          links: [
            { href: "https://brickset.com/article/52659/about-brickset", label: "了解 Brickset 及其数据库", external: true },
            { href: "https://brickset.com/article/52666/brickset-web-services", label: "Brickset Web Services", external: true },
            { href: "/methodology", label: "bricksfit 尺寸整理方法", external: false },
          ],
        },
        {
          title: "图片与商标",
          paragraphs: [
            "套装图片经由 Brickset 获取，每张可用图片都会链接到对应的 Brickset 记录。Brickset 区分官方产品图与扫描件、照片，并要求再发布者参照 LEGO 集团的 Fair Play 规则。bricksfit 不主张拥有这些图片。",
            "LEGO 集团的 Fair Play 说明涉及有限复制与商标使用，其中部分受版权保护材料带有非商业条件。加入广告可能改变法律判断。仅注明来源并不会自动取得许可；启用广告前，运营者应自行审查商业使用权，必要时咨询合格的知识产权律师。",
          ],
          links: [
            { href: "https://brickset.com/article/52659/about-brickset", label: "Brickset 图片与署名说明", external: true },
            { href: "https://www.lego.com/en-us/legal/notices-and-policies/fair-play", label: "LEGO 集团 Fair Play 规则", external: true },
            { href: "/contact", label: "申请审核图片或引用", external: false },
          ],
        },
        {
          title: "家具示例",
          paragraphs: [
            "家具名称、公开的外部尺寸和产品图片来自所链接的品牌官方产品页。只有明确标为“官网内部净空”的预设采用品牌公布的内部尺寸，其他净空数值均为偏保守的规划估值。",
            "品牌页面可能变化。购买家具或确定长期展示位置前，请实测组装后的柜体、门框、铰链和层板位置。",
          ],
          links: [{ href: "/guides/how-to-measure-a-display-cabinet", label: "测量你实际使用的柜体", external: false }],
        },
      ],
    },
    terms: {
      shortTitle: "使用条款",
      metaTitle: "使用条款",
      metaDescription: "使用 bricksfit 展示规划数据、计算器、外部链接和第三方材料时适用的条款。",
      eyebrow: "使用条款",
      title: "请把 bricksfit 当作规划参考。",
      intro: "使用 bricksfit 即表示你同意：网站尺寸和计算结果属于前期规划信息，不是产品保证、专业服务或购买建议。",
      sections: [
        {
          title: "不保证适配或绝对准确",
          paragraphs: [
            "尺寸可能对应特定展示姿态，也可能包含公开来源错误、四舍五入、推断或估算。计算器比较矩形外包络，无法覆盖每个铰链、柜门、线缆、踢脚板、活动部件或搭建差异。",
            "订购定制展示柜、改造家具或作出其他高成本决定前，请自行核对拼装实物和柜体内部净尺寸。",
          ],
          links: [{ href: "/methodology", label: "了解尺寸整理方法", external: false }],
        },
        {
          title: "第三方名称、图片与链接",
          paragraphs: [
            "LEGO®、产品名、公司名、图片和所链接页面内容归各自权利人所有。它们用于识别或记录所讨论的对象，不代表任何赞助、授权或认可。",
            "外部网站自行控制其内容、可用性、隐私做法和使用条款。bricksfit 提供链接不等于对外部内容作出保证或背书。",
          ],
          links: [{ href: "/sources", label: "阅读来源与权利说明", external: false }],
        },
        {
          title: "变更与合理使用",
          paragraphs: [
            "资料库、计算方式和本条款可能随来源或网站功能更新。请勿利用本站违反适用法律、干扰网站运行，或把本站数据冒充品牌官方规格。",
            "如发现数据纠错或权利问题，请通过联系渠道提交，以便审核相关记录。",
          ],
          links: [{ href: "/contact", label: "联系 bricksfit", external: false }],
        },
      ],
    },
  },
} as const satisfies Record<Locale, InformationPages>;

export function isInformationPage(value: string): value is InformationPageName {
  return informationPageNames.some((name) => name === value);
}

export function getInformationPage(locale: Locale, page: InformationPageName) {
  return informationPages[locale][page];
}
