# Externe Prüfanleitung

Stand: V0.028

## Ohne Vertrauen in die Entwicklungsumgebung

Den vollständigen Ordner `outputs/verification-0.028.20260819-codex/` auf einen separaten Rechner kopieren und dort ohne Netzwerk ausführen:

```bash
node verify-release.mjs
```

Der Prüfer berechnet Größe und SHA-256 aller 16 gebündelten Dateien neu. Jede Abweichung führt zu Exitcode 1. Die Mappe enthält Anwendung, Werkstatt, Deployment, Attestationen, Versionsregister und Betriebsdokumente.

## Zusätzliche Domainprüfung

- Response-CSP mit der mitgelieferten `_headers`-Regel vergleichen
- Browser-Netzwerkprotokoll nach vollständigem Laden filtern; keine Drittanbieterziele zulässig
- `data-network-policy` muss `network-zero-v1` sein
- `data-network-external-resources` muss `0` sein
- Produktversion und Produkt-SHA mit `release-attestation.json` vergleichen
- Host-/Proxyprotokollierung separat organisatorisch prüfen

Die Verifikation beweist Dateiintegrität und technische Verträge des geprüften Pakets. Sie kann nicht beweisen, dass ein Hostinganbieter außerhalb des Pakets keine Protokolle schreibt oder Dateien verändert; deshalb sind Response- und Betriebsprüfung beide erforderlich.
