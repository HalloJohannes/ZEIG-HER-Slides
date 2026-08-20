# Qualitätsgates

Stand: V0.042

## Zusätzlich bei HUD, Ansichtsübersicht und verzögerter Größenstabilisierung

- die HUD-Gruppen besitzen bei typischen Desktop- und Kompaktbreiten getrennte reservierte Bereiche und überlagern weder Kapitelmenü, Zähler noch Nachbaraktionen
- kompakte sichtbare Beschriftungen behalten vollständigen Inhalt als Titel und zugängliche Bezeichnung
- die eigenständige Ansichts-Datei setzt im Übersichtsmodus denselben `far`-Zustand wie die Anwendung und zeigt dadurch die großen Kapitel- und Stationsmarken
- ein Klick auf eine Station in der Ansichtsübersicht beendet den Übersichtsmodus und fokussiert genau diese Station
- Anwendung und Viewer verwenden denselben begrenzten Kamera-Nachlauf nach Bildladung, Schriftbereitschaft und beobachteter Größenänderung
- manuelles Zoomen oder Verschieben beendet den automatischen Nachlauf bis zum nächsten bewussten Stationswechsel
- „Über diese Anwendung“ besteht in Anwendung und Viewer aus denselben sieben Fakten einschließlich verlinkter Urheberschaft und dokumentierter Entstehung

## Zusätzlich bei Produktidentität und Migration

- aktuelle Anwendung, Werkstatt, Viewer, Handout, Diagnose, Exporte und technische Globals nennen ausschließlich ZEIG HER Slides
- ältere Projektdateien bleiben importierbar; die Erkennung hängt nicht vom früheren Produktnamen ab
- Projekte aus `schau-hin-slides` und `bittestil-praesentation` werden kopierend, zeitstempelbewusst und verifiziert nach `zeig-her-slides` übernommen
- eine fehlgeschlagene Übernahme löscht oder verändert keine Altquelle und wird sichtbar gemeldet
- historische Releaseartefakte bleiben unverändert und werden nicht rückwirkend umbenannt

## Zusätzlich bei Autoren- und Materiallizenz

- der Ansichts-Export verlangt Titel, Urheberin oder Urheber, Jahr und eine ausgewählte oder frei formulierte Lizenz
- abweichend gekennzeichnete Fremdinhalte können ausdrücklich von der Materiallizenz ausgenommen werden
- die Ansichts-Datei trennt Materiallizenz und Softwareinformationen in zwei verständlichen, dauerhaft erreichbaren Dialogen
- keine Autorenangabe wird als Softwareurheberschaft oder Anwendungslizenz missverstanden

## Zusätzlich bei langer Navigation und Browser-Bibliothek

- die sichtbare Kapitelmarke bleibt auf zehn Zeichen begrenzt; vollständiger Kapitelname und Bedeutung bleiben als Titel und zugängliche Bezeichnung erhalten
- der Stationspfad scrollt innerhalb des reservierten Bereichs horizontal, während Vor- und Zurückpfeil feste Positionen behalten
- nach jedem Stationswechsel wird die aktive Station bei Bedarf sanft in den sichtbaren Bereich geführt
- die kanonische Demo wird beim Start und Öffnen der Projektverwaltung bereitgestellt, zuerst einsortiert und nie mit einer Löschaktion angeboten
- ein Bibliotheksprojekt wird erst nach einer zweiten Bestätigung endgültig aus dem Browserspeicher entfernt
- ein neues leeres Projekt verlangt vor dem Anlegen einen Namen und startet direkt auf einer bearbeitbaren Titelfolie
- technische Details zum aktuellen Projekt sind standardmäßig eingeklappt; der Unterschied zwischen Browser-Zwischenstand und portabler Projektdatei bleibt trotzdem klar erklärt

## Zusätzlich beim Vollrahmen-Fit und bei Moderationsnotizen

- jeder Stationswechsel bevorzugt eine gut lesbare Breitenanpassung, begrenzt sie aber so, dass auch hohe Rahmen vollständig oberhalb der Navigation bleiben
- Kapitelübergänge dürfen näher herangeholt werden als inhaltsreiche Stationen
- der freie Rand um den Rahmen bleibt auf allen Seiten sichtbar und wird aus realer Viewport- und HUD-Geometrie berechnet
- Moderationsnotizen liegen nur im Edit-Modus unterhalb und außerhalb des Rahmens; sie verändern weder Rahmenhöhe noch Kamera-Fit

