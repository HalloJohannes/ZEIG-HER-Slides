# V0.030 · Vollrahmen, Dateiwegweiser und Ebenen

Stand: 19. August 2026
Technischer Status: in Prüfung
Manueller Status: gebündelte Sichtabnahme offen

## Anlass

Das reale 30-Stationen-Projekt zeigte, dass hohe Rahmen beim Durchschalten unten abgeschnitten sein konnten. Gleichzeitig waren Zweck und Datenschutzgrenze der verschiedenen HTML-Dateien nicht unmittelbar verständlich; die vorhandene Ebenenfunktion war zu wenig auffindbar.

## Umsetzung

- Die Kamera verwendet einen gemeinsamen Runtime-Vertrag für sichere Sichtfläche, Zieltransformation und Vollständigkeitsprüfung.
- App und Ansichts-Datei messen die tatsächliche Höhe des aktuellen Rahmens und reservieren die reale Navigationsleiste.
- Bild-, Schrift- und Größenänderungen lösen zeitlich begrenzte Nachmessungen aus; eigene Kameraeingriffe werden respektiert.
- Der Projekte-Bereich ist ein modaler Kasten mit vier klar benannten Dateizwecken und ausdrücklicher Bibliotheksgrenze.
- Die Ebenenliste gehört sichtbar zum Rahmen, zeigt `Ebene 0`, positive und negative Ebenen und wählt den Baustein unmittelbar an.
- Die bestehende Demo wurde in ihren vorhandenen Stationen aktualisiert und nicht erweitert.

## Nachweise

- `tests/camera-fit.test.mjs`
- `tests/viewer-contract.test.mjs`
- `tests/ui-flows.test.mjs`
- `quality/stability-matrix.json`
- `design-qa.md`

Die endgültige visuelle Freigabe bleibt getrennt und erfolgt erst nach der gebündelten Sichtabnahme durch Johannes.
