# Sicherheit

## Unterstützte Version

Sicherheitskorrekturen werden für die jeweils aktuelle veröffentlichte Version gepflegt. Derzeit ist das **V0.042**.

## Schwachstellen vertraulich melden

Bitte Sicherheitsprobleme nicht als öffentliches Issue melden. Nutze stattdessen die privaten [Security Advisories dieses Repositorys](https://github.com/HalloJohannes/ZEIG-HER-Slides/security/advisories/new).

Hilfreich sind:

- betroffene Version und Browser
- reproduzierbare Schritte
- mögliche Auswirkungen
- ein minimales, anonymisiertes Beispiel

Bitte keine vertraulichen Präsentationen, personenbezogenen Daten oder vollständigen Projektdateien mitsenden.

## Sicherheitsmodell

ZEIG HER Slides ist eine lokale Einzeldatei-Anwendung. Projektinhalte werden nicht an einen Anwendungsserver übertragen; Cookies, Analyse und Telemetrie sind nicht Bestandteil der Software. Die Laufzeit erzwingt einen Netzwerk-Null-Modus für automatische externe Zugriffe. Exportierte Dateien enthalten nur das jeweils exportierte Projekt, nicht die übrige Browser-Bibliothek.

Bei einer Bereitstellung über eine Domain bleiben Zugriffsprotokolle des gewählten Hosts eine getrennte Infrastrukturfrage. Die vorgesehene statische Ausgabe enthält restriktive Headerregeln und eine prüfbare Datenschutzattestation; weitere Details stehen in [`docs/BEREITSTELLUNG_UND_DATENSCHUTZGRENZE.md`](docs/BEREITSTELLUNG_UND_DATENSCHUTZGRENZE.md).