## Zusätzlich bei Viewer-Navigation und PNGs

- transparente PNG-Bausteine erhalten weder Platzhalterverlauf noch weißen Hintergrund oder Schatten
- die Kapitelabstände im Stationspfad sind deutlich größer als Abstände innerhalb eines Kapitels
- Vor- und Zurück bleiben über Kapitelwechsel hinweg an festen Positionen
- die vier Aktionen stehen in der Reihenfolge Kapitel, Übersicht, Drucken/PDF und Vortrag beenden
- gespeicherte HTML-Entities in sichtbaren Projekt- oder Kapitelnamen werden als Klartext dargestellt

## Zusätzlich beim Ansichts-Export

- der Snapshot entfernt temporäre `off`-Klassen von Stationen und Hintergrundflächen vor dem Dateibau
- die eigenständige Viewer-Runtime entfernt solche Zustände beim Start erneut als unabhängige Schutzschicht
- das Prüfartefakt bildet ausdrücklich den realen Fehlerfall ab: Station 1 ist beim Export ausgeblendet, weil eine spätere Station aktiv war
- Station 1 muss nach dem Öffnen sichtbar sein; Navigation, Übersicht und Kamera dürfen nicht vom Editorzustand beim Export abhängen

## Zusätzlich bei Projektfenster und Dateiwegen

- die linke Dialogspalte enthält ausschließlich gerätegebundene Zustände: aktuelles Projekt, Browserentwurf, Browser-Bibliothek, Neu und Import
- die rechte Dialogspalte enthält ausschließlich portable Ausgaben und trägt die jeweilige Aktion unmittelbar an der Erklärung
- die Programmdatei startet unabhängig von der erzeugenden Arbeitsdatei immer mit der neutralen Demo und enthält keine Browser-Bibliothek
- der Import einer Projektdatei ergänzt die Bibliothek und überschreibt keine dort vorhandenen Projekte
- der PDF-Weg nutzt einen echten Browser-/Systemdruckdialog; HTML bleibt als gesonderte Offline-Variante klar gekennzeichnet
- das Logo besitzt ein eigenes Werkzeugmenü; sein Linkziel wird an der sichtbaren Logo-Oberfläche statt in der Projektverwaltung gepflegt

## Zusätzlich bei Ebenenvorschau

- Überfahren und Tastaturfokus eines Menüeintrags erzeugen dieselbe Kontur wie die Auswahl am zugehörigen Baustein
- die Vorschau verändert weder den Datenstand noch den tatsächlichen Auswahlpfad
- beim Verlassen, Fokuswechsel, Klick oder Schließen des Ebenenmenüs wird die Vorschau vollständig entfernt
- ein Klick wählt weiterhin genau den zugehörigen Baustein aus

## Zusätzlich bei Kamera, Dateifreigabe und Ebenen

- jeder Stationswechsel berechnet den Ausschnitt aus der real gemessenen Rahmenhöhe und der tatsächlich belegten Navigationshöhe
- Bild-, Schrift- und Größenänderungen lösen eine begrenzte automatische Neuberechnung aus; manuelles Zoomen wird erst beim nächsten Stationswechsel zurückgesetzt
- App und eigenständige Ansichts-Datei verwenden denselben separat testbaren Kamera-Fit-Vertrag
- der Dateiwegweiser trennt Programm-, Projekt-, Ansichts- und Handout-Datei und erklärt die lokale Browser-Bibliothek ausdrücklich
- die Ebenenliste ist an den gewählten Rahmen gebunden, zeigt reale Ebenenwerte und wählt auch verdeckte Bausteine direkt aus

## Zusätzlich bei Betriebsfreigabe

- eine kopierbare Prüfmappe verifiziert sich ohne Projektabhängigkeiten und ohne Netzwerk selbst
- Anwendung, Werkstatt, Deployment, Attestationen, Versionsregister und Betriebsdokumente besitzen gebündelte Einzelhashes
- Betriebs-, Update-, Rollback- und externe Prüfanleitung sind versioniert
- technische Freigabe und menschliche Sichtabnahme bleiben sichtbar getrennt
- der Release gilt erst nach Nutzerentscheidung als visuell freigegeben

## Zusätzlich bei Netzwerk-Null und statischer Bereitstellung

