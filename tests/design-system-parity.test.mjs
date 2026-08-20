import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import vm from "node:vm";

const registry = JSON.parse(await fs.readFile("quality/design-system-registry.json", "utf8"));
const source = await fs.readFile("src/app.html", "utf8");
const runtime = await fs.readFile("src/runtime/ui-contracts.js", "utf8");
const networkRuntime=await fs.readFile("src/runtime/network-zero.js","utf8");
const searchableProduct=`${source}\n${runtime}\n${networkRuntime}`;

test("Registry ist eindeutig und vollständig beschrieben", () => {
  assert.equal(registry.schemaVersion, 2);
  assert.ok(registry.components.length >= 40);
  const ids = registry.components.map(item => item.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const item of registry.components) {
    for (const field of ["id", "label", "selector", "status", "family", "contract", "sample"]) assert.ok(item[field], `${item.id}: ${field} fehlt`);
  }
});

test("13 kanonische Bausteinarten werden ausschließlich aus der Registry abgeleitet", () => {
  const context = {};
  vm.runInNewContext(`${runtime};this.kinds=designBlockKinds(${JSON.stringify(registry)});`, context);
  assert.deepEqual(Array.from(context.kinds, item => item.k), ["kicker","heading","chap","text","note","prompt","image","box","table","space","line","cols","reveal"]);
  assert.match(source, /var KINDS=designBlockKinds\(DESIGN_SYSTEM_REGISTRY\);/);
  assert.doesNotMatch(source, /var KINDS=\[/);
});

test("Produktquelle besitzt alle Registry-Einfügemarken", () => {
  for (const marker of ["design-system/tokens.css", "design-system/registry.js", "runtime/ui-contracts.js"]) assert.equal(source.split(`/* @include ${marker} */`).length - 1, 1);
});

test("Alle inventarisierten Produktselektoren sind in der Produktquelle auffindbar", () => {
  for (const item of registry.components) {
    const alternatives = item.selector.split(",").map(value => value.trim());
    const exists = alternatives.some(selector => {
      if (searchableProduct.includes(selector)) return true;
      if (/^#[a-z0-9_-]+$/i.test(selector)) return searchableProduct.includes(`id="${selector.slice(1)}"`);
      const attribute=selector.match(/^\[([a-z0-9_-]+)=['"]([^'"]+)['"]\]$/i);
      if(attribute)return searchableProduct.includes(attribute[1])&&searchableProduct.includes(attribute[2]);
      return false;
    });
    assert.ok(exists, `${item.id}: ${item.selector}`);
  }
});

test("Kanonische Tokens sind eindeutig", () => {
  const tokens = registry.tokenGroups.flatMap(group => group.tokens).filter(token => token.status === "canonical");
  assert.equal(tokens.length, 18);
  assert.equal(new Set(tokens.map(token => token.css)).size, tokens.length);
});
