import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const run=promisify(execFile);
const release=JSON.parse(await fs.readFile("quality/release-metadata.json","utf8"));
const tagCommit=async tag=>(await run("git",["rev-list","-n","1","--abbrev-commit",tag])).stdout.trim();
const commits=Object.fromEntries(await Promise.all(
  ["V0.031","V0.032","V0.033","V0.034","V0.035","V0.036","V0.037","V0.038"].map(async tag=>[tag,await tagCommit(tag)])
));

const outputDir="outputs/governance";
const previewDir=".quality-runtime/versionsregister-previews";
await fs.mkdir(outputDir,{recursive:true});
await fs.mkdir(previewDir,{recursive:true});

const versions=[
  ["V0.017",new Date("2026-08-18T00:00:00Z"),"Governance-Baseline","Baseline","Bestanden","Gebündelt offen","9859428","V0.017","577c374413b8bf48cda4c4d73144077a4c17d7482f21ca26e4155874c93d07b8","Unveränderte Übernahme und Rückfallbasis","Speicher- und Viewer-Risiken bewusst offen"],
  ["V0.018",new Date("2026-08-18T00:00:00Z"),"Produktidentität und Werkstatt","Governance","Bestanden","Gebündelt offen","7f217de","V0.018","8882f923746afc9c5773c51767af537ef80649864b80309cb74328bb3d613710","Produktkennung, Releasevertrag, Token-/Komponentenwerkstatt","0 kanonische Komponenten bis gemeinsamer Quellbezug"],
  ["V0.019",new Date("2026-08-18T00:00:00Z"),"Stabile Projektidentität","Persistenzbasis","Bestanden","Gebündelt offen","85380ca","V0.019","3fe07267418fb9c91ad836ec054f50da577c3b4f4bdf6c7e6f67a4d28ec65a11","Projekt-ID, Zeitstempel, ID-basierte Bibliothek","Dateibindung und Wechsel folgen in V0.020"],
  ["V0.020",new Date("2026-08-18T00:00:00Z"),"Ehrliches Speichermodell","Persistenz","Bestanden","Gebündelt offen","cf6b463","V0.020","750a1620f633f21862cf80df8aa5426560001f2e1f098030e013ed785b13015b","Speicherorte, Dateibindung, sichere Projektwechsel","Schema und Migration folgen in V0.021"],
  ["V0.021",new Date("2026-08-19T00:00:00Z"),"Schema und Migration","Datenqualität","Bestanden","Gebündelt offen","3fa7e59","V0.021","4ac95bbc48657ff2149582452fd5afaf8f1bcee32fbd5f5455c8f195cce43d95","Schema-2-Validierung, Migration, Quarantäne und reale Altdateien","Inhaltssanitization und Ressourcenlimits folgen in V0.022"],
  ["V0.022",new Date("2026-08-19T00:00:00Z"),"Import- und Inhaltsgrenze","Sicherheit","Bestanden","Gebündelt offen","53e1e5f","V0.022","e5f88918a48b4ae413908365aba81881eb4a757ca8c90bf54eb4243725433465","HTML-, URL-, Embed-, Bild-, Datei- und PPTX-Vertrauensgrenze","Netzwerk-Null und CSP folgen kontrolliert in V0.027"],
  ["V0.023",new Date("2026-08-19T00:00:00Z"),"Modulare Designsystemquelle","Architektur","Bestanden","Gebündelt offen","8605131","V0.023","efa38ba2267f36ec9b95d72535d1f536564c69a8d4508303685731462f8cbfdc","11 gemeinsame Tokens, 14 Bausteinverträge, 45 Oberflächen","Renderer-/Storage-Zerlegung folgt risikobezogen"],
  ["V0.024",new Date("2026-08-19T00:00:00Z"),"Dedizierte Ansichtsdatei","Viewer","Bestanden","Gebündelt offen","1be2219","V0.024","d43cf20eeb6c90194daf39d31daba237188dcdf1b5a208ede7ccd432851f48a1","Eigene Runtime, Minimalvertrag, keine Editor- oder Speicherlogik","Reale Workshop-Sichtabnahme bleibt gebündelt"],
  ["V0.025",new Date("2026-08-19T00:00:00Z"),"Bild- und Rendering-Performance","Performance","Bestanden","Gebündelt offen","e9c9a21","V0.025","5003b77587a3eaa807a8368ca7480d67886bf54f73a22ec905cdcd62394afb24","Decode-Queue, Freigabe, Blob-Kodierung, reale Lastmessung","Gefühlte Flüssigkeit bleibt Teil der Schlussabnahme"],
  ["V0.026",new Date("2026-08-19T00:00:00Z"),"Stabilitätsmatrix und Konsolidierung","Stabilität","Bestanden","Gebündelt offen","87ab989","V0.026","473b1d7f2811d04128262fa32fccc71341e40a471929c584cf7c7976004886ff","20 Fälle, reale Doppel-Roundtrips, Schreibgate und Browser-Rückfall","Subjektive Gesamtnutzung bleibt Teil der Schlussabnahme"],
  ["V0.027",new Date("2026-08-19T00:00:00Z"),"Offline-Bereitstellung und Netzwerk-Null","Deployment","Bestanden","Gebündelt offen","9a2b487","V0.027","2c7340303007d3ce950a187cd5c18e19fb5ab1c77514968d0a2a0e831e89ddb3","Outfit lokal, Emoji-frei, CSP, Netzwerkwächter und Offline-PWA","Hostprotokolle bleiben eigener organisatorischer Betriebsbereich"],
  ["V0.028",new Date("2026-08-19T00:00:00Z"),"Externe Nachweise und Betriebsfreigabe","Governance","Bestanden","Gebündelt offen","146c13f","V0.028","d3c80eb5e9e9b513167e0e40a37a92462326275272405e65c2f7df3cf1762ad1","16-Dateien-Nachweis, Betriebsregeln, Browser- und Offline-Vorprüfung","Menschliche 12-Punkte-Sichtabnahme vorbereitet"],
  ["V0.029",new Date("2026-08-19T00:00:00Z"),"Projektportabilität und kompakte Nachlese","Portabilität","Bestanden","Gebündelt offen","6836edf","V0.029","d5764e5d9ccf3e083c6bbb90ea7f20a65ce82aad2b0485fa952e0952c34c0aab","Schema-3-Bildrettung, decode-sicherer Neuaufbau, Projektdatei-Fluss, Ebenen und Handout","Gebündelte Sichtabnahme durch Johannes offen"],
  ["V0.030",new Date("2026-08-19T00:00:00Z"),"Vollrahmen-Navigation und klare Dateifreigabe","Navigation","Bestanden","Gebündelt offen","15ee115","V0.030","875e8daebe68b6829c60855a0ea49e228f0e80fe1c60fc7861ac4f9ac241894c","Gemeinsamer Kamera-Fit, modaler Dateiwegweiser, rahmengebundene Ebenen und reduzierte Demo","Gebündelte Sichtabnahme durch Johannes offen"],
  ["V0.031",new Date("2026-08-19T00:00:00Z"),"Ebenenvorschau und eindeutiger Root","Bearbeitung","Bestanden","Gebündelt offen",commits["V0.031"],"V0.031","924d72450f6c675f869d048ba52f4947610648e9847cde1448dd970214d9bb1d","Flüchtige Hover-/Fokusvorschau im Ebenenmenü und bereinigte Root-Ebene","Gebündelte Sichtabnahme durch Johannes offen"],
  ["V0.032",new Date("2026-08-19T00:00:00Z"),"Klare Projektwege und portable Ausgaben","Dateien und UX","Bestanden","Gebündelt offen",commits["V0.032"],"V0.032","321b35d19a85ad905df469cbf9573d22b13e75eeaac7b7b08927b3b7153d6eb6","Lokale und portable Wege, neutrale Programmdatei, PDF-Handout, Logo-Werkzeuge und kanonischer Kasten-Dialog","Gebündelte Sichtabnahme durch Johannes offen"],
  ["V0.033",new Date("2026-08-19T00:00:00Z"),"Sichtbarer Ansichts-Export","Viewer","Bestanden","Gebündelt offen",commits["V0.033"],"V0.033","8ea2d0b23b3a4156c6c0ce66f8fc0a611561bdddabd8195095875d34257a49e9","Doppelte Bereinigung temporärer Virtualisierungszustände in Snapshot und Viewer","Gebündelte Sichtabnahme durch Johannes offen"],
  ["V0.034",new Date("2026-08-19T00:00:00Z"),"Kamera und Notizen","Navigation","Bestanden","Gebündelt offen",commits["V0.034"],"V0.034","c9d66a9b736d4726ada720f14e4d1cbd7b1b931ab6075a8bf836fcb6af5b20e6","Ausgewogener Kamera-Fit, enger Kapitelübergang und Notizen außerhalb des Rahmens","Gebündelte Sichtabnahme durch Johannes offen"],
  ["V0.035",new Date("2026-08-19T00:00:00Z"),"Stabile Ansichts-Navigation","Viewer","Bestanden","Gebündelt offen",commits["V0.035"],"V0.035","970f3336217552578c648b05b65015d2af8bf550d6aba1434e16f757c5346a08","Feste Navigation, Kapitelgruppen und PNG-Transparenz im eigenständigen Viewer","Gebündelte Sichtabnahme durch Johannes offen"],
  ["V0.036",new Date("2026-08-19T00:00:00Z"),"Farbe als eigenes Werkzeug","Bearbeitung","Bestanden","Gebündelt offen",commits["V0.036"],"V0.036","1b7d89f102a570b56849e725ec6c1a3f65b8dc8e19073e8f2fde3aac96b06a56","Kanonischer Farbendialog und logisch geordnete Bearbeitungsleiste","Gebündelte Sichtabnahme durch Johannes offen"],
  ["V0.037",new Date("2026-08-19T00:00:00Z"),"Technische Produktreife und lokale Resilienz","Stabilität","Bestanden","Gebündelt offen",commits["V0.037"],"V0.037","80f124b569925ad122b96abbe22e604264b3c74cf87ef6b67e1c69cddf781c93","Rollierende Sicherungen, Speicherwächter, Diagnose und transaktionaler PPTX-Import","Gebündelte Sichtabnahme durch Johannes offen"],
  ["V0.038",new Date("2026-08-19T00:00:00Z"),"Produktreife und reale Sichtprüfung","Freigabe","Bestanden","Gebündelt offen",commits["V0.038"],"V0.038","37890bb06ea6e35bf2f4faa0142c5487c2bbdd58fc4c78c60ba81849afa9e16e","Gemeinsamer Kamera-/Notizvertrag, präziser Viewer, technische Resilienz und reale 30-Stationen-Prüfung","Abschließende Sichtentscheidung durch Johannes offen"],
  ["V0.039",new Date("2026-08-19T00:00:00Z"),"Sichere Bibliothek und skalierbare Navigation","Bedienung und Persistenz","Bestanden","Gebündelt offen","siehe Git-Tag","V0.039","5b5cb6f0e96f95fe2dada1464922c056c625f71d4c69bc8fba03fb8b4527c225","Scrollbarer Stationspfad, kompakte Kapitelmarke, feste Demo, bestätigtes Löschen, benannter Projektstart und verständlicher Speicherhinweis","Abschließende Sichtentscheidung durch Johannes offen"],
  ["V0.040",new Date("2026-08-19T00:00:00Z"),"Transparenz, Offline-Grenzen und Materiallizenz","Transparenz und Export","Bestanden","Gebündelt offen","gebündelt in V0.041","kein separater Tag","f94052169ddd38b6ff9309f28a521bf338ce53d60330f377c4fa199fc47bc040","Gemeinsame Infofläche, ehrliche Offline-Grenzen sowie getrennte Autoren-, Material- und Softwarelizenz","Abschließende Sichtentscheidung durch Johannes offen"],
  ["V0.041",new Date("2026-08-19T00:00:00Z"),"Produktumbenennung und kompatible Migration","Identität und Persistenz","Bestanden","Gebündelt offen","siehe Git-Tag","V0.041","890d51aeecab46075a41c0d969a23fff10f5cd833ee4d154f345f37de09261ae","ZEIG HER Slides in allen aktuellen Artefakten, duale Legacy-Migration und alte Projektdateien weiterhin lesbar","Abschließende Sichtentscheidung durch Johannes offen"],
  ["V0.042",new Date("2026-08-19T00:00:00Z"),"Stabile Kamera und vollständige Ansichtsübersicht","Viewer und Navigation","Bestanden","Gebündelt offen","siehe Git-Tag","V0.042",release.sha256,"Kollisionsfreies HUD, gemeinsamer Kamera-Nachlauf, Kapitelmarken und Stationsfokus in der Ansichtsübersicht","Abschließende Sichtentscheidung durch Johannes offen"],
];

