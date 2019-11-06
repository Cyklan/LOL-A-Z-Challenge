# Emero-Dings

## API Doku

Schritt 1
Summoner API benutzen, um accountId zu bekommen

Schritt 2
Mit accountId alle Matches bekommen, die seit Zeitpunkt gespielt wurden

Schritt 3
MatchId holen und in Match API suchen

Schritt 4
Rausfinden, welcher Participant Emey gewesen ist

Schritt 5
Analyse

Schritt 6
gehe zu Schritt 2

## Programmablauf

Emey drückt vor erstem Game auf "Start". Das setzt epoch time stamp in Datenbank. 

Alle 2 Sekunden nach neuem Match schauen. Wenn neues Match gefunden, das Filtern entspricht, dann Timestamp davon in Datenbank. Dann Analyse.
