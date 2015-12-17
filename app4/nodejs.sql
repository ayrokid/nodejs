-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 13, 2015 at 03:55 PM
-- Server version: 5.5.46-0ubuntu0.14.04.2
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE IF NOT EXISTS `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `user` varchar(10) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `message`, `user`, `created_at`) VALUES
(1, 'a', '', '0000-00-00 00:00:00'),
(2, 'v', '', '0000-00-00 00:00:00'),
(3, 's', '', '2015-11-13 10:04:45'),
(4, 'try chat', '', '2015-11-13 10:05:35'),
(5, 'a', '', '2015-11-13 10:15:04'),
(6, 'hallo', 'yanun', '2015-11-13 10:16:19'),
(7, 'hallos', 'yanun', '2015-11-13 10:20:54'),
(8, 'da', 'denys', '2015-11-13 10:29:00'),
(9, 'dsa', 'denys', '2015-11-13 10:38:33'),
(10, 'dsadsa', 'denys', '2015-11-13 10:38:38'),
(11, 'a', 'denys', '2015-11-13 10:39:09'),
(12, 'dsada', 'denys', '2015-11-13 10:39:11');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
