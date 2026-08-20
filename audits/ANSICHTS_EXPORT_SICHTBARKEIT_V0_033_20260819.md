# Ansichts-Export und Sichtbarkeit · V0.033

Datum: 19. August 2026
Status: technisch reproduziert und korrigiert

## Reproduzierter Fehler

Die konkrete 30-Stationen-Ansichtsdatei enthielt alle 58 eingebetteten Bilder und den vollständigen gerenderten Welt-Snapshot. Beim Export war jedoch eine späte Station aktiv. Dadurch blieben 28 Stationen mit der temporären Editorvirtualisierungsklasse `off` im Snapshot markiert. Der reduzierte Viewer startete bei Station 1, ohne diese Klasse zurückzusetzen; der vorhandene Inhalt war deshalb unsichtbar.

## Korrektur

- `viewerSnapshot()` entfernt temporäre `off`-Klassen bereits vor dem Dateibau.
- `normalizeViewerVisibility()` ist die gemeinsame, separat testbare Bereinigungslogik.
- die eigenständige Viewer-Runtime ruft dieselbe Bereinigung beim Start erneut auf.
- das Viewer-Prüfartefakt enthält absichtlich eine ausgeblendete erste Station und eine ausgeblendete Hintergrundfläche.

## Sicherheits- und Produktgrenze

Die Korrektur verändert weder Projektdaten noch Editorfunktionen, Netzwerk-Null, Bildkompression oder Gestaltung. Sie entfernt ausschließlich flüchtige Darstellungszustände, die nicht Bestandteil einer portablen Ansichts-Datei sein dürfen.

## Nachweise

- `tests/viewer-contract.test.mjs`
- `scripts/build-viewer-fixture.mjs`
- `quality/stability-matrix.json`
- Browserprüfung des Viewer-Prüfartefakts und der realen 30-Stationen-Ansicht
