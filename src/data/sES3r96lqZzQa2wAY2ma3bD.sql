CREATE TABLE `alumnos` (
  `expediente` int PRIMARY KEY,
  `password` varchar(255),
  `nombre` varchar(255)
);

CREATE TABLE `solicitudes` (
  `id` int PRIMARY KEY,
  `expediente` int,
  `id_universidad` int
);

CREATE TABLE `universidades` (
  `id` int PRIMARY KEY,
  `nombre` varchar(255),
  `id_pais` int,
  `modo` int
);

CREATE TABLE `paises` (
  `id` int PRIMARY KEY,
  `nombre` varchar(255),
  `costo` decimal(11,2)
);

CREATE TABLE `universidades_materias` (
  `id_universidad` int,
  `id_materia` int
);

CREATE TABLE `materias` (
  `id` int PRIMARY KEY,
  `nombre` varchar(255)
);

CREATE TABLE `solicitudes_materias` (
  `id_solicitud` int,
  `id_materia` int
);

CREATE TABLE `materias_planes` (
  `id_materia` int,
  `id_plan` int
);

CREATE TABLE `planes` (
  `id` int PRIMARY KEY,
  `nombre` varchar(255)
);

CREATE TABLE `admins` (
  `expediente` int PRIMARY KEY,
  `password` varchar(255),
  `nombre` varchar(255)
);

ALTER TABLE `solicitudes` ADD FOREIGN KEY (`expediente`) REFERENCES `alumnos` (`expediente`);

ALTER TABLE `universidades` ADD FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id`);

ALTER TABLE `solicitudes` ADD FOREIGN KEY (`id_universidad`) REFERENCES `universidades` (`id`);

ALTER TABLE `universidades_materias` ADD FOREIGN KEY (`id_universidad`) REFERENCES `universidades` (`id`);

ALTER TABLE `universidades_materias` ADD FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id`);

ALTER TABLE `solicitudes_materias` ADD FOREIGN KEY (`id_solicitud`) REFERENCES `solicitudes` (`id`);

ALTER TABLE `solicitudes_materias` ADD FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id`);

ALTER TABLE `materias_planes` ADD FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id`);

ALTER TABLE `materias_planes` ADD FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id`);
