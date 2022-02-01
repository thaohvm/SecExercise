-- Comments in SQL Start with dash-dash --

-- Find the app with an ID of 1880.
playstore=# SELECT app_name FROM analytics WHERE ID = 1880;
        app_name
-------------------------
 Web Browser for Android
(1 row)
-- Find the ID and app name for all apps that were last updated on August 01, 2018.
playstore=# SELECT id, app_name FROM analytics WHERE last_updated = '2018-08-01';
  id  |                                     app_name
------+-----------------------------------------------------------------------------------
   10 | Clash Royale
   11 | Candy Crush Saga
   12 | UC Browser - Fast Download Private & Secure
   74 | Score! Hero
  101 | Tiny Flashlight + LED
  102 | Crossy Road
  103 | SimCity BuildIt
  111 | FIFA Soccer
  112 | Angry Birds 2
  125 | Need for Speed™ No Limits
  126 | YouCam Makeup - Magic Selfie Makeovers
  152 | Fallout Shelter
  159 | DU Recorder – Screen Recorder, Video Editor, Live
  160 | Bike Race Free - Top Motorcycle Racing Games
  161 | KakaoTalk: Free Calls & Text
  162 | Dolphin Browser - Fast, Private & Adblock🐬
  163 | Opera Browser: Fast and Secure
  164 | MARVEL Contest of Champions
  184 | Video Editor Music,Cut,No Crop
-- Count the number of apps in each category, e.g. “Family | 1972”.
playstore=# SELECT category, COUNT(category) FROM analytics GROUP BY category;
      category       | count
---------------------+-------
 BOOKS_AND_REFERENCE |   191
 COMMUNICATION       |   342
 BEAUTY              |    46
 EVENTS              |    52
 PARENTING           |    59
 PHOTOGRAPHY         |   313
 GAME                |  1110
 BUSINESS            |   313
 SOCIAL              |   269
 MEDICAL             |   350
 TOOLS               |   753
 TRAVEL_AND_LOCAL    |   234
 ART_AND_DESIGN      |    63
 LIFESTYLE           |   319
 WEATHER             |    79
 COMICS              |    59
 PRODUCTIVITY        |   360
 PERSONALIZATION     |   329
 FINANCE             |   331
 SPORTS              |   338
 ENTERTAINMENT       |   149
-- Find the top 5 most-reviewed apps and the number of reviews for each.
playstore=# SELECT app_name, reviews FROM analytics ORDER BY reviews DESC LIMIT 5;
                 app_name                 | reviews
------------------------------------------+----------
 Facebook                                 | 78158306
 WhatsApp Messenger                       | 78128208
 Instagram                                | 69119316
 Messenger – Text and Video Chat for Free | 69119316
 Clash of Clans                           | 69109672
(5 rows)
-- Find the app that has the most reviews with a rating greater than equal to 4.8.
playstore=# SELECT app_name, rating FROM analytics WHERE rating >= 4.8 ORDER BY reviews DESC LIMIT 1;
  app_name  | rating
------------+--------
 Chess Free |    4.8
(1 row)
-- Find the average rating for each category ordered by the highest rated to lowest rated.
playstore=# SELECT category, AVG(rating)
playstore-# FROM analytics
playstore-# GROUP BY category
playstore-# ORDER BY avg DESC;
      category       |        avg
---------------------+--------------------
 EVENTS              |  4.395238104320708
 EDUCATION           |   4.38903223006956
 ART_AND_DESIGN      |  4.347540949211746
 BOOKS_AND_REFERENCE | 4.3423728633061645
 PERSONALIZATION     |    4.3283387457509
 BEAUTY              |  4.299999970656175
 GAME                |  4.287167731498383
 PARENTING           |  4.285714266251545
 HEALTH_AND_FITNESS  | 4.2743944663902464
 SHOPPING            |  4.253648051376507
 SOCIAL              |  4.245669291244717
 WEATHER             |   4.24399998664856
 SPORTS              |  4.233333332576449
 PRODUCTIVITY        |  4.212173904543338
 AUTO_AND_VEHICLES   |  4.200000017881393
 HOUSE_AND_HOME      |  4.197368430463891
 PHOTOGRAPHY         |  4.196116511489967
 MEDICAL             | 4.1926829182520144
 FAMILY              | 4.1904873752761995
 LIBRARIES_AND_DEMO  | 4.1784615259904125
 FOOD_AND_DRINK      |  4.155660354866172
-- Find the name, price, and rating of the most expensive app with a rating that’s less than 3.
playstore=# SELECT app_name, price, rating                            FROM analytics                                                        WHERE rating < 3                                                      ORDER BY price DESC                                                   LIMIT 1;
      app_name      | price  | rating
--------------------+--------+--------
 Naruto & Boruto FR | 379.99 |    2.9
(1 row)
-- Find all apps with a min install not exceeding 50, that have a rating. Order your results by highest rated first.
playstore=# SELECT * FROM analytics WHERE min_installs <= 50
playstore-# AND rating IS NOT NULL
playstore-# ORDER BY rating DESC;
-- Find the names of all apps that are rated less than 3 with at least 10000 reviews.
playstore=# SELECT app_name FROM analytics WHERE rating < 3 AND reviews >= 10000;
                    app_name
-------------------------------------------------
 The Wall Street Journal: Business & Market News
 Vikings: an Archer’s Journey
 Shoot Em Down Free
(3 rows)

-- Find the top 10 most-reviewed apps that cost between 10 cents and a dollar.
playstore=# SELECT app_name FROM analytics WHERE price > .10 AND price < 1.00 ORDER BY reviews DESC LIMIT 10;
                  app_name
---------------------------------------------
 Free Slideshow Maker & Video Editor
 Couple - Relationship App
 Anime X Wallpaper
 Dance On Mobile
 Marvel Unlimited
 FastMeet: Chat, Dating, Love
 IHG®: Hotel Deals & Rewards
 Live Weather & Daily Local Weather Forecast
 DreamMapper
 Můj T-Mobile Business
(10 rows)
-- Find the most out of date app. Hint: You don’t need to do it this way, but it’s possible to do with a subquery: http://www.postgresqltutorial.com/postgresql-max-function/
playstore=# SELECT app_name FROM analytics ORDER BY last_updated LIMIT 1;
  app_name
------------
 CP Clicker
(1 row)
-- Find the most expensive app (the query is very similar to #11).
playstore=# SELECT app_name,price FROM analytics ORDER BY price DESC LIMIT 1;
      app_name      | price
--------------------+-------
 Cardi B Piano Game |   400
(1 row)
-- Count all the reviews in the Google Play Store.
playstore=# SELECT SUM(reviews) FROM analytics;                                                                                                                                                                             sum
------------
 4814575866
(1 row)
-- Find all the categories that have more than 300 apps in them.
playstore=# SELECT COUNT(category) FROM analytics HAVING SUM(app_name) > 300;
-- Find the app that has the highest proportion of min_installs to reviews, among apps that have been installed at least 100,000 times. Display the name of the app along with the number of reviews, the min_installs, and the proportion.
playstore=# SELECT app_name, min_installs, min_installs/reviews AS proportion
playstore-# FROM analytics
playstore-# WHERE min_installs >= 100000
playstore-# ORDER BY proportion DESC
playstore-# LIMIT 1;
     app_name     | min_installs | proportion
------------------+--------------+------------
 Kim Bu Youtuber? |     10000000 |     151515
(1 row)
