import assert from "node:assert/strict";
import { promises as fs } from "node:fs";

const release = JSON.parse(await fs.readFile("quality/release-metadata.json", "utf8"));
const registry = JSON.parse(await fs.readFile("quality/design-system-registry.json", "utf8"));
const html = await fs.readFile("ZEIG-HER-Slides-Werkstatt.html", "utf8");

assert.equal(registry.productVersion, release.version, "Werkstatt und Produktversion weichen ab.");
assert.ok(registry.tokenGroups.length >= 4, "Zu wenige Tokengruppen registriert.");
assert.ok(registry.components.length >= 40, "Das Oberflächeninventar ist unvollständig.");
assert.equal(new Set(registry.components.map((item) => item.id)).size, registry.components.length, "Doppelte Komponenten-ID.");
assert.equal(registry.components.filter((item) => item.blockKind).length, 14, "Die 14 Bausteinverträge sind nicht vollständig.");
assert.equal(registry.tokenGroups.flatMap((group) => group.tokens).filter((item) => item.status === "canonical").length, 18, "Die kanonischen Produkttokens sind nicht vollständig.");
assert.ok(html.includes(`Produkt ${release.version}`), "Produktversion fehlt in der gebauten Werkstatt.");
assert.ok(!html.includes("__DESIGN_SYSTEM_REGISTRY__"), "Registry wurde nicht eingebettet.");
assert.ok(html.includes("data-workshop-root"), "Werkstattwurzel fehlt.");

const invalid = registry.components.filter((item) => !registry.statusDefinitions[item.status]);
assert.deepEqual(invalid, [], "Komponenten besitzen unbekannte Statuswerte.");
console.log("Werkstatt-Vertrag bestanden.");
