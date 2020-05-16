create database burgers_db;
use database burgers_db;

create table burgers(
    id int auto_increment not null,
    burger_name varchar(50),
    devoured boolean,
    primary key (id)
)
