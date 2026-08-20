# Audit V0.027 – Netzwerk-Null, lokale Typografie und Offline-Bereitstellung

## Gestaltung und Schrift

Die zuvor von Google Fonts geladene Outfit-Schrift liegt nun als eingebettete variable WOFF2-Datei vor. Die Datei umfasst 32.292 Byte, Gewichte 300 bis 800 und das für deutsche Inhalte nötige Latin-Subset einschließlich ä, ö und ü. SHA-256 und SIL Open Font License 1.1 sind dokumentiert.

Die vorhandenen Stilwerte wurden nicht verändert: Kapitelziffer und Kapitelüberschrift verwenden Gewicht 800, die Unterzeile Gewicht 300. Im Browser wurden Outfit, 150 px / 52 px / 19 px und die erwarteten Gewichte als tatsächlich berechnete Werte bestätigt. Der Link-Button enthält nur noch „Link“; ein automatischer Unicode-Test bestätigt 0 Emoji-Zeichen in der Produktquelle.

## Netzwerkgrenze

Meta-CSP und Deployment-Header setzen Verbindungen, Frames, Formulare und Objekte auf `none`. Ein früher Laufzeitwächter blockiert außerdem externe Navigation, `window.open`, Fetch, XHR, WebSocket, EventSource, Beacon und Cookiezugriff. YouTube- und H5P-URLs bleiben im Projektinhalt erhalten, werden in dieser geprüften Ausgabe aber nicht geladen. Gleiches gilt für normale externe URLs.

Der ausgelieferte Browserzustand meldete:

- `data-network-policy="network-zero-v1"`
- `data-network-external-resources="0"`
- `data-content-boundary="passed"`
- keinen `data-start-error`

## Offline-Nachweis

Das Deployment wurde auf einem frischen lokalen Ursprung geöffnet. Manifest, Icon, Service Worker und Attestation wurden registriert und gecacht. Anschließend wurde der lokale Server vollständig beendet. Ein Browser-Neuladen startete die Anwendung trotzdem vollständig, mit derselben V0.027-Kennung, Netzwerk-Null-Policy, 0 externen Ressourcen und ohne Startfehler.

## Ehrliche Grenze

Der erste Abruf, Service-Worker-Updates und die statischen App-Shell-Dateien erreichen den eigenen Host. Dort können übliche Verbindungsmetadaten wie IP-Adresse und Zeitpunkt protokolliert werden. Die Anwendung überträgt keine Projektinhalte; Hostprotokolle müssen separat organisatorisch minimiert oder deaktiviert werden.
