# Audit V0.026 – Konsolidierung und Stabilitätsmatrix

## Umfang

Die maschinenlesbare Matrix in `quality/stability-matrix.json` umfasst 20 bestandene Fälle aus Build, Start, Datenvertrag, realen Projekten, Speicherung, Wiederherstellung, Import, Ansichtsdatei, Werkstatt und Performance. Jeder Fall verweist auf mindestens eine vorhandene Belegdatei.

## Roundtrip und Fallback

- Beide realen Workshopprojekte mit jeweils rund 24 MB durchlaufen zweimal Validierung, Migration und JSON-Serialisierung ohne veränderte Roundtrip-Signatur.
- Auch der aus der aktuellen Projektdatei erzeugte und erneut geöffnete HTML-Stand bleibt vertraglich identisch.
- Ein gültiger Entwurf desselben Projekts wird bevorzugt; beschädigte und projektfremde Entwürfe werden verworfen und mit Quarantänegrund belegt.
- Ein zentraler Schreibgate-Vertrag blockiert Projektwechsel, neues Projekt sowie JSON-, Datei- und PowerPoint-Import, sobald die Vorsicherung nicht bestätigt wurde.
- Entwurfsschreibvorgänge werden serialisiert. Damit kann ein älter gestarteter IndexedDB-Vorgang keinen neueren Stand überholen.

## Browsernachweis

Im isolierten lokalen Browserursprung wurden folgende reale Bedienfolgen erfolgreich ausgeführt:

1. Projekt in „Matrix Köln ÄÖÜ“ umbenannt und in der Browserbibliothek gesichert.
2. Neues Projekt mit eigener Projekt-ID erzeugt und anschließend zum ursprünglichen Projekt mit unveränderter ID zurückgewechselt.
3. Name in „Entwurf Köln ÄÖÜ“ geändert; zeitnahe automatische Sicherung wurde sichtbar bestätigt.
4. Nach Neuladen wurde genau dieser Entwurf automatisch wiederhergestellt.
5. Der bewusste Rückfall „Stattdessen Dateistand laden“ stellte den eingebetteten Dateistand her; beide Bibliothekseinträge blieben vorhanden.
6. `data-content-boundary` meldete `passed`, `data-start-error` blieb leer.

Der Lauf deckte eine Überholgefahr zwischen Intervall- und Eingabesicherung auf. Diese wurde noch innerhalb V0.026 durch eine serielle Entwurfsschreibqueue korrigiert und anschließend erneut erfolgreich geprüft.

## Abnahmegrenze

Die technische Stabilitätsprüfung ist bestanden. Die subjektive Gesamtbedienung und die reale Workshop-Nachlese bleiben Bestandteil der gebündelten Sichtabnahme in V0.028.
