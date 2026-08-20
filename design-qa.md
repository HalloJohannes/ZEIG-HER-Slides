# Design-QA · ZEIG HER Slides V0.042

Datum: 20. August 2026
Prüfstatus: technisch und visuell geprüft

V0.042 schließt die offenen Kamera-, Übersichts- und HUD-Befunde der Ansichts-Datei und präzisiert die Entstehungsangaben. Geprüft wurden die aktuelle Programmdatei, eine reale Ansichts-Datei mit 30 Stationen, die Übersichtskamera, der Einstieg per Stationsklick, der Transparenzdialog sowie das responsive Navigations-HUD.

## Visuelle Wahrheit

Referenz und Umsetzung wurden bei gleicher Breite gemeinsam verglichen. Die private Referenzaufnahme bleibt außerhalb des öffentlichen Repositorys; der daraus abgeleitete Befund und seine technische Prüfung sind hier vollständig dokumentiert.

Der in der Referenz sichtbare Zusammenstoß zwischen Kapitelmenü und Navigationspfeil ist beseitigt. Kapitelmarke, Übersicht, Vortrag, Lizenz und Transparenzdialog bleiben eigenständige, klar getrennte Aktionen. Die Gliederung der Stationspunkte bleibt auch bei hoher Stationszahl erhalten.

## Fünf Oberflächen

| Oberfläche | Ergebnis |
| --- | --- |
| Typografie | Outfit und Kapiteltypografie bleiben lokal eingebettet; Stations- und Kapitelüberschriften sind in der Übersicht wieder lesbar. |
| Layout | Das HUD wechselt bei kompakten Breiten kontrolliert in zwei Zeilen. Bei 1024 px liegen alle Elemente vollständig im Viewport und überdecken sich nicht. |
| Abstände | Navigationspfeile, Stationsleiste und Aktionsgruppe besitzen belastbare Mindestabstände; die 30-Stationen-Prüfdatei bleibt ruhig und eindeutig bedienbar. |
| Farbe und Form | Petrol-, Türkis-, Mint- und Akzenttokens bleiben unverändert maßgeblich; es wurde kein paralleles Gestaltungssystem eingeführt. |
| Interaktion | Ein Klick auf eine Station in der Übersicht fährt die Kamera zuverlässig zur gewählten Station. Ziehen und interaktive Inhalte lösen keinen unbeabsichtigten Stationssprung aus. |

## Interaktions- und Technikprüfung

- Die reale Ansichts-Prüfdatei enthält 30 Stationen; alle 30 Übersichtstitel werden sichtbar aufgebaut.
- Ein Klick auf Station 15 beendet den Übersichtsmodus und fokussiert exakt diese Station.
- Kamera-Nachmessungen laufen nach Bildladung, Schriftinitialisierung und Größenänderungen erneut, ohne manuelle Zoomkorrektur.
- Bei 1456 px und 1024 px wurden keine HUD-Überdeckungen festgestellt.
- Der Transparenzdialog enthält die Erstellerzeile `Diese Anwendung „ZEIG HER Slides“ wurde 2026 von Johannes Koch erstellt.`
- `Johannes Koch` verweist auf `https://www.linkedin.com/in/johannes-koch-1964a3240` und verwendet `target="_blank"` sowie `rel="noopener noreferrer"`.
- Unter `Entstehung` steht: `Entstanden im Vibe-Coding: Die erste Fassung wurde mit Unterstützung von Claude geschrieben und anschließend mit Codex weiterentwickelt, strukturiert und getestet. Konzeption, Auswahl, Prüfung und Veröffentlichung verantwortet Johannes Koch.`
- Die Produktversion erscheint als `V0.042 · Build 0.042.20260819-codex`.
- Die Ansichts-Datei enthält keine Editor-, Projektbibliotheks- oder Speicherlogik.
- Browserkonsole, automatisierte Tests sowie Release-, Netzwerk-Null-, Export-, Struktur-, Demo-, Performance- und Governance-Prüfungen sind fehlerfrei.

## Designsystem und Ordneroberfläche

- Kamera-Fit und Nachmessungen sind in `src/runtime/camera-fit.js` zentralisiert und werden von Programm- und Ansichts-Datei gemeinsam verwendet.
- Viewer-HUD, Übersichtstitel und Stationsfokus sind als kanonische Verträge in Werkstatt, Komponentenregister und Qualitätstests dokumentiert.
- Im Projektstamm liegt genau eine versionierte Anwendung: `ZEIG-HER-Slides-V0_042_20260819-codex.html`.
- `versions/aktuell` enthält ebenfalls genau V0.042; V0.041 wurde kontrolliert ins Archiv verschoben.
- Das Versionsregister dokumentiert V0.042 einschließlich Kamera-, Viewer-, HUD- und Transparenzänderungen.

## Befunde

- P0: keine
- P1: keine
- P2: keine
- P3: keine

final result: passed
