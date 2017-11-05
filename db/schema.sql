-- Create the database burgers_db and specify it for use
CREATE DATABASE burgers_db;
USE burgers_db;

-- Create the table burgers
CREATE TABLE burgers
(
id int NOT NULL AUTO_INCREMENT,
burger_name varchar(255) NOT NULL,
devoured boolean default 0,
date timestamp,
PRIMARY KEY (id)
);