# SCHAU HIN Slides – Änderungshistorie

## Versionierungs-Konvention

- Die **aktuelle Version** liegt immer auf der obersten Ebene dieses Ordners:
  - `schau-hin-slides.html` – neutrale Weitergabe-Version (MIT-0) mit Selbsterklär-Demo
  - `schau-hin-slides.zip` – dieselbe Datei als ZIP zum Weitergeben
  - `praesentation.html` – Projekt „Didaktische Bildgenerierung“ (Workshop-Inhalte)
- Bei jedem Änderungsauftrag wird die bestehende Datei **zuerst** nach `Versionen/`
  kopiert (Schema: `<dateiname>_v<Nr>_<JJJJ-MM-TT>.html`), danach wird die Datei
  auf oberster Ebene durch die neue Version ersetzt.
- Jede neue Version bekommt hier einen Changelog-Eintrag (neueste oben).

---

## Version 17 · 2026-08-18

- **Frostglas direkt am Bild:** Neuer Schalter „Frostglas“ in den
  Bild-Werkzeugen (neben Badge, KI-Badge, Marker) – das Bild bleibt im
  Ansichtsmodus verdeckt, bis es angeklickt wird; „wieder verdecken“
  erscheint beim Überfahren. Im Edit-Modus ist das Cover nur angedeutet,
  damit sich das Bild normal bearbeiten lässt. Kein Umweg mehr über den
  Frostglas-Baustein.
- Archiv: Version 16 liegt unter `Versionen/*_v16_2026-08-18.html`.

## Version 16 · 2026-08-18

Inhalts-Update im Workshop-Projekt (App unverändert, Basis: hochgeladene
v3didaktischebildgenerierung.html):

- Station „Fallbeispiele aus einem Film“ ersetzt durch **„Rekonstruktion &
  Quellenkritik“**: zwei Bild-Platzhalter (Forum Romanum heute / Antike,
  jeweils mit KI-Badge), Kategorien-Tabelle belegt · plausibel · erfunden
  (Punkt-Verbinder) und Methoden-Hinweis.
- Neue Station **„Bildimpulse: der kreative Teil“** direkt dahinter:
  Impulsbild-Platzhalter plus vier Aufgabenvarianten zum selben Bild und
  Tipp zum Stilvergleich.
- Bilder bewusst als Platzhalter – ausschließlich KI-generierte Motive
  einfügen (Prompts siehe Chat).
- Archiv: Version 15 liegt unter `Versionen/*_v15_2026-08-18.html`.

## Version 15 · 2026-08-18

- **Baustein-Werkzeugleiste verdeckt keinen Inhalt mehr:** Sie liegt jetzt
  vollständig oberhalb des Bausteins (mit kleinem Abstand zur Oberkante) –
  die erste Zeile des Inhalts bleibt immer sichtbar. Bei sehr vielen
  Werkzeugen bricht die Leiste nach oben um, statt in den Baustein zu ragen.
- Archiv: Version 14 liegt unter `Versionen/*_v14_2026-08-18.html`.

## Version 14 · 2026-08-18

- **Ehrliche Speichern-Beschriftung.** Entwürfe sichert der Browser ohnehin
  automatisch – der Knopf betrifft nur die HTML-Datei und heißt jetzt je
  nach Browser: **„In Datei speichern“** (Chrome/Edge, schreibt direkt in
  die Datei) bzw. **„Datei herunterladen“** (Safari/Firefox, legt sie im
  Download-Ordner ab). Gleiches Wording im Projekte-Panel; Tooltips
  erklären den Unterschied zwischen Entwurf und Datei.
- Archiv: Version 13 liegt unter `Versionen/*_v13_2026-08-18.html`.

## Version 13 · 2026-08-18

- **Toasts erscheinen jetzt oben mittig** statt am unteren Bildrand – dort
  hatten sie gelegentlich die Menüleiste überlagert.
- Archiv: Version 12 liegt unter `Versionen/*_v12_2026-08-18.html`.

## Version 12 · 2026-08-18

- **Kein „Seite wirklich verlassen?“-Dialog mehr beim Neuladen.** Da der
  Entwurf beim Verlassen automatisch gesichert und beim Neuladen automatisch
  wiederhergestellt wird, ist die Warnung überflüssig geworden. Sie erscheint
  nur noch als Notbremse, wenn der Browser-Speicher nachweislich nicht
  funktioniert (z. B. privates Fenster) und wirklich etwas verloren ginge.
