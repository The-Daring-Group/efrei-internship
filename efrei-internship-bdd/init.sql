CREATE USER ei_user WITH PASSWORD 'ei_password';

CREATE DATABASE db_efrei_internship;
GRANT ALL PRIVILEGES ON DATABASE db_efrei_internship TO ei_user;

\c db_efrei_internship ei_user
CREATE SCHEMA IF NOT EXISTS efrei_internship;
SET SCHEMA 'efrei_internship';

ALTER ROLE ei_user IN DATABASE db_efrei_internship SET search_path TO efrei_internship,public;

create table if not exists person (
    id serial primary key,
    email varchar(255) not null,
    password varchar(255) not null
);

create table if not exists student (
    id_efrei int
) inherits (person);

create table if not exists admin (
) inherits (person);

create table if not exists academic_tutor (
) inherits (person);

create table if not exists company_tutor (
) inherits (person);

create table if not exists internship (
    id serial primary key,
    title varchar(255) not null,
    start_date date not null,
    end_date date not null,
    description text not null,
    company_name varchar(255) not null,
    id_student int not null,
    id_academic_tutor int not null,
    id_company_tutor int not null,
    constraint fk_student foreign key (id_student) references person(id),
    constraint fk_academic_tutor foreign key (id_academic_tutor) references person(id),
    constraint fk_company_tutor foreign key (id_company_tutor) references person(id)
);

create table if not exists evaluation (
    id serial primary key,
    grade int not null,
    commentary text,
    id_student int not null,
    id_academic_tutor int not null,
    id_company_tutor int not null,
    constraint fk_student foreign key (id_student) references person(id),
    constraint fk_academic_tutor foreign key (id_academic_tutor) references person(id),
    constraint fk_company_tutor foreign key (id_company_tutor) references person(id)
);

create table if not exists document (
    id serial primary key,
    name varchar(255) not null,
    type varchar(255) not null,
    url varchar(255) not null,
    validated_by_company boolean not null,
    validated_by_school boolean not null,
    id_student int not null,
    id_academic_tutor int not null,
    id_company_tutor int not null,
    constraint fk_student foreign key (id_student) references person(id),
    constraint fk_academic_tutor foreign key (id_academic_tutor) references person(id),
    constraint fk_company_tutor foreign key (id_company_tutor) references person(id)
);

create table if not exists chat (
    id serial primary key,
    content text not null,
    date timestamp not null default current_timestamp,
    id_sender int not null,
    id_receiver int not null,
    constraint fk_sender foreign key (id_sender) references person(id),
    constraint fk_receiver foreign key (id_receiver) references person(id)
);

--------------------------------------------------------------------------------------------------------------

insert into student (email, id_efrei, password) values ('test.user@efrei.net', 12345678, '$2a$10$fR2ehVpEDTXcxNJnp//v5.sv3SY4BWzGFUDNu2r113/4GWT.HHjz2');
insert into academic_tutor (email, password) values ('academic.tutor@efrei.fr', '$2a$10$tEKMqrs59ATngTpj7T3jxORvXA21d38G20.Re5vtmmde3IDvTU6ES');