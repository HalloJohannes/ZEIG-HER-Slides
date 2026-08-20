import { promises as fs } from "node:fs";

const registry = JSON.parse(await fs.readFile("quality/design-system-registry.json", "utf8"));
const template = await fs.readFile("src/workshop.html", "utf8");
const outfitBase64=(await fs.readFile("src/assets/outfit-latin.woff2.base64","utf8")).replace(/\s/g,"");
const outfitCss=`@font-face{font-family:"Outfit";font-style:normal;font-weight:300 800;font-display:swap;src:url(data:font/woff2;base64,${outfitBase64}) format("woff2");}`;
const embedded = JSON.stringify(registry).replaceAll("</", "<\\/");
const output = template
  .replace("/* @include workshop/outfit-font.css */",outfitCss)
  .replaceAll("__PRODUCT_VERSION__",registry.productVersion)
  .replace("__DESIGN_SYSTEM_REGISTRY__", embedded);

if (output === template||output.includes("workshop/outfit-font.css")||output.includes("__PRODUCT_VERSION__")) throw new Error("Registry-, Versions- oder Schrift-Einfügemarke fehlt in der Werkstattquelle.");
await fs.writeFile("ZEIG-HER-Slides-Werkstatt.html.tmp", output);
await fs.rename("ZEIG-HER-Slides-Werkstatt.html.tmp", "ZEIG-HER-Slides-Werkstatt.html");
console.log(`Werkstatt gebaut: ${registry.tokenGroups.length} Tokengruppen / ${registry.components.length} Komponenten`);
