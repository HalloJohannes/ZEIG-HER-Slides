# Versionshistorie

## V0.042 · 19. August 2026 · Stabile Kamera und vollständige Ansichtsübersicht

- gemeinsamer begrenzter Kamera-Nachlauf für Anwendung und Ansichts-Datei nach Bildladung, Schriftbereitschaft und beobachteter Größenänderung
- automatische Nachkorrektur bricht bei bewusstem Zoomen oder Verschieben ab und startet erst beim nächsten Stationswechsel erneut
- Ansichtsübersicht zeigt dieselben großen Kapitel- und Stationsmarken wie die Anwendung
- Stationsklick in der herausgezoomten Ansichts-Datei fokussiert die gewählte Station unmittelbar mit der Kamera
- Viewer-HUD in klar getrennte Gruppen geordnet, sodass Kapitelmenü, Zähler und Aktionen auch bei kompakten Desktopbreiten nicht kollidieren
- gemeinsame Informationsfläche nennt Johannes Koch verlinkt als Urheber und dokumentiert Claude/Codex im Abschnitt „Entstehung“ sachlich
- 88 automatische Tests, vollständiger Releasecheck und dokumentierte Browser-Sichtprüfung bestanden; gebündelte menschliche Schlussabnahme bleibt getrennt offen

## V0.041 · 19. August 2026 · Produktumbenennung und kompatible Migration

- aktuellen Produktnamen in Anwendung, Werkstatt, Ansichts-Datei, Handout, Diagnose, Exportdateien, Metadaten und technischen Globals auf ZEIG HER Slides umgestellt
- technische Kennung auf `zeig-her-slides` und JavaScript-Präfix auf `ZEIG_HER_` vereinheitlicht
- neue aktive Browserdatenbank `zeig-her-slides`; kontrollierte, zeitstempelbewusste und verifizierte Übernahme aus `schau-hin-slides` und `bittestil-praesentation`
- alte Datenbanken werden nach erfolgreicher Kopie bewusst nicht automatisch gelöscht und bleiben als Rückfallquelle erhalten
- alte Projektdateien und Demo-Schlüssel bleiben über eine eng begrenzte Kompatibilitätsbrücke importierbar
- kompakte Viewerbreiten behalten Zugriff auf Materiallizenz und „Über diese Anwendung“
- historische Versionen und Nachweise bleiben unverändert unter ihrem damaligen Namen erhalten

## V0.040 · 19. August 2026 · Transparenz, Offline-Grenzen und Materiallizenz

- gemeinsame kanonische Informationsfläche „Über diese Anwendung“ in Programm und Ansichts-Datei
- ehrliche Offline-Grenzen ohne Überschreiben nativer Browserfunktionen und ohne automatische externe Verbindung
- reversible Übernahme aus der versehentlich gemeinsam genutzten Browserdatenbank sowie haftender Speicherhinweis
- Ansichts-Export erfasst Titel, Urheberin oder Urheber, Jahr, CC- oder Freitextlizenz und die Ausnahme abweichend gekennzeichneter Inhalte
- Ansichts-Datei trennt Materiallizenz der Präsentation verständlich von Softwareinformationen und Anwendungslizenz
- Demo-, CSS- und Schriftquelle dedupliziert; Legacy-Embeds bleiben ohne automatische Netzwerkverbindung

## V0.039 · 19. August 2026 · Skalierbare Navigation und sichere Browser-Bibliothek

- Kapitelmarke in Anwendung und Ansichts-Datei auf zehn sichtbare Zeichen begrenzt; vollständiger Name bleibt als Titel und zugängliche Bezeichnung erhalten
- Stationspfad für Präsentationen mit 50 oder mehr Stationen horizontal scrollbar; aktive Station wird automatisch in den sichtbaren Bereich geführt
- technische Details des aktuellen Projekts standardmäßig eingeklappt und Browser-Zwischenstand verständlicher benannt
- klare Erklärung, dass Browserentwurf und Bibliothek Websitedaten des jeweiligen Browserprofils sind und durch Löschen der Websitedaten, privaten Modus, Browser- oder Gerätewechsel fehlen können
- Projektdatei im Dialog ausdrücklich als portables Backup empfohlen
- Bibliothekslöschung mit eigenem zweiten Bestätigungsdialog abgesichert
- neues Projekt fragt zuerst nach dem Namen und öffnet danach direkt eine bearbeitbare Titelfolie
- kanonische Demo dauerhaft und unlöschbar in der Browser-Bibliothek verankert
- 76 automatische Tests und vollständiger Releasecheck bestanden; gebündelte Sichtabnahme bleibt getrennt offen

