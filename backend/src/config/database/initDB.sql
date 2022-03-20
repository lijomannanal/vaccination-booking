--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointments` (
  `apptId` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `residentId` int(11) DEFAULT NULL,
  `ccId` int(11) DEFAULT NULL,
  `slotId` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`apptId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'2022-03-19',1,1,2,'2022-03-19 12:07:01','2022-03-19 18:32:24'),(2,'2022-03-19',2,1,2,'2022-03-19 12:07:50','2022-03-20 16:23:24'),(3,'2022-03-19',6,4,10,'2022-03-19 12:15:44','2022-03-20 16:20:59'),(4,'2022-03-19',7,2,2,'2022-03-19 12:18:57','2022-03-20 16:21:55'),(5,'2022-03-19',8,2,2,'2022-03-19 12:22:36','2022-03-20 16:21:06'),(12,'2022-03-19',18,2,2,'2022-03-19 22:26:53','2022-03-20 14:36:17'),(13,'2022-03-19',19,1,3,'2022-03-19 22:22:31','2022-03-20 16:21:15'),(14,'2022-03-20',20,1,39,'2022-03-19 17:24:21','2022-03-20 14:33:21'),(15,'2022-03-20',21,4,38,'2022-03-19 21:46:43','2022-03-20 16:21:31'),(17,'2022-03-20',23,2,36,'2022-03-20 13:21:39','2022-03-20 16:21:47'),(18,'2022-03-21',24,2,11,'2022-03-20 13:29:44','2022-03-20 16:21:38'),(19,'2022-03-21',25,1,27,'2022-03-20 20:13:53','2022-03-20 20:13:53'),(20,'2022-03-21',26,1,5,'2022-03-20 20:14:38','2022-03-20 20:14:38');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_centers`
--

DROP TABLE IF EXISTS `community_centers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community_centers` (
  `ccId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`ccId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_centers`
--

