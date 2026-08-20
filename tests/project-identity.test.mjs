import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import test from "node:test";
import vm from "node:vm";

async function loadIdentityRuntime(){
  const source=await fs.readFile("src/runtime/project-identity.js","utf8");
  const context={
    Date,
    Math,
    Number,
    TypeError,
    crypto:{randomUUID:()=>"123e4567-e89b-12d3-a456-426614174000"}
  };
  vm.runInNewContext(`${source}\nglobalThis.identityApi={ensureProjectIdentity,touchProject,projectStorageKey};`,context);
  return context.identityApi;
}

test("eine fehlende Projekt-ID wird stabil und namensunabhängig ergänzt",async()=>{
  const api=await loadIdentityRuntime();
  const deck={meta:{name:"Erster Name"},slides:[]};
  const id=api.ensureProjectIdentity(deck,Date.parse("2026-08-18T10:00:00.000Z"));
  deck.meta.name="Anderer Name";
  assert.equal(id,"p-123e4567-e89b-12d3-a456-426614174000");
  assert.equal(api.ensureProjectIdentity(deck,Date.parse("2026-08-19T10:00:00.000Z")),id);
  assert.equal(api.projectStorageKey(deck),`proj:${id}`);
});

test("Erstellungszeit bleibt unverändert und Änderungszeit wird fortgeschrieben",async()=>{
  const api=await loadIdentityRuntime();
  const deck={meta:{},slides:[]};
  api.ensureProjectIdentity(deck,Date.parse("2026-08-18T10:00:00.000Z"));
  api.touchProject(deck,Date.parse("2026-08-18T11:30:00.000Z"));
  assert.equal(deck.meta.createdAt,"2026-08-18T10:00:00.000Z");
  assert.equal(deck.meta.updatedAt,"2026-08-18T11:30:00.000Z");
});

test("ungültige Legacy-IDs werden ersetzt, gültige bleiben erhalten",async()=>{
  const api=await loadIdentityRuntime();
  const invalid={meta:{pid:"?"},slides:[]};
  const valid={meta:{pid:"zeig-her-demo"},slides:[]};
  assert.equal(api.ensureProjectIdentity(invalid,0),"p-123e4567-e89b-12d3-a456-426614174000");
  assert.equal(api.ensureProjectIdentity(valid,0),"zeig-her-demo");
});

test("die Browserbibliothek wird ausschließlich über Projekt-IDs adressiert",async()=>{
  const html=await fs.readFile("src/app.html","utf8");
  assert.match(html,/idbSet\(projectKey\(DATA\),record/);
  assert.doesNotMatch(html,/idbSet\("proj:"\+projName\(\)/);
  assert.match(html,/migrateProjectLibrary\(function\(\)\{seedProgramDemo\(function\(\)\{refreshProjects\(\);\}\);\}\)/);
  assert.match(html,/var DEMO_PROJECT_ID="zeig-her-demo"/);
  assert.match(html,/if\(projectId===DEMO_PROJECT_ID\)/);
});
