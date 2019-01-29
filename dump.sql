-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: localhost    Database: refuel
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gas_station`
--

DROP TABLE IF EXISTS `gas_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `gas_station` (
  `station_id` int(11) NOT NULL AUTO_INCREMENT,
  `station_name` varchar(200) NOT NULL,
  `station_address` text NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `lng` double DEFAULT NULL,
  `lat` double DEFAULT NULL,
  PRIMARY KEY (`station_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10005 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gas_station`
--

LOCK TABLES `gas_station` WRITE;
/*!40000 ALTER TABLE `gas_station` DISABLE KEYS */;
INSERT INTO `gas_station` VALUES (10001,'中国石油','陶然亭地铁站D口','2018-08-23 13:43:57','2018-08-28 16:20:06',116.380322,39.883434),(10002,'中国石化','陶然亭南门','2018-08-23 13:50:20','2018-08-23 13:50:20',116.390112,39.878072),(10003,'阳光石油','达官营','2018-08-23 13:50:20','2018-08-23 13:50:20',116.342401,39.894954);
/*!40000 ALTER TABLE `gas_station` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refuel_log`
--

DROP TABLE IF EXISTS `refuel_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `refuel_log` (
  `refuel_id` int(11) NOT NULL AUTO_INCREMENT,
  `refuel_station_id` int(11) NOT NULL,
  `oil_type` varchar(10) NOT NULL,
  `liters` float DEFAULT NULL,
  `pay_type` varchar(100) NOT NULL,
  `pay_money` float NOT NULL,
  `refuel_time` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`refuel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10046 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refuel_log`
--

LOCK TABLES `refuel_log` WRITE;
/*!40000 ALTER TABLE `refuel_log` DISABLE KEYS */;
INSERT INTO `refuel_log` VALUES (10030,10001,'92',0,'cash',200,'2018-03-31 00:00:00',1000),(10032,10003,'92',0,'cash',200,'2018-04-29 00:00:00',1000),(10033,10003,'92',0,'cash',200,'2018-06-02 00:00:00',1000),(10034,10001,'92',0,'other',250,'2018-07-16 00:00:00',1000),(10035,10002,'92',0,'card',265,'2018-08-26 00:00:00',1000),(10036,10003,'92',0,'card',181,'2018-09-16 00:00:00',1000),(10044,10003,'92',29.29,'wechat',230,'2018-10-14 00:00:00',1000),(10045,10002,'92',40,'wechat',272,'2018-12-02 00:00:00',1000);
/*!40000 ALTER TABLE `refuel_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temp_tag`
--

DROP TABLE IF EXISTS `temp_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `temp_tag` (
  `tagName` varchar(50) NOT NULL,
  `releaseNote` varchar(1000) DEFAULT NULL,
  `releaseTime` date DEFAULT NULL,
  PRIMARY KEY (`tagName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp_tag`
--

LOCK TABLES `temp_tag` WRITE;
/*!40000 ALTER TABLE `temp_tag` DISABLE KEYS */;
INSERT INTO `temp_tag` VALUES ('AiDO-13','1.修改若干Bug.<br>2.杀了若干程序员.<br>3.老天保佑没Bug.<br>','2018-12-12'),('AiDO-14','1.修改若干Bug.<br>2.杀了若干程序员.<br>3.老天保佑没Bug.<br>','2018-12-13'),('AiDO-15','1.修改若干Bug<br>2.杀了若干程序员<br>3.老天保佑没Bug.<br>','2018-12-14');
/*!40000 ALTER TABLE `temp_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temp_tag1`
--

DROP TABLE IF EXISTS `temp_tag1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `temp_tag1` (
  `tagName` varchar(50) NOT NULL,
  `releaseNote` text,
  `releaseTime` date DEFAULT NULL,
  PRIMARY KEY (`tagName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp_tag1`
--

LOCK TABLES `temp_tag1` WRITE;
/*!40000 ALTER TABLE `temp_tag1` DISABLE KEYS */;
/*!40000 ALTER TABLE `temp_tag1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `test` (
  `station_id` int(11) NOT NULL AUTO_INCREMENT,
  `station_name` varchar(200) NOT NULL,
  `station_address` text NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`station_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(500) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `license` varchar(100) NOT NULL,
  `carType` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1014 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1000,'mahd','123456','2018-09-20 19:54:25','2018-09-20 19:54:25','京M·BZ186','2017款奇骏2.0舒适');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'refuel'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-27 14:40:29
alter table users add mileage float;
alter table refuel_log add mileage float;