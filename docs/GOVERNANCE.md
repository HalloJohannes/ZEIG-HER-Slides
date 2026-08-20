# Qualitäts- und Entwicklungsgouvernance

Stand: V0.042

## Ziel

ZEIG HER Slides wird ab V0.017 kontrolliert, versioniert und rückverfolgbar entwickelt. Die Governance übernimmt die bewährten Grundsätze des Escape Studios, bleibt aber auf die tatsächliche Größe dieses Produkts begrenzt.

## Verbindliche Wahrheiten

1. Jede Produktänderung erhält genau eine neue Versionsnummer.
2. Eine Version besitzt eine kanonische Quelle, eine Root-Ausgabe, einen aktuellen Spiegel und ein Release-Paket.
3. Automatische Prüfung, Browser-Sichtprüfung und menschliche Freigabe bleiben getrennte Statuswerte.
4. Ein vorhandenes Dokument oder ein sogenannter Wächter ist allein kein Qualitätsnachweis.
5. Datenverlust, falsches Überschreiben und unklare Speicherzustände sind release-blockierend.
6. Die Single-HTML bleibt Auslieferungsformat, wird aber ab der Modularisierung nicht mehr als alleinige Quellarchitektur gepflegt.
7. Der Vor-Governance-Bestand bleibt unverändert erhalten und wird über Hashes belegt.

## Qualitätsbereiche

- Produkt und Anforderungen
- Architektur und Code
- Funktion und Regression
- Daten, Speicherung und Wiederherstellung
- Sicherheit von Import und Export
- Performance und Stabilität
- Plattform und Portabilität
- Viewer und Weitergabe
- Release und Dokumentation

Barrierefreiheit bleibt dokumentiert, ist im ersten Stabilitätsblock aber kein Freigabeschwerpunkt.

## Statuswerte

- `baseline-attested`: unveränderter Ausgangsstand ist identifiziert
- `technical-passed`: alle für die Version vorgesehenen technischen Gates sind grün
- `manual-required`: eine reale Sicht- oder Nutzungsprüfung fehlt
- `manual-approved`: die geforderte menschliche Prüfung ist dokumentiert
- `failed`: mindestens ein Pflichtnachweis ist fehlgeschlagen
- `blocked`: der Nachweis konnte nicht erbracht werden

## Arbeitsrhythmus

Nach höchstens drei Produktversionen erfolgt eine Konsolidierung. Hochrisikoänderungen an Speicherung, Projektmigration oder Viewer lösen unabhängig davon eine vollständige Roundtrip- und Rückfallprüfung aus.

V0.026 setzt diesen Konsolidierungspunkt als 20-Fall-Matrix um. Speicher- und Wiederherstellungsfehler dürfen nicht nur lokal behandelt werden: Projektwechsel und Importe verwenden denselben Schreibgate-Vertrag, und jeder bestandene Fall verweist auf einen reproduzierbaren Nachweis.

V0.027 trennt Anwendung und Hosting nachweisbar. Die Anwendung überträgt keine Projektdaten und sperrt externe Verbindungen. Der erstmalige Abruf, Service-Worker-Aktualisierungen und statische App-Shell-Dateien erreichen dennoch den gewählten Host. Server-, Proxy- oder Providerprotokolle sind deshalb ein eigener organisatorischer Betriebsbereich und dürfen nicht als durch Anwendungscode verhindert behauptet werden.

V0.029 erweitert den stabilisierten Funktionsstand um nachweisbare Projektportabilität, Bildrettung und den eigenständigen Handout-Export. Die menschliche Sichtabnahme bleibt bewusst `prepared-awaiting-user`. Erst die dokumentierte Nutzerentscheidung darf diesen Status in `manual-approved` ändern.

V0.030 vereinheitlicht die Vollrahmen-Kamera von Anwendung und Ansichts-Datei und macht Dateifreigabe sowie Ebenenauswahl als kanonische Produktverträge prüfbar. Die Demo erklärt diese Wege knapp, ohne zusätzliche Stationen oder neue Gestaltungsfreiheiten einzuführen.

