-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01-Nov-2020 às 21:10
-- Versão do servidor: 10.4.14-MariaDB
-- versão do PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `proyecto_integrador_schema`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `texto_comentario` varchar(200) DEFAULT NULL,
  `fecha_creacion_comentario` date DEFAULT NULL,
  `usuario_comentario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `comentarios`
--

INSERT INTO `comentarios` (`id`, `post_id`, `texto_comentario`, `fecha_creacion_comentario`, `usuario_comentario`) VALUES
(1, 1, 'Que Grande ', '2020-09-08', 1),
(2, 2, 'Crack!!!', '2020-09-08', 2),
(3, 3, 'Uff que bestiass', '2020-09-08', 3),
(4, 4, 'Sale partidito?', '2020-09-08', 4),
(5, 5, 'Vengan al City!', '2020-09-08', 5),
(6, 6, 'Que Grande', '2020-09-08', 1),
(7, 7, 'Crack!!!', '2020-09-08', 2),
(8, 8, 'Uff que bestiass', '2020-09-08', 3),
(9, 9, 'Sale partidito?', '2020-09-08', 4),
(10, 10, 'Vengan al City!', '2020-09-08', 5),
(11, 11, 'Que Grande', '2020-09-08', 1),
(12, 12, 'Crack!!!', '2020-09-08', 2),
(13, 13, 'Uff que bestiass', '2020-09-08', 3),
(14, 14, 'Sale partidito?', '2020-09-08', 4),
(15, 15, 'Vengan al City!', '2020-09-08', 5),
(16, 16, 'Que Grande', '2020-09-08', 1),
(17, 17, 'Crack!!!', '2020-09-08', 2),
(18, 18, 'Uff que bestiass', '2020-09-08', 3),
(19, 19, 'Sale partidito?', '2020-09-08', 4),
(20, 20, 'Vengan al City!', '2020-09-08', 5),
(21, 21, 'Que Grande', '2020-09-08', 1),
(22, 22, 'Crack!!!', '2020-09-08', 2),
(23, 23, 'Uff que bestiass', '2020-09-08', 3),
(24, 24, 'Sale partidito?', '2020-09-08', 4),
(25, 25, 'Vengan al City!', '2020-09-08', 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `url` varchar(45) DEFAULT NULL,
  `texto_de_post` varchar(100) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `posts`
--

INSERT INTO `posts` (`id`, `usuario_id`, `url`, `texto_de_post`, `fecha_creacion`) VALUES
(1, 1, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 1 messi', '2020-09-08'),
(2, 1, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 2 messi', '2020-09-08'),
(3, 1, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 3 messi', '2020-09-08'),
(4, 1, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 4 messi', '2020-09-08'),
(5, 1, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 5 messi', '2020-09-08'),
(6, 2, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 1 ney', '2020-09-08'),
(7, 2, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 2 ney', '2020-09-08'),
(8, 2, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 3 ney', '2020-09-08'),
(9, 2, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 4 ney', '2020-09-08'),
(10, 2, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 5 ney', '2020-09-08'),
(11, 3, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 1 kun', '2020-09-08'),
(12, 3, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 2 kun', '2020-09-08'),
(13, 3, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 3 kun', '2020-09-08'),
(14, 3, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 4 kun', '2020-09-08'),
(15, 3, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 5 kun', '2020-09-08'),
(16, 4, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 1 suarez', '2020-09-08'),
(17, 4, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 2 suarez', '2020-09-08'),
(18, 4, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 3 suarez', '2020-09-08'),
(19, 4, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 4 suarez', '2020-09-08'),
(20, 4, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 5 suarez', '2020-09-08'),
(21, 5, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 1 pep', '2020-09-08'),
(22, 5, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 2 pep', '2020-09-08'),
(23, 5, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 3 pep', '2020-09-08'),
(24, 5, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 4 pep', '2020-09-08'),
(25, 5, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 5 pep', '2020-09-08');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(200) DEFAULT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `preguntaSeguridad` varchar(100) DEFAULT NULL,
  `respuestaSeguridad` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `fechaNacimiento`, `numero`, `email`, `password`, `preguntaSeguridad`, `respuestaSeguridad`) VALUES
(1, 'leomessi', '2020-09-08', 1, NULL, NULL, NULL, NULL),
(2, 'neymarjr', '2020-09-09', 2, NULL, NULL, NULL, NULL),
(3, 'kunaguero', '2020-09-10', 3, NULL, NULL, NULL, NULL),
(4, 'luisitosuarez', '2020-09-11', 4, NULL, NULL, NULL, NULL),
(5, 'pepguardiola', '2020-09-12', 5, NULL, NULL, NULL, NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comentario_posteo` (`post_id`),
  ADD KEY `usuario_comentario` (`usuario_comentario`);

--
-- Índices para tabela `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_foreign` (`usuario_id`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentario_posteo` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `usuario_comentario` FOREIGN KEY (`usuario_comentario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `usuario_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
