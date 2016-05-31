SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `visionary` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `visionary` ;

-- -----------------------------------------------------
-- Table `visionary`.`countries`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `visionary`.`countries` ;

CREATE TABLE IF NOT EXISTS `visionary`.`countries` (
  `iso` VARCHAR(3) NOT NULL,
  `nom_fr` VARCHAR(80) NULL DEFAULT NULL,
  `nom_nl` VARCHAR(80) NULL DEFAULT NULL,
  PRIMARY KEY (`iso`),
  UNIQUE INDEX `ISO_UNIQUE` (`iso` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `visionary`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `visionary`.`users` ;

CREATE TABLE IF NOT EXISTS `visionary`.`users` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  `birth_date` YEAR NULL,
  `vetted` TINYINT(1) NULL DEFAULT 0,
  `role` SET('user','admin') NULL DEFAULT 'user',
  `gender` SET('M','F') NULL DEFAULT 'M',
  `countries_iso` VARCHAR(3) NOT NULL DEFAULT 'BE',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_users_countries1_idx` (`countries_iso` ASC),
  CONSTRAINT `fk_users_countries1`
    FOREIGN KEY (`countries_iso`)
    REFERENCES `visionary`.`countries` (`iso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visionary`.`interfaces`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `visionary`.`interfaces` ;

CREATE TABLE IF NOT EXISTS `visionary`.`interfaces` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visionary`.`tests`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `visionary`.`tests` ;

CREATE TABLE IF NOT EXISTS `visionary`.`tests` (
  `id` INT NOT NULL,
  `users_id` INT NOT NULL,
  `interface_id` INT NOT NULL,
  `diag_serie` VARCHAR(255) NULL,
  `diag_result` VARCHAR(255) NULL,
  `diag_ratio` VARCHAR(5) NULL,
  `diag_confusion_angle` VARCHAR(5) NULL,
  `diag_major` VARCHAR(5) NULL,
  `diag_minor` VARCHAR(5) NULL,
  `diag_tes` VARCHAR(5) NULL,
  `diag_s_index` VARCHAR(5) NULL,
  `diag_c_index` VARCHAR(5) NULL,
  `unique_url` VARCHAR(255) NULL,
  `test_creation_date` DATETIME NULL,
  `test_start_date` DATETIME NULL,
  `test_end_date` DATETIME NULL,
  `test_duration` DATETIME NULL,
  `is_sure` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tests_users_idx` (`users_id` ASC),
  INDEX `fk_tests_test_interface1_idx` (`interface_id` ASC),
  CONSTRAINT `fk_tests_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `visionary`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tests_test_interface1`
    FOREIGN KEY (`interface_id`)
    REFERENCES `visionary`.`interfaces` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `visionary`.`countries`
-- -----------------------------------------------------
START TRANSACTION;
USE `visionary`;
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AD', 'Principauté d\'Andorre', 'Andorra');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AE', 'Emirats arabes unis', 'Verenigde Arabische Emiraten');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AF', 'Afghanistan', 'Afghanistan');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AG', 'Antigua et Barbuda', 'Antigua en Barbuda');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AI', 'Anguilla', 'Anguilla');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AL', 'Albanie', 'Albanië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AM', 'Arménie', 'Armenië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AN', 'Antilles néerlandaises', 'Nederlandse Antillen');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AO', 'République d\'Angola', 'Angola');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AQ', 'Antarctique', 'Antarctica');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AR', 'Argentine', 'Argentinië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AS', 'Samoa américain', 'Amerikaans Samoa');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AT', 'Autriche', 'Oostenrijk');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AU', 'Australie', 'Australië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AW', 'Aruba', 'Aruba');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('AZ', 'République d\'Azerbaïdjan', 'Azerbeidzjan');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BA', 'Bosnie-herzégovine', 'Bosnië-Herzegovina');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BB', 'Barbade', 'Barbados');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BD', 'République populaire du Bangladesh', 'Bangladesh');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BE', 'Belgique', 'België');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BF', 'République démocratique populaire du Burkina Faso', 'Burkina Faso');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BG', 'Bulgarie', 'Bulgarije');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BH', 'Royaume de Bahreïn', 'Bahrein');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BI', 'Burundi', 'Burundi');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BJ', 'Bénin', 'Benin');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BL', 'Blue', 'Blauw');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BM', 'Bermudes', 'Bermuda');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BN', 'Brunéi Darussalam', 'Brunei');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BO', 'Bolivie', 'Bolivia');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BR', 'Brésil', 'Brazilië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BS', 'Bahamas', 'Bahama\'s');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BT', 'Bhoutan', 'Bhutan');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BV', 'Ile Bouvet', 'Bouveteiland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BW', 'République du Botswana', 'Botswana');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BY', 'République de Biélorussie', 'Wit-Rusland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('BZ', 'Bélize', 'Belize');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CA', 'Canada', 'Canada');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CC', 'Iles Cocos', 'Cocoseilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CD', 'République démocratique du Congo', 'Republiek Congo');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CF', 'République centrafricaine', 'Centraal-Afrikaanse Republiek');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CG', 'République du Congo', 'Congo');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CH', 'Suisse', 'Zwitserland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CI', 'République de la Côte d\'Ivoire', 'Ivoorkust');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CK', 'Iles Cook', 'Cookeilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CL', 'Chili', 'Chili');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CM', 'Cameroun', 'Kameroen');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CN', 'Chine', 'China');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CO', 'Colombie', 'Colombia');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CR', 'Costa Rica', 'Costa Rica');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CS', 'Serbie et Monténégro', 'Servië en Montenegro');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CU', 'Cuba', 'Cuba');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CV', 'République du Cap Vert', 'Kaapverdië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CX', 'Ile Christmas', 'Christmaseiland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CY', 'République de Chypre', 'Cyprus');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('CZ', 'République tchèque', 'Tsjechische Republiek');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('DE', 'Allemagne', 'Duitsland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('DJ', 'Djibouti', 'Djibouti');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('DK', 'Danemark', 'Denemarken');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('DM', 'Communauté de la Dominique', 'Dominica');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('DO', 'République Dominicaine', 'Dominicaanse Republiek');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('DZ', 'Algérie', 'Algerije');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('EC', 'Equateur', 'Ecuador');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('EE', 'Estonie', 'Estland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('EG', 'République arabe d\'Egypte', 'Egypte');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('EH', 'Sahara occidental', 'Westelijke Sahara');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('ER', 'Erythrée', 'Eritrea');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('ES', 'Espagne', 'Spanje');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('ET', 'Ethiopie', 'Ethiopië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('EU', 'Union Européenne', 'Europese Unie');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('FI', 'Finlande', 'Finland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('FJ', 'République de Fidji', 'Fiji');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('FK', 'Malouines', 'Falklandeilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('FM', 'Etats fédérés de Micronésie', 'Micronesia');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('FO', 'Féroé, Iles', 'Faeröer');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('FR', 'France', 'Frankrijk');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GA', 'République Gabonaise', 'Gabon');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GB', 'Royaume-Uni de Grande-Bretagne et d\'Irl. du Nord', 'Verenigd Koninkrijk');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GD', 'Grenade', 'Grenada');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GE', 'Géorgie', 'Georgië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GF', 'Guyane française', 'Frans-Guyana');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GH', 'Ghana', 'Ghana');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GI', 'Gibraltar', 'Gibraltar');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GL', 'Groenland', 'Groenland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GM', 'Gambie', 'Gambia');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GN', 'Guinée', 'Guinee');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GP', 'Guadeloupe', 'Guadeloupe');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GQ', 'République de Guinée Equatoriale', 'Equatoriaal-Guinea');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GR', 'Grèce', 'Griekenland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GS', 'Géorgie du sud et Iles Sandwich du sud', 'Zuid-Georgië en Zuidelijke Sandwicheilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GT', 'Guatemala', 'Guatemala');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GU', 'Guam', 'Guam');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GW', 'République de Guinée-Bissau', 'Guinee-Bissau');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('GY', 'République coopérative de Guyana', 'Guyana');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('HK', 'Hong Kong', 'Hongkong');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('HM', 'Iles Heard/McDonald', 'Heard- en McDonaldeilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('HN', 'Honduras', 'Honduras');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('HR', 'Croatie', 'Kroatië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('HT', 'Haïti', 'Haïti');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('HU', 'Hongrie', 'Hongarije');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('ID', 'Indonésie', 'Indonesië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('IE', 'Irlande', 'Ierland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('IL', 'Israël', 'Israël');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('IN', 'Inde', 'India');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('IO', 'Territoire britannique dans océan indien', 'Brits gebied in de Indische Oceaan');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('IQ', 'Iraq', 'Irak');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('IR', 'Iran', 'Iran');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('IS', 'Islande', 'IJsland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('IT', 'Italie', 'Italië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('JM', 'Jamaïque', 'Jamaica');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('JO', 'Jordanie', 'Jordanië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('JP', 'Japon', 'Japan');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('KE', 'Kenya', 'Kenia');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('KG', 'Kirghizistan', 'Kirgizië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('KH', 'Cambodge', 'Cambodja');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('KI', 'République de Kiribati', 'Kiribati');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('KM', 'Comores', 'Comoren');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('KN', 'Fédération de Saint-Christophe et Niévès', 'Saint Kitts en Nevis');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('KP', 'République démocratique populaire de Corée', 'Noord-Korea');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('KR', 'République de Corée', 'Zuid-Korea');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('KW', 'Koweït', 'Koeweit');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('KY', 'Iles Caïmans', 'Caymaneilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('KZ', 'Kazakhstan', 'Kazachstan');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('LA', 'République populaire démocratique Lao', 'Laos');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('LB', 'République du Liban', 'Libanon');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('LC', 'Sainte-Lucie', 'Saint Lucia');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('LI', 'Principauté du Liechtenstein', 'Liechtenstein');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('LK', 'République socialiste démocratique du Sri Lanka', 'Sri Lanka');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('LR', 'République du Libéria', 'Liberia');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('LS', 'Lesotho', 'Lesotho');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('LT', 'Lituanie', 'Litouwen');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('LU', 'Luxembourg', 'Luxemburg');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('LV', 'Lettonie', 'Letland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('LY', 'Grande République pop. socialiste Arabe Libyenne', 'Libië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MA', 'Royaume du Maroc', 'Marokko');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MC', 'Principauté de Monaco', 'Monaco');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MD', 'République de Moldavie', 'Moldavië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MG', 'Madagascar', 'Madagaskar');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MH', 'République des Iles Marshall', 'Marshalleilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MK', 'Ancienne république yougoslave de Macédoine', 'Macedonië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('ML', 'Mali', 'Mali');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MM', 'Union de Myanmar', 'Myanmar');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MN', 'Mongolie', 'Mongolië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MO', 'Macao', 'Macau');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MP', 'Iles Mariannes', 'Noordelijke Marianen');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MQ', 'Martinique', 'Martinique');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MR', 'République islamique arabe et afric. de Mauritanie', 'Mauritanië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MS', 'Montserrat', 'Montserrat');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MT', 'République de Malte', 'Malta');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MU', 'Ile Maurice', 'Mauritius');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MV', 'Maldives', 'Malediven');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MW', 'République du Malawi', 'Malawi');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MX', 'Mexique', 'Mexico');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MY', 'Malaisie', 'Maleisië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('MZ', 'République du Mozambique', 'Mozambique');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NA', 'République de Namibie', 'Namibië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NC', 'Nouvelle Calédonie', 'Nieuw-Caledonië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NE', 'Niger', 'Niger');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NF', 'Ile Norfolk', 'Norfolkeiland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NG', 'Nigeria', 'Nigeria');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NI', 'Nicaragua', 'Nicaragua');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NL', 'Pays-Bas', 'Nederland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NO', 'Norvège', 'Noorwegen');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NP', 'Népal', 'Nepal');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NR', 'République de Nauru', 'Nauru');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NT', 'OTAN', 'NAVO');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NU', 'Niue', 'Niue');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('NZ', 'Nouvelle Zélande', 'Nieuw-Zeeland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('OM', 'Sultanat d\'Oman', 'Oman');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('OR', 'Orange', 'Oranje');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PA', 'Panama', 'Panama');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PE', 'République du Pérou', 'Peru');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PF', 'Polynésie française', 'Frans-Polynesië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PG', 'Papouasie-Nouvelle-Guinée', 'Papoea-Nieuw-Guinea');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PH', 'Philippines', 'Filippijnen');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PK', 'Pakistan', 'Pakistan');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PL', 'Pologne', 'Polen');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PM', 'Saint-Pierre-et-Miquelon', 'Saint-Pierre en Miquelon');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PN', 'Iles Pitcairn', 'Pitcairneilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PR', 'Porto Rico', 'Puerto Rico');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PS', 'Palestine', 'Palestina');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PT', 'Portugal', 'Portugal');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PW', 'République de Palau', 'Palau');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('PY', 'Paraguay', 'Paraguay');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('QA', 'Etat du Qatar', 'Qatar');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('RE', 'Réunion', 'Réunion');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('RO', 'Roumanie', 'Roemenië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('RU', 'Fédération de Russie', 'Russische Federatie');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('RW', 'République du Rwanda', 'Rwanda');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SA', 'Royaume d\'Arabie Saoudite', 'Saudi-Arabië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SB', 'Iles Salomon', 'Salomonseilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SC', 'Seychelles', 'Seychellen');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SD', 'République du Soudan', 'Sudan');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SE', 'Suède', 'Zweden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SG', 'Singapour', 'Singapore');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SH', 'Sainte-Hélène', 'Sint-Helena');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SI', 'République de Slovénie', 'Slovenië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SJ', 'Iles Svalbard', 'Svalbard');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SK', 'Slovaquie', 'Slowakije');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SL', 'République du Sierra Leone', 'Sierra Leone');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SM', 'République de Saint-Marin', 'San Marino');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SN', 'Sénégal', 'Senegal');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SO', 'Somalie', 'Somalië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SR', 'République du Suriname', 'Suriname');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('ST', 'République démocratique de São Tomé-et-Principe', 'Sao Tomé en Principe');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SV', 'El Salvador', 'El Salvador');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SY', 'République arabe syrienne', 'Syrië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('SZ', 'Royaume de Swaziland', 'Swaziland');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TC', 'Iles Turks & Caïques', 'Turks- en Caicoseilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TD', 'République du Tchad', 'Tsjaad');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TG', 'République Togolaise', 'Togo');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TH', 'Thaïlande', 'Thailand');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TJ', 'République du Tadjikistan', 'Tadzjikistan');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TK', 'Iles Tokelau', 'Tokelau-eilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TL', 'Timor oriental', 'Oost-Timor');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TM', 'Turkménistan', 'Turkmenistan');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TN', 'République de Tunisie', 'Tunesië');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TO', 'Royaume de Tonga', 'Tonga');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TP', 'Timor oriental', 'Oost-Timor');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TR', 'Turquie', 'Turkije');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TT', 'République de Trinité et Tobago', 'Trinidad en Tobago');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TV', 'Tuvalu', 'Tuvalu');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TW', 'Taïwan', 'Taiwan');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('TZ', 'République Unie de Tanzanie', 'Tanzania');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('UA', 'Ukraine', 'Oekraïne');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('UG', 'République d\'Ouganda', 'Uganda');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('UM', 'Iles Minor Outlying américaines', 'Amerikaanse ondergeschikte afgelegen eilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('UN', 'Nations Unies', 'Verenigde Naties');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('US', 'Etats-Unis', 'VS');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('UY', 'République orientale de l\'Uruguay', 'Uruguay');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('UZ', 'République d\'Ouzbékistan', 'Oezbekistan');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('VA', 'Vatican', 'Vaticaanstad');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('VC', 'St Vincent et les Grenadines', 'Saint Vincent en de Grenadines');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('VE', 'Venezuela', 'Venezuela');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('VG', 'Iles vierges britanniques', 'Britse Maagdeneilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('VI', 'Iles vierges américaines', 'Amerikaanse Maagdeneilanden');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('VN', 'République socialiste du Viêt Nam', 'Vietnam');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('VU', 'République de Vanuatu', 'Vanuatu');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('WF', 'Wallis & Futuna', 'Wallis & Futuna');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('WS', 'Etat indépendant des Samoa', 'West-Samoa');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('YE', 'Yémen', 'Jemen');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('YT', 'Mayotte', 'Mayotte');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('ZA', 'Afrique du Sud', 'Zuid-Afrika');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('ZM', 'Zambie', 'Zambia');
INSERT INTO `visionary`.`countries` (`iso`, `nom_fr`, `nom_nl`) VALUES ('ZW', 'République du Zimbabwe', 'Zimbabwe');

COMMIT;


-- -----------------------------------------------------
-- Data for table `visionary`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `visionary`;
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (1, 'Gilles Bazelaire', 'bichon@dogstudio.be', NULL, 1975, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (2, 'simon gauriaud', ' sim.gauriaud@gmail.com', NULL, 1993, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (3, 'Marc Van Hoey', 'marc.vanhoey@skynet.be', NULL, 1956, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (4, 'Abdel Bellahsini', 'a.bellahsini@gmail.com', NULL, 1980, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (5, 'Rafael Garcia', 'sylvinche@msn.com', NULL, 1975, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (6, 'Robin Devouge', 'robin.devouge@gmail.com', NULL, 1995, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (7, 'Sébastien Delforge', 'sebastien.delforge@heaj-eco.eu', NULL, 1969, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (8, 'Jeremy Caudron', 'Thebesttruk@gmail.com', NULL, 1994, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (9, 'Julien Alardot', 'alardot.j@gmail.com', NULL, 1996, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (10, 'Denis Maes', 'le_maes@icloud.com', NULL, 1988, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (11, 'Mehdi Khaddari', 'mehdi.khaddari@hotmail.com', NULL, 1993, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (12, 'Luc Henrard', 'luc.henrard@unamur.be', NULL, 1970, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (13, 'Simon Gauriaud', 'sim.gauriaud@gmail.com', NULL, 1993, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (14, 'Maxime-Emilien Hubert', 'hubert.maxime.emilien@gmail.com', NULL, 1991, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (15, 'Gwenaël Bierlier', 'Bierlier.gwenael@gmail.com', NULL, 1992, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (16, 'Sébastien Genot', 'sebastiengenot1@hotmail.be', NULL, 1992, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (17, 'Philippe Moulin', 'mouliphi@gmail.com', NULL, 1967, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (18, 'Christophe Goffart', 'christophe.goffart@gmail.com', NULL, 1988, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (19, 'André Herneupont ', 'andre0961@hotmail.com', NULL, 1961, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (20, 'Ludovic Trussart', 'ludovic.trussart@hotmail.com', NULL, 1996, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (21, 'marc antoine  Jacquet ', 'teamdriving@hotmail.com', NULL, 1984, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (22, 'Jean-Pierre Rihoux', 'dr.jp.rihoux@skynet.be', NULL, 1936, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (23, 'Dominique Fadeur', 'dominique.fadeur@unamur.be', NULL, 1965, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (24, 'Stephane Nemeth', 'stephane.nemeth@hotmail.com', NULL, 1960, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (25, 'Xavier Gillo', 'xgillo@me.com', NULL, 1965, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (26, 'Jonas Delange', 'jonas.delange@gmail.com', NULL, 1988, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (27, 'Nicolas Garcia Tunon', 'Garciatunonnicolas@gmail.com', NULL, 1988, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (28, 'Geoffrey-Christopher  Villette', 'villette.geoffrey@gmail.com', NULL, 1988, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (29, 'Benoît  Deconninck', 'bdeconninck@belgacom.be', NULL, 1967, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (30, 'gerard demierbe', 'gegebebe501@hotmail.com', NULL, 1951, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (31, 'Jean-Pierre Noël', 'jeanpierre.noel@skynet.be', NULL, 1970, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (32, 'Long Chen', 'longchen333@gmail.com', NULL, 1991, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (33, 'Jean-Marc Davril', 'jean-marc.davril@unamur.be', NULL, 1990, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (34, 'damien galloy', 'damien.galloy75@gmail.com', NULL, 1984, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (35, 'Olivier Rousseau', 'olivier.rousseau@ing.be', NULL, NULL, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (36, 'Bernard Piron', 'bernardpiron@live.be', NULL, 1972, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (37, 'Robin De Duytsche', 'robdeduy@mailoo.org', NULL, 1995, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (38, 'Alain ANDRE', 'alaingf@gmail.com', NULL, 1955, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (39, 'Alain Hubert', 'ahubert@ville.namur.be', NULL, 1954, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (40, 'Olivier Bouchat', 'bouch@freegates.be', NULL, 1973, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (41, 'Frédéric Delsaux', 'fredericdelsaux@gmail.com', NULL, 1976, 1, 'user', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (42, 'Alexandre Plennevaux', 'aplennevaux@gmail.com', NULL, 1973, 0, 'admin', 'M', 'BE');
INSERT INTO `visionary`.`users` (`id`, `name`, `email`, `password`, `birth_date`, `vetted`, `role`, `gender`, `countries_iso`) VALUES (43, 'Teddy Kishi', 'teddy.tdk@gmail.com', NULL, NULL, 0, 'admin', 'M', 'BE');

COMMIT;


-- -----------------------------------------------------
-- Data for table `visionary`.`interfaces`
-- -----------------------------------------------------
START TRANSACTION;
USE `visionary`;
INSERT INTO `visionary`.`interfaces` (`id`, `name`) VALUES (1, 'v4-test-de-classement');

COMMIT;

