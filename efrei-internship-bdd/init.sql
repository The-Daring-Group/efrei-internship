CREATE USER ei_user WITH PASSWORD 'ei_password';

CREATE DATABASE db_efrei_internship;
GRANT ALL PRIVILEGES ON DATABASE db_efrei_internship TO ei_user;

\c db_efrei_internship ei_user
CREATE SCHEMA IF NOT EXISTS efrei_internship;
SET SCHEMA 'efrei_internship';

ALTER ROLE ei_user IN DATABASE db_efrei_internship SET search_path TO efrei_internship,public;

create table if not exists person (
    id serial primary key,
    firstname varchar(255) not null,
    lastname varchar(255) not null,
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

-- Function to get the base person ID for a given student or academic_tutor ID
CREATE OR REPLACE FUNCTION get_base_person_id(child_id INT) RETURNS INT AS $$
DECLARE
    base_person_id INT;
BEGIN
    SELECT id INTO base_person_id
    FROM person
    WHERE id = child_id OR id = (SELECT id FROM student WHERE id = child_id)
                                OR id = (SELECT id FROM academic_tutor WHERE id = child_id)
                                or id = (SELECT id FROM company_tutor WHERE id = child_id)
                                or id = (SELECT id FROM admin WHERE id = child_id);
    RETURN base_person_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to enforce foreign key constraint for id_student
CREATE OR REPLACE FUNCTION enforce_fk_student() RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM person
        WHERE id = NEW.id_student OR id = get_base_person_id(NEW.id_student)
    ) THEN
        RAISE EXCEPTION 'Foreign key constraint violation on id_student';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to enforce foreign key constraint for id_student
CREATE OR REPLACE FUNCTION enforce_fk_academic_tutor() RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM person
        WHERE id = NEW.id_academic_tutor OR id = get_base_person_id(NEW.id_academic_tutor)
    ) THEN
        RAISE EXCEPTION 'Foreign key constraint violation on id_academic_tutor';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to enforce foreign key constraint for id_student
CREATE OR REPLACE FUNCTION enforce_fk_company_tutor() RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM person
        WHERE id = NEW.id_company_tutor OR id = get_base_person_id(NEW.id_company_tutor)
    ) THEN
        RAISE EXCEPTION 'Foreign key constraint violation on id_company_tutor';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

create table if not exists internship (
    id serial primary key,
    title varchar(255) not null,
    start_date date not null,
    end_date date not null,
    description text not null,
    company_name varchar(255) not null,
    id_student int not null,
    id_academic_tutor int not null,
    id_company_tutor int not null
);

-- Trigger for id_student
CREATE TRIGGER trigger_fk_student_on_internship
BEFORE INSERT OR UPDATE ON internship
FOR EACH ROW EXECUTE FUNCTION enforce_fk_student();

-- Trigger for id_academic_tutor
CREATE TRIGGER trigger_fk_academic_tutor_on_internship
BEFORE INSERT OR UPDATE ON internship
FOR EACH ROW EXECUTE FUNCTION enforce_fk_academic_tutor();

-- Trigger for id_company_tutor
CREATE TRIGGER trigger_fk_company_tutor_on_internship
BEFORE INSERT OR UPDATE ON internship
FOR EACH ROW EXECUTE FUNCTION enforce_fk_company_tutor();

create table if not exists evaluation (
    id serial primary key,
    grade int not null,
    commentary text,
    id_student int not null,
    id_academic_tutor int not null,
    id_company_tutor int not null
);

-- Trigger for id_student
CREATE TRIGGER trigger_fk_student_on_evaluation
BEFORE INSERT OR UPDATE ON evaluation
FOR EACH ROW EXECUTE FUNCTION enforce_fk_student();

-- Trigger for id_academic_tutor
CREATE TRIGGER trigger_fk_academic_tutor_on_evaluation
BEFORE INSERT OR UPDATE ON evaluation
FOR EACH ROW EXECUTE FUNCTION enforce_fk_academic_tutor();

-- Trigger for id_company_tutor
CREATE TRIGGER trigger_fk_company_tutor_on_evaluation
BEFORE INSERT OR UPDATE ON evaluation
FOR EACH ROW EXECUTE FUNCTION enforce_fk_company_tutor();

create table if not exists document (
    id serial primary key,
    name varchar(255) not null,
    type varchar(255) not null,
    url varchar(255) not null,
    validated_by_company boolean not null,
    validated_by_school boolean not null,
    id_student int not null,
    id_academic_tutor int not null,
    id_company_tutor int not null
);

-- Trigger for id_student
CREATE TRIGGER trigger_fk_student_on_document
BEFORE INSERT OR UPDATE ON document
FOR EACH ROW EXECUTE FUNCTION enforce_fk_student();

-- Trigger for id_academic_tutor
CREATE TRIGGER trigger_fk_academic_tutor_on_document
BEFORE INSERT OR UPDATE ON document
FOR EACH ROW EXECUTE FUNCTION enforce_fk_academic_tutor();

-- Trigger for id_company_tutor
CREATE TRIGGER trigger_fk_company_tutor_on_document
BEFORE INSERT OR UPDATE ON document
FOR EACH ROW EXECUTE FUNCTION enforce_fk_company_tutor();

create table if not exists chat (
    id serial primary key,
    content text not null,
    date timestamp not null default current_timestamp,
    id_sender int not null,
    id_receiver int not null,
    is_read boolean not null default false
);

-- Trigger function to enforce foreign key constraint for id_sender
CREATE OR REPLACE FUNCTION enforce_fk_sender() RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM person
        WHERE id = NEW.id_sender OR id = get_base_person_id(NEW.id_sender)
    ) THEN
        RAISE EXCEPTION 'Foreign key constraint violation on id_sender';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to enforce foreign key constraint for id_receiver
CREATE OR REPLACE FUNCTION enforce_fk_receiver() RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM person
        WHERE id = NEW.id_receiver OR id = get_base_person_id(NEW.id_receiver)
    ) THEN
        RAISE EXCEPTION 'Foreign key constraint violation on id_receiver';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for id_sender
CREATE TRIGGER trigger_fk_sender_on_chat
BEFORE INSERT OR UPDATE ON chat
FOR EACH ROW EXECUTE FUNCTION enforce_fk_sender();

-- Trigger for id_receiver
CREATE TRIGGER trigger_fk_receiver_on_chat
BEFORE INSERT OR UPDATE ON chat
FOR EACH ROW EXECUTE FUNCTION enforce_fk_receiver();

--------------------------------------------------------------------------------------------------------------

insert into student (firstname, lastname, email, id_efrei, password) values ('test','user','test.user@efrei.net', 12345678, '$2a$10$fR2ehVpEDTXcxNJnp//v5.sv3SY4BWzGFUDNu2r113/4GWT.HHjz2');
insert into academic_tutor (firstname, lastname, email, password) values ('academic','tutor','academic.tutor@efrei.fr', '$2a$10$tEKMqrs59ATngTpj7T3jxORvXA21d38G20.Re5vtmmde3IDvTU6ES');