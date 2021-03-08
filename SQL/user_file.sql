-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 08 2021 г., 10:15
-- Версия сервера: 5.7.29
-- Версия PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `user_file`
--

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_date` date NOT NULL,
  `registration_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip_adress` int(10) UNSIGNED NOT NULL,
  `status` enum('lead','demo','client') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'demo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `birth_date`, `registration_date`, `ip_adress`, `status`) VALUES
(1, 'Alex', 'Int', 'int@gmail.com', '1980-02-05', '2021-02-01 14:11:49', 1121212, 'demo'),
(2, 'Create', 'Last', 'reter@gmail.com', '2014-12-31', '2021-03-02 18:40:53', 2130706433, 'client');

-- --------------------------------------------------------

--
-- Структура таблицы `user_files`
--

CREATE TABLE `user_files` (
  `id` int(11) NOT NULL,
  `file_name` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `original_name` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int(11) UNSIGNED NOT NULL,
  `destination` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `date_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user_files`
--

INSERT INTO `user_files` (`id`, `file_name`, `original_name`, `mime`, `size`, `destination`, `user_id`, `date_create`) VALUES
(80, '1615016936542.jpeg', 'usb.jpg', 'image/jpeg', 33617, 'server/uploads/files', 2, '2021-03-06 07:48:56'),
(81, '1615027270760.jpeg', 'usb.jpg', 'image/jpeg', 33617, 'server/uploads/files', 1, '2021-03-06 10:41:10'),
(82, '1615047086025.jpeg', 'photo5240417992058188427.jpg', 'image/jpeg', 88876, 'server/uploads/files', 2, '2021-03-06 16:11:26');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`),
  ADD KEY `name` (`first_name`),
  ADD KEY `birthDate` (`birth_date`),
  ADD KEY `status` (`status`);

--
-- Индексы таблицы `user_files`
--
ALTER TABLE `user_files`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `user_files`
--
ALTER TABLE `user_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