- **Fix: Tastatur in Eingabefeldern.** Tippen im Projektnamen, in
  Kapitel-Feldern, Link-URLs usw. steuert nicht mehr parallel die
  Folien-Navigation – Leerzeichen und Pfeiltasten landen jetzt im Feld
  statt in der Präsentation.
- Robustheit: Fehler beim Öffnen des Browser-Speichers werden erkannt und
  gemeldet statt still verschluckt.
- Archiv: Version 11 liegt unter `Versionen/*_v11_2026-08-18.html`.

## Version 11 · 2026-08-18

Speichern & Bibliothek grundlegend abgesichert:

- **Fix: Verlorene Änderungen nach Neuladen.** Viele strukturelle Änderungen
  (Bausteine hinzufügen/löschen/verschieben, Tabellen-Zeilen, Sortieren,
  Rahmen ziehen …) galten intern nicht als „ungesichert“ – der Autosave hat
  sie deshalb nie mitgesichert. Jetzt zählt **jede** Änderung im Edit-Modus.
- **Entwurf wird automatisch wiederhergestellt:** Nach einem Neuladen ist der
  letzte Entwurf sofort wieder da – ohne Nachfrage-Falle. Ein Hinweis-Banner
  informiert; „Stattdessen Dateistand laden“ führt bei Bedarf mit einem Klick
  zum gespeicherten Stand zurück.
- **Autosave enger getaktet:** alle 8 Sekunden statt 20 – und zusätzlich
  sofort beim Verlassen, Wechseln oder Schließen des Tabs.
- **Neu: „Projekt-Datei laden (.html)“** (Projekte → Neu & Import): bereits
  gespeicherte SCHAU HIN Slides-Dateien lassen sich wieder öffnen und landen
  automatisch in der Bibliothek – das zuvor geöffnete Projekt wird dabei
  gesichert. Auch Ansichts-Dateien werden so wieder editierbar. Die Inhalte
  laufen dabei immer in der App-Version der geöffneten Datei.
- **Einfügen-Bereinigung lückenlos:** Sicherheitsnetz für alle Einfügewege in
  Textfelder (auch Drag & Drop von Text) – es kommt immer nur reiner Text an.
  Hinweis: Diese Funktionen stecken in der Datei selbst – ältere gespeicherte
  Dateien am besten einmal per „Projekt-Datei laden“ in die aktuelle Version
  holen.
- **praesentation.html enthält jetzt deine bearbeiteten Inhalte** (aus der
  hochgeladenen didaktischebildgenerierung.html), eingebettet in die neueste
  App-Version; die Datei liegt zusätzlich unter ihrem bisherigen Namen bei.
- Archiv: Version 10 liegt unter `Versionen/*_v10_2026-08-18.html`.

## Version 10 · 2026-08-18

Speichern verständlicher gemacht:

- **Chrome/Edge: direkt in die Datei speichern.** Beim ersten „Speichern“
  fragt der Browser einmal nach dem Speicherort; danach schreibt jeder
  weitere Klick still direkt in dieselbe HTML-Datei – kein Download-Umweg,
  keine Duplikate im Download-Ordner. Die Dateiwahl wird pro Projekt gemerkt.
- **Safari/Firefox: klarer Hinweis.** Diese Browser erlauben aus
  Sicherheitsgründen kein direktes Überschreiben – „Speichern“ legt die
  Datei als Download ab. Ein Hinweis erklärt jetzt, dass die Datei im
  Download-Ordner liegt, dass man damit die bisherige Datei ersetzt und dass
  die einmalige Browser-Nachfrage („Downloads erlauben?“) mit „Erlauben“ zu
  beantworten ist.
- Robustheit: Browser-Speicher-Schreibfehler werden sauber abgefangen.
- Archiv: Version 9 liegt unter `Versionen/*_v9_2026-08-18.html`.

## Version 9 · 2026-08-18

- **Einfügen ohne Fremdformatierung:** Kopierter Text aus anderen Quellen
  (Word, Webseiten, PDFs …) landet in Textfeldern jetzt immer als reiner
  Text – fremde Schriften, Farben und Stile bleiben draußen. Bilder aus der
  Zwischenablage werden weiterhin als Bild-Baustein eingefügt.
