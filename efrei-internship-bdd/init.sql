CREATE DATABASE db_efrei_internship;

CREATE USER ei_user WITH PASSWORD 'ei_password';
GRANT ALL PRIVILEGES ON DATABASE db_efrei_internship TO ei_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO ei_user;

create table if not exists person (
    id_efrei int primary key,
    password varchar(255) not null,
    role varchar(255) not null
);

create table if not exists student (
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
    constraint fk_student foreign key (id_student) references person(id_efrei),
    constraint fk_academic_tutor foreign key (id_academic_tutor) references person(id_efrei),
    constraint fk_company_tutor foreign key (id_company_tutor) references person(id_efrei)
);

create table if not exists evaluation (
    id serial primary key,
    grade int not null,
    commentary text,
    id_student int not null,
    id_academic_tutor int not null,
    id_company_tutor int not null,
    constraint fk_student foreign key (id_student) references person(id_efrei),
    constraint fk_academic_tutor foreign key (id_academic_tutor) references person(id_efrei),
    constraint fk_company_tutor foreign key (id_company_tutor) references person(id_efrei)
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
    constraint fk_student foreign key (id_student) references person(id_efrei),
    constraint fk_academic_tutor foreign key (id_academic_tutor) references person(id_efrei),
    constraint fk_company_tutor foreign key (id_company_tutor) references person(id_efrei)
);

create table if not exists chat (
    id serial primary key,
    content text not null,
    date date not null,
    id_sender int not null,
    id_receiver int not null,
    constraint fk_sender foreign key (id_sender) references person(id_efrei),
    constraint fk_receiver foreign key (id_receiver) references person(id_efrei)
);