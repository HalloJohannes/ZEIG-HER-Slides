# Kamera, Fernsicht und Viewer-HUD · V0.042

## Anlass

Die Ansichts-Datei wich in der Fernsicht von der Programmdatei ab: große Kapitelüberschriften fehlten, Stationen waren nicht direkt anwählbar und Nachmessungen konnten nach manueller Kamerabewegung erneut einrasten. Bei kompakten Breiten konkurrierten zudem Materiallizenz, Navigation und Infoaktionen um denselben HUD-Bereich.

## Korrektur

- Anwendung und Viewer verwenden denselben abbrechbaren Kamera-Folgecontroller.
- Navigation, Bildladen, Schriftladen und beobachtete Größenänderungen lösen begrenzte Nachmessungen aus.
- Pointer-, Rad- und Touchinteraktion beenden die Automatik für den aktuellen Stationswechsel.
- Der Viewer setzt dieselbe Fernsichtklasse wie die Anwendung und zeigt dadurch die vorhandenen Kapitelüberschriften.
- Ein Klick auf eine Station in der Fernsicht beendet diese und fokussiert die gewählte Station.
- Projekttitel und Materiallizenz bilden eine eigene linke HUD-Gruppe; die sichtbare Infoaktion wird kompakt als „Über“ beschriftet und bleibt vollständig beschrieben.

## Nachweise

- `tests/camera-fit.test.mjs`
- `tests/viewer-contract.test.mjs`
- `tests/transparency-storage-migration.test.mjs`
- `design-qa.md`
- zentraler Prüflauf `npm run check`

## Status

Technische Freigabe nach grünem Prüflauf. Die gebündelte menschliche Sichtentscheidung bleibt davon getrennt.
