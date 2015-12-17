-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 27, 2014 at 07:01 
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `balitax`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_event` varchar(150) NOT NULL,
  `tanggal_mulai` varchar(10) NOT NULL,
  `jam_mulai` time NOT NULL,
  `tanggal_selesai` varchar(10) NOT NULL,
  `jam_selesai` time NOT NULL,
  `status_event` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `nama_event`, `tanggal_mulai`, `jam_mulai`, `tanggal_selesai`, `jam_selesai`, `status_event`) VALUES
(2, 'Meet Up Start Up  Asia', '2014-08-05', '13:00:00', '2014-08-6', '13:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_kegiatan`
--

CREATE TABLE IF NOT EXISTS `jadwal_kegiatan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_kegiatan` varchar(100) NOT NULL,
  `tanggal_mulai` varchar(10) NOT NULL,
  `jam_mulai` time NOT NULL,
  `tanggal_selesai` varchar(10) NOT NULL,
  `jam_selesai` time NOT NULL,
  `status_jadwal` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `jadwal_kegiatan`
--

INSERT INTO `jadwal_kegiatan` (`id`, `nama_kegiatan`, `tanggal_mulai`, `jam_mulai`, `tanggal_selesai`, `jam_selesai`, `status_jadwal`) VALUES
(2, 'Reuni Akbar MA Ma''arif Angkatan 2010', '2014-08-05', '08:00:00', '2014-08-05', '13:00:00', 1),
(3, 'Silaturahmi Ke Guru MA Ma''arif NU Kencong', '2014-08-05', '13:00:00', '2014-08-06', '13:00:00', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_lengkap` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password_hash` varchar(200) NOT NULL,
  `password_salt` varchar(200) NOT NULL,
  `aktif` enum('Y','T') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama_lengkap`, `email`, `username`, `password_hash`, `password_salt`, `aktif`) VALUES
(1, 'Agus Cahyono', 'cahyo.mamen@gmail.com', 'agus', 'li6PhO/PQDDFJPdhYJ8jRuW+9c8E7BKLpjIgiMtBzED1IuVHk5CulLKWJTlByAXeXvjRro578EylYk+3gcyjR/MwQOyBsRSYH+Vffa5sEzIjfh8eo8TsBJagnkvOR3+JWq9jAtXwqBKxyzjlbqa85tV+eryNZT34cbT3Rr9pgJA=', 'HFI7UpURyhEPuF+yV3AdvhfThaWYGzL8F9ggN1uIlprU76p5oLRtOUe7fvXmzUL5KiVRjX/Y/Otq37msksz3efGmuot5VNxKC0oLMtmBxTB5TeVdff7A7dyD8QHFkdcViQqmlikPi85/jcSlgugGUtJC0wYROanEIczQM1p4NLE=', 'Y');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
