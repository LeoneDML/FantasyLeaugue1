# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: us-cdbr-iron-east-04.cleardb.net (MySQL 5.5.56-log)
# Database: heroku_2d4cb57104aa354
# Generation Time: 2020-02-14 10:11:02 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table players
# ------------------------------------------------------------

DROP TABLE IF EXISTS `players`;

CREATE TABLE `players` (
  `player_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `role` enum('GoalKeeper','Defender','Midfielder','Forward') NOT NULL,
  `price` int(11) NOT NULL,
  `image_url` char(50) NOT NULL,
  PRIMARY KEY (`player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;

INSERT INTO `players` (`player_id`, `name`, `role`, `price`, `image_url`)
VALUES
    (1,'Micheal Weche','GoalKeeper',2.5,'/'),
    (2,'Ken Mutie','Defender',5.7,''),
    (3,'Timothy Mumo','Defender',4.5,''),
    (4,'Charles Gatura','Defender',5.5,''),
    (5,'Mem Machoka','Defender',4.5,''),
    (6,'Maldini','Defender',4.5,''),
    (7,'Aleki','Midfielder',5.0,''),
    (8,'Kilonzo','Midfielder',4.5,''),
    (9,'Bonny Dismus','Midfielder',6.0,'/images/Dismus.png'),
    (10,'Fredrick Odhiambo','Midfielder',6.0,''),
    (11,'Leon Micheni','Forward',12.5,'/images/Leon.png'),
    (12,'Buju','Forward',12.5,''),
    (13,'Leone Mmayi','Forward',9.0,''),
    (14,'Francis Brandon','Forward',7.5,'/images/12.png.jpeg'),
    (15,'Moore Lefty','Forward',7.5,''),
    (16,'Bonny Gisore','Forward',6.0,''),
    (17,'John Ngethe','Forward',4.,'');

/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_lines
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_lines`;

CREATE TABLE `user_lines` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(20) NOT NULL,
  `name` char(20) NOT NULL,
  `teamname` char(20) NOT NULL,
  `balance` int(11) NOT NULL DEFAULT '100',
  `last_updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `userId` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user_lines` WRITE;
/*!40000 ALTER TABLE `user_lines` DISABLE KEYS */;

INSERT INTO `user_lines` (`user_id`, `username`, `name`, `teamname`, `balance`, `last_updated_on`)
VALUES
	(1,'GUEST','GUEST','Deccan Chargers',0,'2020-02-14 10:10:45');

/*!40000 ALTER TABLE `user_lines` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_team
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_team`;

CREATE TABLE `user_team` (
  `user_id` int(10) NOT NULL,
  `player_id` int(10) NOT NULL,
  UNIQUE KEY `player_id` (`player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user_team` WRITE;
/*!40000 ALTER TABLE `user_team` DISABLE KEYS */;

INSERT INTO `user_team` (`user_id`, `player_id`)
VALUES
	(1,1),
	(1,2),
	(1,4),
	(1,9),
	(1,15);

/*!40000 ALTER TABLE `user_team` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
