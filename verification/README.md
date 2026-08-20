# Externe Verifikation

Voraussetzung: Node.js 20 oder neuer. Es werden keine Pakete installiert und keine Netzwerkverbindung benötigt.

## Selbstständige Prüfmappe

Im erzeugten Ordner `outputs/verification-<build>/` ausführen:

```bash
node verify-release.mjs
```

Das Skript liest `release-attestation.json`, berechnet SHA-256 und Dateigrößen aller enthaltenen Artefakte neu und bricht bei jeder Abweichung mit Exitcode 1 ab.

## Prüfung im vollständigen Projektordner

```bash
node verification/verify-release.mjs .
```

Die Prüfung bestätigt technische Integrität, Netzwerk-Policy und die vorbereitete Freigabemappe. Sie ersetzt ausdrücklich nicht die noch offene menschliche Sichtabnahme.
