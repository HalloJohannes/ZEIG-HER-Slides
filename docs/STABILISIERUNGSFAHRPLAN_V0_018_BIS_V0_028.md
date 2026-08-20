# Stabilisierungsfahrplan V0.018 bis V0.028

## V0.018 – Produktidentität und Releasevertrag

- sichtbare und maschinenlesbare App-Version
- Schema- und Buildkennung
- zentraler Build- und Releasecheck
- Werkstatt-Grundlage mit Token- und Komponentenregistry

## V0.019 – Stabile Projektidentität

Status: technisch bestanden; Schlussabnahme gebündelt.

- dauerhafte Projekt-ID
- Erstellungs- und Änderungszeit
- Bibliotheksschlüssel unabhängig vom Projektnamen

## V0.020 – Ehrliches Speichermodell

Status: technisch bestanden; Schlussabnahme gebündelt.

- Browserentwurf, Bibliothek, Arbeitsdatei und Export getrennt
- File-Handle an Projekt-ID gebunden
- Projektwechsel nur nach bestätigter Sicherung
- erste menschliche Nutzungsprüfung

## V0.021 – Schema und Migration

Status: technisch bestanden; Schlussabnahme gebündelt.

- vollständige Validierung
- Migration der Vor-Governance-Daten
- sichere Leer- und Schadenszustände

## V0.022 – Import- und Inhaltsgrenze

Status: technisch bestanden; Schlussabnahme gebündelt.

- HTML-Sanitization
- erlaubte URL-Protokolle und Embed-Regeln
- Größen- und Ressourcenlimits

## V0.023 – Modulare Quelle

Status: technisch bestanden; Schlussabnahme gebündelt.

- Single-HTML wird aus getrennten Runtime-, Registry- und Quellmodulen reproduzierbar gebaut
- Produkt und Werkstatt beziehen Tokens und Bausteinverträge aus gemeinsamen Quellen
- vollständiges Oberflächeninventar und automatische Designsystem-Parität
- viewportfestes Bausteinmenü; interne Renderer-/Storage-Zerlegung wird risikobezogen in den folgenden Blöcken fortgesetzt

## V0.024 – Dedizierte Ansichts-Datei

Status: technisch bestanden; Schlussabnahme gebündelt.

- eigene kleine Viewer-Runtime und eigener Datenvertrag
- keine Editierfunktionen, internen Notizen, Projekt-IDs oder Autorenmetadaten
- kein IndexedDB-, LocalStorage-, Import-, Datei- oder Bibliothekszugriff
- Navigation, Übersicht, Kapitel, Vortrag, Frostglas, Links, Datenschutz-Embeds und Druck vorhanden
- automatisches Viewer-Prüfartefakt sowie Browser- und Datenschutzprüfung

## V0.025 – Bild- und Rendering-Performance

Status: technisch bestanden; Schlussabnahme gebündelt.

- sichtbarkeitsgesteuerte, sequenzielle Bilddekodierung für aktuelle und benachbarte Stationen
- Freigabe dekodierter Bilder außerhalb des Arbeitsbereichs nach Ruhezeit
- GPU-freundliche Kameratransformation, Rendergrenzen und Leerlaufabgleich
- asynchrone Blob-Kodierung und kleine Transparenzstichprobe beim Bildimport
- fester 24,4-MiB-Lastfall mit 30 Stationen, 107 gespeicherten und 57 tatsächlich gerenderten Bildressourcen
- Browsermessung: 1,6 s lokaler Kaltstart, 48,5 ms Deckaufbau, 18,5 ms Kamera-P95, ein Long Task

## V0.026 – Konsolidierung und vollständige Stabilitätsmatrix

Status: technisch bestanden; Schlussabnahme gebündelt.

- 20 dokumentierte Funktions-, Roundtrip-, Speicher-, Viewer-, Performance- und Fallbackfälle
- zwei reale Projekte überstehen zwei vollständige Schema- und JSON-Roundtrips identisch
- zentrale Schreibsperre für Projektwechsel, neues Projekt sowie JSON-, HTML-, Datei- und PowerPoint-Import
- serialisierte Entwurfsschreibvorgänge gegen asynchrone Überholvorgänge
- Browserprüfung von Umbenennung, `ÄÖÜ`, Bibliothek, Projektwechsel, Autosave, Wiederherstellung und Rückfall auf den Dateistand
- keine Start- oder Inhaltsgrenzenfehler im geprüften Browserlauf

## V0.027 – Offline-Bereitstellung und Netzwerk-Null

Status: technisch bestanden; Schlussabnahme gebündelt.

- Outfit als freie lokale Variable-Font mit Gewichten 300–800 eingebettet; Kapiteltypografie unverändert
- Produktquelle ohne Emoji-Zeichen; „Link“ als reiner Textbutton
- erzwingende Content Security Policy mit `connect-src 'none'`, `frame-src 'none'` und `form-action 'none'`
- zusätzlicher Laufzeitwächter für Navigation, Fetch, XHR, WebSocket, EventSource, Beacon, Frames und Cookiezugriff
- reproduzierbares statisches Deployment mit PWA-Manifest, Service Worker, Headerregeln und Einzelhashattestation
- Browsernachweis: 0 externe Ressourcen, Offline-Registrierung erfolgreich, vollständiger Neustart nach Abschalten des Servers
- ehrliche Betriebsgrenze: eigener Host kann normale Verbindungsmetadaten sehen; Projektdaten werden nicht übertragen

## V0.028 – Externe Nachweise und Betriebsfreigabe

Status: technisch bestanden; menschliche Schlussabnahme vorbereitet und offen.

- selbstständige Offline-Verifikationsmappe mit 16 Dateien und SHA-256-Neuberechnung
- Anwendung, Werkstatt, Deployment, Attestationen, Versionsregister und Betriebsdokumente gebündelt
- maschinenlesbare Betriebsrollen, Release-, Update-, Daten- und Rollbackregeln
- Betriebshandbuch, Update-/Rollbackplan und externe Prüfanleitung
- eine einzige gebündelte 12-Punkte-Sichtabnahme für Johannes vorbereitet
- stabilisierter Funktions- und Gestaltungsstand eingefroren; keine neue Funktionsausweitung
