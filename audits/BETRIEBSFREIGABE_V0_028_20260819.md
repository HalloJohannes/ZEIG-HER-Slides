# Audit V0.028 – Externe Nachweise und Betriebsfreigabe

## Eingefrorener Stand

V0.028 erweitert die fachliche Oberfläche nicht. Der in V0.027 technisch bestandene Funktions-, Gestaltungs-, Typografie-, Speicher-, Viewer-, Performance-, Offline- und Netzwerk-Null-Stand wird mit neuer eindeutiger Releasekennung eingefroren.

## Externe Prüfbarkeit

Die selbstständige Verifikationsmappe enthält 16 Dateien: Anwendung, Werkstatt, Versionsregister, drei Betriebsdokumente, drei maschinenlesbare Governance-Nachweise und sieben Deploymentdateien. Das mitgelieferte Node-Skript benötigt keine Pakete und kein Netzwerk. Es berechnet Dateigröße und SHA-256 neu und beendet jede Abweichung mit Exitcode 1.

Der interne und der kopierte Bundlemodus wurden erfolgreich ausgeführt. V0.028 umfasst 43 automatische Tests, 20 Stabilitätsfälle, 12 Versionsmanifeste, 11 kanonische Tokens, 14 kanonische Bausteinarten und 45 Werkstattoberflächen.

## Betrieb

Betriebsrollen, Hostanforderungen, unveränderliche Pakete, Update, atomare Umschaltung, Cachekennung und vollständiger Rollback sind dokumentiert. Die Trennung zwischen Anwendung ohne Projektübertragung und möglichen Host-/Proxyprotokollen bleibt ausdrücklich erhalten.

## Browser- und Sichtvorprüfung

Die gebündelte Anwendung wurde in einem frischen lokalen Deployment kontrolliert. Laufzeitstatus: `network-zero-v1`, null externe Ressourcen, Inhaltsgrenze bestanden, Service Worker registriert und kein Startfehler. Nach Abschalten des Webservers ließ sich dieselbe URL vollständig aus dem Offline-Cache neu laden.

Die sichtbare Vorprüfung umfasste Startansicht, Bearbeitungsleiste, Bausteinmenü, Projektbibliothek, Werkstatt und Ansichts-Datei. Outfit wurde für Kapitelziffer, -titel und -unterzeile mit den vorgesehenen Gewichten 800/800/300 berechnet. „Link“ steht ohne Emoji in der Werkzeugleiste, das Bausteinmenü liegt sichtbar über der Arbeitsfläche und die Ansichts-Datei enthält keine Editor- oder Projektwerkzeuge. Sieben Referenzbilder liegen unter `zusatzmaterial/screenshots/abnahme-v0.028/`.

## Menschliche Freigabe

Die technische Vorprüfung ist bestanden. Die gewünschte einzige menschliche Sichtabnahme liegt als 12-Punkte-Durchlauf vor und ist nicht vorweggenommen. Der Status bleibt `prepared-awaiting-user`, bis Johannes eine der drei Entscheidungen dokumentiert.
