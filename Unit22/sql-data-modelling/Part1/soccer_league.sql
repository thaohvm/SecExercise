DROP DATABASE IF EXISTS soccer_league;
CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    team_id INTEGER REFERENCES teams NOT NULL
)

CREATE TABLE referees (
    ref_id SERIAL PRIMARY KEY,
    ref_name TEXT NOT NULL
)

CREATE TABLE goals (
    goal_id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players NOT NULL,
    match_id INTEGER REFERENCES matches NOT NULL
)

CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    team_name TEXT NOT NULL,
    city TEXT
)

CREATE TABLE results (
    res_id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams NOT NULL,
    match_id INTEGER REFERENCES matches NOT NULL,
    result TEXT NOT NULL
)

CREATE TABLE seasons (
    season_id SERIAL PRIMARY KEY,
    s_date DATE NOT NULL,
    e_date DATE
)

CREATE TABLE matches (
    match_id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players NOT NULL,
    team1 INTEGER REFERENCES teams NOT NULL,
    team2 INTEGER REFERENCES teams NOT NULL,
    match_location TEXT,
    match_date DATE,
    start_time TIME,
    season_id INTEGER REFERENCES seasons NOT NULL,
    head_referee_id INTEGER REFERENCES referees NOT NULL,
    assisstent_referee1_id INTEGER REFERENCES referees,
    assisstent_referee2_id INTEGER REFERENCES referees,
)
