# Betriebshandbuch ZEIG HER Slides

Stand: V0.028

## Betriebsmodell

Die Anwendung wird als unverändertes statisches HTTPS-Paket veröffentlicht. Backend, Datenbank, Nutzerverwaltung und serverseitige Projektspeicherung sind nicht vorgesehen. Die veröffentlichte Einheit ist immer der vollständige Ordner `outputs/deployment-<build>/`.

## Vor Veröffentlichung

1. `npm run check` vollständig grün ausführen.
2. `node verification/verify-release.mjs .` erfolgreich ausführen.
3. Version, Build, SHA-256 und Git-Tag mit dem Versionsregister vergleichen.
4. Vorheriges Deploymentpaket als sofortige Rückfallbasis behalten.
5. `_headers` beim gewählten Host wirksam konfigurieren.

## Hostanforderungen

- statisches HTTPS ohne serverseitige HTML-Veränderung
- keine injizierten Analytics-, Consent-, Login-, Chat- oder Fehlertrackingskripte
- keine Cookies des Anwendungscodes; Provider-Cookies vermeiden
- Zugriffsprotokolle deaktivieren oder auf das organisatorisch erforderliche Minimum begrenzen
- keine automatische Bild-, Script- oder HTML-Optimierung, die Hashes verändert
- MIME-Typen für HTML, JavaScript, Webmanifest und SVG korrekt ausliefern

## Regelbetrieb

Die App selbst benötigt keine tägliche Administration. Zu prüfen sind nur Hostverfügbarkeit, unveränderte Response-Header und die veröffentlichte Versionskennung. Projektprobleme werden immer mit sichtbarer Produktversion, Browser, Betriebssystem und betroffener lokaler Datei dokumentiert.

## Datensicherung

Browserbibliothek und Entwurf sind Komfortspeicher eines konkreten Browserprofils. Verbindliches Backup ist eine bewusst gespeicherte Arbeitsdatei. Diese Datei bleibt lokal und muss organisatorisch wie andere Workshopunterlagen gesichert werden.