## V0.038 · 19. August 2026 · Produktreife und reale Sichtprüfung

- Editor und Ansichts-Datei mit der realen 30-Stationen-Präsentation geprüft
- gemeinsamer Kamera-Fit zeigt breite wie hohe Rahmen vollständig mit gleichmäßigem Sicherheitsabstand; Kapitelübergänge erhalten eine passend nähere Ansicht
- Notizen im Edit-Modus unterhalb und außerhalb des Rahmens angedockt, ohne die sichtbare Station oder Kameramessung zu vergrößern
- feste Navigationsgruppen, sichtbare Kapitelabstände und geordnete Ansichtsaktionen für Kapitel, Übersicht, Drucken/PDF und Vortragsende
- transparente PNG-Dateien behalten Transparenz; verzögert geladene Bilder verlieren zuverlässig ihre Ladefläche
- Farben als eigener kanonischer Dialog direkt in der Werkzeugleiste; Projekte-Dialog öffnet stets am Anfang
- rollierende Sicherungen, Speicherwarnung, datensparsame Diagnose und transaktionaler PowerPoint-Import in Produkt, Demo und Governance zusammengeführt
- HTML-Entitäten in Ansichts-Titel und Kapitelbezeichnungen werden als Klartext ausgegeben
- 72 automatische Tests, vollständiger Releasecheck und reale Browser-Sichtprüfung bestanden

## V0.037 · 19. August 2026 · Technische Produktreife und lokale Resilienz

- bis zu fünf projektbezogene lokale Sicherungspunkte mit Duplikat- und Intervallschutz
- lokale Kapazitätsanzeige mit klarer Warn- und Kritischstufe
- datensparsame technische Diagnose ohne Namen, IDs, Folientexte oder Bilder und ohne Übertragung
- PowerPoint-Import bereitet einen vollständigen validierten Kandidaten vor und mutiert das Projekt erst danach
- Importzeitlimit beendet hängende PowerPoint-Dateien nachvollziehbar und ohne Teilstand
- abweichende gespeicherte Produktversionen werden beim Import sichtbar auf den aktuellen Build aktualisiert
- Speicherresilienz und PowerPoint-Importvertrag in eigenständige testbare Runtime-Module zerlegt

## V0.036 · 19. August 2026 · Farbe als eigenes Werkzeug

- Farben aus dem großen Projekte-Dialog in einen eigenen kanonischen Dialog neben „Projekte“ verschoben
- Werkzeugleiste logisch nach Projekt, Farbe, Datei und Bearbeitung geordnet
- technische Werkzeuge im Projekte-Dialog begrifflich von gestalterischen Einstellungen getrennt
- Werkstatt und Designsystemregistry auf den sichtbaren Stand angehoben

## V0.035 · 19. August 2026 · Stabile Ansichts-Navigation

- feste Positionen für Vor- und Zurücknavigation in Anwendung und Ansichts-Datei
- Kapitel im Stationspfad durch größere Abstände sichtbar gruppiert
- Ansichtsaktionen in der Reihenfolge Kapitel, Übersicht, Drucken/PDF und Vortrag beenden
- PNG-Transparenz und Bildhydration im eigenständigen Viewer abgesichert

## V0.034 · 19. August 2026 · Kamera und Notizen

- gemeinsamer Kamera-Sicherheitsabstand für breite, hohe und Kapitelrahmen
- Notizen außerhalb der eigentlichen Station positioniert und aus der Rahmenmessung entfernt
- Kapitelübergänge ignorieren übernommene Mindesthöhen und werden passend enger eingepasst
- Kamera-, Notiz- und Fit-Verträge als eigenständige Regressionen dokumentiert

## V0.033 · 19. August 2026 · Sichtbarer Ansichts-Export

