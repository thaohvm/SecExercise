-- SQL Basics: Simple WHERE and ORDER BY

SELECT id, name, age
FROM people
WHERE age > 50
ORDER BY age DESC

-- SQL Basics: Simple SUM
SELECT SUM(age) AS age_sum
FROM people

-- SQL Basics: Simple MIN / MAX
SELECT MIN(age) AS age_min, MAX(age) AS age_max

-- FROM peopleFind all active students
SELECT Id, FirstName,  LastName
FROM students
WHERE IsActive = 1

-- SQL Basics: Simple GROUP BY
SELECT age, COUNT(age) AS people_count
FROM people
GROUP BY age

-- SQL Basics: Simple HAVING
SELECT age, COUNT(age) AS total_people
FROM people
GROUP BY age
HAVING COUNT(age) >= 10

-- tutorial 5 (SUM_and_COUNT) on SQL Zoo.
SELECT SUM(population)
FROM world

SELECT DISTINCT(continent)
FROM world

SELECT SUM(gdp)
FROM world
WHERE continent = 'Africa'

SELECT COUNT(name)
FROM world
WHERE area >= 1000000

SELECT SUM(population)
FROM world
WHERE name IN ('Estonia', 'Latvia', 'Lithuania')

SELECT continent, COUNT(name)
FROM world
GROUP BY continent

SELECT continent, COUNT(name)
FROM world
WHERE population >= 10000000
GROUP BY continent

SELECT continent
FROM world
GROUP BY continent
HAVING SUM(population) >= 100000000
