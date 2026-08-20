# ZEIG HER Slides

[![Version](https://img.shields.io/badge/Version-V0.042-4fb6ae)](https://github.com/HalloJohannes/ZEIG-HER-Slides/releases/tag/V0.042)
[![Qualitätsprüfung](https://github.com/HalloJohannes/ZEIG-HER-Slides/actions/workflows/quality.yml/badge.svg)](https://github.com/HalloJohannes/ZEIG-HER-Slides/actions/workflows/quality.yml)
[![Lizenz: MIT](https://img.shields.io/badge/Lizenz-MIT-0e4050)](LICENSE)

ZEIG HER Slides ist ein bewusst reduziertes Präsentationswerkzeug: Auf einer freien Fläche werden Stationen angelegt, mit wenigen kanonisierten Bausteinen gefüllt und beim Vortrag von einer zur nächsten angefahren. Gestaltung, Editor und Projektinhalt stecken vollständig in einer einzelnen HTML-Datei.

Aktueller Stand: **V0.042 vom 19. August 2026**

## Schnellstart

1. [`ZEIG-HER-Slides-V0_042_20260819-codex.html`](ZEIG-HER-Slides-V0_042_20260819-codex.html) herunterladen.
2. Die Datei lokal in einem aktuellen Browser öffnen.
3. Die mitgelieferte Demo ansehen oder im Menü **Projekte** ein neues Projekt beginnen.
4. Zur verlässlichen Sicherung regelmäßig eine **Projektdatei** exportieren.

[`zeig-her-slides.html`](zeig-her-slides.html) ist der inhaltsgleiche stabile Dateiname. Die [`Werkstatt`](ZEIG-HER-Slides-Werkstatt.html) dokumentiert Design-Tokens, Komponenten und Varianten.

## Was das Werkzeug kann

- Stationen frei auf einer großen Arbeitsfläche anordnen und automatisch anfahren
- Texte, Bilder, Karten, Spalten und weitere begrenzte Bausteine kombinieren
- Projekte ausschließlich lokal im Browser verwalten
- vollständige, portable Projektdateien mit eingebetteten Bildern exportieren
- schlanke Ansichtsdateien ohne Editor und Projektbibliothek erzeugen
- kompakte Handouts für Browser, Druck und PDF ausgeben
- Lizenzen und Urheberangaben für die erstellten Materialien dokumentieren
- ohne Installation, Konto, Cookies, Analyse- oder Telemetriedienste arbeiten

## Welche Datei ist wofür gedacht?

| Datei | Zweck | Enthält andere Projekte aus der Browser-Bibliothek? |
| --- | --- | --- |
| **Programmdatei** | Frischer Start mit Demo und vollständigem Editor | Nein |
| **Projektdatei** | Backup, Gerätewechsel und gemeinsame Weiterbearbeitung eines Projekts | Nein |
| **Ansichtsdatei** | Präsentieren und Weitergeben ohne Editor | Nein |
| **Handout-Datei** | Platzsparende Nachlese mit Texten und kleineren Bildern | Nein |

Die Browser-Bibliothek ist nur eine lokale Komfortfunktion. Sie reist mit keiner dieser Dateien mit.

## Lokalität und Datenschutz

ZEIG HER Slides lädt Projektinhalte nicht auf einen Server. Die Anwendung setzt keine Cookies ein und enthält keine Analyse-, Werbe- oder Telemetriedienste. Bilder, Entwürfe und Bibliotheksprojekte bleiben lokal im Browser beziehungsweise in den exportierten Dateien. Externe Links werden nur durch eine bewusste Aktion geöffnet; automatische externe Laufzeitressourcen sind im Netzwerk-Null-Modus gesperrt.

Wichtig: Die Browser-Bibliothek liegt in der lokalen Browser-Datenbank (IndexedDB). Browserdaten zu löschen, ein privates Fenster zu schließen oder das Gerät zu wechseln kann diese Zwischenstände entfernen. Eine exportierte Projektdatei ist deshalb die verlässliche Sicherung.

Bei einer Bereitstellung über eine Domain kann der Webserver technisch übliche Zugriffsdaten protokollieren. Das liegt außerhalb der Anwendung und muss über die Hosting-Konfiguration geregelt werden. Die vorgesehene statische Bereitstellung enthält dafür restriktive Headerregeln und eine prüfbare Datenschutzattestation.

## Qualität und Tests

Voraussetzung ist Node.js 20 oder neuer. Es gibt keine Laufzeitabhängigkeiten und keinen Installationsschritt.

```bash
npm run check
```

Der zentrale Prüflauf kontrolliert unter anderem Syntax, Projekt- und Export-Roundtrips, Bildpersistenz, Kamera, Viewer, Datenschutzverträge, Komponentenregister, Release-Metadaten und die Gleichheit der ausgelieferten Dateien.

Die öffentliche CI führt denselben Prüflauf aus. Zwei zusätzliche Regressionstests mit großen realen Workshopdateien bleiben aus Datenschutz- und Repository-Größengründen intern und werden in einem öffentlichen Checkout transparent übersprungen. Alle übrigen Prüfungen laufen unverändert.

Weitere nützliche Befehle:

```bash
npm test                 # automatisierte Tests
npm run build            # kanonische Einzeldatei bauen
npm run werkstatt:build  # Komponentenwerkstatt aktualisieren
npm run deployment:build # statisches Bereitstellungspaket erzeugen
```

V0.042 ist technisch freigegeben. Eine abschließende manuelle Sichtprüfung bleibt bei jeder neuen Version Teil des Release-Prozesses.

## Projektstruktur

| Pfad | Inhalt |
| --- | --- |
| `src/` | modulare Quelle und unveränderte Legacy-Ausgangsbasis |
| `scripts/` | Build-, Prüf- und Governance-Werkzeuge |
| `tests/` | automatisierte Vertrags- und Regressionstests |
| `quality/` | maschinenlesbare Release-, Risiko- und Komponentennachweise |
| `docs/` | Architektur, Datenschutz, Bedien- und Release-Dokumentation |
| `audits/` | lesbare technische Prüfberichte |
| `versions/` | aktuelle Spiegeldatei, Archiv und Änderungshistorie |
| `verification/` | unabhängige Prüfhinweise und Prüfsummen |
| `outputs/governance/` | gepflegtes Excel-Versionsregister |
| `zusatzmaterial/` | bewusst leere lokale Ablagestruktur für eigene Materialien |

Reale Präsentationen, Rettungskopien, Importe, interne Arbeitsaufträge und private Befundscreenshots werden nicht veröffentlicht. Die unter `audits/screenshots/` versionierten Abbildungen sind ausschließlich bereinigte Produkt-QA-Nachweise.

## Bereitstellung

Der Quellstand kann statisch bereitgestellt werden. Für die produktive Domain ist ein Host vorgesehen, der die mit `npm run deployment:build` erzeugte Datei `_headers` anwendet. GitHub Pages wird deshalb bewusst nicht automatisch aktiviert: Pages kann die erforderlichen HTTP-Sicherheitsheader nicht vollständig ausliefern.

## Versionierung und Dokumentation

- [Änderungsübersicht](CHANGELOG.md)
- [vollständige Änderungshistorie](versions/aenderungshistorie/VERSIONSHISTORIE.md)
- [Release-Metadaten](quality/release-metadata.json)
- [Versionsmanifeste](quality/version-change-manifests/)
- [Excel-Versionsregister](outputs/governance/ZEIG-HER-Slides-Versionsregister.xlsx)

Änderungen und Fehlerberichte sind willkommen. Bitte zuerst [`CONTRIBUTING.md`](CONTRIBUTING.md) und für sicherheitsrelevante Meldungen [`SECURITY.md`](SECURITY.md) lesen.

## Entstehung

ZEIG HER Slides wurde 2026 von [Johannes Koch](https://www.linkedin.com/in/johannes-koch-1964a3240) erstellt.

Entstanden im Vibe-Coding: Die erste Fassung wurde mit Unterstützung von Claude geschrieben und anschließend mit Codex weiterentwickelt, strukturiert und getestet. Konzeption, Auswahl, Prüfung und Veröffentlichung verantwortet Johannes Koch.

## Lizenz

Der Quellcode steht unter der [MIT License](LICENSE), Copyright © 2026 Johannes Koch. Der Copyright- und Lizenzhinweis muss in Kopien oder wesentlichen Teilen der Software erhalten bleiben. Die redaktionellen Inhalte der mitgelieferten Demo stehen unter [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/deed.de). Inhalte, Bilder und Präsentationen der Nutzenden unterliegen ihren jeweils selbst gewählten beziehungsweise am Material ausgewiesenen Lizenzen.
