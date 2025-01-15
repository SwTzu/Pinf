-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: blocktype.cl    Database: practica
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `idArea` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idArea`),
  UNIQUE KEY `nombre` (`nombre`),
  UNIQUE KEY `nombre_2` (`nombre`),
  UNIQUE KEY `nombre_3` (`nombre`),
  UNIQUE KEY `nombre_4` (`nombre`),
  UNIQUE KEY `nombre_5` (`nombre`),
  UNIQUE KEY `nombre_6` (`nombre`),
  UNIQUE KEY `nombre_7` (`nombre`),
  UNIQUE KEY `nombre_8` (`nombre`),
  UNIQUE KEY `nombre_9` (`nombre`),
  UNIQUE KEY `nombre_10` (`nombre`),
  UNIQUE KEY `nombre_11` (`nombre`),
  UNIQUE KEY `nombre_12` (`nombre`),
  UNIQUE KEY `nombre_13` (`nombre`),
  UNIQUE KEY `nombre_14` (`nombre`),
  UNIQUE KEY `nombre_15` (`nombre`),
  UNIQUE KEY `nombre_16` (`nombre`),
  UNIQUE KEY `nombre_17` (`nombre`),
  UNIQUE KEY `nombre_18` (`nombre`),
  UNIQUE KEY `nombre_19` (`nombre`),
  UNIQUE KEY `nombre_20` (`nombre`),
  UNIQUE KEY `nombre_21` (`nombre`),
  UNIQUE KEY `nombre_22` (`nombre`),
  UNIQUE KEY `nombre_23` (`nombre`),
  UNIQUE KEY `nombre_24` (`nombre`),
  UNIQUE KEY `nombre_25` (`nombre`),
  UNIQUE KEY `nombre_26` (`nombre`),
  UNIQUE KEY `nombre_27` (`nombre`),
  UNIQUE KEY `nombre_28` (`nombre`),
  UNIQUE KEY `nombre_29` (`nombre`),
  UNIQUE KEY `nombre_30` (`nombre`),
  UNIQUE KEY `nombre_31` (`nombre`),
  UNIQUE KEY `nombre_32` (`nombre`),
  UNIQUE KEY `nombre_33` (`nombre`),
  UNIQUE KEY `nombre_34` (`nombre`),
  UNIQUE KEY `nombre_35` (`nombre`),
  UNIQUE KEY `nombre_36` (`nombre`),
  UNIQUE KEY `nombre_37` (`nombre`),
  UNIQUE KEY `nombre_38` (`nombre`),
  UNIQUE KEY `nombre_39` (`nombre`),
  UNIQUE KEY `nombre_40` (`nombre`),
  UNIQUE KEY `nombre_41` (`nombre`),
  UNIQUE KEY `nombre_42` (`nombre`),
  UNIQUE KEY `nombre_43` (`nombre`),
  UNIQUE KEY `nombre_44` (`nombre`),
  UNIQUE KEY `nombre_45` (`nombre`),
  UNIQUE KEY `nombre_46` (`nombre`),
  UNIQUE KEY `nombre_47` (`nombre`),
  UNIQUE KEY `nombre_48` (`nombre`),
  UNIQUE KEY `nombre_49` (`nombre`),
  UNIQUE KEY `nombre_50` (`nombre`),
  UNIQUE KEY `nombre_51` (`nombre`),
  UNIQUE KEY `nombre_52` (`nombre`),
  UNIQUE KEY `nombre_53` (`nombre`),
  UNIQUE KEY `nombre_54` (`nombre`),
  UNIQUE KEY `nombre_55` (`nombre`),
  UNIQUE KEY `nombre_56` (`nombre`),
  UNIQUE KEY `nombre_57` (`nombre`),
  UNIQUE KEY `nombre_58` (`nombre`),
  UNIQUE KEY `nombre_59` (`nombre`),
  UNIQUE KEY `nombre_60` (`nombre`),
  UNIQUE KEY `nombre_61` (`nombre`),
  UNIQUE KEY `nombre_62` (`nombre`),
  UNIQUE KEY `nombre_63` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,'Backend','2024-12-15 05:36:06','2024-12-15 05:36:06'),(2,'Frontend','2024-12-15 05:36:19','2024-12-15 05:36:19'),(3,'UX/UI','2024-12-15 05:36:28','2024-12-15 05:36:28'),(4,'Desarrollo Web','2024-12-15 05:36:35','2024-12-15 05:36:35'),(5,'Desarrollo Movil','2024-12-15 05:37:08','2024-12-15 05:37:08'),(6,'React','2024-12-15 05:37:22','2024-12-15 05:37:22'),(7,'Arquitectura de software','2024-12-15 05:37:40','2024-12-15 05:37:40'),(8,'Java','2024-12-15 05:38:47','2024-12-15 05:38:47'),(9,'Simulacion basado en agentes','2024-12-15 18:07:44','2024-12-15 18:07:44'),(10,'C++','2024-12-15 18:07:52','2024-12-15 18:07:52'),(11,'Python','2024-12-15 18:07:58','2024-12-15 18:07:58'),(12,'Mysql','2024-12-15 18:08:02','2024-12-15 18:08:02'),(13,'Base de datos','2024-12-15 18:08:09','2024-12-15 18:08:09');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;

--
-- Table structure for table `carta`
--

DROP TABLE IF EXISTS `carta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carta` (
  `idAceptacion` int NOT NULL AUTO_INCREMENT,
  `idSolicitud` int DEFAULT NULL,
  `correoSupervisor` varchar(50) DEFAULT NULL,
  `tareas` json DEFAULT NULL,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaTermino` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idInforme` int DEFAULT NULL,
  `idmemoria` int DEFAULT NULL,
  PRIMARY KEY (`idAceptacion`),
  KEY `idSolicitud` (`idSolicitud`),
  KEY `correoSupervisor` (`correoSupervisor`),
  CONSTRAINT `carta_ibfk_21` FOREIGN KEY (`idSolicitud`) REFERENCES `solicitud` (`idSolicitud`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `carta_ibfk_22` FOREIGN KEY (`correoSupervisor`) REFERENCES `supervisor` (`correoSupervisor`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carta`
--

