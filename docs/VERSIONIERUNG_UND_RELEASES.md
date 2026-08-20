# Versionierung und Releases

## Kennung

- sichtbare Kurzform: `V0.042`
- technische Paketkennung: `0.042.20260819-codex`
- Dateiname: `ZEIG-HER-Slides-V0_042_20260819-codex.html`
- Release-Ordner: `outputs/release-0.042.20260819-codex/`
- Deployment-Ordner: `outputs/deployment-0.042.20260819-codex/`
- Verifikationsordner: `outputs/verification-0.042.20260819-codex/`

Die Revision steigt für jede freigegebene Produktänderung um eins. Reine Arbeitsnotizen ohne Produkt- oder Releasewirkung benötigen keine neue Produktversion.

## Pflichtorte

Eine Version wird synchron geführt in:

1. `package.json`
2. `quality/release-metadata.json`
3. `quality/version-change-manifests/V0_NNN.json`
4. Produkt-Metadaten und sichtbarem Info-Bereich der HTML
5. Root-HTML
6. `versions/aktuell/`
7. `outputs/release-<build>/`
8. `versions/aenderungshistorie/VERSIONSHISTORIE.md`
9. annotiertem Git-Tag `V0.NNN`
10. `outputs/governance/ZEIG-HER-Slides-Versionsregister.xlsx`
11. bei Domänenausgaben: vollständigem `outputs/deployment-<build>/` samt Attestation und Headerregeln

## Releasegrenze

Ein Build darf erst gespiegelt werden, wenn Tests, Syntaxprüfung, Metadatenprüfung und die zur Änderung gehörenden Risikoprüfungen bestanden sind. Ein fehlender manueller Nachweis wird als `manual-required` ausgewiesen und nicht als bestanden umgedeutet.

## Rückfall

Die unmittelbar vorherige technisch bestandene Version bleibt in `versions/archiv/` erhalten. Auf der obersten Ebene liegt nur die aktuelle versionierte Anwendung; historische Root-Ausgaben werden nach `versions/archiv/` übernommen und dort nicht doppelt vorgehalten. Projektmigrationen verändern nie die einzige vorhandene Quelle. Beschädigte neuere Speicherstände dürfen einen älteren lesbaren Stand nicht verdecken.

Die Produktumbenennung in V0.041 ändert keine historischen Artefakte. Alte Namen bleiben ausschließlich in versionierten Rückfallständen und in expliziten Kompatibilitätslisten für Projektdateien und Browserdaten erhalten.

V0.042 verändert weder Projektschema noch Speicherpfade. Die Version stabilisiert Kamera und Ansichtsübersicht, ordnet die Viewer-Aktionen ohne Kollisionen und erweitert die gemeinsame Informationsfläche; V0.041 bleibt unverändert als unmittelbare Rückfallversion erhalten.

## Git und Excel-Register

Jeder technisch bestandene Produktstand erhält einen eigenen Commit und einen annotierten Tag. Das Excel-Versionsregister fasst Produktstände, technische Gates und die gebündelte Sichtabnahme zusammen. Es ersetzt nicht die maschinenlesbaren JSON-Manifeste, sondern macht deren Status für Prüfung und Planung übersichtlich.
