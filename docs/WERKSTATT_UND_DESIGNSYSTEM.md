# Werkstatt und Designsystem

Stand: V0.042

## Zweck

`ZEIG-HER-Slides-Werkstatt.html` ist der sichtbare Katalog für Tokens, Komponenten und ihre Reifegrade. Die führende maschinenlesbare Quelle liegt in `quality/design-system-registry.json`.

## Statusgrenze

- `observed`: im Istprodukt gefunden
- `standardized`: wiederverwendbarer Selektor und Zweck sind erkennbar
- `candidate`: vorgeschlagener Zielstandard
- `canonical`: gemeinsame Quelle, Produktverbrauch und Paritätstest sind belegt

V0.032 führt 18 kanonische Produkttokens, die 14 angebotenen Bausteinarten und 50 Oberflächenverträge aus derselben Registry. Eine automatische Paritätsprüfung verhindert doppelte oder fehlende Verträge. Weitere Oberflächen bleiben ehrlich `standardized` oder `observed`, solange ihre Implementierung noch nicht aus einem gemeinsamen Komponentenmodul stammt.

## Weg zur Kanonisierung

1. Registry und Werkstatt inventarisieren 50 sichtbare Komponentenverträge.
2. Der Releasebuild erzeugt die 18 kanonischen CSS-Tokens aus der Registry.
3. Produkt und Werkstatt beziehen die 14 Bausteinarten aus derselben Quelle.
4. Paritätstests vergleichen IDs, Arten, Werte, Selektoren und Pflichtfelder.
5. Weitere Oberflächen wechseln erst nach technischer Extraktion auf `canonical`.

Die Werkstatt besitzt einen festen Root-Dateinamen und bleibt versionsübergreifend der tägliche Einstiegspunkt. Ihre eigene Registry- und Produktversion ist im Kopf sichtbar.

V0.027 erhält die bestehende Outfit-Typografie vollständig als lokal eingebettete freie Variable-Font mit Gewichten 300 bis 800. Damit bleiben besonders Kapitelziffern, Kapitelüberschriften und feine Unterzeilen geometrisch und in ihren Umbrüchen stabil. Echte Emoji-Zeichen sind im Produktvertrag nicht zulässig; Bedienelemente verwenden Text oder monochrome typografische Symbole.

V0.030 bettet Outfit zusätzlich in die Werkstatt ein. Projekte-Dialog und Dateiwegweiser verwenden Varianten des kanonischen Kasten- und Dateikartenvertrags; Vollrahmen-Kamera und rahmengebundene Ebenenliste sind eigene, gemeinsam geprüfte Oberflächenverträge.

V0.031 erweitert den kanonischen Ebenenvertrag um die nicht persistierende Hover- und Tastaturvorschau. Die Vorschau verwendet bewusst dieselbe Kontur wie die Auswahl und führt keinen neuen visuellen Stil ein.

V0.032 kanonisiert die kantige Kastenform mit Petrolkontur, hartem Türkisschatten und prägnanter Überschrift als Dialogvariante. Programmdatei, Projektdatei, Ansichts-Datei und Handout verwenden denselben Dateikartenvertrag; das Logo-Werkzeugmenü ist als eigene Markenoberfläche registriert.

V0.033 verändert keine sichtbare Komponente. Der Viewer-Sichtbarkeitsvertrag wird als technischer Export- und Laufzeitwächter ergänzt; Tokens, Bausteinarten und Oberflächenfamilien bleiben unverändert.

V0.034 bis V0.038 kanonisieren die Präsentationskamera, Notizen und die unteren Navigationsflächen: Rahmen werden mit einem gemeinsamen Fit-Vertrag eingepasst, Notizen liegen im Edit-Modus außerhalb der sichtbaren Station, Editor und Ansicht verwenden feste Navigationsgruppen, Kapitelabstände und dieselbe HUD-Familie. Transparente PNG-Flächen bleiben transparent. Der Farbeditor nutzt als Dialog dieselbe kanonische Panel-Komponente wie die übrigen Werkzeuge. Hinzu kommen unsichtbare technische Verträge für rollierende Sicherungen, Speicherüberwachung, Diagnose und transaktionalen PowerPoint-Import; dafür wurde keine neue Gestaltungsfamilie eingeführt.

V0.039 erweitert diese Familien ohne neue Stilrichtung: Der Stationspfad erhält eine scrollbare Variante, die Kapitelmarke eine kompakte Textvariante und die bestehenden Kasten-Dialoge werden für Projektname und Löschbestätigung wiederverwendet. Speicherstatus bleibt dieselbe Projektkomponente, wird aber als standardmäßig eingeklappte Detailansicht eingesetzt.

V0.040 verwendet die bestehende kantige Panel-Familie auch für „Über diese Anwendung“ und die Materiallizenz. Anwendung und Viewer beziehen denselben Infoinhalt aus einer gemeinsamen Fragmentquelle; damit entsteht keine abweichende zweite Gestaltung.

V0.041 ändert ausschließlich die Produktidentität dieser Familien. Tokens, Bausteinarten, Varianten, Schrift und Layout bleiben unverändert; die Werkstatt zeigt die neue Wortmarke und denselben Versionsstand wie die Anwendung.

V0.042 ergänzt keine neue Stilfamilie. Die bestehende HUD-Familie erhält eine kollisionsfreie Rastervariante; Kamera und Ansichtsübersicht nutzen die bereits kanonisierten Navigations- und Markierungsverträge. Die gemeinsame Infofläche dokumentiert zusätzlich die Entstehung, ohne eine abweichende Viewer-Komponente zu erzeugen.
