# Projektidentität und Bibliothek V0.019

## Ziel

Ein Projekt darf seine technische Identität beim Umbenennen nicht verlieren. Bibliothek, Entwürfe und spätere Dateibindungen benötigen deshalb einen unveränderlichen Schlüssel, der nicht aus dem sichtbaren Projektnamen abgeleitet wird.

## Umsetzung

- neue Projekte erhalten eine UUID-basierte Kennung mit Präfix `p-`
- gültige vorhandene Kennungen bleiben erhalten
- fehlende oder ungültige Kennungen werden kontrolliert ergänzt
- `createdAt` bleibt stabil; `updatedAt` wird beim Persistieren fortgeschrieben
- Bibliothekseinträge verwenden `proj:<Projekt-ID>` statt `proj:<Projektname>`
- bestehende namensbasierte Einträge werden beim Öffnen des Projekte-Panels gruppiert, auf IDs umgezogen und bei Kollisionen nach dem neuesten Zeitstempel aufgelöst
- Projekt-ID sowie Erstellungs- und Änderungszeit werden im Projekte-Panel sichtbar angezeigt

## Automatischer Nachweis

Der zentrale Release-Check ist mit acht Tests bestanden. Abgedeckt sind insbesondere:

- ID-Erzeugung und ID-Stabilität nach Umbenennung
- unveränderte Erstellungszeit und fortgeschriebene Änderungszeit
- Ersetzung ungültiger Legacy-IDs
- ausschließlich ID-basierte Bibliotheksadressierung
- Syntax, Versionsvertrag, Baseline und byteidentische Release-Spiegel

Release-Hash:

`3fe07267418fb9c91ad836ec054f50da577c3b4f4bdf6c7e6f67a4d28ec65a11`

## Browsernachweis

Im lokalen Browser wurden bestätigt:

- Buildkennung `0.019.20260818-codex`
- bestehende Demo-ID `schau-hin-demo` bleibt nach Umbenennung unverändert
- der umbenannte Stand erscheint unter dem neuen Namen in der Bibliothek
- ein neues Projekt erhält eine eigenständige UUID-basierte Kennung
- Browsertitel wechselt korrekt zu `SCHAU HIN Slides V0.019 – Neues Projekt`

## Verbleibende Grenze

V0.019 schafft die Identitätsgrundlage. Fehlerbehandlung beim Speichern, Bindung von Datei-Handles an die aktive Projekt-ID und blockierende Sicherung vor Projektwechseln sind bewusst der V0.020 zugeordnet.