- **Neues Werkzeug „🔗 Link“:** Text markieren → Link setzen (fehlendes
  https:// wird ergänzt, bestehende Links lassen sich ändern oder entfernen).
  Links öffnen in einem neuen Tab, damit die Präsentation nicht verlassen
  wird, und bleiben **auch in der Ansichts-Datei klickbar**. Im Ansichtsmodus
  löst ein Klick auf einen Link keinen Stationsflug mehr aus.
- **Neues Werkzeug „Format ✕“:** entfernt die Formatierung des markierten
  Texts – räumt z. B. früher eingefügte Fremdformatierung auf (Links bleiben
  erhalten).
- Archiv: Version 8 liegt unter `Versionen/*_v8_2026-08-18.html`.

## Version 8 · 2026-08-18

Sortier-Panel ausgebaut (Kapitel & Stationen):

- **Erklärzeile im Panel:** Ziehen sortiert – Kapitel wandern als Ganzes mit
  allen ihren Stationen, Stationen lassen sich innerhalb eines Kapitels und
  zwischen Kapiteln einsortieren („· ans Ende von … ·“ als Ablagefläche);
  neue Kapitel entstehen über das Eingabefeld unten („+ Kapitel“ legt gleich
  einen Kapitel-Übergang auf der Fläche an).
- **▲▼-Pfeile an jeder Zeile** als Alternative zum Ziehen: Kapitel-Pfeile
  verschieben das Kapitel samt aller Stationen; Stations-Pfeile bewegen die
  Station schrittweise – auch über Kapitelgrenzen hinweg (ans Ende des
  vorherigen bzw. an den Anfang des nächsten Kapitels).
- **Kapitel umbenennen:** ✎ am Kapitel öffnet ein Eingabefeld (Enter
  bestätigt, Esc bricht ab) – Name wird überall übernommen (Leiste,
  Kapitelmenü, Karten-Beschriftung).
- Archiv: Version 7 liegt unter `Versionen/*_v7_2026-08-18.html`.

## Version 7 · 2026-08-18

- **Fix: „Verbinder: ohne“** zeigte weiterhin Pfeile (das leere Symbol wurde
  intern als „nicht gesetzt“ gewertet) – jetzt bleibt der Zwischenraum
  wirklich leer, im Edit- wie im Ansichtsmodus.
- **Werkzeuge liegen immer obenauf:** Die Station eines ausgewählten
  Bausteins bzw. eines offenen „☰ Bausteine“-Panels rückt vor alle anderen
  Stationen; Rahmen-Griffe, Baustein-Werkzeugleisten und das Panel haben
  durchgehend höhere Ebenen als jeder Inhalt (auch als Bausteine mit
  „Ebene +“) – nichts überlagert mehr die Bedienelemente. Nach Abwahl bzw.
  Schließen wird die Reihenfolge zurückgesetzt.
- Archiv: Version 6 liegt unter `Versionen/*_v6_2026-08-18.html`.

## Version 6 · 2026-08-18

- **Tabellen: „− Zeile“ in der Werkzeugleiste** – entfernt die unterste Zeile
  (mindestens eine bleibt). Einzelne Zeilen lassen sich weiterhin gezielt per
  ✕ am rechten Zeilenrand löschen.
- Archiv: Version 5 liegt unter `Versionen/*_v5_2026-08-18.html`.

## Version 5 · 2026-08-18

- **Tabellen: „+ Zeile“ direkt in der Werkzeugleiste** des Bausteins (neben
  „+ Spalte“ / „− Spalte“ / „Verbinder“) – der bisherige Knopf unter der
  Tabelle bleibt zusätzlich erhalten. Zeilen löschen wie gehabt per ✕ am
  Zeilenrand.
- **Individuelle Spaltenbreiten:** Am neuen **⇹-Griff** über den Verbindern
  der ersten Zeile lässt sich jede Spaltengrenze frei ziehen – die Gewichte
  werden mitgespeichert, bleiben beim Hinzufügen von Spalten erhalten und
  der Wächter prüft sie beim Laden. Die Gesamtbreite skaliert weiterhin am
  ◢-Griff des Bausteins.
- Archiv: Version 4 liegt unter `Versionen/*_v4_2026-08-18.html`.

## Version 4 · 2026-08-18

**Bearbeiten**
- **Auswahl-Konzept:** Ein Klick wählt einen Baustein aus – seine Werkzeuge
  bleiben dauerhaft sichtbar, er liegt vorübergehend vorn (greifbar auch wenn
  sonst verdeckt), alle übrigen gestrichelten Markierungen treten zurück, die
  Rahmenkontur bleibt. Esc oder Klick daneben hebt die Auswahl auf.
- **„☰ Bausteine“-Menü pro Rahmen:** listet alle Bausteine der Station (auch
  verschachtelte) mit Art, Ebene und Textauszug – verdeckte Bausteine lassen
  sich so direkt anwählen.
- **Rahmen in Breite UND Höhe ziehbar** (◢-Griff). Im Automatik-Layout misst
  das Layout die tatsächlichen Breiten: Wird ein Rahmen breiter, **rücken die
  Nachbarn automatisch auf** – nichts überlappt mehr. Der Rahmen definiert
  zugleich den Bildausschnitt (mit Luft drumherum).
- **Vorgefertigte Stationen → „⇢ in Bausteine umwandeln“:** macht alle Inhalte
  (auch Bilder) frei editier-, verschieb-, skalier- und löschbar.
- **Neue Bausteine:** „Abstand“ (Weißraum, Höhe am ◢-Griff ziehbar) und
  „Trennlinie“ (fein / kräftig / Akzent).
- **Farbe pro Baustein:** Überschrift, Kapitelmarke und Text in CI-Farbe
  (Standard / Türkis / Akzent / Weiß) – wie das prägnante DON'T.
- **Anwinkeln:** Kästen, Bilder & Co. am ⟳-Griff leicht rotieren,
  Doppelklick stellt gerade.
- **Tabellen:** Zeilen UND Spalten hinzufügen/entfernen; Zellen-Verbinder
  wählbar (Pfeil = Standard, Punkt, Strich, ohne); als Baustein frei skalierbar.
- **Spalten:** Spalten und Reihen hinzufügen/entfernen – leere Zellen als
  gezielter Weißraum.
- **Bildunterschriften:** leere Unterschriften erscheinen nicht mehr im
  Ansichtsmodus; der Platzhaltertext „Bildunterschrift“ ist abgeschafft und
  wird in bestehenden Projekten automatisch bereinigt (Wächter).

**Präsentieren**
- **Vortragsmodus mit Navigation:** Punkte, Pfeile, Übersicht, Kapitel-Button
  und Zähler bleiben sichtbar (nur Werkzeuge und „Zur Anwendung“ verschwinden),
  dazu ein dezenter Fortschrittsbalken. Bei Ruhe blendet die Leiste sanft aus,
  Mausbewegung holt sie zurück.
- **Roter Faden läuft oberhalb der Rahmen** – nicht mehr durch den Inhalt.
- **Vorrendern:** Vorgänger- und Nachfolger-Station bleiben immer gerendert –
  ruckelfreie Übergänge, gerade im Vortragsmodus.

**Teilen**
- **„Als Ansichts-Datei exportieren“** (Projekte-Panel): reine
  Darstellungs-Version ohne Bearbeitung, Projekte und Autosave – wie ein PDF
  zum Dokument. Navigation und Vortragsmodus bleiben voll erhalten.
- Archiv: Version 3 liegt unter `Versionen/*_v3_2026-08-18.html`.

## Version 3 · 2026-08-18

- **Freie Größen-Skalierung:** Jeder Baustein hat im Edit-Modus unten rechts
  einen ◢-Griff und lässt sich durch Ziehen frei in der Breite skalieren –
  Bilder skalieren proportional mit. Der „Breite“-Umschalter (100/50/33 %)
  bleibt als Schnellwahl und setzt die freie Größe zurück.
- **Ebenen pro Baustein:** Neue Werkzeuge „Ebene +“ / „Ebene −“ legen Bausteine
  vor bzw. hinter den übrigen Inhalt (negative Ebenen = Hintergrund). Damit
  lassen sich z. B. feine Lineart-Grafiken hinter Text legen: Bild einfügen →
  „Frei bewegen“ → hinter den Text ziehen → am ◢-Griff skalieren → „Ebene −“.
- Wächter prüft und begrenzt die neuen Werte (Breite, Ebene) beim Laden.
- Archiv: Version 2 liegt unter `Versionen/*_v2_2026-08-18.html`.

## Version 2 · 2026-08-18

- **Fix: PNG-Transparenz beim Einfügen.** Bilder werden jetzt per Alphakanal-
  Abtastung auf echte Transparenz geprüft: Transparente PNGs/SVGs bleiben
  unabhängig von ihrer Größe immer PNG (vorher wurden große transparente PNGs
  in JPEG mit weißem Hintergrund umgewandelt).
- **Fix: Darstellung transparenter Bilder.** Transparente Bilder liegen nicht
  mehr auf der weißen Bildkarte mit Schatten, sondern stehen frei auf der
  Fläche. Opake Bilder behalten die Karte wie gehabt.
- Archiv: Version 1 liegt unter `Versionen/*_v1_2026-08-18.html`.

## Version 1 · 2026-08-18

Erster versionierter Stand. Funktionsumfang:

**Präsentieren**
- Frei navigierbare Fläche statt Folien: greifen/ziehen, stufenloses Zoomen,
  geführter Pfad per Pfeiltasten entlang eines „roten Fadens“ (Serpentine,
  automatischer Zeilenumbruch nach 8 Stationen)
- Kartenansicht (Taste O/Doppelklick) mit Kapitelmarke + Überschrift je Kachel,
  Klick auf Kachel fliegt zur Station
- Vortragsmodus (Taste H) blendet Leiste und Werkzeuge aus
- Pfeilbuttons ‹ › direkt an den Stationspunkten in der unteren Leiste
- Fest im Sichtfenster: Anwendungsname (oben links), eigenes Logo (oben rechts)

**Bearbeiten**
- Edit-Modus (Stift): Texte direkt tippen, B/I/Listen-Formatierung, Undo/Redo,
  Autosave-Entwurf mit Zeitanzeige, Schließwarnung bei ungesicherten Änderungen
- Rahmen frei aufziehen; alle Stationen verschieb-, duplizier-, lösch- und
  größenveränderbar (lösen sich beim Verschieben aus dem Automatik-Layout)
- Bausteine: Kapitelmarke, Überschrift, Kapitel-Übergang, Text, Tipp/Hinweis,
  Prompt, Bild, Kasten, Tabelle, Embed (URL), Spalten, Frostglas (Aufdecken)
- Bausteine sortieren, duplizieren, kopieren & an anderer Stelle einfügen,
  frei positionieren („Frei bewegen“)
- Bilder: Dropzone, Strg/Cmd+V, automatische Verkleinerung/Kompression
  (PNG-Transparenz bleibt erhalten), Badge, „KI generiert“-Badge, Marker mit
  herauslösbarer Beschriftung samt Verbindungslinie
- Notizfeld je Station (nur im Edit-Modus sichtbar)

**Organisieren**
- Sortier-Panel: Kapitel und Stationen per Drag & Drop, neue Kapitel anlegen
- Projekte-Panel: Browser-Bibliothek mit automatischer Sicherung beim Wechsel,
  neues leeres Projekt, „Als Datei speichern“ (Dateiname aus Projektname),
  JSON-Export/-Import, Druck-/Handout-Ansicht, CI-Farben (werden mitgespeichert)
- PowerPoint-Import (.pptx): Titel und Texte je Folie werden zu Rahmen
  (ohne Bilder), Wahl zwischen neuem Projekt und zusätzlichem Kapitel,
  Ladebalken mit Fortschritt

**Technik & Qualität**
- Performance: Sichtbarkeits-Culling, JS-Kamerafahrten mit Frame-genauem
  Culling (durch Greifen/Scrollen unterbrechbar), Editor-Bedienelemente nur im
  Edit-Modus im DOM, Lazy-Decoding der Bilder
- Wächter: Schema-Reparatur bei Import/Laden, Layout-Prüfung, Kontrast-Warnung
  bei CI-Farben, Performance-Wächter mit automatischem Eco-Modus
- Keine Textmarkierung beim Greifen im Ansichtsmodus
- Lizenz: MIT-0 (MIT No Attribution) · 2026 Johannes Koch – Angaben unter
  „Zur Anwendung“