LOCK TABLES `community_centers` WRITE;
/*!40000 ALTER TABLE `community_centers` DISABLE KEYS */;
INSERT INTO `community_centers` VALUES (1,'Bukit Batok CC'),(2,'Bukit Panjang CC'),(3,'Bukit Timah CC'),(4,'Outram Park Polyclinic');
/*!40000 ALTER TABLE `community_centers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nurses`
--

DROP TABLE IF EXISTS `nurses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nurses` (
  `nurseId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `ccid` int(11) DEFAULT NULL,
  PRIMARY KEY (`nurseId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurses`
--

LOCK TABLES `nurses` WRITE;
/*!40000 ALTER TABLE `nurses` DISABLE KEYS */;
INSERT INTO `nurses` VALUES (1,'GN11',1),(2,'GN12',1),(3,'GN13',1),(4,'GN14',1),(5,'GN21',2),(6,'GN22',2),(7,'GN23',2),(8,'GN24',3),(9,'GN25',3),(10,'GN31',4);
/*!40000 ALTER TABLE `nurses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `residents`
--

DROP TABLE IF EXISTS `residents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `residents` (
  `residentId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `nric` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`residentId`),
  UNIQUE KEY `NRIC_UNIQUE` (`nric`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `residents`
--

LOCK TABLES `residents` WRITE;
/*!40000 ALTER TABLE `residents` DISABLE KEYS */;
INSERT INTO `residents` VALUES (1,'John','G45354535'),(2,'David','G4535453L'),(6,'Edson','S3267566Y'),(7,'Stan','G4587865T'),(8,'Dominic','S3456767H'),(18,'Etson','G4545566H'),(19,'Elwin','S3498909J'),(20,'Lijo','G4598787P'),(21,'Yu Jie','S4567576T'),(23,'Erwin','S4576768L'),(24,'Sam','G3476577Y'),(25,'Johny','G3484747H'),(26,'Steven','G4576567P');
/*!40000 ALTER TABLE `residents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shifts`
--

DROP TABLE IF EXISTS `shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shifts` (
  `shiftId` int(11) NOT NULL,
  `startTime` time(3) DEFAULT NULL,
  `endTime` time(3) DEFAULT NULL,
  PRIMARY KEY (`shiftId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shifts`
--

LOCK TABLES `shifts` WRITE;
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
INSERT INTO `shifts` VALUES (1,'08:00:00.000','14:00:00.000'),(2,'14:30:00.000','20:30:00.000');
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slots`
--

DROP TABLE IF EXISTS `slots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `slots` (
  `slotId` int(11) NOT NULL AUTO_INCREMENT,
  `time` time(3) DEFAULT NULL,
  PRIMARY KEY (`slotId`),
  UNIQUE KEY `slots_UNIQUE` (`time`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slots`
--

LOCK TABLES `slots` WRITE;
/*!40000 ALTER TABLE `slots` DISABLE KEYS */;
INSERT INTO `slots` VALUES (1,'08:00:00.000'),(2,'08:15:00.000'),(3,'08:30:00.000'),(4,'08:45:00.000'),(5,'09:00:00.000'),(6,'09:15:00.000'),(7,'09:30:00.000'),(8,'09:45:00.000'),(9,'10:00:00.000'),(10,'10:15:00.000'),(11,'10:30:00.000'),(12,'10:45:00.000'),(13,'11:00:00.000'),(14,'11:15:00.000'),(15,'11:30:00.000'),(16,'11:45:00.000'),(17,'12:00:00.000'),(18,'12:15:00.000'),(19,'12:30:00.000'),(20,'12:45:00.000'),(21,'13:00:00.000'),(22,'13:15:00.000'),(23,'13:30:00.000'),(24,'13:45:00.000'),(25,'14:00:00.000'),(27,'14:30:00.000'),(28,'14:45:00.000'),(29,'15:00:00.000'),(30,'15:15:00.000'),(31,'15:30:00.000'),(32,'15:45:00.000'),(33,'16:00:00.000'),(34,'16:15:00.000'),(35,'16:30:00.000'),(36,'16:45:00.000'),(37,'17:00:00.000'),(38,'17:15:00.000'),(39,'17:30:00.000'),(40,'17:45:00.000'),(41,'18:00:00.000'),(42,'18:15:00.000'),(43,'18:30:00.000'),(44,'18:45:00.000'),(45,'19:00:00.000'),(46,'19:15:00.000'),(47,'19:30:00.000'),(48,'19:45:00.000'),(49,'20:00:00.000'),(50,'20:30:00.000');
/*!40000 ALTER TABLE `slots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workdays`
--

DROP TABLE IF EXISTS `workdays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workdays` (
  `workdayId` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`workdayId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workdays`
--

LOCK TABLES `workdays` WRITE;
/*!40000 ALTER TABLE `workdays` DISABLE KEYS */;
INSERT INTO `workdays` VALUES (1,'Monday'),(2,'Tuesday'),(3,'Wednesday'),(4,'Thursday'),(5,'Friday'),(6,'Saturday'),(7,'Sunday');
/*!40000 ALTER TABLE `workdays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workday_schedules`
--

DROP TABLE IF EXISTS `workday_schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workday_schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workdayId` int(11) DEFAULT NULL,
  `nurseId` int(11) DEFAULT NULL,
  `shiftId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workday_schedules`
--

LOCK TABLES `workday_schedules` WRITE;
/*!40000 ALTER TABLE `workday_schedules` DISABLE KEYS */;
INSERT INTO `workday_schedules` VALUES (1,1,1,1),(2,1,2,1),(3,1,3,2),(4,1,4,2),(5,2,1,1),(6,2,2,1),(7,2,3,2),(8,2,4,2),(9,3,1,1),(10,3,3,2),(11,4,2,1),(12,4,4,2),(13,5,1,1),(14,5,3,2),(15,6,1,1),(16,6,2,1),(17,6,3,2),(18,6,4,2),(19,1,5,1),(20,1,6,1),(21,1,7,1),(22,2,5,1),(23,2,6,1),(24,3,6,1),(25,3,7,2),(26,4,5,1),(27,4,7,2),(28,5,5,1),(29,6,5,1),(30,6,6,1),(31,6,7,2),(32,1,8,1),(33,1,9,2),(34,2,8,1),(35,2,9,2),(36,3,8,1),(37,4,9,1),(38,5,8,1),(39,6,8,1),(40,6,9,2),(41,1,10,1),(42,2,10,1),(43,3,10,1),(44,4,10,1),(45,5,10,1),(46,6,10,1);
/*!40000 ALTER TABLE `workday_schedules` ENABLE KEYS */;
UNLOCK TABLES;