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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'2022-03-19',1,1,2,'2022-03-19 12:07:01','2022-03-19 18:32:24'),(2,'2022-03-19',2,1,2,'2022-03-19 12:07:50','2022-03-19 12:07:50'),(3,'2022-03-19',6,4,10,'2022-03-19 12:15:44','2022-03-19 22:24:13'),(4,'2022-03-19',7,2,2,'2022-03-19 12:18:57','2022-03-19 22:24:38'),(5,'2022-03-19',8,2,2,'2022-03-19 12:22:36','2022-03-19 22:24:59'),(9,'2022-03-19',12,2,7,'2022-03-19 17:54:08','2022-03-19 22:27:30'),(12,'2022-03-19',18,2,2,'2022-03-19 22:26:53','2022-03-19 22:07:27'),(13,'2022-03-19',19,1,3,'2022-03-19 22:22:31','2022-03-19 22:22:31'),(14,'2022-03-20',20,4,39,'2022-03-19 17:24:21','2022-03-19 17:24:21'),(15,'2022-03-20',21,4,38,'2022-03-19 21:46:43','2022-03-19 21:46:43');
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
  `scheduleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`nurseId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurses`
--

LOCK TABLES `nurses` WRITE;
/*!40000 ALTER TABLE `nurses` DISABLE KEYS */;
INSERT INTO `nurses` VALUES (1,'GN11',1,1),(2,'GN12',1,1),(3,'GN13',1,2),(4,'GN14',1,2),(5,'GN21',2,1),(6,'GN22',2,1),(7,'GN23',2,1),(8,'GN24',2,2),(9,'GN25',2,2),(10,'GN31',3,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `residents`
--

LOCK TABLES `residents` WRITE;
/*!40000 ALTER TABLE `residents` DISABLE KEYS */;
INSERT INTO `residents` VALUES (1,'John','G45354535'),(2,'David','G45354536'),(6,'Test User2','ABC'),(7,'Test User7','BCFG'),(8,'Test User4','BCD'),(12,'Test User11','sdsddd'),(18,'Etson','GHF'),(19,'Test user','GHT'),(20,'Lijo','HGDF'),(21,'Puru','TESTNR');
/*!40000 ALTER TABLE `residents` ENABLE KEYS */;
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
INSERT INTO `slots` VALUES (1,'08:00:00.000'),(2,'08:15:00.000'),(3,'08:30:00.000'),(4,'08:45:00.000'),(5,'09:00:00.000'),(6,'09:15:00.000'),(7,'09:30:00.000'),(8,'09:45:00.000'),(9,'10:00:00.000'),(10,'10:15:00.000'),(11,'10:30:00.000'),(12,'10:45:00.000'),(13,'11:00:00.000'),(14,'11:15:00.000'),(15,'11:30:00.000'),(16,'11:45:00.000'),(17,'12:00:00.000'),(18,'12:15:00.000'),(19,'12:30:00.000'),(20,'12:45:00.000'),(21,'13:00:00.000'),(22,'13:15:00.000'),(23,'13:30:00.000'),(24,'13:45:00.000'),(25,'14:00:00.000'),(26,'14:15:00.000'),(27,'14:30:00.000'),(28,'14:45:00.000'),(29,'15:00:00.000'),(30,'15:15:00.000'),(31,'15:30:00.000'),(32,'15:45:00.000'),(33,'16:00:00.000'),(34,'16:15:00.000'),(35,'16:30:00.000'),(36,'16:45:00.000'),(37,'17:00:00.000'),(38,'17:15:00.000'),(39,'17:30:00.000'),(40,'17:45:00.000'),(41,'18:00:00.000'),(42,'18:15:00.000'),(43,'18:30:00.000'),(44,'18:45:00.000'),(45,'19:00:00.000'),(46,'19:15:00.000'),(47,'19:30:00.000'),(48,'19:45:00.000'),(49,'20:00:00.000');
/*!40000 ALTER TABLE `slots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_schedules`
--

DROP TABLE IF EXISTS `work_schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_schedules` (
  `scheduleId` int(11) NOT NULL,
  `startTime` time(3) DEFAULT NULL,
  `endTime` time(3) DEFAULT NULL,
  PRIMARY KEY (`scheduleId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_schedules`
--

LOCK TABLES `work_schedules` WRITE;
/*!40000 ALTER TABLE `work_schedules` DISABLE KEYS */;
INSERT INTO `work_schedules` VALUES (1,'08:00:00.000','14:00:00.000'),(2,'14:00:00.000','20:00:00.000');
/*!40000 ALTER TABLE `work_schedules` ENABLE KEYS */;
UNLOCK TABLES;

