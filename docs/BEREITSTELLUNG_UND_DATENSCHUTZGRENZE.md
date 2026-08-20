# Bereitstellung und Datenschutzgrenze

Stand: V0.042

## Empfohlenes Modell

ZEIG HER Slides wird als unverändertes statisches HTTPS-Paket bereitgestellt. Es benötigt kein Backend, keine Datenbank, keine Nutzerkonten und keine serverseitige Schreibfunktion. Projekte liegen ausschließlich in IndexedDB des jeweiligen Browsers oder in einer von der nutzenden Person bewusst gespeicherten lokalen HTML-Datei.

Die öffentliche Referenzfassung ist unter [https://hallojohannes.github.io/ZEIG-HER-Slides/](https://hallojohannes.github.io/ZEIG-HER-Slides/) erreichbar. Ein GitHub-Actions-Workflow erzeugt dafür bei jeder Änderung an `main` das kanonische Deploymentpaket neu. Dadurch bleibt der Online-Einstieg mit der lokal herunterladbaren Ausgabe technisch rückverfolgbar und es entsteht kein zweiter Produktstand.

## Technisch erzwungen

- keine Analyse, Telemetrie, Fehlerübertragung oder Drittanbieterbibliothek
- keine vom Anwendungscode gelesenen oder geschriebenen Cookies
- keine externen Fonts, Bilder, Skripte, Styles, Frames oder Medien
- keine `fetch`-, XHR-, WebSocket-, EventSource- oder Beacon-Verbindungen
- keine externen Linkaufrufe; URLs bleiben nur als Projektinhalt erhalten
- keine YouTube- oder H5P-Verbindung; Embed-URLs bleiben für spätere kontrollierte Profile im Projekt erhalten
- keine Formularübertragung
- Hashprüfung des vollständigen Deploymentpakets

## Nicht durch Anwendungscode verhinderbar

Ein Domainabruf erreicht zwangsläufig den gewählten Webserver oder CDN. Dabei können IP-Adresse, Zeitpunkt, angeforderter Pfad und technische Header in Host- oder Proxyprotokollen erscheinen. Der Service Worker benötigt außerdem initiale App-Shell-Abrufe und gelegentliche Aktualisierungsprüfungen. Diese Vorgänge enthalten keine Präsentations- oder Projektdaten, sind aber reale Netzwerkzugriffe.

Darum muss der Betrieb ergänzend sicherstellen:

1. statischer Host ohne injizierte Analyse-, Consent-, Login- oder Fehlertrackingskripte,
2. Headerregeln aus `_headers` wirksam ausliefern,
3. Zugriffsprotokolle deaktivieren oder auf das organisatorisch nötige Minimum begrenzen,
4. keine Dateien verschiedener Releases mischen,
5. nach jedem Update Attestation, Response-Header und Browser-Netzwerkprüfung wiederholen.

GitHub Pages erfüllt die statische Auslieferung, kann die im Paket enthaltene Datei `_headers` jedoch nicht vollständig anwenden. Der öffentliche Pages-Einstieg ist deshalb eine komfortable Referenzbereitstellung; für eine besonders restriktive eigene Domain bleibt ein Host mit Unterstützung dieser Headerregeln die bevorzugte Betriebsform. Diese Hostinggrenze ändert nichts daran, dass die Anwendung keine Projekt- oder Präsentationsdaten an GitHub sendet.

## Prüfnachweise

- `quality/deployment-attestation.json`: maschinenlesbare Vertrags- und Dateihashes
- `quality/font-assets.json`: Outfit-Datei, Lizenz, Gewichte, Größe und Hash
- `outputs/deployment-0.042.20260819-codex/privacy-attestation.json`: mitgelieferter externer Nachweis des aktuellen Releases
- `audits/NETZWERK_NULL_UND_OFFLINE_V0_027_20260819.md`: grundlegender lesbarer Netzwerk-Null-Bericht
