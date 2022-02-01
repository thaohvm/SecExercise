-- https://sqlzoo.net/wiki/The_JOIN_operation
SELECT matchid, player FROM goal
WHERE teamid = 'GER'

SELECT id,stadium,team1,team2
FROM game
WHERE id = 1012

SELECT player, teamid, stadium, mdate
FROM game
JOIN goal
ON (game.id=goal.matchid)
WHERE teamid = 'GER'

SELECT team1, team2, player
FROM game
JOIN goal
ON game.id = goal.matchid
WHERE player LIKE 'Mario%'

SELECT player, teamid, coach, gtime
FROM goal
JOIN eteam
ON goal.teamid = eteam.id
WHERE gtime<=10

SELECT mdate, teamname
FROM game
JOIN eteam
ON game.team1 = eteam.id
WHERE eteam.coach = 'Fernando Santos'

SELECT player
FROM goal
JOIN game
ON game.id = goal.matchid
WHERE game.stadium = 'National Stadium, Warsaw'

SELECT DISTINCT player
FROM goal
JOIN game
ON goal.matchid = game.id
WHERE (goal.teamid!='GER') AND (game.team1 = 'GER' OR game.team2 = 'GER')

SELECT teamname, COUNT(*)
FROM eteam
JOIN goal
ON eteam.id = goal.teamid
GROUP BY teamname

SELECT stadium, COUNT(*)
FROM game
JOIN goal
ON game.id = goal.matchid
GROUP BY stadium

SELECT matchid, mdate, COUNT(*)
FROM goal
JOIN game
ON goal.matchid = game.id
WHERE (team1 = 'POL' OR team2 = 'POL')
GROUP BY matchid, mdate

SELECT matchid, mdate, COUNT(*)
FROM goal
JOIN game
ON goal.matchid = game.id
WHERE (teamid = 'GER')
GROUP BY matchid, mdate

SELECT mdate, team1,
       SUM(CASE WHEN teamid = team1 THEN 1 ELSE 0 END) AS score1,
       team2,
       SUM(CASE WHEN teamid = team2 THEN 1 ELSE 0 END) AS score2 FROM
    game LEFT JOIN goal ON (id = matchid)
    GROUP BY mdate,team1,team2
    ORDER BY mdate, matchid, team1, team2

game
id	      mdate	        stadium	                    team1       team2
1001	8 June 2012	    National Stadium, Warsaw	POL	        GRE
1002	8 June 2012	    Stadion Miejski (Wroclaw)	RUS	        CZE
1003	12 June 2012	Stadion Miejski (Wroclaw)	GRE	        CZE
1004	12 June 2012	National Stadium, Warsaw	POL	        RUS
...

goal
matchid	teamid	player	               gtime
1001	POL	    Robert Lewandowski	   17
1001	GRE	    Dimitris Salpingidis   51
1002	RUS	    Alan Dzagoev	       15
1002	RUS	    Roman Pavlyuchenko	   82
...

eteam
id	     teamname	        coach
POL	     Poland	            Franciszek Smuda
RUS	     Russia	            Dick Advocaat
CZE	     Czech Republic	    Michal Bilek
GRE	     Greece	            Fernando Santos
...
