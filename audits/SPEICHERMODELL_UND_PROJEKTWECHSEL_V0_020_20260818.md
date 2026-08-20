# Speichermodell und Projektwechsel V0.020

## Ziel

Nutzende müssen unterscheiden können, ob ein Stand nur als Browserentwurf, in der Browser-Bibliothek, in einer Arbeitsdatei oder als Export vorliegt. Ein Projektwechsel darf außerdem keine unbestätigt gesicherten Änderungen übergehen.

## Umsetzung

- vier getrennte und sichtbare Speicherstatus im Projekte-Panel
- präzisere Button- und Hilfetexte für direkte Dateispeicherung und Download
- Datei-Handles sind an die Projekt-ID gebunden und werden beim Projektwechsel zurückgesetzt
- Wechsel, neues Projekt, JSON-Import, HTML-Import und PPTX-Import als neues Projekt setzen eine erfolgreiche Bibliothekssicherung voraus
- bei Sicherungsfehler bleibt das aktuelle Projekt aktiv und eine verständliche Meldung erscheint
- ein Browser-Download löscht weder den Entwurf noch den Dirty-Status und wird nicht als abgeschlossene Speicherung ausgegeben

## Automatischer Nachweis

Der zentrale Release-Check ist mit zwölf Tests bestanden. Vier neue Verträge prüfen Projektbindung des Datei-Handles, blockierende Vorsicherung, ehrliche Downloadbehandlung und getrennte Statusfelder.

Release-Hash:

`750a1620f633f21862cf80df8aa5426560001f2e1f098030e013ed785b13015b`

## Browsernachweis

Bestätigt wurden:

- Buildkennung `0.020.20260818-codex`
- vier sichtbar getrennte Statuswerte für Browserentwurf, Bibliothek, Arbeitsdatei und Export
- Bibliothekssicherung aktualisiert ausschließlich den Bibliotheksstatus mit Projekt-ID
- ein erfolgreich vorgesicherter Wechsel zu einem neuen Projekt erzeugt eine neue ID
- alle projektgebundenen Speicherstatus beginnen danach wieder neutral
- Browsertitel `SCHAU HIN Slides V0.020 – Neues Projekt`

## Verbleibende Grenze

Schema-Migration, vollständige strukturelle Validierung und sichere Behandlung beschädigter Eingaben folgen in V0.021. Die menschliche Sichtabnahme bleibt entsprechend der vereinbarten Vorgehensweise bis zum Abschluss gebündelt offen.
