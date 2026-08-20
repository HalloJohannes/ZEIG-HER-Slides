# Schema, Migration und Quarantäne V0.021

## Ziel

Externe oder gespeicherte Daten dürfen den aktiven Projektstand erst ersetzen, nachdem Struktur und Version vollständig geprüft wurden. Vor-Governance-Dateien müssen ohne Veränderung der Quelle migrierbar bleiben.

## Umsetzung

- Schema 2 mit bekannten Stations- und Bausteintypen
- gemeinsame Validierungsgrenze für Start, Browserentwurf, Bibliothek, JSON-Import und HTML-Import
- kopierende Migration mit Projekt-ID, Zeitstempeln und nachvollziehbarem Migrationseintrag
- eindeutige Fehlercodes für ungültige Wurzel, Kapitel, Stationen, Bausteine und zukünftige Schemas
- beschädigte Browserentwürfe werden unter einem Quarantäneschlüssel gesichert; der Dateistand bleibt aktiv
- ungültige Bibliotheksstände werden nicht geöffnet oder als gültig umgeschrieben

## Reale Referenzdateien

Beide unter `zusatzmaterial/` abgelegten Dateien sind über `quality/real-project-fixtures.json` inventarisiert und bleiben von Git ausgeschlossen. Jede Datei umfasst ungefähr 24 MB, 30 Stationen, 180 verschachtelte Bausteine und 107 eingebettete Bilder.

Die Tests bestätigen für beide Dateien:

- ursprünglicher SHA-256 unverändert
- Erkennung als Schema 0
- vollständige Migration auf Schema 2
- unveränderte Anzahl von Stationen und Kapiteln
- stabile Projekt-ID `tooltime-bildgenerierung-2026`

## Technischer Nachweis

- 15 automatische Tests bestanden
- Release-Artefakte byteidentisch
- Browser-Smoke für Buildkennung, Titel und Projektidentität bestanden
- Release-Hash: `4ac95bbc48657ff2149582452fd5afaf8f1bcee32fbd5f5455c8f195cce43d95`

## Grenze

V0.021 validiert Struktur und Version. Aktive HTML-Sanitization, URL-Protokolle, Embed-Regeln und Größenlimits folgen in V0.022.