- alle Produktfonts liegen eingebettet vor; Schriftdatei, Größe, Hash, Gewichte und freie Lizenz sind dokumentiert
- `default-src`, `connect-src`, `frame-src`, `object-src` und `form-action` sind auf `none` gesetzt
- externe Navigation, `fetch`, XHR, WebSocket, EventSource, Beacon, Frames und Cookiezugriff werden zusätzlich zur CSP durch die kontrollierte Runtime blockiert
- Produktquelle und ausgelieferte Anwendung besitzen keine Emoji-Zeichen und keine Analyse-, Telemetrie- oder Fehlertrackingbibliotheken
- ein maschinenlesbarer Laufzeitnachweis meldet die Zahl geladener externer Ressourcen; Pflichtwert ist `0`
- das vollständige statische Paket besitzt Einzelhashes, Service Worker, Manifest, Headerregeln, Hosthinweise und eine Datenschutzgrenze
- Browserprüfung umfasst einen echten Neustart nach Abschalten des Servers

## Zusätzlich bei Konsolidierung und Stabilität

- reale Projektdateien überstehen mindestens zwei vollständige Schema- und JSON-Roundtrips ohne Vertragsabweichung
- Entwurf, Bibliothek, Arbeitsdatei und Ansichtsdatei besitzen getrennte Fallback- und Rückfallnachweise
- fehlgeschlagene Vorsicherung blockiert jeden Projektwechsel und jeden Importpfad zentral
- Entwurfsschreibvorgänge werden serialisiert; eine ältere asynchrone Sicherung kann keinen neueren Stand überschreiben
- Projektname und Inhalte mit `ä`, `ö`, `ü`, `Ä`, `Ö` und `Ü` bleiben über Speicherung und Wiederherstellung erhalten
- die maschinenlesbare Stabilitätsmatrix nennt für jeden Fall Status und reale Belegdateien

## Zusätzlich bei bildreichen Projekten

- Bilddaten werden erst für aktuelle, benachbarte oder tatsächlich sichtbare Stationen dekodiert
- Dekodierung erfolgt sequenziell; weit entfernte Bilder werden nach Ruhezeit freigegeben
- Bildoptimierung nutzt asynchrone Blob-Kodierung statt synchroner Base64-Großkopien
- Renderzeit, aktive Bilder, Freigaben, Long Tasks und Kamera-Frame-P95 sind maschinenlesbar
- der reale 24-MB-/30-Stationen-/107-Ressourcen-Lastfall hält die festgelegten Budgets ein

## Immer erforderlich

- Tests des Daten- und Releasevertrags
- Syntaxprüfung des ausgelieferten Single-HTML-Scripts
- identische Root-, Aktuell- und Release-Kopie
- konsistente Versionsmetadaten
- maschinenlesbares Änderungsmanifest
- verständlicher Audit- oder Historieneintrag
- Parität von Designsystem-Registry, Produkt und Werkstatt

## Zusätzlich bei Speicherung und Bibliothek

- stabile Projekt-ID statt Projektname als Schlüssel
- erfolgreicher Schreibnachweis vor Projektwechsel
- simulierte Speicherfehler und Quota-Fehler
- getrennte Tests für Browserentwurf, Bibliotheksstand, Arbeitsdatei und Export
- Migration alter `draft:*`, `proj:*` und File-Handle-Zuordnungen
- Rückfall auf den letzten lesbaren Stand

## Zusätzlich beim Viewer

- kein Editor-DOM und kein Editor-JavaScript im Viewer-Artefakt
- keine Memos oder authoring-spezifischen Metadaten
- kein IndexedDB-, Import-, Datei- oder Bibliothekszugriff
- Navigation, Links, Frostglas, Vortrag und Druck funktionieren
- Viewer-Daten werden sanitisiert und besitzen eine eigene Vertragsversion

## Zusätzlich bei Importen und eingebetteten Inhalten

- alle Projektquellen passieren dieselbe Schema- und Inhaltsgrenze
- aktive HTML-Elemente, Ereignisattribute und unsichere URL-Protokolle werden entfernt
- externe Bilder sind nicht zulässig; Bilddaten besitzen Typ-, Einzel- und Gesamtlimits
- Embeds bleiben bis zur bewussten Aktivierung ohne `iframe` und sind auf freigegebene Anbieter begrenzt
- PPTX-Dateien besitzen Grenzen für Datei, Einträge, entpackte Größe, Kompressionsverhältnis, XML und Pfade

## Browserprüfung

Die fertige Root-HTML wird über einen lokalen Server geladen. Geprüft werden mindestens Start, Navigation, Edit-Modus, Projektwechsel, Speichern, erneutes Öffnen und Viewer-Export. Konsolenfehler blockieren die Freigabe.
