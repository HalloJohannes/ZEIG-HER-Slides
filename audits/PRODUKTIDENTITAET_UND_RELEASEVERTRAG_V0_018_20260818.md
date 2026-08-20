# Produktidentität und Releasevertrag V0.018

## Ziel

Die Anwendung erhält erstmals eine eindeutige sichtbare und maschinenlesbare Identität. V0.018 verändert keine Speicher- oder Bibliothekslogik.

## Änderungen

- HTML-Metadaten für Produktname, Build und Generator
- zentrale Laufzeitkonstante `APP_VERSION`
- sichtbare Version im Bereich „Zur Anwendung“
- Version im Browsertitel
- Projektschema 1 und `savedWith`-Kennung im Laufzeitmodell
- reproduzierbarer Build mit atomarem Schreiben und identischen Spiegeln
- feste Werkstatt-HTML mit maschinenlesbarer Token- und Komponentenregistry

## Manuelle Restprüfung

- Version im Info-Bereich sichtbar
- Browsertitel zeigt V0.018
- Navigation und Edit-Modus unverändert funktionsfähig

Speicherung, Bibliothek und Viewer bleiben ausdrücklich Gegenstand der folgenden Versionen.

## Technisches Ergebnis

Der zentrale Release-Check ist bestanden:

- vier Logik-, Syntax- und Identitätstests grün
- V0.017-Rückfallbasis unverändert
- vier V0.018-Release-Artefakte byteidentisch
- Werkstatt-Registry, eingebettete Daten und generiertes Einzel-HTML konsistent
- Release-Hash: `8882f923746afc9c5773c51767af537ef80649864b80309cb74328bb3d613710`

Der Browser-Smoke-Test ist ebenfalls bestanden. Bestätigt wurden:

- Titel `SCHAU HIN Slides V0.018 – SCHAU HIN Slides Demo`
- maschinenlesbare Buildkennung `0.018.20260818-codex`
- sichtbare Version und Projektschema im Info-Bereich
- Navigation mit 11 Stationen
- erreichbarer Edit-Modus
- keine Browserwarnungen oder -fehler

Die Werkstatt wurde separat im Browser geprüft. Bestätigt wurden:

- Titel `SCHAU HIN Slides Werkstatt · V0.018`
- 13 registrierte Tokens in vier Gruppen
- 13 registrierte Komponenten
- ehrliche Statusanzeige mit 0 kanonischen Einträgen
- Filter für tokenisierte, standardisierte, inventarisierte und noch offene Kandidaten
- keine Browserwarnungen oder -fehler