- realen Leerstart der Ansichts-Datei reproduziert: Inhalt, 30 Stationen und 58 Bilder waren vorhanden, aber Station 1 blieb durch eine geerbte `off`-Klasse unsichtbar
- Export-Snapshot entfernt temporäre Virtualisierungszustände von Stationen und Hintergrundflächen
- eigenständiger Viewer entfernt dieselben Zustände beim Start erneut als defensive zweite Schutzschicht
- gemeinsames kleines Runtime-Modul verhindert abweichende Bereinigungslogik zwischen Anwendung und Viewer
- Viewer-Prüfartefakt bildet den Fehlerfall mit bereits ausgeblendeter erster Station ausdrücklich nach
- 58 automatische Tests und 34 Stabilitätsfälle dokumentieren die Korrektur

## V0.032 · 19. August 2026 · Klare Projektwege und portable Ausgaben

- Projektfenster nach der Datenschutzgrenze in gerätegebundene Zustände und bewusst erzeugte portable Dateien geteilt
- Browser-Bibliothek unmittelbar unter dem aktuellen Projekt; Neu und Import als gemeinsamer Startpunkt darunter
- verwirrende leere Projektdatei entfernt und Projektdatei-Öffnen eindeutig als Import benannt
- vier Dateiarten tragen ihre Aktion direkt an der Erklärung
- neutrale Programmdatei startet immer mit der kanonischen Demo und enthält weder aktuelles Projekt noch Browser-Bibliothek
- Projektdateien enthalten genau ein Projekt und werden additiv in eine vorhandene Bibliothek importiert
- echtes PDF-Handout über den Browser-/Systemdruckdialog; Offline-HTML bleibt als gesonderte Variante
- Logo-Linkziel aus der Projektverwaltung in ein logoeigenes Werkzeugmenü verlagert
- Projektfenster als kantige Kastenvariante mit Petrolkontur, hartem Türkisschatten und Outfit-Typografie kanonisiert
- Werkstatt auf 18 kanonische Tokens, 14 Bausteinarten und 50 Oberflächenverträge erweitert
- 57 automatische Tests und reale Browserprüfung bei kompakter Fensterhöhe bestanden

## V0.031 · 19. August 2026 · Ebenenvorschau und eindeutiger Root

- Überfahren eines Eintrags im Ebenenmenü hebt den zugehörigen Baustein im Rahmen mit derselben Kontur wie eine Auswahl hervor
- Tastaturfokus erzeugt dieselbe Vorschau; Verlassen, Fokuswechsel, Klick und Schließen entfernen sie vollständig
- die Vorschau ist rein flüchtig und verändert weder Projektstand noch tatsächlichen Auswahlpfad
- die bestehende Demo erklärt das Verhalten an der bisherigen Ebenen-Station, ohne eine weitere Station einzuführen
- Werkstattvertrag für Auswahl und Ebenen um Hover- und Fokusvorschau ergänzt
- ältere versionierte HTML-Dateien von der obersten Ebene entfernt; V0.028 bis V0.030 bleiben im Versionsarchiv erhalten
- 54 automatische Tests und 29 Stabilitätsfälle dokumentieren den Stand vor der gebündelten Sichtabnahme

## V0.030 · 19. August 2026 · Vollrahmen-Navigation und klare Dateifreigabe

- gemeinsamer, separat testbarer Kamera-Fit-Vertrag für Anwendung und eigenständige Ansichts-Datei
- jeder Stationswechsel misst reale Rahmen- und Navigationshöhe und zeigt den gesamten Rahmen mit verlässlichem Innenabstand
- Bildladen, lokale Schrift und nachträgliches Rahmenwachstum lösen begrenzte Nachkorrekturen aus; manuelles Zoomen bleibt bis zum nächsten Stationswechsel erhalten
- großer modaler Projekte-Dialog auf Basis des kanonischen Kasten-Bausteins mit gesperrtem und abgedunkeltem Hintergrund
- Dateiwegweiser erklärt Programm-, Projekt-, Ansichts- und Handout-Datei und hält fest, dass die Browser-Bibliothek niemals mitreist
- Projekte ist der erste, farblich eigenständige Befehl der Bearbeitungsleiste
- rahmengebundene Ebenenliste zeigt Bausteinart und reale Ebene und erlaubt die direkte Auswahl auch verdeckter Elemente
- Demo bleibt bei 11 Stationen und erklärt neue Funktionen nur an bestehenden Stellen
- Werkstatt umfasst 15 kanonische Tokens und 48 Produktoberflächen; Outfit ist auch dort lokal eingebettet
- 53 automatische Tests und 28 Stabilitätsfälle dokumentieren den Stand vor der gebündelten Sichtabnahme

