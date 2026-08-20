# Ordnerstruktur und Versionsregister

Datum: 18. August 2026

## Ergebnis

Der Projekt-Root enthält nur noch Einstieg, Paketsteuerung und aktuelle direkt nutzbare HTML-Artefakte. Große historische oder inhaltliche Dateien wurden ohne Inhaltsänderung in eindeutig benannte Bereiche verschoben.

- 38 Vor-Governance-HTML-Dateien liegen unter `archive/vor-governance/html-versionen/`
- 11 vorhandene Screenshots liegen unter `zusatzmaterial/screenshots/bestand-20260818/`
- die PPTX-Quelle liegt unter `zusatzmaterial/importe/pptx/`
- die zwei übernommenen Workshopdateien liegen unter `projekte/workshop-stand-20260818/` und behalten ihren gemeinsamen SHA-256
- das doppelte Root-`CHANGELOG.md` wurde entfernt; die byteidentische kontrollierte Kopie bleibt unter `versions/aenderungshistorie/`

Das historische Baseline-Inventar bleibt unverändert. `quality/material-relocation-v0.019.json` ordnet ursprüngliche und neue Pfade zu.

## Excel-Versionsregister

`outputs/governance/SCHAU-HIN-Slides-Versionsregister.xlsx` enthält vier Tabellenblätter:

1. Übersicht mit formelbasierten Kennzahlen
2. Versionen mit Hashes, Commits, Tags, Status und Planung bis V0.026
3. Qualitätsgates je Version
4. vorbereitete gebündelte Sichtabnahme

Geprüft wurden die relevanten Werte und Formeln, eine Suche nach typischen Formelfehlern sowie die gerenderte Darstellung aller vier Tabellenblätter. Es wurden keine Formelfehler oder gravierenden Darstellungsfehler festgestellt.

## Automatischer Nachweis

Der zentrale Release-Check prüft nun zusätzlich Pflichtordner, Anzahl der archivierten Dateien, Hashes der übernommenen Workshopquellen und Vorhandensein des Excel-Registers.
