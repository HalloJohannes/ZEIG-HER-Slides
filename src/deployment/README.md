# Statische Bereitstellung

Den vollständigen Inhalt dieses Ordners unverändert auf einen statischen HTTPS-Host laden. Es werden weder Backend, Datenbank, Nutzerkonto noch Schreibrechte auf dem Server benötigt.

## Verbindlich

- `index.html`, `sw.js`, `manifest.webmanifest`, `icon.svg` und `privacy-attestation.json` gemeinsam veröffentlichen.
- Die Regeln aus `_headers` beim Host aktivieren und anschließend die ausgelieferten HTTP-Header extern prüfen.
- Keine Analyse-, Fehlertracking-, Cookie-, Login- oder Consent-Skripte des Hostinganbieters ergänzen.
- Zugriffsprotokolle beim Host deaktivieren oder auf das organisatorisch nötige Minimum begrenzen. Der Anwendungscode kann serverseitige Proxy- oder Hostprotokolle nicht technisch verhindern.
- Jede neue Produktversion als vollständiges, geprüftes Paket austauschen; keine Einzeldateien aus verschiedenen Versionen mischen.

## Datenschutzgrenze

Projektinhalte werden ausschließlich in IndexedDB des jeweiligen Browsers oder in einer bewusst gespeicherten lokalen Arbeitsdatei gehalten. Der erstmalige Seitenabruf, Aktualisierungsprüfungen des Service Workers und die statischen App-Shell-Dateien erreichen den eigenen Host. Dabei können technisch übliche Verbindungsmetadaten wie IP-Adresse und Zeitpunkt anfallen; Präsentations- und Projektdaten werden nicht übertragen.