## V0.029 · 19. August 2026 · Projektportabilität und kompakte Nachlese

- Projektschema 3 hebt 22 zuvor unsichtbare, aber noch vorhandene Bilder aus Legacy-Feldern automatisch in kanonische Bildbausteine
- doppelte Bild-Altfelder werden nach Migration und künftigen Umwandlungen entfernt; die konkrete 24-MB-Präsentation behält 79 eindeutige Präsentationsbilder plus Logo
- Bildlade-Warteschlange erhält einen generationssicheren Neustart und Timeout, damit Bearbeitungs- und Ansichtswechsel sie nicht mehr blockieren
- reale große Projekt- und Ansichtsdateien prüfen Bild-Erreichbarkeit, Byteidentität und zwei vollständige Roundtrips
- Projekte-Menü erklärt Browserentwurf, Browserbibliothek, bearbeitbare Projektdatei, Ansichtsdatei und Handout als getrennte Wege
- bearbeitbare Projektdatei ist als empfohlener Backup-, Übergabe- und Gerätewechselweg hervorgehoben
- Ebenen-Menü benennt und erschließt verdeckte Bausteine gezielt
- eigenständige Handout-Datei mit zweispaltigen Textkarten, kleinen Bildern, lokaler Outfit-Schrift und A4-Drucklayout
- optionales Logo-Linkziel wird im Handout aktiv; Arbeits- und Ansichtsdateien behalten den strikten Netzwerk-Null-Modus
- Werkstattverträge für Projektdatei, Ebenen, Logo-Linkziel und Handout aktualisiert

## V0.028 · 19. August 2026 · Externe Nachweise und Betriebsfreigabe

- stabilisierten V0.027-Funktions- und Gestaltungsstand ohne neue Funktionsausweitung eingefroren
- selbstständige, netzwerkfreie Verifikationsmappe mit Anwendung, Werkstatt, Deployment, Attestationen, Versionsregister und Betriebsdokumenten
- 16 Dateien werden von einem unabhängigen Node-Skript per Größe und SHA-256 neu geprüft
- maschinenlesbare Betriebsrollen sowie Release-, Update-, Daten- und Rollbackregeln
- Betriebshandbuch, Update-/Rollbackplan und externe Prüfanleitung erstellt
- gebündelte 12-Punkte-Sichtabnahme vorbereitet; technische Vorprüfung bestanden, Nutzerentscheidung bewusst noch offen

## V0.027 · 19. August 2026 · Offline-Bereitstellung und Netzwerk-Null

- bisherige freie Outfit-Typografie als lokale Variable-Font für Gewichte 300–800 eingebettet
- Kapitelziffern und -überschriften bleiben bei Gewicht 800, Unterzeilen bei Gewicht 300; Umlaute sind im Fontsubset enthalten
- Google-Fonts-Aufruf vollständig entfernt; Fontdatei, Lizenz, Größe und SHA-256 dokumentiert
- Emoji-Zeichen aus Produktquelle und Link-Werkzeug entfernt
- CSP sperrt Verbindungen, Frames, Formulare, Objekte und fremde Ressourcen
- Laufzeitwächter blockiert zusätzlich externe Navigation, Fetch, XHR, WebSocket, EventSource, Beacon und Cookiezugriff
- statisches Deployment mit Manifest, Service Worker, App-Icon, Headerregeln, Hosthinweisen und maschinenlesbarer Datenschutzattestation
- Browserlauf meldet 0 externe Ressourcen und startet nach Abschalten des Servers vollständig aus dem Offline-Cache
- klare Grenze dokumentiert: Der Host kann beim statischen Abruf Verbindungsmetadaten sehen, erhält aber keine Projektinhalte

## V0.026 · 19. August 2026 · Konsolidierung und Stabilitätsmatrix

