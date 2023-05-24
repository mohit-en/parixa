-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2023 at 12:24 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parixa-api`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_name`, `created_at`, `updated_at`) VALUES
(7, 'BCA', '2023-03-23 17:54:15', '2023-05-24 04:45:05'),
(11, 'B Tech', '2023-05-20 23:17:01', '2023-05-20 23:17:01'),
(15, 'M Tech', '2023-05-22 01:20:37', '2023-05-22 01:20:37');

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `exam_id` int(11) NOT NULL,
  `exam_date` datetime NOT NULL,
  `questions_limit` int(11) NOT NULL,
  `end_time` time NOT NULL,
  `start_time` time NOT NULL,
  `course_id` int(11) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `exam`
--

INSERT INTO `exam` (`exam_id`, `exam_date`, `questions_limit`, `end_time`, `start_time`, `course_id`, `faculty_id`, `subject_id`) VALUES
(1, '2023-06-01 09:00:00', 20, '12:00:00', '10:00:00', 11, 13, 12),
(2, '2023-06-02 09:00:00', 30, '13:00:00', '11:00:00', 15, 18, 8),
(3, '2023-06-03 09:00:00', 40, '14:00:00', '12:00:00', 15, 19, 8),
(4, '2023-06-04 09:00:00', 50, '15:00:00', '13:00:00', 7, 17, 9);

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `faculty_id` int(11) NOT NULL,
  `faculty_name` varchar(100) NOT NULL,
  `faculty_mobile` varchar(12) NOT NULL,
  `faculty_address` varchar(200) NOT NULL,
  `faculty_img` varchar(200) DEFAULT NULL,
  `course_id` int(11) NOT NULL,
  `login_user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`faculty_id`, `faculty_name`, `faculty_mobile`, `faculty_address`, `faculty_img`, `course_id`, `login_user_id`, `created_at`, `updated_at`) VALUES
(12, 'Mohit Mistry A', '1134757821', '70 Oxford Drive', 'http://dummyimage.com/356x477.png/cc0000/ffffff', 7, 20, '2023-03-25 17:13:09', '2023-05-21 12:14:38'),
(13, 'Keyur dneshbhai Rathod', '0987651233', 'Navsari india', NULL, 11, 52, '2023-05-21 11:45:33', '2023-05-22 07:20:02'),
(14, 'Karishma A Mistry', '1134757821', '70 Oxford Drive', NULL, 7, 53, '2023-05-21 11:59:17', '2023-05-22 04:46:38'),
(17, 'Mohit', '5431739287', '9372 Esch Point', 'http://dummyimage.com/441x306.png/5fa2dd/ffffff', 7, 59, '2023-05-22 07:24:24', '2023-05-22 07:24:24'),
(18, 'mistry kalpesh', '9988776655', 'kevalya dham', NULL, 15, 60, '2023-05-22 07:25:51', '2023-05-22 07:25:51'),
(19, 'ramesh', '7766885599', 'ksjd ksdf', NULL, 15, 62, '2023-05-22 07:26:34', '2023-05-22 07:26:53');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `option_id` int(11) NOT NULL,
  `option_text` text NOT NULL,
  `question_id` int(11) NOT NULL,
  `is_answer` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`option_id`, `option_text`, `question_id`, `is_answer`) VALUES
(21, 'Qd', 10, 0),
(22, 'Qw', 10, 0),
(23, 'qr', 10, 0),
(24, 'qc', 10, 1),
(25, 'WWE', 11, 0),
(26, 'WWF', 11, 0),
(27, 'Quality Management', 11, 1),
(28, 'World Wide Web', 11, 0),
(29, 'I am Rear', 12, 0),
(30, 'Ia m r', 12, 0),
(31, 'I am rich', 12, 1),
(32, 'Dont know', 12, 0),
(37, '3', 14, 0),
(38, '4', 14, 1),
(39, '5', 14, 0),
(40, '6', 14, 0);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `question_text` text NOT NULL,
  `subject_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `question_text`, `subject_id`, `course_id`) VALUES
