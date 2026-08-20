# Audit V0.024 – Dedizierte Ansichtsdatei

## Ergebnis

Der Nachlese-Export ist kein umgeschalteter Editor mehr. Er wird als eigenes HTML-Artefakt aus bereinigtem Stations-Snapshot, minimalem Datenvertrag, eigenem Template und eigener Runtime erzeugt.

## Datengrenze

Der Viewer-Vertrag enthält ausschließlich Vertragsversion, Produkt- und Buildkennung, Präsentationstitel, Kapitelnamen, Stationszuordnung und gültige CI-Farben. Projekt-ID, Zeitstempel, Logo-Rohdaten, interne Memos und weitere Autorendaten werden nicht in den Vertrag übernommen. Das sichtbare Logo wird ausschließlich als bereinigtes Darstellungsfragment exportiert.

## Abwesenheitsnachweis

Viewerquelle und Viewer-JavaScript enthalten keine Editor-Oberflächen und keine Zugriffe auf IndexedDB, LocalStorage, File System Access API, FileReader, Autosave, Projektbibliothek oder Importe. Das zentrale Prüfsystem erzeugt aus dem tatsächlich eingebetteten Template ein Viewer-Artefakt und blockiert die Freigabe bei verbotenen Laufzeitbegriffen oder DOM-Bereichen.

## Browsernachweis

- Viewer-Vertrag 1 startete mit `data-viewer-ready="passed"` und ohne Startfehler.
- zwei Stationen, Umlaute und der Titel wurden korrekt dargestellt; Editor-DOM: 0.
- Navigation zur zweiten Station, Übersicht und Frostglas funktionierten.
- vor Embed-Aktivierung bestanden 0 Frames; danach genau der freigegebene YouTube-Datenschutzframe mit Sandbox, Lazy Loading und `no-referrer`.

## Bewusste Grenze

Die menschenlesbare Sichtabnahme mit einer realen Workshop-Präsentation bleibt Bestandteil der gebündelten Schlussprüfung. Technisch ist der Viewer als eigener Vertrauensbereich umgesetzt und geprüft.
