# Update und Rollback

Stand: V0.028

## Update

1. Neue Version in einem eigenen Release bauen und prüfen.
2. Externe Verifikationsmappe erfolgreich ausführen.
3. Das vollständige neue Deployment in einen separaten Zielstand laden.
4. Header, Start, Offline-Registrierung und Netzwerk-Null auf der echten Domain prüfen.
5. Erst dann atomar auf den neuen Ordner umschalten.
6. Vorherigen Stand mindestens bis zur bestätigten Sichtabnahme unverändert behalten.

Einzelne Dateien verschiedener Builds dürfen nie gemischt werden. Service Worker und Cachekennung sind an die Buildnummer gebunden.

## Rollback

Ein Rollback wird ausgelöst bei Startfehler, Datenverlustverdacht, fehlender CSP, unerwartetem Netzwerkverkehr, unlesbarer Typografie, defektem Viewer oder nicht erklärbarer Speicherabweichung.

Dann:

1. Veröffentlichung auf das vollständige vorherige Deploymentpaket zurückstellen.
2. Cache-/Service-Worker-Verhalten in einem frischen Browserprofil prüfen.
3. betroffene neue Version nicht überschreiben, sondern als fehlgeschlagen dokumentieren.
4. Korrektur erhält eine neue Produktversion und durchläuft sämtliche Gates erneut.

Lokale Projektdateien werden bei Update und Rollback nicht serverseitig berührt. Vor einem Browser- oder Gerätewechsel ist dennoch eine Arbeitsdatei zu speichern.