- 20 maschinenlesbar dokumentierte Stabilitätsfälle mit konkreten Belegdateien
- zwei reale 24-MB-Projekte überstehen jeweils zwei Schema- und JSON-Roundtrips ohne Vertragsabweichung
- Projektdatei-Roundtrip und gültige, beschädigte sowie projektfremde Entwurfsstände geprüft
- ein zentraler Schreibgate-Vertrag blockiert sämtliche Projektwechsel und Importpfade nach fehlgeschlagener Vorsicherung
- Entwurfsschreibvorgänge werden serialisiert, sodass ein älterer asynchroner Schreibvorgang keinen neueren Stand überschreibt
- zeitnahe Sicherung bei Namensänderungen statt eines unklaren Intervallfensters
- Browserlauf mit „Matrix Köln ÄÖÜ“ und „Entwurf Köln ÄÖÜ“ über Bibliothek, Projektwechsel, Autosave, Neuladen und Wiederherstellung bestanden
- bewusster Rückfall auf den Dateistand erhält die Browserbibliothek und meldet keinen Start- oder Inhaltsgrenzenfehler

## V0.025 · 19. August 2026 · Bild- und Rendering-Performance

- Bilder werden nicht mehr vollständig beim Deckaufbau dekodiert, sondern nach Stationensichtbarkeit geladen
- sequenzielle Decode-Queue verhindert gleichzeitige Spitzen bei bildreichen Stationen
- aktuelle und benachbarte Stationen werden priorisiert; entfernte Bildquellen nach Ruhezeit freigegeben
- Übersicht lädt höchstens ein Vorschaubild je Station, statt alle Großbilder gleichzeitig zu dekodieren
- Kamera nutzt GPU-freundliche 3D-Transformation, Stationen besitzen Layout-/Style-Containment
- Bildimport nutzt `createImageBitmap`, asynchrone Blob-Kodierung und eine 64-Pixel-Transparenzstichprobe
- maschinenlesbare Kennzahlen für Deckaufbau, Hydrationen, Freigaben, Long Tasks und Kamera-Frame-P95
- realer 24,4-MiB-Lastfall: 30 Stationen, 107 gespeicherte Ressourcen, 57 gerenderte Bilder
- Browsermessung: 1,6 s Kaltstart, 48,5 ms Deckaufbau, 18,5 ms Kamera-P95, ein Long Task

## V0.024 · 19. August 2026 · Dedizierte Ansichtsdatei

- Nachlese-Export wird aus einem eigenen Viewer-Template und einer eigenen kleinen Runtime gebaut
- Viewer enthält keine Editor-, Autosave-, Bibliotheks-, Import- oder Dateisystemlogik
- minimaler Viewer-Vertrag enthält nur Titel, Kapitelzuordnung, Farben und Produktversion; keine Projekt-ID, internen Notizen oder Autorenmetadaten
- Darstellung wird als bereinigter Snapshot der tatsächlich gerenderten Stationen exportiert
- Navigation, Übersicht, Kapitelmenü, Vortrag, Zoomen, Verschieben, Frostglas, Links und Druck bleiben erhalten
- externe Embeds bleiben bis zum bewussten Klick ohne `iframe` und nutzen danach Sandbox sowie `no-referrer`
- 29 automatische Tests, zentraler Releasecheck und dedizierter Viewer-Lauf im Browser bestanden

## V0.023 · 19. August 2026 · Modulare Designsystemquelle

- 11 reale Produkttokens werden beim Release aus der führenden Designsystem-Registry erzeugt
- alle 14 angebotenen Bausteinarten besitzen einen gemeinsamen Vertrag für Produkt und Werkstatt
- Werkstatt von 13 Beispielkomponenten auf 45 Baustein- und Oberflächenverträge vervollständigt
- Werkstatt nach Funktionsfamilien gegliedert und mit verbindlichen Reifegraden versehen
- eigenes Runtime-Modul für UI-Verträge und maschinenlesbare Designsystemdiagnose
- automatische Prüfungen für IDs, Pflichtfelder, Tokenwerte, Bausteinreihenfolge, Selektoren und Einfügemarken
- Baustein-/Ebenenmenü viewportfest, immer im Vordergrund, an Fensterrändern umklappend und eindeutig schließbar
- 25 automatische Tests, zentraler Releasecheck sowie Produkt- und Werkstattlauf im Browser bestanden

## V0.022 · 19. August 2026 · Import- und Inhaltsgrenze

