-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 30-Jun-2018 às 04:10
-- Versão do servidor: 5.7.17
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hypertrash 2.0`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cooperativa`
--

CREATE TABLE `cooperativa` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cnpj` int(15) NOT NULL,
  `cidade` varchar(20) NOT NULL,
  `estado` varchar(15) NOT NULL,
  `bairro` varchar(25) NOT NULL,
  `rua` varchar(50) NOT NULL,
  `numero` int(6) NOT NULL,
  `senha` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `servicos`
--

CREATE TABLE `servicos` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `endereco` varchar(50) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `data` varchar(15) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `servicos`
--

INSERT INTO `servicos` (`id`, `nome`, `endereco`, `telefone`, `data`) VALUES
(1, 'Gabriel Jorge', 'rua canaaranao', '11987858684', 'seg'),
(6, 'Luciana', 'dasda', '11985868585', 'segunda');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `estado` varchar(15) NOT NULL,
  `cidade` varchar(20) NOT NULL,
  `bairro` varchar(20) NOT NULL,
  `rua` varchar(50) NOT NULL,
  `numero` varchar(6) NOT NULL,
  `senha` varchar(25) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `telefone`, `estado`, `cidade`, `bairro`, `rua`, `numero`, `senha`) VALUES
(3, 'Gabriel', 'gabriel-jorge1999@hotmail.com', '11985858585', 'SÃ£o Paulo', 'SÃ£o Paulo', 'Jardim Helena', 'Rua canarana do Amazonas', '514', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cooperativa`
--
ALTER TABLE `cooperativa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicos`
--
ALTER TABLE `servicos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cooperativa`
--
ALTER TABLE `cooperativa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `servicos`
--
ALTER TABLE `servicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
