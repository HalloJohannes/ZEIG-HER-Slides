# Ordnerstruktur

Stand: 18. August 2026

## Arbeits- und Produktbereiche

- `src/`: führende Produkt- und Werkstattquellen sowie eingebettete Runtime-Module
- `scripts/`: reproduzierbare Builds, Prüfungen und Governance-Werkzeuge
- `tests/`: automatische Verträge und Regressionstests
- `quality/`: maschinenlesbare Release-, Registry- und Migrationsnachweise
- `audits/`: verständliche Prüfberichte je Version
- `versions/aktuell/`: genau ein Spiegel der aktuellen Produktversion
- `versions/archiv/`: abgelöste Governance-Releases ab V0.017
- `versions/aenderungshistorie/`: fortlaufende lesbare Historie
- `outputs/`: reproduzierbare Releasepakete und Governance-Artefakte

## Inhalte und übernommenes Material

- `projekte/workshop-stand-20260818/`: die zwei byteidentischen, übernommenen Workshopdateien
- `archive/vor-governance/html-versionen/`: unveränderte Entwicklungsstände V1 bis V16
- `archive/vor-governance/pakete/`: übernommene ZIP-Pakete
- `zusatzmaterial/screenshots/`: Screenshots für Sichtprüfungen und Fehlernachweise
- `zusatzmaterial/importe/`: PPTX- und andere Importquellen
- `zusatzmaterial/referenzen/`: zusätzliche visuelle oder fachliche Referenzen
- `zusatzmaterial/notizen/`: freie ergänzende Notizen

## Root-Regel

Im Root liegen nur Einstieg, Paketsteuerung und direkt nutzbare aktuelle Einzel-HTML-Dateien. Große Quellen, alte Stände, Screenshots und Importmaterial gehören nicht in den Root.

Das historische Inventar `quality/baseline-inventory-v0.017.json` bleibt absichtlich unverändert. Es belegt die Pfade zum Zeitpunkt der Übernahme. Die spätere verlustfreie Verschiebung ist in `quality/material-relocation-v0.019.json` dokumentiert.