/*!40000 ALTER TABLE `carta` DISABLE KEYS */;
INSERT INTO `carta` VALUES (12,44,'mhhernand@gmail.com','[{\"id\": \"1734309786118\", \"name\": \"asd\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}], \"description\": \"asd\"}]','2024-12-01 00:00:00','2024-12-28 00:00:00','2025-12-16 00:43:06','2024-12-16 00:43:06',NULL,NULL),(13,44,'mhhernand@gmail.com','[{\"id\": \"1734309786118\", \"name\": \"asd\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}], \"description\": \"asd\"}, {\"id\": \"1734309811961\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asd\"}]','2025-01-01 00:00:00','2025-03-29 00:00:00','2025-12-16 00:43:33','2024-12-16 00:43:33',NULL,NULL),(14,46,'mhhernand@gmail.com','[{\"id\": \"1734309937769\", \"name\": \"asd\", \"areas\": [{\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asd\"}]','2024-12-29 00:00:00','2024-12-29 00:00:00','2025-12-16 00:45:43','2024-12-16 00:45:43',NULL,NULL),(15,45,'mhhernand@gmail.com','[{\"id\": \"1734310056458\", \"name\": \"asdasd\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}], \"description\": \"asdasd\"}]','2024-12-01 00:00:00','2025-05-09 00:00:00','2025-12-16 00:47:38','2024-12-16 00:47:38',NULL,NULL),(16,47,'mhhernand@gmail.com','[{\"id\": \"1734310070833\", \"name\": \"asd\", \"areas\": [{\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}], \"description\": \"asd\"}]','2024-12-05 00:00:00','2024-12-21 00:00:00','2025-12-16 00:47:53','2024-12-16 00:47:53',NULL,NULL),(19,93,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734379086599\", \"name\": \"desarrollo web\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 4, \"nombre\": \"Desarrollo Web\", \"createdAt\": \"2024-12-15T05:36:35.000Z\", \"updatedAt\": \"2024-12-15T05:36:35.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"hacer paginas webs con react\"}, {\"id\": \"1734379135242\", \"name\": \"desarrollo de backend en mongo\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 7, \"nombre\": \"Arquitectura de software\", \"createdAt\": \"2024-12-15T05:37:40.000Z\", \"updatedAt\": \"2024-12-15T05:37:40.000Z\"}, {\"idArea\": 11, \"nombre\": \"Python\", \"createdAt\": \"2024-12-15T18:07:58.000Z\", \"updatedAt\": \"2024-12-15T18:07:58.000Z\"}, {\"idArea\": 12, \"nombre\": \"Mysql\", \"createdAt\": \"2024-12-15T18:08:02.000Z\", \"updatedAt\": \"2024-12-15T18:08:02.000Z\"}, {\"idArea\": 13, \"nombre\": \"Base de datos\", \"createdAt\": \"2024-12-15T18:08:09.000Z\", \"updatedAt\": \"2024-12-15T18:08:09.000Z\"}], \"description\": \"desarrollar consulta y manejo de base de datos no relacionales\"}, {\"id\": \"1734379140329\", \"name\": \"asdasd\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 4, \"nombre\": \"Desarrollo Web\", \"createdAt\": \"2024-12-15T05:36:35.000Z\", \"updatedAt\": \"2024-12-15T05:36:35.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asdasd\"}]','2024-12-01 00:00:00','2025-04-20 00:00:00','2025-12-16 20:03:02','2024-12-16 20:03:02',NULL,NULL),(20,94,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734396140161\", \"name\": \"webiar con webs\", \"areas\": [{\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 7, \"nombre\": \"Arquitectura de software\", \"createdAt\": \"2024-12-15T05:37:40.000Z\", \"updatedAt\": \"2024-12-15T05:37:40.000Z\"}], \"description\": \"webiar en la red de internet\"}, {\"id\": \"1734396147527\", \"name\": \"asdasd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}], \"description\": \"asdasd\"}]','2024-12-01 00:00:00','2024-12-29 00:00:00','2025-12-17 00:42:31','2024-12-18 05:10:24',15,NULL),(21,94,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734396294745\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asd\"}]','2024-12-04 00:00:00','2024-12-28 00:00:00','2025-12-17 00:44:53','2024-12-17 00:44:53',NULL,NULL),(22,94,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734396368832\", \"name\": \"asd\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asd\"}]','2024-12-04 00:00:00','2024-12-29 00:00:00','2025-12-17 00:46:07','2024-12-17 00:46:07',NULL,NULL),(23,94,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734396454544\", \"name\": \"asd\", \"areas\": [{\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asd\"}]','2024-12-14 00:00:00','2024-12-28 00:00:00','2025-12-17 00:47:33','2024-12-17 00:47:33',NULL,NULL),(24,93,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734398693291\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asd\"}, {\"id\": \"1734398697798\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}], \"description\": \"asd\"}, {\"id\": \"1734398704285\", \"name\": \"asd\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}], \"description\": \"asd\"}, {\"id\": \"1734398726112\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asd\"}]','2024-12-04 00:00:00','2024-12-28 00:00:00','2025-12-17 01:25:30','2024-12-17 01:25:30',NULL,NULL),(26,96,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734401487802\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 4, \"nombre\": \"Desarrollo Web\", \"createdAt\": \"2024-12-15T05:36:35.000Z\", \"updatedAt\": \"2024-12-15T05:36:35.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asd\"}]','2024-12-03 00:00:00','2024-12-21 00:00:00','2025-12-17 02:11:28','2024-12-17 02:11:28',NULL,NULL),(27,96,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734401868749\", \"name\": \"asd\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}], \"description\": \"asd\"}]','2024-12-04 00:00:00','2024-12-29 00:00:00','2025-12-17 02:17:48','2024-12-17 02:17:48',NULL,NULL),(28,96,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734402097467\", \"name\": \"asd\", \"areas\": [{\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}, {\"idArea\": 7, \"nombre\": \"Arquitectura de software\", \"createdAt\": \"2024-12-15T05:37:40.000Z\", \"updatedAt\": \"2024-12-15T05:37:40.000Z\"}], \"description\": \"asd\"}]','2024-12-04 00:00:00','2024-12-28 00:00:00','2025-12-17 02:21:36','2024-12-17 02:21:36',NULL,NULL),(29,96,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734402297383\", \"name\": \"asd\", \"areas\": [{\"idArea\": 4, \"nombre\": \"Desarrollo Web\", \"createdAt\": \"2024-12-15T05:36:35.000Z\", \"updatedAt\": \"2024-12-15T05:36:35.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asd\"}]','2024-12-04 00:00:00','2024-12-21 00:00:00','2025-12-17 02:24:56','2024-12-17 02:24:56',NULL,NULL),(30,96,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734402361638\", \"name\": \"asd\", \"areas\": [{\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}, {\"idArea\": 7, \"nombre\": \"Arquitectura de software\", \"createdAt\": \"2024-12-15T05:37:40.000Z\", \"updatedAt\": \"2024-12-15T05:37:40.000Z\"}], \"description\": \"asd\"}]','2024-12-04 00:00:00','2024-12-29 00:00:00','2025-12-17 02:26:00','2024-12-17 02:26:00',NULL,NULL),(31,96,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734402465458\", \"name\": \"asd\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}, {\"idArea\": 7, \"nombre\": \"Arquitectura de software\", \"createdAt\": \"2024-12-15T05:37:40.000Z\", \"updatedAt\": \"2024-12-15T05:37:40.000Z\"}], \"description\": \"asd\"}]','2024-12-02 00:00:00','2024-12-29 00:00:00','2025-12-17 02:27:44','2024-12-17 02:27:44',NULL,NULL),(32,96,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734402580678\", \"name\": \"sdasdfg\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 4, \"nombre\": \"Desarrollo Web\", \"createdAt\": \"2024-12-15T05:36:35.000Z\", \"updatedAt\": \"2024-12-15T05:36:35.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}], \"description\": \"fgsdfgh\"}]','2024-12-04 00:00:00','2024-12-29 00:00:00','2025-12-17 02:29:39','2024-12-17 02:29:39',NULL,NULL),(33,NULL,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734462974589\", \"name\": \"lasdkf;lkasjflk;asjdl;kfl;kasdjfl;kjasl;kdfj;lasjd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}], \"description\": \"l;sdkjf;ljd;sflj;lkdsjf;ljdsl;kgj;lsd f;ldjflkjdklfgjl;kjslkdjf lklksdjlk;fjslkadjf;lkasjd;lfkja;lsdjf;lkajsd ;aslkdfjl;kasjd;fljasl;kdjfkl;sad\\nsd;klf;alksdjfl;kja;ljdfkl a;lskdjf;ljas;dlkjf;laskdf;lkjas;dlfj;alsjdf;lkjas;dlfkj;alskdjf;lkaj\"}, {\"id\": \"1734463000224\", \"name\": \"sdlfkjg;lksdfjlgkj df\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}], \"description\": \"lj;lkjdf;lj;ldfkjg;ldfkjgl;ldfj;lgkj;ldfjgl;djf;lgjsd;lfgj;lkdsfjl ;sdlfjg;lkdfjsgd\\nfg\\nsdf\\n\\ngsd\\nf\\ng\\nsdf\\ngsdf\\ng\\nsdfgsdfg\\nsdf\\ng\\nsdf\\ng\\nsdf\\ng\\nsdfg\\ns\\ndfgdsfgdsfgsdfg\\ndfg\\n\\nsdfg\\n\\nsd\\nfg\\nsdfgdfgdfgdfgdfg\\ndf\\ng\\ndf\\ng\\ndf\\ngd\\nf\\ng\\ndf\\ng\\ndf\\ng\\ndff\\ng\\ndf\\ng\\ndfgs\"}]','2024-12-03 00:00:00','2024-12-29 00:00:00','2025-12-17 19:17:02','2024-12-17 19:17:02',NULL,NULL),(34,97,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734463055002\", \"name\": \"asdasdasdsadfasd\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}], \"description\": \"kljljksdflkjlsk;djfkl asklfjlsk;dajfl;asjdlkfasd\\nasd\\nf\\nasd\\nfasdf;kasjd;lkfhjl;kadflk;gj l;aksdlojkasdlkfalksdjhf\"}, {\"id\": \"1734463059441\", \"name\": \"asdfg\", \"areas\": [{\"idArea\": 4, \"nombre\": \"Desarrollo Web\", \"createdAt\": \"2024-12-15T05:36:35.000Z\", \"updatedAt\": \"2024-12-15T05:36:35.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"sdfg\"}, {\"id\": \"1734463074761\", \"name\": \"a\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 5, \"nombre\": \"Desarrollo Movil\", \"createdAt\": \"2024-12-15T05:37:08.000Z\", \"updatedAt\": \"2024-12-15T05:37:08.000Z\"}], \"description\": \"a\"}]','2024-12-05 00:00:00','2024-12-29 00:00:00','2025-12-17 19:17:54','2024-12-17 19:17:54',NULL,NULL),(35,NULL,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734464981603\", \"name\": \"asd\", \"areas\": [{\"idArea\": 2, \"nombre\": \"Frontend\", \"createdAt\": \"2024-12-15T05:36:19.000Z\", \"updatedAt\": \"2024-12-15T05:36:19.000Z\"}, {\"idArea\": 4, \"nombre\": \"Desarrollo Web\", \"createdAt\": \"2024-12-15T05:36:35.000Z\", \"updatedAt\": \"2024-12-15T05:36:35.000Z\"}, {\"idArea\": 7, \"nombre\": \"Arquitectura de software\", \"createdAt\": \"2024-12-15T05:37:40.000Z\", \"updatedAt\": \"2024-12-15T05:37:40.000Z\"}], \"description\": \"asd\"}]','2024-12-03 00:00:00','2024-12-28 00:00:00','2025-12-17 19:49:42','2024-12-17 19:49:42',NULL,NULL),(36,100,'martin.hernandez@alumnos.uv.cl','[{\"id\": \"1734672166567\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 4, \"nombre\": \"Desarrollo Web\", \"createdAt\": \"2024-12-15T05:36:35.000Z\", \"updatedAt\": \"2024-12-15T05:36:35.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asd\"}, {\"id\": \"1734672170115\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asdasd\"}, {\"id\": \"1734672173115\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asdasd\"}, {\"id\": \"1734672171115\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asdasd\"}, {\"id\": \"2734672170115\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asdasd\"}, {\"id\": \"1434672170115\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asdasd\"}, {\"id\": \"1334672170115\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asdasd\"}, {\"id\": \"1234672470115\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asdasd\"}, {\"id\": \"1234632170115\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asdasd\"}, {\"id\": \"1232672170115\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asdasd\"}, {\"id\": \"1235672170115\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asdasd\"}, {\"id\": \"12326723170115\", \"name\": \"asd\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}, {\"idArea\": 3, \"nombre\": \"UX/UI\", \"createdAt\": \"2024-12-15T05:36:28.000Z\", \"updatedAt\": \"2024-12-15T05:36:28.000Z\"}, {\"idArea\": 6, \"nombre\": \"React\", \"createdAt\": \"2024-12-15T05:37:22.000Z\", \"updatedAt\": \"2024-12-15T05:37:22.000Z\"}], \"description\": \"asdasd\"}]','2024-12-04 00:00:00','2024-12-29 00:00:00','2025-12-20 05:22:52','2024-12-23 21:51:05',16,4),(37,104,'angel.salgado@alumnos.uv.cl','[{\"id\": \"1736132312776\", \"name\": \"Desarrollo Backend\", \"areas\": [{\"idArea\": 1, \"nombre\": \"Backend\", \"createdAt\": \"2024-12-15T05:36:06.000Z\", \"updatedAt\": \"2024-12-15T05:36:06.000Z\"}], \"description\": \"Va a hacer formularios bonitos y portadas grandes\"}, {\"id\": \"1736132357948\", \"name\": \"Liderazgo\", \"areas\": [{\"idArea\": 4, \"nombre\": \"Desarrollo Web\", \"createdAt\": \"2024-12-15T05:36:35.000Z\", \"updatedAt\": \"2024-12-15T05:36:35.000Z\"}], \"description\": \"Va a guiar a alumnos de primer año, en sus otras practicas para aprender a desarrollar aplicaciones web de calidad.\"}, {\"id\": \"1736132381827\", \"name\": \"Bases de datos\", \"areas\": [{\"idArea\": 13, \"nombre\": \"Base de datos\", \"createdAt\": \"2024-12-15T18:08:09.000Z\", \"updatedAt\": \"2024-12-15T18:08:09.000Z\"}], \"description\": \"Va a desarrollar y mantener bases de datos no relacionales para distintas aplicaciones web.\"}]','2025-02-07 00:00:00','2025-03-09 00:00:00','2025-01-06 02:59:54','2025-01-06 03:16:09',17,NULL);
/*!40000 ALTER TABLE `carta` ENABLE KEYS */;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `rutEmpresa` varchar(12) NOT NULL,
  `razonSocial` varchar(170) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `direccion` varchar(170) DEFAULT NULL,
  `rubro` varchar(170) DEFAULT NULL,
  `verificado` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`rutEmpresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES ('1.111.111-1','inventada','valparaiso','valparaiso','valparaiso','ing',0,'2024-12-19 07:08:33','2024-12-19 07:08:33'),('10479685-0','cupiditate provident nostrum','West Daisha','Suriname','630 Canal Street','Brand',0,'2024-12-13 23:27:26','2024-12-13 23:27:26'),('10520921-5','nihil admitto cui','Fort Jordanbury','Valparaiso','5437 Letha Tunnel','Assurance',1,'2024-12-13 23:25:12','2024-12-13 23:25:12'),('1086229-9','colo velit timidus','Rutherfordburgh','El Salvador','840 S 1st Avenue','Brand',0,'2024-12-13 23:25:01','2024-12-13 23:25:01'),('11111111-1','asdadasd','sdasdasdsa','asdasdasd','asdadsasdas','dasdasdasda',0,'2024-12-13 23:00:27','2024-12-13 23:00:27'),('11111111-2','asdadasd','sdasdasdsa','asdasdasd','asdadsasdas','dasdasdasda',0,'2024-12-13 23:00:58','2024-12-13 23:00:58'),('11111111-3','asdasdasd','kashdkjahsd','asdjkhasjkdh','kjashdjkhasd','kjashdjkasd',0,'2024-12-13 23:02:53','2024-12-13 23:02:53'),('11111111-4','ASASDASDasdsa','kajshkjasd','asljkhasjkld','jklaskjdah','kjhasdasd',0,'2024-12-13 23:12:49','2024-12-13 23:12:49'),('11111111-5','ASASDASDasdsa','kajshkjasd','asljkhasjkld','jklaskjdah','kjhasdasd',0,'2024-12-13 23:12:55','2024-12-13 23:12:55'),('11111111-6','asdasdasd','kashdkjahsd','Los Lagos','kjashdjkhasd','kjashdjkasd',1,'2024-12-13 23:02:59','2024-12-13 23:02:59'),('11111111-7','ASASDASDasdsa','kajshkjasd','asljkhasjkld','jklaskjdah','kjhasdasd',0,'2024-12-13 23:10:54','2024-12-13 23:10:54'),('11111111-9','ASASDASDasdsa','kajshkjasd','asljkhasjkld','jklaskjdah','kjhasdasd',0,'2024-12-13 23:11:09','2024-12-13 23:11:09'),('11400685-8','sumptus ventus bellicus','North Highlands','Australia','995 Libbie Inlet','Quality',0,'2024-12-13 23:25:23','2024-12-13 23:25:23'),('12258994-3','vesco depraedor damnatio','Gleichnertown','La Serena','5514 Hackett Mountain','Factors',1,'2024-12-13 23:24:22','2024-12-13 23:24:22'),('123213123123','inventada','valparaiso','valparaiso','valparaiso','ing',0,'2024-12-19 07:09:20','2024-12-19 07:09:20'),('1296834-5','video truculenter voluptatum','Lake Devon','Vanuatu','8980 Kovacek Ramp','Usability',0,'2024-12-13 21:14:41','2024-12-13 21:14:41'),('15080595-3','corona conforto crebro','Fort Ahmed','Nepal','14690 Dewayne Plaza','Branding',0,'2024-12-13 23:23:53','2024-12-13 23:23:53'),('1549023-3','abundans turbo thermae','Kaileybury','Argentina','41818 Emmerich Islands','Marketing',0,'2024-12-13 21:14:00','2024-12-13 21:14:00'),('15856158-1','speculum corroboro aeneus','Kulasport','Paraguay','290 2nd Avenue','Implementation',0,'2024-12-13 23:23:33','2024-12-13 23:23:33'),('19313338-K','quaerat capillus anser','South Ashleigh','Martinique','5599 Volkman Centers','Web',0,'2024-12-13 23:25:49','2024-12-13 23:25:49'),('20.147.720-2','inventada','valparaiso','valparaiso','valparaiso','ing',0,'2024-12-19 07:08:52','2024-12-19 07:08:52'),('20.147.721-2','inventada','valparaiso','valparaiso','valparaiso','ing',0,'2024-12-19 07:09:00','2024-12-19 07:09:00'),('2014772-5','letrasLTA','lo espejo','metropolitana','manantiales','asesoria',0,'2025-01-06 01:56:36','2025-01-06 01:56:36'),('20147725-5','laksdjasdasdasd','asdasdasd','vsadsfs','asdasdas asd','asdasdasd',0,'2024-12-13 21:37:04','2024-12-13 21:37:04'),('2323232323','inventada','valparaiso','valparaiso','valparaiso','ing',0,'2024-12-19 07:09:25','2024-12-19 07:09:25'),('2345235','hola123','tampoco','nose ','las rjas 980','a',0,'2025-01-05 22:23:06','2025-01-05 22:23:06'),('23452356','hola123','ccccc','nosea','las rjas 980','a345',0,'2025-01-05 22:27:33','2025-01-05 22:27:33'),('60503000-9','EMPRESA DE CORREOS DE CHILE','Santiago','Metropolitana','PLAZA DE ARMAS 989 PISO 2 EDIFICIO PATRIMONIAL','Transporte, Almacenamiento y Comunicaciones',1,'2024-08-06 05:53:05','2024-08-06 05:57:26'),('6196767-2','depereo sponte deprecator','Sammiefort','Solomon Islands','15161 Broadway','Usability',0,'2024-12-13 23:23:27','2024-12-13 23:23:27'),('7536473-3','avarus numquam turpis','South Paolo','Nauru','9925 Willis Via','Assurance',0,'2024-12-13 21:35:05','2024-12-13 21:35:05'),('76114143-0','VTR COMUNICACIONES SPA','Santiago','Metropolitana','APOQUINDO 4800 1. Las Condes','Transporte, Almacenamiento y Comunicaciones',1,'2024-08-06 05:50:01','2024-08-06 05:57:32'),('76134941-4','ADMINISTRADORA DE SUPERMERCADOS HIPER LIMITADA','Santiago','Metropolitana','Avda. Presidente Eduardo Frei Montalva 8301. Quilicura','Comercio Al Por Mayor y Menor, Rep. Veh.automotores/enseres Domesticos',1,'2024-08-06 05:48:30','2024-08-06 05:57:07'),('89862200-2','LATAM AIRLINES GROUP S.A','Santiago','Metropolitana','AV. PRESIDENTE RIESCO 5711. Las Condes','Transporte, Almacenamiento y Comunicaciones',1,'2024-08-06 05:51:10','2024-08-06 05:57:38'),('91438000-6','CAMBIASO HERMANOS SAC','Valparaiso','Valparaiso','AVENIDA BRASIL 2492, Valparaíso','Industrias Manufactureras No Metalicas',1,'2024-08-06 05:38:41','2024-08-06 05:38:41'),('9160770-0','adsum aro trepide','New Barton','Nicaragua','5378 Karelle Estate','Mobility',0,'2024-12-13 23:23:32','2024-12-13 23:23:32'),('92580000-7','EMPRESA NACIONAL DE TELECOMUNICACIONES S.A.','Santiago','Metropolitana','AV. COSTANERA SUR RIO MAPOCHO 2760 PISO 22 TORRE C','Transporte, Almacenamiento y Comunicaciones',1,'2024-08-06 05:45:41','2024-08-06 05:57:46'),('96799250-K','Claro Chile SpA','Santiago','Metropolitana','Avenida El Salto 5450, Ciudad Empresarial, Huechuraba','Transporte, Almacenamiento y Comunicaciones',1,'2024-08-06 05:54:37','2024-08-06 05:58:31'),('96813520-1','Chilquinta Distribución S.A.','Valparaiso','Valparaiso','Avenida Argentina Nº1, piso 9','Suministro de Electricidad, Gas y Agua',0,'2024-08-06 05:42:07','2024-08-06 05:42:07'),('96960800-6','GasValpo SPA','Valparaiso','Valparaiso','Cam. Internacional 1420, 2542227','Suministro de Electricidad, Gas y Agua',0,'2024-08-06 05:31:38','2024-08-06 05:31:38'),('aaaaaaa1','aaaaa2','aaa5','aaaa3','aaa4','aa6',0,'2024-12-13 21:39:26','2024-12-13 21:39:26'),('asdasdasd1','asdasd','asdasd','asdasd','asdasd','asdasd',0,'2024-12-13 21:40:09','2024-12-13 21:40:09'),('sssss-5','asdasdasd','asdasdasd','asdasdasd','koasjkdhajksd','akjsdhjkasd',0,'2024-12-13 22:59:55','2024-12-13 22:59:55');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;

--
-- Table structure for table `informe evaluacion`
--

DROP TABLE IF EXISTS `informe evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `informe evaluacion` (
  `idInforme` int NOT NULL AUTO_INCREMENT,
  `idSolicitud` int DEFAULT NULL,
  `formulario` json DEFAULT NULL,
  `fechaEnvio` datetime DEFAULT NULL,
  `nota` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idInforme`),
  KEY `idSolicitud` (`idSolicitud`),
  CONSTRAINT `informe evaluacion_ibfk_1` FOREIGN KEY (`idSolicitud`) REFERENCES `solicitud` (`idSolicitud`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informe evaluacion`
--

/*!40000 ALTER TABLE `informe evaluacion` DISABLE KEYS */;
INSERT INTO `informe evaluacion` VALUES (1,94,'{\"opinion\": \"asdasdasdasdas asd asd asd asd\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"tu amdre es puuuuuu....\"}, {\"id\": 2, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": true, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"1\", \"solucion\": \"1\", \"organizacion\": \"1\", \"conocimientos\": \"1\"}, \"aspectos_generales\": {\"capacidad\": \"1\", \"asistencia\": \"1\", \"iniciativa\": \"1\", \"adaptabilidad\": \"1\", \"comportamiento\": \"1\", \"responzabilidad\": \"1\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"1\", \"comunicacion_escrita\": \"1\"}}','2024-12-18 04:44:34',0,'2024-12-18 04:44:34','2024-12-18 04:44:34'),(2,NULL,'{\"opinion\": \"yo opino que oipinar es divertido\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"comentario a pregunta 1\"}, {\"id\": 2, \"respuesta\": true, \"comentario\": \"comentario a pregunta 2\"}, {\"id\": 3, \"respuesta\": true, \"comentario\": \"comentario a pregunta 3\"}, {\"id\": 4, \"respuesta\": true, \"comentario\": \"comentario a pregunta 4\"}, {\"id\": 5, \"respuesta\": true, \"comentario\": \"comentario a pregunta 5\"}, {\"id\": 6, \"respuesta\": true, \"comentario\": \"comentario a pregunta 6\"}, {\"id\": 7, \"respuesta\": true, \"comentario\": \"comentario a pregunta 7\"}, {\"id\": 8, \"respuesta\": true, \"comentario\": \"comentario a pregunta 8\"}], \"aspectos_tecnicos\": {\"decision\": \"1\", \"solucion\": \"3\", \"organizacion\": \"5\", \"conocimientos\": \"7\"}, \"aspectos_generales\": {\"capacidad\": \"1\", \"asistencia\": \"3\", \"iniciativa\": \"5\", \"adaptabilidad\": \"7\", \"comportamiento\": \"5\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"1\", \"comunicacion_escrita\": \"7\"}}','2024-12-18 04:51:30',3.3,'2024-12-18 04:51:30','2024-12-18 04:51:30'),(3,94,'{\"opinion\": \"asdasdsad\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asdasdasd\"}, {\"id\": 2, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": true, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"3\", \"solucion\": \"7\", \"organizacion\": \"3\", \"conocimientos\": \"3\"}, \"aspectos_generales\": {\"capacidad\": \"3\", \"asistencia\": \"7\", \"iniciativa\": \"3\", \"adaptabilidad\": \"1\", \"comportamiento\": \"3\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"7\", \"comunicacion_escrita\": \"3\"}}','2024-12-18 04:52:01',3.76667,'2024-12-18 04:52:01','2024-12-18 04:52:01'),(4,94,'{\"opinion\": \"asdasd\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asd\"}, {\"id\": 2, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": false, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"7\", \"solucion\": \"3\", \"organizacion\": \"3\", \"conocimientos\": \"3\"}, \"aspectos_generales\": {\"capacidad\": \"3\", \"asistencia\": \"5\", \"iniciativa\": \"7\", \"adaptabilidad\": \"5\", \"comportamiento\": \"5\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"1\", \"comunicacion_escrita\": \"1\"}}','2024-12-18 04:56:44',4.03333,'2024-12-18 04:56:44','2024-12-18 04:56:44'),(5,94,'{\"opinion\": \"asdasd\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asd\"}, {\"id\": 2, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": false, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"7\", \"solucion\": \"3\", \"organizacion\": \"3\", \"conocimientos\": \"3\"}, \"aspectos_generales\": {\"capacidad\": \"3\", \"asistencia\": \"5\", \"iniciativa\": \"7\", \"adaptabilidad\": \"5\", \"comportamiento\": \"5\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"1\", \"comunicacion_escrita\": \"1\"}}','2024-12-18 04:57:04',4.03333,'2024-12-18 04:57:04','2024-12-18 04:57:04'),(6,94,'{\"opinion\": \"asdasd\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asdasdasdasd\"}, {\"id\": 2, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": true, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"3\", \"solucion\": \"1\", \"organizacion\": \"3\", \"conocimientos\": \"3\"}, \"aspectos_generales\": {\"capacidad\": \"1\", \"asistencia\": \"3\", \"iniciativa\": \"1\", \"adaptabilidad\": \"3\", \"comportamiento\": \"1\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"1\", \"comunicacion_escrita\": \"1\"}}','2024-12-18 04:59:17',2.1,'2024-12-18 04:59:17','2024-12-18 04:59:17'),(7,94,'{\"opinion\": \"asd\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asd\"}, {\"id\": 2, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": true, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"1\", \"solucion\": \"3\", \"organizacion\": \"3\", \"conocimientos\": \"3\"}, \"aspectos_generales\": {\"capacidad\": \"3\", \"asistencia\": \"5\", \"iniciativa\": \"3\", \"adaptabilidad\": \"3\", \"comportamiento\": \"3\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"3\", \"comunicacion_escrita\": \"1\"}}','2024-12-18 04:59:53',2.86667,'2024-12-18 04:59:53','2024-12-18 04:59:53'),(8,94,'{\"opinion\": \"asdasdasd\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asdasdasda\"}, {\"id\": 2, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": true, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"3\", \"solucion\": \"3\", \"organizacion\": \"5\", \"conocimientos\": \"3\"}, \"aspectos_generales\": {\"capacidad\": \"3\", \"asistencia\": \"3\", \"iniciativa\": \"3\", \"adaptabilidad\": \"1\", \"comportamiento\": \"3\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"3\", \"comunicacion_escrita\": \"3\"}}','2024-12-18 05:01:34',3.03333,'2024-12-18 05:01:34','2024-12-18 05:01:34'),(9,94,'{\"opinion\": \"asdasd\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asdasd\"}, {\"id\": 2, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": true, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"3\", \"solucion\": \"5\", \"organizacion\": \"5\", \"conocimientos\": \"3\"}, \"aspectos_generales\": {\"capacidad\": \"3\", \"asistencia\": \"3\", \"iniciativa\": \"3\", \"adaptabilidad\": \"3\", \"comportamiento\": \"5\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"3\", \"comunicacion_escrita\": \"5\"}}','2024-12-18 05:02:09',3.66667,'2024-12-18 05:02:09','2024-12-18 05:02:09'),(10,94,'{\"opinion\": \"asdasdas\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asdasd\"}, {\"id\": 2, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": true, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"1\", \"solucion\": \"3\", \"organizacion\": \"3\", \"conocimientos\": \"3\"}, \"aspectos_generales\": {\"capacidad\": \"5\", \"asistencia\": \"7\", \"iniciativa\": \"1\", \"adaptabilidad\": \"3\", \"comportamiento\": \"3\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"1\", \"comunicacion_escrita\": \"7\"}}','2024-12-18 05:03:07',3.23333,'2024-12-18 05:03:07','2024-12-18 05:03:07'),(11,94,'{\"opinion\": \"asdasdasd\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asdasd\"}, {\"id\": 2, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": true, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"1\", \"solucion\": \"5\", \"organizacion\": \"5\", \"conocimientos\": \"3\"}, \"aspectos_generales\": {\"capacidad\": \"3\", \"asistencia\": \"1\", \"iniciativa\": \"3\", \"adaptabilidad\": \"7\", \"comportamiento\": \"1\", \"responzabilidad\": \"1\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"1\", \"comunicacion_escrita\": \"3\"}}','2024-12-18 05:04:43',2.93333,'2024-12-18 05:04:43','2024-12-18 05:04:43'),(12,94,'{\"opinion\": \"asdasdasd\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asdasd\"}, {\"id\": 2, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": true, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"5\", \"solucion\": \"3\", \"organizacion\": \"1\", \"conocimientos\": \"3\"}, \"aspectos_generales\": {\"capacidad\": \"1\", \"asistencia\": \"5\", \"iniciativa\": \"5\", \"adaptabilidad\": \"3\", \"comportamiento\": \"3\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"5\", \"comunicacion_escrita\": \"1\"}}','2024-12-18 05:06:52',3.16667,'2024-12-18 05:06:52','2024-12-18 05:06:52'),(13,94,'{\"opinion\": \"asdasdasd\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asdasd\"}, {\"id\": 2, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": true, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"5\", \"solucion\": \"3\", \"organizacion\": \"1\", \"conocimientos\": \"3\"}, \"aspectos_generales\": {\"capacidad\": \"1\", \"asistencia\": \"5\", \"iniciativa\": \"5\", \"adaptabilidad\": \"3\", \"comportamiento\": \"3\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"5\", \"comunicacion_escrita\": \"1\"}}','2024-12-18 05:07:04',3.16667,'2024-12-18 05:07:04','2024-12-18 05:07:04'),(14,94,'{\"opinion\": \"asdasdasd\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asd\"}, {\"id\": 2, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": true, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": false, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"3\", \"solucion\": \"1\", \"organizacion\": \"3\", \"conocimientos\": \"3\"}, \"aspectos_generales\": {\"capacidad\": \"1\", \"asistencia\": \"3\", \"iniciativa\": \"3\", \"adaptabilidad\": \"5\", \"comportamiento\": \"3\", \"responzabilidad\": \"5\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"1\", \"comunicacion_escrita\": \"3\"}}','2024-12-18 05:09:15',2.86667,'2024-12-18 05:09:15','2024-12-18 05:09:15'),(15,94,'{\"opinion\": \"asdasdasddas\", \"preguntas\": [{\"id\": 1, \"respuesta\": true, \"comentario\": \"asdasda\"}, {\"id\": 2, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": false, \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": false, \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"5\", \"solucion\": \"3\", \"organizacion\": \"7\", \"conocimientos\": \"7\"}, \"aspectos_generales\": {\"capacidad\": \"3\", \"asistencia\": \"3\", \"iniciativa\": \"7\", \"adaptabilidad\": \"7\", \"comportamiento\": \"7\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"3\", \"comunicacion_escrita\": \"3\"}}','2024-12-18 05:10:24',5,'2024-12-18 05:10:24','2024-12-18 05:10:24'),(16,100,'{\"opinion\": \"observaciones\", \"preguntas\": [{\"id\": 1, \"respuesta\": \"true\", \"comentario\": \"comentario 1\"}, {\"id\": 2, \"respuesta\": \"\", \"comentario\": \"comentario 2\"}, {\"id\": 3, \"respuesta\": \"false\", \"comentario\": \"comentario 3\"}, {\"id\": 4, \"respuesta\": \"false\", \"comentario\": \"comentario 4\"}, {\"id\": 5, \"respuesta\": \"false\", \"comentario\": \"comentario 5\"}, {\"id\": 6, \"respuesta\": \"true\", \"comentario\": \"comentario 6\"}, {\"id\": 7, \"respuesta\": \"true\", \"comentario\": \"comentario 7\"}, {\"id\": 8, \"respuesta\": \"true\", \"comentario\": \"comentario 8\"}], \"aspectos_tecnicos\": {\"decision\": \"3\", \"solucion\": \"5\", \"organizacion\": \"1\", \"conocimientos\": \"1\"}, \"aspectos_generales\": {\"capacidad\": \"3\", \"asistencia\": \"5\", \"iniciativa\": \"7\", \"adaptabilidad\": \"5\", \"comportamiento\": \"5\", \"responzabilidad\": \"3\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"5\", \"comunicacion_escrita\": \"5\"}}','2024-12-23 21:51:05',3.83333,'2024-12-23 21:51:05','2024-12-23 21:51:05'),(17,104,'{\"opinion\": \"Muy buen alumno aunque a veces no cumple.\", \"preguntas\": [{\"id\": 1, \"respuesta\": \"true\", \"comentario\": \"Muy bueno, que se repita.\"}, {\"id\": 2, \"respuesta\": \"true\", \"comentario\": \"\"}, {\"id\": 3, \"respuesta\": \"true\", \"comentario\": \"\"}, {\"id\": 4, \"respuesta\": \"true\", \"comentario\": \"\"}, {\"id\": 5, \"respuesta\": \"false\", \"comentario\": \"\"}, {\"id\": 6, \"respuesta\": \"true\", \"comentario\": \"\"}, {\"id\": 7, \"respuesta\": \"false\", \"comentario\": \"\"}, {\"id\": 8, \"respuesta\": \"false\", \"comentario\": \"\"}], \"aspectos_tecnicos\": {\"decision\": \"3\", \"solucion\": \"5\", \"organizacion\": \"7\", \"conocimientos\": \"5\"}, \"aspectos_generales\": {\"capacidad\": \"7\", \"asistencia\": \"5\", \"iniciativa\": \"7\", \"adaptabilidad\": \"3\", \"comportamiento\": \"7\", \"responzabilidad\": \"5\"}, \"aspectos_comunicacionales\": {\"comunicacion_oral\": \"5\", \"comunicacion_escrita\": \"5\"}}','2025-01-06 03:16:09',5.33333,'2025-01-06 03:16:09','2025-01-06 03:16:09');
/*!40000 ALTER TABLE `informe evaluacion` ENABLE KEYS */;

--
-- Table structure for table `memoria`
--

DROP TABLE IF EXISTS `memoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memoria` (
  `idmemoria` int NOT NULL AUTO_INCREMENT,
  `idSolicitud` int DEFAULT NULL,
  `documento` varchar(100) DEFAULT NULL,
  `fechaEnvio` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idmemoria`),
  KEY `idSolicitud` (`idSolicitud`),
  CONSTRAINT `memoria_ibfk_1` FOREIGN KEY (`idSolicitud`) REFERENCES `solicitud` (`idSolicitud`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memoria`
--

/*!40000 ALTER TABLE `memoria` DISABLE KEYS */;
INSERT INTO `memoria` VALUES (6,100,'/home/angel/pinf/Pinf/backend/uploads/memoria_100.pdf','2024-12-23 21:37:05','2024-12-23 21:37:05','2024-12-23 21:37:05'),(7,100,'/home/angel/pinf/Pinf/backend/uploads/memoria_100.pdf','2024-12-23 21:39:49','2024-12-23 21:39:49','2024-12-23 21:39:49'),(8,104,'/home/angel/pinf/Pinf/backend/uploads/memoria_104.pdf','2025-01-06 03:16:38','2025-01-06 03:16:38','2025-01-06 03:16:38');
/*!40000 ALTER TABLE `memoria` ENABLE KEYS */;

--
-- Table structure for table `solicitud`
--

DROP TABLE IF EXISTS `solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud` (
  `idSolicitud` int NOT NULL AUTO_INCREMENT,
  `rut` varchar(12) DEFAULT NULL,
  `rutEmpresa` varchar(12) DEFAULT NULL,
  `fechaSolicitud` datetime DEFAULT NULL,
  `extension` enum('Necesita','No necesita','Revisado') DEFAULT NULL,
  `numeroPractica` int DEFAULT NULL,
  `descripcionRechazo` varchar(170) DEFAULT NULL,
  `fase` int DEFAULT NULL,
  `calificacion` float DEFAULT NULL,
  `correoSupervisor` varchar(45) DEFAULT NULL,
  `notasCOO` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `supervisorCheck` tinyint(1) DEFAULT '0',
  `alumnoCheck` tinyint(1) DEFAULT '0',
  `informe` tinyint(1) DEFAULT '0',
  `memoria` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idSolicitud`),
  KEY `rut` (`rut`),
  KEY `rutEmpresa` (`rutEmpresa`),
  CONSTRAINT `solicitud_ibfk_916` FOREIGN KEY (`rut`) REFERENCES `usuario` (`rut`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `solicitud_ibfk_917` FOREIGN KEY (`rutEmpresa`) REFERENCES `empresa` (`rutEmpresa`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud`
--

/*!40000 ALTER TABLE `solicitud` DISABLE KEYS */;
INSERT INTO `solicitud` VALUES (1,'16378869-1','76114143-0','2025-08-08 03:01:18',NULL,1,'angel weko',0,NULL,'angel.salgado@alumnos.uv.cl',NULL,'2025-08-08 03:01:18','2024-12-18 04:56:44',0,0,1,0),(2,'16378869-1','96799250-K','2025-08-10 21:12:02',NULL,1,'por weom',0,NULL,'mhhernand@gmail.com',NULL,'2025-08-10 21:12:02','2024-12-13 23:30:22',0,0,NULL,0),(44,'16378869-1','96799250-K','2025-08-10 21:12:02',NULL,1,NULL,0,NULL,'mhhernand@gmail.com',NULL,'2025-08-10 21:12:02','2024-12-26 06:34:53',1,0,NULL,0),(45,'16704598-7','1549023-3','2025-12-13 21:14:00',NULL,1,'a',0,NULL,'mhhernand@gmail.com',NULL,'2025-12-13 21:14:00','2024-12-19 00:57:21',1,0,NULL,0),(46,'16704598-7','1296834-5','2025-12-13 21:14:41',NULL,1,NULL,0,NULL,'mhhernand@gmail.com',NULL,'2025-12-13 21:14:41','2024-12-18 22:11:45',1,0,NULL,0),(47,'16704598-7','60503000-9','2025-12-13 21:20:46',NULL,1,'asdasdasdasd',0,NULL,'mhhernand@gmail.com',NULL,'2025-12-13 21:20:46','2024-12-18 22:39:31',1,0,NULL,0),(48,'16704598-7','60503000-9','2025-12-13 21:24:26',NULL,1,NULL,3,NULL,NULL,NULL,'2025-12-13 21:24:26','2024-12-13 21:24:26',0,0,NULL,0),(50,'16704598-7','7536473-3','2025-12-13 21:35:05',NULL,1,NULL,3,NULL,NULL,NULL,'2025-12-13 21:35:05','2024-12-13 21:35:05',0,0,NULL,0),(93,'13745046-1','60503000-9','2025-12-16 19:48:57',NULL,1,'asdasd',0,NULL,'martin.hernandez@alumnos.uv.cl',NULL,'2025-12-16 19:48:57','2024-12-26 06:37:58',1,0,NULL,0),(94,'13745046-1','89862200-2','2025-12-17 00:22:43',NULL,1,NULL,1,NULL,NULL,NULL,'2025-12-17 00:22:43','2024-12-19 00:58:20',0,0,NULL,0),(96,'13745046-1','92580000-7','2025-12-17 02:03:20',NULL,1,NULL,5,NULL,'martin.hernandez@alumnos.uv.cl','[{\"id\": 1, \"title\": \"asdasd\", \"content\": \"asdasd\"}]','2025-12-17 02:03:20','2024-12-26 07:59:51',1,1,NULL,0),(97,'13745046-1','12258994-3','2025-03-17 04:20:21',NULL,1,NULL,4,NULL,'martin.hernandez@alumnos.uv.cl',NULL,'2025-12-17 04:20:21','2025-01-06 03:13:38',0,0,NULL,0),(99,'13745046-1','91438000-6','2025-12-17 19:19:43',NULL,1,NULL,3,NULL,NULL,NULL,'2025-12-17 19:19:43','2024-12-17 19:20:56',0,0,NULL,0),(100,'13745046-1','11111111-6','2025-12-17 19:41:56',NULL,1,NULL,8,NULL,'martin.hernandez@alumnos.uv.cl','[{\"id\": 1, \"title\": \"Nota1\", \"content\": \"Contenido de la nota 1\"}, {\"id\": 16, \"title\": \"Nota16\", \"content\": \"Contenido de nota 16\"}, {\"id\": 17, \"title\": \"nota 2\", \"content\": \"asdljasldj\"}]','2025-12-17 19:41:56','2025-12-26 07:17:21',1,1,1,1),(101,'13745046-1','23452356','2025-01-05 22:27:33',NULL,1,NULL,1,NULL,NULL,NULL,'2025-01-05 22:27:33','2025-01-05 22:27:33',0,0,0,0),(102,'13745046-1','2014772-5','2025-01-06 01:56:36',NULL,1,NULL,1,NULL,NULL,NULL,'2025-01-06 01:56:36','2025-01-06 01:56:36',0,0,0,0),(104,'19654629-4','96799250-K','2025-01-06 02:45:56',NULL,1,NULL,9,NULL,'angel.salgado@alumnos.uv.cl','[{\"id\": 1, \"title\": \"No me cae bien el supervisor\", \"content\": \"No le responde en tiempos adecuados y su gramatica y formalismos no son correctos\"}]','2025-01-06 02:45:56','2025-01-06 03:17:51',1,1,1,1);
/*!40000 ALTER TABLE `solicitud` ENABLE KEYS */;

--
-- Table structure for table `supervisor`
--

DROP TABLE IF EXISTS `supervisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supervisor` (
  `correoSupervisor` varchar(45) NOT NULL,
  `rutEmpresa` varchar(12) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `cargoAdministrativo` varchar(50) DEFAULT NULL,
  `titulocargo` varchar(50) DEFAULT NULL,
  `verificadoCheck` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`correoSupervisor`),
  KEY `rutEmpresa` (`rutEmpresa`),
  CONSTRAINT `supervisor_ibfk_1` FOREIGN KEY (`rutEmpresa`) REFERENCES `empresa` (`rutEmpresa`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supervisor`
--

/*!40000 ALTER TABLE `supervisor` DISABLE KEYS */;
INSERT INTO `supervisor` VALUES ('angel.salgado@alumnos.uv.cl','96799250-K',NULL,'e24f83ca79',NULL,NULL,NULL,0,'2024-08-10 21:12:34','2024-08-10 21:12:34'),('martin.heranndez@gmail.com','12258994-3',NULL,'32af25d34b',NULL,NULL,NULL,0,'2024-12-17 18:38:32','2024-12-17 18:38:32'),('martin.hernandez@alumnos.uv.cl','76134941-4',NULL,'pass123',NULL,NULL,NULL,0,'2024-12-16 01:13:44','2024-12-16 01:13:44'),('martin.hernandez@gmail.com','11111111-6',NULL,'5b85c03015',NULL,NULL,NULL,0,'2024-12-17 19:42:32','2024-12-17 19:42:32'),('mhhernand@gmail.com','96799250-K',NULL,'pass123',NULL,NULL,NULL,0,'2024-09-17 01:29:18','2024-09-17 01:29:18');
/*!40000 ALTER TABLE `supervisor` ENABLE KEYS */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `rut` varchar(12) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `tipoUsuario` int DEFAULT NULL,
  `nombre1` varchar(50) DEFAULT NULL,
  `nombre2` varchar(50) DEFAULT NULL,
  `apellido1` varchar(50) DEFAULT NULL,
  `apellido2` varchar(50) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `direccion` varchar(170) DEFAULT NULL,
  `planEstudio` int DEFAULT NULL,
  `ingreso` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('13745046-1','pass123',1,'Joaquin','Ignacios','Aracne','Aravena','85555555','benjamin.moralesc@alumnos.uv.cl','Calle Tres 531, Valparaiso',2,2021,'2024-08-06 05:04:21','2025-01-06 01:56:49'),('15393098-8','pass123',1,'George','Alejandro','Michael','Lopez','85555555','george.michael@alumnos.uv.cl','Calle Cinco 2020, Quilpue',2,2022,'2024-08-06 05:21:14','2024-08-06 05:21:14'),('16378869-1','pass123',1,'Roberto','Joaquin','Ingles','Volante','85555555','benjamin.moralesc@alumnos.uv.cl','Avenida Levarte 531, Valparaiso',2,2019,'2024-08-06 05:03:11','2024-12-12 05:37:06'),('16704598-7','pass123',4,'Pailita','Pailita','Morales','Luksic','85522222','benjamin.moralesc@alumnos.uv.cl','Los Aromos 425, Valparaiso',2,2020,'2024-02-08 05:36:09','2024-12-18 19:42:46'),('19654629-4','pass123',1,'Max','Kalel','Parker','Zod','21872020','angel_salgado01@outlook.com','Los Ostiones 1201, Valparaiso',2,2021,'2024-08-06 05:23:34','2025-01-06 02:45:42'),('19894082-8','pass123',3,'laura','fania','fetuccini','nose','8923479823','laura.coronado@uniac.edu','kajsdljkhasdkljfhasdf',NULL,NULL,'2024-12-26 21:02:01','2024-12-26 21:02:01'),('20147725-5','pass123',3,'martin','andres','hernandez','aguilera','2345','kjlsdkljahsf@alumnos.uv.cl','asdasdasdasdasd',2,NULL,'2024-12-18 19:55:07','2024-12-18 19:55:07'),('20416210-7','pass123',2,'Antonio','Jordan','Astudillo','Veintitres','85555555','gabriel.astudillo@uv.cl','Los Aromos 425, Valparaiso',2,2019,'2024-03-29 04:03:33','2025-01-06 01:53:51'),('21541790-2','pass123',1,'Tomas','Cristian','Hanks','Urquista','85555555','tomas.hanks@alumnos.uv.cl','Calle Cuatro 2020, Quilpue',2,2022,'2024-08-06 05:19:32','2024-08-06 05:19:32'),('8543555-8','pass123',1,'Angel','Jere','Salgado','Klein','85555555','angel.salgado@alumnos.uv.cl','Los Aromos 425, Valparaiso',2,2020,'2024-03-29 04:02:18','2024-03-29 04:02:18');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

--
-- Dumping routines for database 'practica'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-15  0:07:00
