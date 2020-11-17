-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17-Nov-2020 às 03:31
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
  `url` varchar(500) DEFAULT NULL,
  `texto_de_post` varchar(100) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `posts`
--

INSERT INTO `posts` (`id`, `usuario_id`, `url`, `texto_de_post`, `fecha_creacion`) VALUES
(1, 1, 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/10/30/16040831704369.jpg', 'post 1 messi', '2020-09-08'),
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
(25, 5, 'https://www.google.com/url?sa=i&url=https%3A%', 'post 5 pep', '2020-09-08'),
(31, 18, 'https://as02.epimg.net/futbol/imagenes/2020/11/10/internacional/1605045221_805142_1605045353_noticia_normal_recorte1.jpg', 'cavani', '2020-11-12'),
(32, 19, 'https://i.pinimg.com/originals/44/80/7e/44807e8f19befbcda9307399525bf137.jpg', 'drako bebe', '2020-11-12'),
(43, 15, '3434343', '3434343', '2020-11-16'),
(44, 24, 'https://www.mundodeportivo.com/r/GODO/MD/p7/Barca/Imagenes/2020/11/14/Recortada/img_ppunti_20201107-190120_imagenes_md_propias_ppunti_201107fcb031-kxDD-U49450034435rRC-980x554@MundoDeportivo-Web.jpg', '#pepe ', '2020-11-17');

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
  `password` varchar(255) DEFAULT NULL,
  `preguntaSeguridad` varchar(100) DEFAULT NULL,
  `respuestaSeguridad` varchar(45) DEFAULT NULL,
  `fotoPerfil` varchar(1000) DEFAULT NULL,
  `created_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `fechaNacimiento`, `numero`, `email`, `password`, `preguntaSeguridad`, `respuestaSeguridad`, `fotoPerfil`, `created_at`) VALUES
(1, 'leomessi', '2020-09-08', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'neymarjr', '2020-09-09', 2, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'kunaguero', '2020-09-10', 3, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'luisitosuarez', '2020-09-11', 4, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'pepguardiola', '2020-09-12', 5, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'iestivill', '2222-10-22', NULL, 'nachoenbarra@hotmail.com', '$2a$10$rK7LEQyQpxzPHx1wyGYyEu8i8N2pToZRd1.1Xn', '2', 'ananana', NULL, NULL),
(7, 'iestivill2', '2222-02-22', NULL, 'iestivill@earj.com.br', '$2a$10$.75nBb2zlPfue6ADMoboCehoP6lHK0DWCc9QhV', '4', 'asado', NULL, NULL),
(8, 'iestivill3', '2000-10-22', NULL, 'iestivill1@udesa.edu.ar', '$2a$10$YeSAViN4nwHK.QMYufJqrOugatq30XZTYlYQu1', '1', 'USA', NULL, NULL),
(9, 'iestivill4', '2222-02-22', NULL, 'n@mail.edu.ar', '$2a$10$V7NPf1knoT1/rt/5ZCFowegRV1jjVl4kSS8B3y', '4', 'asado', NULL, NULL),
(10, 'iestivill5', '2222-02-02', NULL, 'nachoenbarra2@hotmail.com', '$2a$10$rCbdYf4uSdB8dz81oWG8I.lvBQbn8xLuQWNI6IAUzjEJsZYqCMhIO', '5', '222', NULL, NULL),
(11, 'iestivill6', '2222-02-22', NULL, '123@gmail.com', '$2a$10$o3trl5oNu/2K669h0Ivuy.DBBhUcxgBbhLTrXu2IGtNwfnaGlXyMa', '2', 'ananana', NULL, NULL),
(12, '123', '1111-01-01', NULL, 'nachoenbarra3@hotmail.com', '$2a$10$SSg5Is2x41G/um6jodhbieuDN3BKzmJOgK2WolRPIsa05TWyyVyFK', '4', 'ananana', NULL, NULL),
(13, '123', '0001-11-01', NULL, 'nachoenbarra4@hotmail.com', '$2a$10$xk2LbYs5ezOREy.HC9qXduA/KGxIFmq1ia2uFYHgYed5DiyHIFhjO', '1', 'USA', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBUQEhIVDxUQDw8PEA8PFRAPEBAPFREWFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGBAQFy0dHx0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAABAgADBQYEB//EAEAQAAIBAgMFBgMEBwgDAQAAAAECAAMRBBIhBRMxQVEGImFxgZEyobEUI0LBUmJygrLR8CQzY3OSwuHxB1OiQ//EABoBAQEAAwEBAAAAAAAAAAAAAAABAgQFBgP/xAAzEQACAgEDAgQFAwMEAwAAAAAAAQIRAwQSIQUxEyJBUSMyYXGBFDORodHwJEKxwRbh8f/aAAwDAQACEQMRAD8Aw7zhnwHEAaACAOsgDAJeAEQVMMtCyCCDQUkEJaUHnxeNp0heo4W/AHifITOOKUiqLZ4H7QUx+FuOh0s3lafb9Mz7LFwe7A49Kq5k8QQeIPSfOeLb3MJY6PTPkfN2S0gIRKBSIAAIAbQCQCGACAGALaSgQygUmUC5oBCYAt4BM0CghZAWKIBDICZYBLSAYCUAKwAgQAkSgFpAEGQDShnPdodqWO7UsuUEuwIW/QdbTe0+K+WfSMTkcTXDEWuSD4egPz95txSSPoNSr2AsCFUk6/CRmv8ASGkZKz3YbbDUwWDDUn19Zi4J9yN2dH2e2tvdDxPqL8Zp5sVdiOHBuAzVNchMAggEMAEAEEDBQWgEgCmALeQEtLYARFgQiUAtABAsAqyAfeSWCCpDYLBUiwEPIA55QDeQCCpACXgDBhKCZpADPKvYI8/ZfscMZin37EJkLNlJGpChAp9H/wBPOdCE7VI28Ks6o/8AjvBUUNgz2BN3Y', NULL),
(14, 'iestivill7', '2020-11-11', NULL, 'nachoen@hotmail.com', '$2a$10$4gczBv.U2RNO5PC1pIYTkO8lhKSkxetXiPFTcsfqj1kB8bQdgJYUK', '2', 'eeee', 'https://images.clarin.com/2020/10/22/boca-juniors-visita-a-newell___sVyYYXLFS_340x340__1.jpg', NULL),
(15, 'iestivill8888', '0012-02-12', NULL, 'nachoenbarra@hotmail.com', '$2a$10$LhmrRwuVqXdZkVFbqZpbtuhO32ATKEQlAQjDGQ78AMLiaWVitaFZe', '2', '121212', 'https://as02.epimg.net/futbol/imagenes/2020/11/10/internacional/1605045221_805142_1605045353_noticia_normal_recorte1.jpg', NULL),
(16, 'mateo22', '0021-02-11', NULL, 'nachoenbarra6@hotmail.com', '$2a$10$RrrDJpTtKm3oCIH/BxvIieGzmF0L.Fe/woqJ0kAbVPMNVPcl3mrOG', '1', 'Martinez', 'https://as02.epimg.net/futbol/imagenes/2020/11/10/internacional/1605045221_805142_1605045353_noticia_normal_recorte1.jpg', NULL),
(17, 'pepito69', '0233-02-11', NULL, 'nachoenbarra7@hotmail.com', '$2a$10$arFsUPUEQKsQox4r0pMfuuAHYUbM1AFiQ0E7N3GOHPe1TQrB18WHa', '1', 'Arabia', 'https://as02.epimg.net/futbol/imagenes/2020/11/10/internacional/1605045221_805142_1605045353_noticia_normal_recorte1.jpg', '2020-11-12'),
(18, 'sergio', '1111-11-22', NULL, 'nachoenbarra8@hotmail.com', '$2a$10$kRR9RZTr9jx334hlKg/Xvebw1rRBStknnLelyRoFIRGHVoAWn.bFG', '4', 'asado', 'https://as02.epimg.net/futbol/imagenes/2020/11/10/internacional/1605045221_805142_1605045353_noticia_normal_recorte1.jpg', '2020-11-12'),
(19, 'anana', '1970-02-14', NULL, 'anana@hotmail.com', '$2a$10$RpJLC1hflfDlBW.ZxtR5PuV2vMPZcD8e4Cr2qfMXEDea56ATuNZpa', '3', 'francisco', 'https://i.pinimg.com/originals/44/80/7e/44807e8f19befbcda9307399525bf137.jpg', '2020-11-12'),
(20, 'kili', '2000-10-22', NULL, 'nachoenbarra9@hotmail.com', '$2a$10$Ut/esal2VFNR6EIO7pqVHOEo70EvTySkO35QaE6l4.MEctGLSs6iu', '1', 'USA', 'https://as02.epimg.net/futbol/imagenes/2020/11/10/internacional/1605045221_805142_1605045353_noticia_normal_recorte1.jpg', '2020-11-15'),
(21, 'iestivill9', '2010-03-31', NULL, 'mateogoleador@hotmail.com', '$2a$10$DXgo/GhCyTq9jD6.Qqp1wOdQwv8syKQaW/NFZFmhiS6TwfquC1yhK', '2', 'jero', 'https://as02.epimg.net/futbol/imagenes/2020/11/10/internacional/1605045221_805142_1605045353_noticia_normal_recorte1.jpg', '2020-11-15'),
(22, 'iestivill89', '2222-02-22', NULL, 'nachoenbarra10@hotmail.com', '$2a$10$J7DnQcJvoyv4JXbvYl0LrO3qAi/SW/0Bbe81oHf52nI/XseV3I9ZO', '1', 'USA', 'https://as02.epimg.net/futbol/imagenes/2020/11/10/internacional/1605045221_805142_1605045353_noticia_normal_recorte1.jpg', '2020-11-15'),
(23, 'LRCDTM', '2020-11-16', NULL, 'gatodem@gmail.com', '$2a$10$c3lfRYT6K60Rh74UlMHaQ.dkKCj78y9SRAEpzbpmrYA5Y/jMvd1tK', '4', 'japi', 'https://i.pinimg.com/originals/44/80/7e/44807e8f19befbcda9307399525bf137.jpg', '2020-11-16'),
(24, 'pepe', '1111-11-11', NULL, 'pepe@gmail.com', '$2a$10$0ObJuPFVNkZVEsPy3ZZyhOzfVbfof35BcrbvZABt6TOli08JqO7RO', '1', 'pepe', 'https://i.pinimg.com/originals/44/80/7e/44807e8f19befbcda9307399525bf137.jpg', '2020-11-17');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
