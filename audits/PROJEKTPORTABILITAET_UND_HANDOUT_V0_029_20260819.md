# Audit V0.029 – Projektportabilität, Bildrettung und Handout

## Ergebnis

Die Portabilitätslücke der realen V4-Präsentation ist technisch geschlossen. Projektdateien enthalten den vollständigen Stand einschließlich Bilddaten und werden beim Öffnen über dieselbe validierte Schema-3-Grenze migriert. Ein Gerätewechsel oder die Übergabe an Kolleginnen und Kollegen verwendet ausdrücklich die bearbeitbare Projektdatei, nicht die rein lokale Browserbibliothek.

## Reale Bildprüfung

- zwei unveränderte 24-MB-Referenzen als feste Regression
- 22 zuvor unsichtbare Bilder aus Legacy-Feldern wiederhergestellt
- 79 eindeutige Präsentationsbilder plus Logo bytegetreu erhalten
- 49 Bildbausteine in sieben betroffenen Stationen im Browser geladen, 0 defekt
- dreimaliger Bearbeitungsmodus-Neuaufbau an einer Station mit 12 Bildern bestanden
- eigener Lebenszyklustest simuliert einen abgebrochenen Decode und weist den erfolgreichen Neustart nach

## Projekte-Menü

Das Panel trennt nun sichtbar Browserentwurf, Browserbibliothek, bearbeitbare Projektdatei, Ansichtsdatei und Handout. Die Projektdatei ist als empfohlener Weg für Backup, Übergabe und Gerätewechsel hervorgehoben. Downloadzustände werden weiterhin ehrlich nur als angestoßen bezeichnet.

## Handout

Der bisherige direkte Druckklon wurde durch eine eigenständige HTML-Nachlese ersetzt. Sie nutzt zweispaltige Textkarten, kleine Bilder, Kapitelmarken, lokale Outfit-Typografie, A4-Druckregeln und enthält keine Editor- oder Projektwerkzeuge.

## Sicherheitsgrenze

Das optionale Logo-Linkziel ist nur im Handout aktiv. Arbeits- und Ansichtsdateien behalten den strikten Netzwerk-Null-Modus und blockieren externe Navigation. Projektinhalte, Bilder, Cookies, Analyse- und Telemetriedaten werden nicht an einen Server übertragen.

## Sichtabnahme

Automatische Verträge und gezielte Browserprüfungen sind bestanden. Offen bleibt die gebündelte visuelle Abnahme des Gesamteindrucks durch Johannes.
