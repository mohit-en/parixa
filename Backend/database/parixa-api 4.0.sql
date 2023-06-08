-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2023 at 08:04 AM
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
(17, 'BCA', '2023-05-26 14:52:19', '2023-05-26 14:52:19'),
(18, 'MCA', '2023-05-26 14:52:33', '2023-05-26 14:52:33'),
(21, 'B Tech', '2023-05-30 05:07:22', '2023-05-30 05:07:22'),
(22, 'M tech', '2023-06-01 06:16:36', '2023-06-01 06:16:36'),
(23, 'BBA', '2023-06-06 06:44:00', '2023-06-06 06:44:00');

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `exam_id` int(11) NOT NULL,
  `exam_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `questions_limit` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `exam`
--

INSERT INTO `exam` (`exam_id`, `exam_date`, `start_time`, `end_time`, `questions_limit`, `course_id`, `subject_id`, `faculty_id`, `created_at`, `updated_at`) VALUES
(10, '2023-06-10', '10:10:00', '15:30:00', 20, 17, 14, 20, '2023-05-28 04:40:00', '2023-05-28 05:55:05'),
(11, '2023-05-27', '11:30:00', '12:00:00', 5, 17, 15, 20, '2023-05-28 05:55:56', '2023-05-28 15:17:03'),
(12, '2023-05-26', '22:00:00', '22:30:00', 5, 17, 14, 20, '2023-05-28 15:46:24', '2023-05-28 15:49:37'),
(13, '2023-05-30', '11:30:00', '12:30:00', 5, 17, 15, 20, '2023-05-30 05:57:12', '2023-05-30 05:57:12'),
(14, '2023-05-31', '05:05:00', '06:06:00', 10, 17, 15, 20, '2023-06-01 06:22:45', '2023-06-01 06:22:45'),
(15, '2023-06-01', '11:50:00', '12:50:00', 7, 17, 14, 20, '2023-06-01 06:29:33', '2023-06-01 06:29:33'),
(16, '2023-06-06', '17:05:00', '18:06:00', 8, 17, 15, 20, '2023-06-06 06:51:02', '2023-06-06 06:51:02');

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
(20, 'Mohit Mistry', '5664590320', '34, Alaknanda Apartments, Hadapsar Pondicherry - 580131', NULL, 17, 68, '2023-05-26 15:27:46', '2023-05-26 15:27:46'),
(21, 'Haresh Prajapati', '2643862551', '64, Chameli Society, Vikhroli Gangtok - 423695', NULL, 18, 69, '2023-05-26 15:28:53', '2023-05-26 15:28:53');

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
(49, 'Skewness', 17, 0),
(50, 'Symmetry', 17, 0),
(51, 'Central tendency', 17, 1),
(52, 'Dispersion', 17, 0),
(53, 'The raw score', 18, 0),
(54, 'The mean', 18, 1),
(55, 'The range', 18, 0),
(56, 'Standard deviation', 18, 0),
(57, 'Arithmetic mean', 19, 1),
(58, 'Geometric mean', 19, 0),
(59, 'Median', 19, 0),
(60, 'Harmonic mean', 19, 0),
(61, 'Class mark', 20, 0),
(62, 'Lower limit', 20, 1),
(63, 'Upper limit', 20, 0),
(64, 'Lower class boundary', 20, 0),
(65, 'Zero', 21, 0),
(66, 'Maximum', 21, 0),
(67, 'Minimum', 21, 1),
(68, 'All of the above', 21, 0),
(69, '20', 22, 0),
(70, '25', 22, 1),
(71, '-25', 22, 0),
(72, '35', 22, 0),
(73, '4x', 23, 0),
(74, '4', 23, 0),
(75, '4 ± 2', 23, 1),
(76, '4 ± 5', 23, 0),
(77, '0', 24, 1),
(78, '1', 24, 0),
(79, '100', 24, 0),
(80, '200', 24, 0),
(81, '10', 25, 0),
(82, '20', 25, 0),
(83, '200', 25, 1),
(84, '300', 25, 0),
(85, '2', 26, 0),
(86, '10', 26, 0),
(87, '12', 26, 0),
(88, '20', 26, 1),
(89, '3', 27, 0),
(90, '5', 27, 0),
(91, '7', 27, 1),
(92, '10', 27, 0),
(93, 'Mean', 28, 0),
(94, 'Median', 28, 1),
(95, 'Mode', 28, 0),
(96, 'Geometric mean', 28, 0),
(97, '40', 29, 0),
(98, '50', 29, 1),
(99, '60', 29, 0),
(100, '70', 29, 0),
(101, 'Q1 = 50', 30, 1),
(102, 'Q1 < 50', 30, 0),
(103, 'Q1 > 50', 30, 0),
(104, 'Q1 ≠ 50', 30, 0),
(105, 'Formulating a proble', 31, 0),
(106, 'Constructing a model', 31, 0),
(107, 'Establishing controls', 31, 0),
(108, 'Controlling the environment', 31, 1),
(109, 'Economical', 32, 0),
(110, 'Scientific', 32, 0),
(111, 'Economical & Scientific', 32, 1),
(112, 'Artistic', 32, 0),
(113, 'TRUE', 33, 0),
(114, 'FALSE', 33, 0),
(115, 'may be true or false', 33, 0),
(116, 'cant say anything', 33, 0),
(117, 'Conducting experiments on it', 34, 1),
(118, 'Diversified Technique', 34, 0),
(119, 'Only constraints', 34, 0),
(120, 'only non- negative', 34, 0),
(121, 'A constraint for available resource', 35, 0),
(122, 'An objective for research and development of a company', 35, 0),
(123, 'A linear function in an optimization problem', 35, 1),
(124, 'A set of non- negativity conditions', 35, 0),
(125, 'Qualing theory', 36, 0),
(126, 'Waiting Line', 36, 0),
(127, 'Linear Programming', 36, 1),
(128, 'Non Linear Programming', 36, 0),
(129, 'Steve Jobs', 37, 0),
(130, 'James Gosling', 37, 0),
(131, 'Dennis Ritchie', 37, 1),
(132, 'Rasmus Lerdorf', 37, 0),
(133, 'int number;', 38, 0),
(134, 'float rate;', 38, 0),
(135, 'int variable_count;', 38, 0),
(136, 'int $main;', 38, 1),
(137, 'LowerCase letters', 39, 1),
(138, 'UpperCase letters', 39, 0),
(139, 'CamelCase letters', 39, 0),
(140, 'All', 39, 0),
(141, 'int my_num = 100,000;', 40, 0),
(142, 'int my_num = 100000;', 40, 1),
(143, 'int my num = 1000;', 40, 0),
(144, 'int $my_num = 10000;', 40, 0),
(145, 'volatile', 41, 1),
(146, 'true', 41, 0),
(147, 'friend', 41, 0),
(148, 'export', 41, 0),
(149, 'immutable', 42, 0),
(150, 'mutable', 42, 0),
(151, 'const', 42, 1),
(152, 'volatile', 42, 0),
(153, 'Widening conversions', 43, 0),
(154, 'Narrowing conversions', 43, 0),
(155, 'Widening & Narrowing conversions', 43, 1),
(156, 'None of all mentioned', 43, 0),
(157, 'for', 44, 0),
(158, 'Not For', 44, 0),
(159, 'while', 44, 0),
(160, 'for and while', 44, 1),
(161, 'true', 45, 1),
(162, 'false', 45, 0),
(163, 'depends on the compiler', 45, 0),
(164, 'depends on the standard', 45, 0),
(165, 'Internal', 46, 0),
(166, 'External', 46, 1),
(167, 'Both Internal and External', 46, 0),
(168, 'not valid terms for functions', 46, 0),
(169, '#ifdef', 47, 0),
(170, '#define', 47, 0),
(171, '#endif', 47, 0),
(172, 'all of the mentioned', 47, 1),
(173, '#', 48, 1),
(174, '$', 48, 0),
(175, '\"\"', 48, 0),
(176, '&', 48, 0),
(177, '7', 49, 0),
(178, '125', 49, 0),
(179, '255', 49, 0),
(180, 'No limits', 49, 1),
(181, 'Jagged Array', 50, 1),
(182, 'Rectangular Array', 50, 0),
(183, 'Cuboidal Array', 50, 0),
(184, 'Multidimensional Array', 50, 0),
(185, 'char *', 51, 0),
(186, 'struct', 51, 0),
(187, 'void', 51, 0),
(188, 'none of all mentioned', 51, 1),
(189, '<stdio.h >', 52, 0),
(190, '<stdlib.h>', 52, 0),
(191, '<math.h>', 52, 0),
(192, '<stdarg.h>', 52, 1),
(193, 'Standard input', 53, 0),
(194, 'Standard output', 53, 0),
(195, 'Standard error', 53, 0),
(196, 'All of all mentioned', 53, 1),
(197, 'int', 54, 0),
(198, 'char *', 54, 0),
(199, 'struct', 54, 1),
(200, 'None of all mentioned', 54, 0),
(201, '1 bit', 55, 0),
(202, '2 bits', 55, 0),
(203, '1 Byte', 55, 1),
(204, '2 Bytes', 55, 0),
(205, 'stdlib. h', 56, 0),
(206, 'ctype. h', 56, 0),
(207, 'stdio. h', 56, 1),
(208, 'stdarg. h', 56, 0);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `question_text` varchar(1000) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `question_text`, `subject_id`, `course_id`) VALUES
(17, 'Any measure indicating the center of a set of data, arranged in an increasing or decreasing order of magnitude, is called a measure of', 14, 17),
(18, 'The measure of central tendency listed below is:', 14, 17),
(19, 'The total of all the observations divided by the number of observations is called:', 14, 17),
(20, 'While computing the arithmetic mean of a frequency distribution, the each value of a class is considered equal to:', 14, 17),
(21, 'The sum of the squares fo the deviations about mean is:', 14, 17),
(22, 'For a certain distribution, if ∑(X -20) = 25, ∑(X- 25) =0, and ∑(X-35) = -25, then is equal to:', 14, 17),
(23, 'If X1, X2, X3, ... Xn, be n observations having arithmetic mean and if Y =4X ± 2, then is equal to:', 14, 17),
(24, 'If =100 and Y=2X – 200, then mean of Y values will be:', 14, 17),
(25, 'If the arithmetic mean of 20 values is 10, then sum of these 20 values is:', 14, 17),
(26, 'Ten families have an average of 2 boys. How many boys do they have together?', 14, 17),
(27, 'If the arithmetic mean of the two numbers X1 and X2 is 5 if X1=3, then X2 is:', 14, 17),
(28, 'We must arrange the data before calculating:', 14, 17),
(29, 'The lower and upper quartiles of a symmetrical distribution are 40 and 60 respectively. The value of median is:', 14, 17),
(30, 'If in a discrete series 75% values are greater than 50, then:', 14, 17),
(31, 'Which of the following is not the phase of OR methodology?', 14, 17),
(32, 'Operations research is the application of methods to arrive at the optimal solutions to the problems.', 14, 17),
(33, 'By constructing models, the problems in libraries increase and cannot be solved.', 14, 17),
(34, 'A solution can be extracted from a model either by', 14, 17),
(35, 'What is the objective function in linear programming problems?', 14, 17),
(36, 'Which technique is used in finding a solution for optimizing a given objective, such as profit maximization or cost reduction under certain constraints?', 14, 17),
(37, 'Who is the father of C language?', 15, 17),
(38, 'Which of the following is not a valid C variable name?', 15, 17),
(39, 'All keywords in C are in ____________', 15, 17),
(40, 'Which is valid C expression?', 15, 17),
(41, 'Which of the following cannot be a variable name in C?', 15, 17),
(42, 'Which keyword is used to prevent any changes in the variable within a C program?', 15, 17),
(43, 'Which of the following typecasting is accepted by C language?', 15, 17),
(44, 'What is an example of iteration in C?', 15, 17),
(45, 'Functions can return enumeration constants in C?', 15, 17),
(46, 'Functions in C Language are always _________', 15, 17),
(47, 'Which of the following are C preprocessors?', 15, 17),
(48, 'The C-preprocessors are specified with _________ symbol.', 15, 17),
(49, 'How many number of pointer (*) does C have against a pointer variable declaration?', 15, 17),
(50, 'Which of the following is not possible statically in C language?', 15, 17),
(51, 'Which of the following return-type cannot be used for a function in C?', 15, 17),
(52, 'The standard header _______ is used for variable list arguments (…) in C.', 15, 17),
(53, 'When a C program is started, O.S environment is responsible for opening file and providing pointer for that file?', 15, 17),
(54, 'In C language, FILE is of which data type?', 15, 17),
(55, 'What is the sizeof(char) in a 32-bit C compiler?', 15, 17),
(56, 'scanf() is a predefined function in______header file.', 15, 17);

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
(25, 'Kartik Ranganathan', '6396285113', '75, AkankshaGarh, Jodhpur - 583871', NULL, 17, 64, '2023-05-26 15:19:58', '2023-05-26 15:19:58'),
(26, 'Neerendra Mammen', '4739019075', '24, Pushpa Society, Yeshwanthpura Ahmedabad - 170514', NULL, 17, 65, '2023-05-26 15:21:48', '2023-05-26 15:21:48'),
(27, 'Sheetal Guha', '1985515342', '57, WafiqGunj, Darjeeling - 563267', NULL, 18, 66, '2023-05-26 15:24:09', '2023-05-26 15:24:09'),
(28, 'Mohanlal Pillai', '5453979804', '98, Mukti Society, SapnaGunj Ahmedabad - 189791', NULL, 18, 67, '2023-05-26 15:26:04', '2023-05-26 15:26:04'),
(29, 'Rohit', '1234567890', 'Marutinagar c', NULL, 22, 70, '2023-06-01 06:18:53', '2023-06-01 06:18:53');

-- --------------------------------------------------------

--
-- Table structure for table `student_marks`
--

CREATE TABLE `student_marks` (
  `id` int(11) NOT NULL,
  `marks_obtained` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_marks`
