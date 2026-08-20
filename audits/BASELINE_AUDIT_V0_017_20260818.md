# Baseline-Audit V0.017

Datum: 18. August 2026

## Ergebnis

V0.017 ist die unveränderte, kontrolliert übernommene Vor-Governance-Baseline von SCHAU HIN Slides. Die neutrale Root-Datei, die Legacy-Quelle, der aktuelle Spiegel und die Release-Kopie sind byteidentisch.

SHA-256 der neutralen Anwendung:

`577c374413b8bf48cda4c4d73144077a4c17d7482f21ca26e4155874c93d07b8`

Der aktuelle Workshopstand liegt zweimal byteidentisch vor:

- `praesentation.html`
- `didaktischebildgenerierung.html`

SHA-256:

`b73c019830f0f8a752799515da168b79952f9784c0799e221075f069797dc255`

## Ehrliche Grenze

Die Anwendung besitzt in V0.017 noch keine interne Produktkennung, kein versionsfähiges Projektschema und keine belastbare Trennung der Speicherorte. Die Viewer-Ausgabe ist nur per Laufzeitflag eingeschränkt. Diese Punkte gelten nicht als bestanden und werden ab V0.018 versioniert bearbeitet.

## Rückfallbasis

Die unveränderte Datei `src/legacy/schau-hin-slides-v0.017-source.html` ist die verbindliche Rückfallquelle für den Beginn der modularen Migration.

## Technischer Nachweis

Der zentrale Release-Check wurde nach Anlage der Governance-Struktur erfolgreich ausgeführt. Bestanden haben:

- drei Release- und Syntaxtests
- Hash- und Spiegelprüfung der neutralen Anwendung
- Bytevergleich der beiden aktuellen Workshopdateien
- Konsistenzprüfung von Paket-, Release- und Versionsmanifest

Das maschinenlesbare Gesamtinventar liegt unter `quality/baseline-inventory-v0.017.json`.
