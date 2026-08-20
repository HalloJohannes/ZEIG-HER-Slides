# Import- und Inhaltsgrenze V0.022

## Ziel

Projektdateien, Bibliotheksstände, Browserentwürfe, JSON, HTML, PPTX, Bilder, Links und Einbettungen dürfen weder ausführbare Fremdinhalte einschleusen noch die Anwendung durch unkontrollierte Ressourcenmengen destabilisieren.

## Umsetzung

- gemeinsames Runtime-Modul `content-boundary.js`, das innerhalb der Single-HTML mit ausgeliefert wird
- HTML-Allowlist für die benötigte Textformatierung; aktive Elemente, Event-Attribute und netzwerkfähige Medientags werden entfernt
- Linkprotokolle auf `http`, `https` und `mailto` begrenzt; URLs mit eingebetteten Zugangsdaten werden blockiert
- externe Bild-URLs werden entfernt; eingebettete Bilder sind auf PNG, JPEG, WebP, GIF und geprüftes SVG als Base64 begrenzt
- Einzel- und Gesamtlimits für Projekt, Dateien, Bilder, Stationen und Bausteine
- Embeds nur für YouTube im Datenschutzmodus und H5P; kein `iframe` vor bewusster Aktivierung
- aktivierte Frames mit Sandbox, `no-referrer` und Lazy Loading
- PPTX-Prüfung auf Dateigröße, Zahl und Pfade der ZIP-Einträge, Verschlüsselung, Kompressionsverhältnis, entpackte Größe, XML-Entitäten und Folienzahl
- sichere Textausgabe für Kapitel- und Projektnamen verhindert eine zweite HTML-Auswertung bereits maskierter Zeichen
- read-only Diagnoseoberfläche und Laufzeit-Selbsttest; das Dokument trägt nach Erfolg `data-content-boundary="passed"`

## Reale Referenzdateien

Beide inventarisierten Projektdateien mit jeweils ungefähr 24 MB, 30 Stationen, 180 Bausteinen und 107 eingebetteten Bildern passieren Schema, Migration und Inhaltsgrenze vollständig. Keine Bild-, Link- oder Embed-Ressource wird blockiert. Eine vorhandene sichere CSS-Farbschreibweise wird lediglich kanonisch normalisiert.

## Technischer Nachweis

- 20 automatische Tests bestanden
- zentraler Releasecheck vollständig bestanden
- vier Release-Artefakte byteidentisch
- echter Browserlauf: 11 Stationen gerendert, Runtime-Selbsttest bestanden, kein Startfehler
- Browserlauf Embed: erlaubte YouTube-URL erzeugt eine Vorschaltfläche, aber noch kein `iframe`; nicht erlaubte Domain wird entfernt und verständlich gemeldet
- Release-Hash: `e5f88918a48b4ae413908365aba81881eb4a757ca8c90bf54eb4243725433465`

## Bewusste Grenze

V0.022 ist noch kein Netzwerk-Null-Nachweis. Die Anwendung lädt derzeit die Schrift aus Google Fonts; bewusst aktivierte Embeds und angeklickte Links können externe Verbindungen auslösen. Lokale Assets, CSP, Offline-Bereitstellung und die maschinelle Netzwerk-Null-Attestation folgen kontrolliert in V0.027. Die dedizierte, editorfreie Ansichtsdatei folgt in V0.024.
