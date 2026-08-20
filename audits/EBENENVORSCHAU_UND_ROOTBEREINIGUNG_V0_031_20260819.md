# V0.031 · Ebenenvorschau und Rootbereinigung

## Ziel

Das Ebenenmenü soll auch bei vielen oder verdeckten Bausteinen sofort zeigen, welcher Eintrag zu welchem Baustein gehört. Gleichzeitig soll die Vorschau keine unbeabsichtigte Auswahl oder Projektänderung erzeugen. Auf der obersten Projektebene soll nur die aktuelle versionierte Anwendung liegen.

## Umsetzung

- Hover und Tastaturfokus eines Ebeneneintrags setzen am zugehörigen Baustein die flüchtige Klasse `layer-preview`.
- `layer-preview` verwendet exakt Farbe, Linienstärke und Abstand der bestehenden Auswahlkontur, zeigt aber keine Werkzeuge.
- Pointer-Verlassen, Fokusverlust, Auswahl und Schließen des Panels entfernen die Vorschau.
- Ein Klick führt weiterhin die bestehende echte Auswahl über `setSel` aus.
- V0.028 bis V0.030 liegen ausschließlich im kontrollierten Versionsarchiv; Root enthält nur V0.031 als versionierte Anwendung.

## Nachweise

- statischer UI-Vertrag in `tests/ui-flows.test.mjs`
- realer Browserlauf für Hover, Verlassen, Fokus, Klick und Auswahlstabilität
- visuelle Gegenüberstellung in `design-qa.md`
- zentraler Releasecheck mit Spiegel-, Metadaten-, Struktur- und Werkstattprüfung

## Freigabegrenze

Technische und visuelle Vorprüfung sind automatisiert dokumentiert. Die gebündelte menschliche Sichtabnahme bleibt davon getrennt.
