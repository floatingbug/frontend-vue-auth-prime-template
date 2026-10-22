# Feature-Vorlage

Dieses Feature ist eine Vorlage und kein echtes Feature. Nicht in die App einbinden und nichts daraus importieren.

Dauerhafte Regeln pro Schicht stehen in `src/features/AGENTS.md`. Diese Datei beschreibt nur das Anlegen eines neuen Features.

Beim Anlegen eines neuen Features:
1. Den Ordner kopieren und `example`/`Example` durch den Feature-Namen ersetzen (in Ordner-, Datei-, Komponenten- und Funktionsnamen).
2. `item`/`items` durch den Namen der Entität ersetzen (z. B. `todo`/`todos`).
3. Nur die Schichten übernehmen, die das neue Feature braucht.
4. Platzhalter ersetzen: die Logik in `exampleService` und `exampleApi` sowie die UI-Texte in den Vue-Dateien.
5. Die Routen im zentralen Router unter `src/app/router/` einbinden.