(10, 'What Is Full Form Of QMO', 1, 7),
(11, 'Full form of SSL explain brif', 11, 11),
(12, 'who is AMR in brif with example no', 11, 11),
(14, 'How many legs of cow', 9, 7);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `student_mobile` varchar(12) NOT NULL,
  `student_address` varchar(200) NOT NULL,
  `student_img` varchar(200) DEFAULT NULL,
  `course_id` int(11) NOT NULL,
  `login_user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `student_name`, `student_mobile`, `student_address`, `student_img`, `course_id`, `login_user_id`, `created_at`, `updated_at`) VALUES
(4, 'Haresh Prajapati', '7036089593', 'Navsari, Gujarat India', 'https://dummyimage.com/241x100.png/ff4444/ffffff', 11, 27, '2023-05-21 00:17:31', '2023-05-21 06:05:01'),
(23, 'Keyur Dinesh Shah', '0099887767', 'Ahemdabad a', NULL, 11, 54, '2023-05-22 04:22:04', '2023-05-22 04:22:51'),
(24, 'karishma', '1112223334', 'navsari', NULL, 7, 58, '2023-05-22 07:19:15', '2023-05-22 07:19:38');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(50) NOT NULL,
  `course_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`subject_id`, `subject_name`, `course_id`, `created_at`, `updated_at`) VALUES
(1, 'data structure 2', 7, '2023-03-26 13:12:34', '2023-05-22 01:26:51'),
(8, 'Data Structure', 15, '2023-05-22 01:25:22', '2023-05-22 01:25:22'),
(9, 'Python m', 7, '2023-05-22 01:25:29', '2023-05-22 03:34:19'),
(11, 'Maths', 11, '2023-05-22 02:53:03', '2023-05-22 02:53:03'),
(12, 'DDA Adv', 11, '2023-05-22 03:45:23', '2023-05-22 03:45:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `flag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_email`, `user_password`, `user_role`, `flag`, `created_at`, `updated_at`) VALUES
(14, 'admin@admin.com', 'e10adc3949ba59abbe56e057f20f883e', 'admin', '1', '2023-03-24 01:29:09', '2023-03-24 01:29:09'),
(20, 'mohit@gmail.com', 'd0d0b45198a7d34273ee7356ef6d5171', 'faculty', '1', '2023-03-25 17:13:09', '2023-03-25 17:13:09'),
(26, 'abc@gmailtch.com', '029ac7c52b1adcae89dce6c094c80737', 'student', '1', '2023-05-21 00:07:40', '2023-05-21 00:07:40'),
(27, 'haresh@gmailtch.com', '029ac7c52b1adcae89dce6c094c80737', 'student', '1', '2023-05-21 00:17:31', '2023-05-21 00:17:31'),
(52, 'abc@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'faculty', '1', '2023-05-21 11:45:33', '2023-05-21 11:45:33'),
(53, 'karishma@g.c', 'e10adc3949ba59abbe56e057f20f883e', 'faculty', '1', '2023-05-21 11:59:17', '2023-05-21 11:59:17'),
(54, 'dodalija@finews.biz', 'd0970714757783e6cf17b26fb8e2298f', 'student', '1', '2023-05-22 04:22:04', '2023-05-22 04:22:04'),
(55, 'abc@g.c', '9ea5e6f10d48803ae38499c0d5e6d93f', 'faculty', '1', '2023-05-22 04:41:33', '2023-05-22 04:41:33'),
(57, 'mohit@gmai.com', 'd0d0b45198a7d34273ee7356ef6d5171', 'faculty', '1', '2023-05-22 04:43:22', '2023-05-22 04:43:22'),
(58, 'aaa@a.com', 'e10adc3949ba59abbe56e057f20f883e', 'student', '1', '2023-05-22 07:19:15', '2023-05-22 07:19:15'),
(59, 'mohit@gma.com', 'd0d0b45198a7d34273ee7356ef6d5171', 'faculty', '1', '2023-05-22 07:24:24', '2023-05-22 07:24:24'),
(60, 'elonmusk@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'faculty', '1', '2023-05-22 07:25:51', '2023-05-22 07:25:51'),
(62, 'dodalija@finews.biza', 'a7466bb6ec8ae9a2e75c3ed39f424573', 'faculty', '1', '2023-05-22 07:26:34', '2023-05-22 07:26:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`exam_id`),
  ADD KEY `faculty_reference` (`faculty_id`),
  ADD KEY `course_reference` (`course_id`),
  ADD KEY `subject_reference` (`subject_id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`faculty_id`),
  ADD KEY `cours ref` (`course_id`),
  ADD KEY `users ref` (`login_user_id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`),
  ADD KEY `options_ibfk_1` (`question_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `course_ref` (`course_id`),
  ADD KEY `subject_ref` (`subject_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `course ref` (`course_id`) USING BTREE,
  ADD KEY `login user ref` (`login_user_id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `course ref` (`course_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_email_unique` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `exam_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `faculty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exam`
--
ALTER TABLE `exam`
  ADD CONSTRAINT `course_reference` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `faculty_reference` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `subject_reference` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE CASCADE;

--
-- Constraints for table `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `faculty_ibfk_2` FOREIGN KEY (`login_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `course_ref` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `subject_ref` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`login_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