--

INSERT INTO `student_marks` (`id`, `marks_obtained`, `exam_id`, `student_id`) VALUES
(5, 3, 11, 25),
(7, 2, 12, 25),
(8, 3, 13, 25),
(9, 1, 13, 26),
(10, 2, 15, 25),
(11, 3, 16, 25);

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
(14, 'Mathematics', 17, '2023-05-26 15:10:39', '2023-05-26 15:10:39'),
(15, 'C Lang', 17, '2023-05-26 15:11:06', '2023-05-26 15:11:06'),
(16, 'python', 18, '2023-05-26 15:11:26', '2023-05-26 15:11:26'),
(17, 'RDBMS', 18, '2023-05-26 15:11:37', '2023-05-26 15:11:37'),
(20, 'SE 2', 22, '2023-06-01 06:17:42', '2023-06-01 06:17:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` int(11) NOT NULL,
  `user_role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `flag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_email`, `user_password`, `course_id`, `user_role`, `flag`, `created_at`, `updated_at`) VALUES
(63, 'admin@admin.com', 'e10adc3949ba59abbe56e057f20f883e', 0, 'admin', '1', '2023-05-26 14:50:30', '2023-05-26 14:52:00'),
(64, 'veena.behl@hotmail.com', 'e10adc3949ba59abbe56e057f20f883e', 17, 'student', '1', '2023-05-26 15:19:58', '2023-06-07 02:35:41'),
(65, 'udara@yahoo.co.in', 'e10adc3949ba59abbe56e057f20f883e', 17, 'student', '1', '2023-05-26 15:21:48', '2023-06-07 02:36:02'),
(66, 'chameli.iyer@yahoo.co.in', 'e10adc3949ba59abbe56e057f20f883e', 18, 'student', '1', '2023-05-26 15:24:09', '2023-06-07 02:36:20'),
(67, 'lakshmi.rajan@sood.in', 'e10adc3949ba59abbe56e057f20f883e', 18, 'student', '1', '2023-05-26 15:26:04', '2023-06-07 02:36:26'),
(68, 'mohit@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 17, 'faculty', '1', '2023-05-26 15:27:46', '2023-06-07 02:37:12'),
(69, 'haresh@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 18, 'faculty', '1', '2023-05-26 15:28:53', '2023-06-07 02:37:16'),
(70, 'abc@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 22, 'student', '1', '2023-06-01 06:18:53', '2023-06-07 02:36:46');

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
-- Indexes for table `student_marks`
--
ALTER TABLE `student_marks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exam_id` (`exam_id`),
  ADD KEY `student_id` (`student_id`);

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
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `exam_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `faculty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `student_marks`
--
ALTER TABLE `student_marks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

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
-- Constraints for table `student_marks`
--
ALTER TABLE `student_marks`
  ADD CONSTRAINT `student_marks_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`exam_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_marks_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE;

--
-- Constraints for table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
