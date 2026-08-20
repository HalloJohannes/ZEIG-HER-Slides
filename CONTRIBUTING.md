# Mitwirken

Danke für das Interesse an ZEIG HER Slides. Das Produkt soll bewusst klein, lokal und leicht verständlich bleiben. Neue Funktionen sollten einen klaren wiederkehrenden Anwendungsfall lösen, ohne die reduzierte Bedienlogik aufzuweichen.

## Fehler und Vorschläge melden

- Vorhandene Issues prüfen und für neue Meldungen die passende Vorlage verwenden.
- Keine vertraulichen Präsentationen, personenbezogenen Daten oder internen Screenshots hochladen.
- Version, Browser, Betriebssystem, reproduzierbare Schritte sowie erwartetes und tatsächliches Verhalten nennen.
- Wenn sinnvoll, die lokal erzeugte und vor dem Export anonymisierte Diagnosedatei beifügen.

## Technische Leitlinien

- `src/` ist die führende modulare Quelle; gebaute Einzeldateien werden nicht isoliert bearbeitet.
- Vorhandene Tokens, Komponenten und Varianten aus dem Design-System-Register wiederverwenden.
- Keine externen Laufzeitabhängigkeiten, Tracker, Telemetrie oder unaufgeforderten Netzwerkzugriffe einführen.
- Importierte und gespeicherte Daten ausschließlich über die validierten Projektgrenzen verarbeiten.
- Bei sichtbaren Änderungen Werkstatt, Demo und Dokumentation aktualisieren.
- Bei Releases Metadaten, Manifest, Spiegeldateien und Änderungshistorie gemeinsam fortschreiben.

## Prüfen

Node.js 20 oder neuer genügt; eine Paketinstallation ist nicht erforderlich.

```bash
npm run check
```

In öffentlichen Checkouts werden ausschließlich zwei große, nicht veröffentlichte reale Workshopfixtures übersprungen. Alle anderen Prüfungen müssen bestehen.

## Pull Requests

- Änderungen klein und nachvollziehbar halten.
- Den Zweck und das beobachtbare Verhalten beschreiben.
- `npm run check` vor dem Push ausführen.
- Bestätigen, dass keine privaten Projekt-, Bild-, Rettungs- oder Diagnosedaten enthalten sind.
- Sichtbare Änderungen mit anonymisierten Screenshots dokumentieren, sofern sie für die Beurteilung nötig sind.