// Kurze Git-Hashes wie "4e05824" dürfen von Tabellenprogrammen nicht als
// Exponentialzahl interpretiert werden. Das Präfix macht alle Kennungen
// formatunabhängig eindeutig und hält sie auch im PDF-/PNG-Rendering stabil.
for(const row of versions){
  if(/^[0-9a-f]{7,40}$/i.test(String(row[6])))row[6]=`git:${row[6]}`;
}

const gates=[
  ["V0.017","Bestanden","Bestanden","Nicht geprüft","Offen","Offen","Offen","Nicht geprüft","Offen"],
  ["V0.018","Bestanden","Bestanden","Bestanden","Offen","Offen","Offen","Nicht geprüft","Offen"],
  ["V0.019","Bestanden","Bestanden","Bestanden","Teilweise","Offen","Offen","Nicht geprüft","Offen"],
  ["V0.020","Bestanden","Bestanden","Bestanden","Bestanden","Offen","Offen","Nicht geprüft","Offen"],
  ["V0.021","Bestanden","Bestanden","Bestanden","Bestanden","Teilweise","Offen","Teilweise","Offen"],
  ["V0.022","Bestanden","Bestanden","Bestanden","Bestanden","Teilweise","Teilweise","Teilweise","Offen"],
  ["V0.023","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Teilweise","Teilweise","Offen"],
  ["V0.024","Bestanden","Bestanden","Bestanden","Nicht geprüft","Bestanden","Bestanden","Nicht geprüft","Offen"],
  ["V0.025","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.026","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.027","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.028","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.029","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.030","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.031","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.032","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.033","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.034","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.035","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.036","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.037","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.038","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.039","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.040","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.041","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
  ["V0.042","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Bestanden","Offen"],
];

const versionEndRow=4+versions.length;
const gateEndRow=4+gates.length;

const workbook=Workbook.create();
const overview=workbook.worksheets.add("Übersicht");
const versionSheet=workbook.worksheets.add("Versionen");
const gateSheet=workbook.worksheets.add("Qualitätsgates");
const acceptance=workbook.worksheets.add("Sichtabnahme");

const petrol="#123C4A",teal="#4FB3AA",mint="#E2F1F1",coral="#F25D68",paper="#F7FCFB",muted="#55747D";
for(const sheet of [overview,versionSheet,gateSheet,acceptance])sheet.showGridLines=false;

overview.getRange("A1:H2").merge();
overview.getRange("A1").values=[["ZEIG HER Slides · Versionsregister"]];
overview.getRange("A1:H2").format={fill:petrol,font:{bold:true,color:"#FFFFFF",size:20},verticalAlignment:"center"};
overview.getRange("A4:B4").values=[["Kennzahl","Stand"]];
overview.getRange("A5:A9").values=[["Aktuelle Produktversion"],["Technisch bestandene Versionen"],["Geplante Versionen"],["Offene manuelle Schlussabnahme"],["Letzte Aktualisierung"]];
overview.getRange("B5").formulas=[[`='Versionen'!A${versionEndRow}`]];
overview.getRange("B6").formulas=[[`=COUNTIF('Versionen'!$E$5:$E$${versionEndRow},"Bestanden")`]];
overview.getRange("B7").formulas=[[`=COUNTIF('Versionen'!$E$5:$E$${versionEndRow},"Geplant")`]];
overview.getRange("B8").formulas=[[`=COUNTIF('Versionen'!$F$5:$F$${versionEndRow},"Gebündelt offen")`]];
overview.getRange("B9").values=[[new Date("2026-08-19T00:00:00Z")]];
overview.getRange("B9").format.numberFormat="yyyy-mm-dd";
overview.getRange("D4:H4").merge();
overview.getRange("D4").values=[["Verbleibender kontrollierter Schritt"]];
overview.getRange("D5:H5").merge();
overview.getRange("D5").values=[["Gebündelte Sichtabnahme durch Johannes"]];
overview.getRange("D6:H8").merge();
overview.getRange("D6").values=[["V0.042 ist technisch bestanden. Der Prüflauf deckt zusätzlich das kollisionsfreie HUD, den wiederholten Kamera-Fit nach Bild- und Layoutänderungen, sichtbare Kapitelmarken sowie den direkten Stationsfokus aus der Ansichtsübersicht ab. Offen bleibt nur die gebündelte Sichtentscheidung durch Johannes."]];
overview.getRange("D10:H10").merge();
overview.getRange("D10").values=[["Freigaberegel"]];
overview.getRange("D11:H14").merge();
overview.getRange("D11").values=[["Eine Version gilt technisch nur nach grünem zentralem Prüflauf, byteidentischen Release-Spiegeln, dokumentiertem Audit und Git-Tag. Die menschliche Sichtabnahme bleibt davon getrennt und wird wie vereinbart gebündelt am aktuellen V0.042-Stand durchgeführt."]];
overview.getRange("A4:B9").format.borders={preset:"inside",style:"thin",color:"#C9DEDC"};
overview.getRange("A4:B4").format={fill:teal,font:{bold:true,color:"#FFFFFF"}};
overview.getRange("A5:A9").format={fill:mint,font:{bold:true,color:petrol}};
overview.getRange("B5:B9").format={fill:"#FFFFFF",font:{bold:true,color:petrol}};
overview.getRange("D4:H4").format={fill:coral,font:{bold:true,color:"#FFFFFF"}};
overview.getRange("D5:H5").format={fill:mint,font:{bold:true,color:petrol,size:14}};
overview.getRange("D6:H8").format={fill:paper,font:{color:petrol},wrapText:true,verticalAlignment:"top"};
overview.getRange("D6:H8").format.rowHeight=24;
overview.getRange("D10:H10").format={fill:teal,font:{bold:true,color:"#FFFFFF"}};
overview.getRange("D11:H14").format={fill:paper,font:{color:petrol},wrapText:true,verticalAlignment:"top"};
overview.getRange("D11:H14").format.rowHeight=20;
overview.getRange("A1:H14").format.font={name:"Aptos",size:11};
overview.getRange("A1:A14").format.columnWidth=31;
overview.getRange("B1:B14").format.columnWidth=20;
overview.getRange("C1:C14").format.columnWidth=3;
overview.getRange("D1:H14").format.columnWidth=16;
overview.freezePanes.freezeRows(2);

versionSheet.getRange("A1:K2").merge();
versionSheet.getRange("A1").values=[["Produktversionen und technische Nachweise"]];
versionSheet.getRange("A1:K2").format={fill:petrol,font:{bold:true,color:"#FFFFFF",size:18},verticalAlignment:"center"};
versionSheet.getRange("A4:K4").values=[["Version","Datum","Titel","Block","Automatik","Manuell","Commit","Git-Tag","SHA-256","Schwerpunkt","Grenze / Hinweis"]];
versionSheet.getRange(`A5:K${versionEndRow}`).values=versions;
versionSheet.getRange(`B5:B${versionEndRow}`).format.numberFormat="yyyy-mm-dd";
versionSheet.getRange("A4:K4").format={fill:teal,font:{bold:true,color:"#FFFFFF"},wrapText:true};
versionSheet.getRange(`A5:K${versionEndRow}`).format={font:{name:"Aptos",size:10,color:petrol},verticalAlignment:"top"};
versionSheet.getRange(`C5:K${versionEndRow}`).format.wrapText=true;
versionSheet.getRange(`A4:K${versionEndRow}`).format.borders={insideHorizontal:{style:"thin",color:"#D8E8E6"},bottom:{style:"thin",color:"#A8C8C5"}};
versionSheet.getRange(`E5:E${versionEndRow}`).dataValidation={rule:{type:"list",values:["Bestanden","In Arbeit","Geplant","Fehlgeschlagen"]}};
versionSheet.getRange(`F5:F${versionEndRow}`).dataValidation={rule:{type:"list",values:["Bestanden","Gebündelt offen","Nicht begonnen","Nicht erforderlich"]}};
versionSheet.getRange(`E5:E${versionEndRow}`).conditionalFormats.add("containsText",{text:"Bestanden",format:{fill:"#DDF3E8",font:{color:"#176B45",bold:true}}});
versionSheet.getRange(`E5:E${versionEndRow}`).conditionalFormats.add("containsText",{text:"Geplant",format:{fill:"#EEF4F4",font:{color:muted}}});
versionSheet.getRange(`E5:E${versionEndRow}`).conditionalFormats.add("containsText",{text:"Fehlgeschlagen",format:{fill:"#FDE3E5",font:{color:"#A22C38",bold:true}}});
versionSheet.getRange(`A1:A${versionEndRow}`).format.columnWidth=12;
versionSheet.getRange(`B1:B${versionEndRow}`).format.columnWidth=13;
versionSheet.getRange(`C1:C${versionEndRow}`).format.columnWidth=31;
versionSheet.getRange(`D1:D${versionEndRow}`).format.columnWidth=18;
versionSheet.getRange(`E1:F${versionEndRow}`).format.columnWidth=18;
versionSheet.getRange(`G1:H${versionEndRow}`).format.columnWidth=14;
versionSheet.getRange(`I1:I${versionEndRow}`).format.columnWidth=24;
versionSheet.getRange(`J1:K${versionEndRow}`).format.columnWidth=43;
versionSheet.freezePanes.freezeRows(4);
versionSheet.freezePanes.freezeColumns(2);
versionSheet.tables.add(`A4:K${versionEndRow}`,true,"VersionenTabelle").style="TableStyleMedium2";

gateSheet.getRange("A1:I2").merge();
gateSheet.getRange("A1").values=[["Qualitätsgates je Version"]];
gateSheet.getRange("A1:I2").format={fill:petrol,font:{bold:true,color:"#FFFFFF",size:18},verticalAlignment:"center"};
gateSheet.getRange("A4:I4").values=[["Version","Build","Tests","Browser","Persistenz","Sicherheit","Viewer","Performance","Manuell"]];
gateSheet.getRange(`A5:I${gateEndRow}`).values=gates;
gateSheet.getRange("A4:I4").format={fill:teal,font:{bold:true,color:"#FFFFFF"},wrapText:true};
gateSheet.getRange(`A5:I${gateEndRow}`).format={font:{name:"Aptos",size:10,color:petrol},horizontalAlignment:"center"};
gateSheet.getRange(`A5:A${gateEndRow}`).format={fill:mint,font:{bold:true,color:petrol}};
for(const term of ["Bestanden","Geplant","Teilweise","Offen","Nicht geprüft"]){
  const style=term==="Bestanden"?{fill:"#DDF3E8",font:{color:"#176B45",bold:true}}:
    term==="Teilweise"?{fill:"#FFF1D6",font:{color:"#8A5A00",bold:true}}:
    term==="Offen"?{fill:"#FDE3E5",font:{color:"#A22C38"}}:{fill:"#EEF4F4",font:{color:muted}};
  gateSheet.getRange(`B5:I${gateEndRow}`).conditionalFormats.add("containsText",{text:term,format:style});
}
gateSheet.getRange(`A4:I${gateEndRow}`).format.borders={preset:"inside",style:"thin",color:"#D8E8E6"};
gateSheet.getRange(`A1:A${gateEndRow}`).format.columnWidth=13;
gateSheet.getRange(`B1:I${gateEndRow}`).format.columnWidth=17;
gateSheet.freezePanes.freezeRows(4);
gateSheet.freezePanes.freezeColumns(1);

acceptance.getRange("A1:F2").merge();
acceptance.getRange("A1").values=[["Gebündelte Sichtabnahme · vorbereitet für V0.042"]];
acceptance.getRange("A1:F2").format={fill:petrol,font:{bold:true,color:"#FFFFFF",size:18},verticalAlignment:"center"};
acceptance.getRange("A4:F4").values=[["Nr.","Prüfbereich","Szenario","Soll-Ergebnis","Status","Notiz"]];
acceptance.getRange("A5:F16").values=[
  [1,"Start und Gesamtstil","Startansicht und Navigation überblicken","Wortmarke ZEIG HER Slides, Fläche, Punktpfad, Farben und reduzierte Demo wirken unverändert stimmig","Offen",""],
  [2,"Kapiteltypografie","Kapitelübergänge mit ä, ö und ü ansehen","Konturziffer, Outfit-Titel und feine Unterzeile entsprechen den Referenzen","Offen",""],
  [3,"Werkzeugleiste","Bearbeitungsmodus öffnen, Farben-Dialog und Leiste prüfen","Projekte, Farben und Dateidownload sind logisch geordnet; Link steht ohne Emoji; Symbole bleiben monochrom und eindeutig","Offen",""],
  [4,"Baustein- und Ebenenmenü","Menüs an verschiedenen Stationen öffnen; Ebeneneinträge überfahren und fokussieren","Menüs bleiben im Vordergrund; Ebenenvorschau zeigt exakt den zugehörigen Baustein und verschwindet rückstandsfrei","Offen",""],
  [5,"Projektmodell","Projektfenster öffnen, technische Details ein-/ausklappen, Demo prüfen, ein Projekt benannt anlegen und ein Testprojekt löschen","Demo bleibt fest; Details starten eingeklappt; Speicherhinweis und Backupweg sind klar; neues Projekt startet benannt; Löschen verlangt eine zweite Bestätigung","Offen",""],
  [6,"Projektwechsel","Projektdatei speichern, an anderem Ort öffnen, bearbeiten und erneut speichern","Projekt-ID und alle Inhalte bleiben stabil; nichts hängt am Browser-Entwurf","Offen",""],
  [7,"Bildprojekt","Gerettetes V4-Projekt öffnen, Station 27 prüfen und Bearbeiten dreimal ein-/ausschalten","Alle 79 Bilder bleiben erreichbar; transparente PNGs behalten Transparenz; Notizen bleiben außerhalb des Rahmens","Offen",""],
  [8,"Ansichts-Datei","Materiallizenz erfassen, auf einer späten Station exportieren, Datei neu öffnen, Übersicht öffnen und eine Station anklicken","Station 1 startet sichtbar; Materiallizenz und Über diese Anwendung bleiben getrennt erreichbar; Kapitelüberschriften erscheinen in der Übersicht und ein Klick fokussiert die gewählte Station","Offen",""],
  [9,"Handout","PDF-Handout erstellen und zusätzlich das HTML-Handout öffnen","Slides werden als kompakte Textblöcke mit kleinen Bildern ausgegeben; das PDF ist ein echter Mail-Anhang und enthält keine Editierwerkzeuge","Offen",""],
  [10,"Migration und Netzwerk-Null","Altprojekt und beide bisherigen Browserdatenbanken prüfen; externe URL oder Embed versuchen","Altstände bleiben lesbar und erhalten; Übernahme ist verifiziert; externe Verbindungen bleiben gesperrt oder verlangen eine bewusste Bestätigung","Offen",""],
  [11,"Werkstatt","18 Tokens, 14 Bausteine und alle registrierten Oberflächen überblicken","Bestand, Kasten-Dialog, Dateikarten, Farbendialog, Kamera, Notizen und Ebenen sind verständlich katalogisiert","Offen",""],
  [12,"Gesamteindruck","Typische Präsentation vollständig bearbeiten und zeigen","Hoher Alltagsnutzen ohne unnötige Komplexität","Offen",""]
];
acceptance.getRange("A4:F4").format={fill:teal,font:{bold:true,color:"#FFFFFF"},wrapText:true};
acceptance.getRange("A5:F16").format={font:{name:"Aptos",size:10,color:petrol},verticalAlignment:"top",wrapText:true};
acceptance.getRange("E5:E16").dataValidation={rule:{type:"list",values:["Offen","Bestanden","Abweichung","Nicht anwendbar"]}};
acceptance.getRange("E5:E16").conditionalFormats.add("containsText",{text:"Bestanden",format:{fill:"#DDF3E8",font:{color:"#176B45",bold:true}}});
acceptance.getRange("E5:E16").conditionalFormats.add("containsText",{text:"Abweichung",format:{fill:"#FDE3E5",font:{color:"#A22C38",bold:true}}});
acceptance.getRange("A4:F16").format.borders={insideHorizontal:{style:"thin",color:"#D8E8E6"}};
acceptance.getRange("A1:A16").format.columnWidth=7;
acceptance.getRange("B1:B16").format.columnWidth=20;
acceptance.getRange("C1:D16").format.columnWidth=45;
acceptance.getRange("E1:E16").format.columnWidth=17;
acceptance.getRange("F1:F16").format.columnWidth=30;
acceptance.freezePanes.freezeRows(4);

for(const [sheet,range,name] of [
  [overview,"A1:H14","uebersicht"],
  [versionSheet,`A1:K${versionEndRow}`,"versionen"],
  [gateSheet,`A1:I${gateEndRow}`,"qualitaetsgates"],
  [acceptance,"A1:F16","sichtabnahme"]
]){
  const preview=await workbook.render({sheetName:sheet.name,range,scale:1.25,format:"png"});
  await fs.writeFile(`${previewDir}/${name}.png`,new Uint8Array(await preview.arrayBuffer()));
}

const keyRanges=await workbook.inspect({kind:"table",sheetId:"Versionen",range:`A4:K${versionEndRow}`,include:"values,formulas",tableMaxRows:versions.length+1,tableMaxCols:11,maxChars:26000});
console.log(keyRanges.ndjson);
const errors=await workbook.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",options:{useRegex:true,maxResults:100},summary:"final formula error scan"});
console.log(errors.ndjson);

const output=await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/ZEIG-HER-Slides-Versionsregister.xlsx`);
console.log("Versionsregister erstellt und vier Tabellenblätter gerendert.");
