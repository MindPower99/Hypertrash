-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 26-Jun-2018 às 01:05
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
  `endereco` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `cooperativa`
--

INSERT INTO `cooperativa` (`id`, `nome`, `email`, `telefone`, `endereco`, `senha`) VALUES
(1, 'fgsdf', 'g@gmail.com', '11987858684', 'dfsdf', '12');

-- --------------------------------------------------------

--
-- Estrutura da tabela `serviços`
--

CREATE TABLE `serviços` (
  `id` int(11) NOT NULL,
  `nomeusuario` varchar(50) NOT NULL,
  `enderecousuario` varchar(60) NOT NULL,
  `telefoneusuario` varchar(20) NOT NULL,
  `dataservico` date NOT NULL,
  `nomecooperativa` varchar(50) NOT NULL,
  `telefonecooperativa` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `senha` varchar(25) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `telefone`, `senha`) VALUES
(1, 'sdfdf', 'g@gmail.com', '119878586', '12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cooperativa`
--
ALTER TABLE `cooperativa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `serviços`
--
ALTER TABLE `serviços`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `serviços`
--
ALTER TABLE `serviços`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
