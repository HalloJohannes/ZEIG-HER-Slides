# Projektmenü und Dateiwege

Stand: V0.032

## Was nur auf diesem Gerät liegt

Browserentwurf und Browser-Bibliothek liegen ausschließlich im lokalen Speicher des gerade verwendeten Browsers. Sie werden weder auf einen Server übertragen noch automatisch in eine heruntergeladene Datei übernommen. Ein anderer Browser, ein anderes Browserprofil oder ein anderes Gerät besitzt deshalb eine eigene Bibliothek.

Das Projektfenster fasst diese gerätegebundenen Bereiche in seiner linken Spalte zusammen:

- aktuelles Projekt und sein Speicherstatus
- Browser-Bibliothek
- neues leeres Projekt
- PowerPoint-, Projektdatei- und JSON-Import
- lokale Einstellungen und technische Werkzeuge

## Welche Datei wofür gedacht ist

### Programmdatei

Die Programmdatei ist die neutrale Anwendung mit vollständigem Editor und der eingebauten Demo. Sie enthält weder das aktuell bearbeitete Projekt noch andere Projekte aus der Browser-Bibliothek. Diese Datei kann an Kolleginnen und Kollegen weitergegeben oder statisch auf einer Domain bereitgestellt werden.

### Projektdatei

Die Projektdatei enthält genau das aktuell geöffnete Projekt, seine Bilder und den vollständigen Editor. Sie ist die belastbare Sicherung für Weiterarbeit, Übergabe und Gerätewechsel. Wird sie in einer anderen ZEIG-HER-Slides-Anwendung importiert, wird sie als eigenes Projekt ergänzt; die vorhandene Bibliothek bleibt erhalten.

### Ansichts-Datei

Die Ansichts-Datei enthält die Präsentation und die Vortragsnavigation, aber keinen Editor, keine Projektverwaltung und keine internen Notizen. Sie ist für Vortrag und reine Ansicht geeignet.

### Handout

Das Handout setzt die Inhalte als kompakte Textblöcke mit verkleinerten Bildern. Der Button `PDF-Handout erstellen` öffnet den Druckdialog des Browsers oder Betriebssystems; dort wird `Als PDF sichern` gewählt. Das Ergebnis ist eine echte PDF-Datei und damit ein üblicher Mail-Anhang. Das HTML-Handout bleibt als vollständig offline lesbare Alternative verfügbar.

Ein echter Word-Export ist in V0.032 bewusst nicht enthalten. Eine nur umbenannte HTML-Datei wäre kein belastbares DOCX. Ein späterer DOCX-Export benötigt einen eigenständigen, lokal eingebetteten Dokumentgenerator sowie neue Layout- und Roundtrip-Prüfungen.

## Einfache Entscheidungsregel

- Anwendung neutral teilen: Programmdatei
- gemeinsam weiterarbeiten oder sichern: Projektdatei
- nur ansehen oder vortragen: Ansichts-Datei
- nach einem Workshop nachlesen oder mailen: PDF-Handout

Keine dieser vier Ausgaben enthält die übrigen Projekte der Browser-Bibliothek.