V0.031 ergänzt die Ebenenauswahl um eine rein flüchtige Hover- und Fokusvorschau. Sie darf weder Projektzustand noch Auswahlpfad verändern. Ältere versionierte Root-Dateien werden nach einem bestandenen Release in `versions/archiv/` geführt, damit die oberste Ebene eindeutig bleibt.

V0.032 ordnet die Projektoberfläche entlang ihrer Datenschutzgrenze: gerätegebundene Browserzustände links, bewusst erzeugte portable Dateien rechts. Die neutrale Programmdatei wird aus einer eigenen, eingebetteten Demobasis erzeugt; Projektdateien bleiben additive Einzelprojekte. Kasten-Dialog, Dateikarten und Logo-Werkzeuge sind als Designsystemverträge geführt.

V0.033 behandelt Viewer-Sichtbarkeit als zweifach abgesicherten Exportvertrag. Temporäre Editorvirtualisierung darf weder in einer portablen Ansichts-Datei fortleben noch deren Startansicht bestimmen. Der Export bereinigt den Snapshot; die reduzierte Viewer-Runtime wiederholt die Bereinigung unabhängig davon.

V0.034 bis V0.036 ordnen die sichtbare Arbeitsoberfläche: Der Kamera-Fit bevorzugt Lesbarkeit bei garantierter Vollsicht, Moderationsnotizen liegen außerhalb des Rahmens, der Viewer besitzt feste Navigationszonen und transparente PNGs bleiben transparent. Farben sind als eigener kanonischer Werkzeugdialog direkt neben Projekte erreichbar.

V0.037 ergänzt lokale rollierende Sicherungspunkte, Speicherplatzwarnungen, eine datensparsame Diagnose und einen transaktionalen PowerPoint-Import. Keine dieser Funktionen überträgt Projektinhalte.

V0.038 verbindet die sichtbaren Korrekturen mit der technischen Resilienz, prüft die reale 30-Stationen-Präsentation im Editor und Viewer und hält die menschliche Schlussabnahme weiterhin ausdrücklich von der technischen Freigabe getrennt.

V0.039 schließt die Projektverwaltung und die Navigation für größere Präsentationen kontrolliert ab. Die Demo ist eine unveränderliche Referenz, Löschungen benötigen eine zweite Bestätigung, neue Projekte beginnen benannt auf einer Titelfolie und die Oberfläche erklärt Browser-Websitedaten bewusst als nicht portablen Zwischenstand. Die Projektdatei bleibt der verbindliche Weg für Backup, Weitergabe und Gerätewechsel.

V0.040 führt „Über diese Anwendung“ als gemeinsame, kanonische Informationsfläche in Programm und Ansichts-Datei ein. Autoren- und Materiallizenz werden von der Softwarelizenz getrennt erfasst und im Viewer eindeutig ausgewiesen. Die Offline-Grenzen, ein haftender Speicherhinweis und die reversible Übernahme aus der versehentlich gemeinsam genutzten Datenbank werden technisch geprüft.

V0.041 benennt das aktuelle Produkt vollständig in ZEIG HER Slides um. Historische Dateien und Nachweise bleiben unverändert; alte Produkt- und Datenbanknamen dürfen in aktuellem Code nur noch als explizite Import- oder Migrationsquelle vorkommen. Die Übernahme liest sowohl `schau-hin-slides` als auch `bittestil-praesentation`, kopiert nur gültige jüngere Stände, prüft das Ergebnis und löscht keine Rückfallquelle automatisch.

V0.042 führt Kamera-Nachkorrekturen als gemeinsamen, abbrechbaren Vertrag von Anwendung und Viewer. Die eigenständige Ansichtsübersicht muss dieselben Kapitelmarken und denselben direkten Stationsfokus wie die Anwendung besitzen. Sichtbare Infoinhalte stammen weiterhin aus genau einem Fragment; damit bleiben Urheberschaft, Entstehung, Offline-Grenze und Lizenz in allen Ausgabewegen identisch.