- zentrale, separat testbare Inhalts- und Ressourcengrenze für alle Projektquellen
- aktive HTML-Elemente, Ereignisattribute, unsichere Links und externe Bildquellen werden entfernt oder blockiert
- Links nur über `http`, `https` und `mailto` ohne eingebettete Zugangsdaten
- Embeds auf YouTube im Datenschutzmodus und H5P begrenzt; bis zum bewussten Klick existiert kein `iframe`
- eingebettete Frames erhalten Sandbox, `no-referrer` und Lazy Loading
- Größenlimits für Projekte, Importdateien, Einzelbilder, Bildsumme, Stationen und Bausteine
- PPTX-Härtung gegen übergroße Dateien, ZIP-Bomben, unsichere Pfade, Verschlüsselung, XML-Entitäten und übergroße Folienmengen
- sichtbare und maschinenlesbare Browser-Selbstprüfung der Inhaltsgrenze
- zwei reale 24-MB-Dateien mit je 107 Bildern vollständig migriert; keine Ressource blockiert
- 20 automatische Tests, zentraler Releasecheck und echter Browserlauf bestanden

## V0.021 · 19. August 2026 · Schema, Migration und Quarantäne

- Projektschema 2 als separat testbares Runtime-Modul
- Startdatei, Entwurf, Bibliothek, JSON- und HTML-Import verwenden dieselbe validierte Datengrenze
- Vor-Governance-Projekte werden kopierend migriert; die Quellen bleiben unverändert
- zukünftige Schemas, unbekannte Bausteine und falsche Kapitelverweise werden eindeutig abgelehnt
- beschädigte Browserentwürfe werden isoliert, statt den aktiven Dateistand zu ersetzen
- zwei reale 24-MB-Dateien mit je 30 Stationen und 107 eingebetteten Bildern als feste Regressionstestfälle
- 15 automatische Tests und Browser-Smoke bestanden

## V0.020 · 18. August 2026 · Ehrliches Speichermodell

- Browserentwurf, Browser-Bibliothek, Arbeitsdatei und Export getrennt sichtbar
- Datei-Handle im Arbeitsspeicher und IndexedDB an die aktive Projekt-ID gebunden
- Datei-Verbindung bei neuem oder gewechseltem Projekt zuverlässig zurückgesetzt
- Projektwechsel, neues Projekt und Importe bei fehlgeschlagener Vorsicherung blockiert
- Download nur noch als angestoßen, nicht als bestätigt gespeichert bezeichnet
- Browserentwurf bleibt bei nicht bestätigtem Download erhalten
- 12 automatische Tests und Browserprüfung bestanden

## V0.019 · 18. August 2026 · Stabile Projektidentität

- unveränderliche, zufällig erzeugte Projekt-ID für neue und unvollständige Projekte
- getrennte Erstellungs- und Änderungszeit im Projektmodell
- Projekt-ID und Zeitstempel im Projekte-Panel sichtbar
- Browserbibliothek von namensbasierten auf ID-basierte Schlüssel umgestellt
- automatische, kollisionsbewusste Migration vorhandener Bibliothekseinträge
- Projektidentitätslogik als eingebettetes, separat testbares Runtime-Modul
- 8 automatische Tests und Browserprüfung bestanden

## V0.018 · 18. August 2026 · Produktidentität und Releasevertrag

- sichtbare und maschinenlesbare App-Version eingeführt
- Projektschema und `savedWith`-Kennung angelegt
- reproduzierbaren Build für Root, aktuellen Spiegel und Release-Paket eingeführt
- Release-Hash und Spiegelgleichheit maschinell prüfbar gemacht
- Werkstatt-Grundlage mit maschinenlesbarer Token- und Komponentenregistry aufgebaut
- Reifegrade `inventarisiert`, `standardisiert`, `tokenisiert`, `Kandidat` und `kanonisch` getrennt
- Speicher-, Bibliotheks- und Viewerprobleme bewusst noch nicht verändert

## V0.017 · 18. August 2026 · Baseline

- aktuellen neutralen App-Stand unverändert übernommen
- aktuellen Workshopstand und Vor-Governance-Versionen inventarisiert
- kontrollierte Ordner-, Versions-, Audit- und Release-Struktur eingeführt
- zentrale Versions- und Qualitätsregeln dokumentiert
- bekannte Produktlücken ausdrücklich noch nicht als behoben ausgewiesen

Die ältere Entstehungshistorie liegt in `CHANGELOG_VOR_GOVERNANCE_BIS_V0_017.md` und im unveränderten Ordner `Versionen/`.
