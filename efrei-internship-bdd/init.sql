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

-- Trigger function to enforce foreign key constraint for id_internship
-- CREATE OR REPLACE FUNCTION enforce_fk_internship() RETURNS TRIGGER AS $$
-- BEGIN
--     IF NOT EXISTS (
--         SELECT 1 FROM internship
--         WHERE id = NEW.id_internship
--     ) THEN
--         RAISE EXCEPTION 'Foreign key constraint violation on id_internship';
--     END IF;
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

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
    type_document varchar(255) not null,
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
    validated_by_school boolean not null,
    -- id_internship int not null,
    id_student int not null,
    id_academic_tutor int not null,
    id_company_tutor int not null
);

-- Trigger for id_internship
-- CREATE TRIGGER trigger_fk_internship_on_document
-- BEFORE INSERT OR UPDATE ON document
-- FOR EACH ROW EXECUTE FUNCTION enforce_fk_internship();

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

create table if not exists digital_document (
    url varchar(255) not null,
    validated_by_company boolean not null,
    confidential boolean not null
) inherits (document);

create table if not exists auto_evaluation (
    input1 varchar(255) not null,
    input2 varchar(255) not null,
    input3 varchar(255) not null,
    input4 varchar(255) not null,
    input5 varchar(255) not null,
    input6 varchar(255),
    radio1 int not null,
    radio1_example varchar(255) not null,
    radio2 int not null,
    radio2_example varchar(255) not null,
    radio3 int not null,
    radio3_example varchar(255) not null,
    radio4 int not null,
    radio4_example varchar(255) not null,
    radio5 int not null,
    radio5_example varchar(255) not null,
    radio6 int not null,
    radio6_example varchar(255) not null,
    contact_tutor boolean not null,
    contact_way varchar(255)
) inherits (document);

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

insert into student (firstname, lastname, email, id_efrei, password) values ('Romain','Marques','test.user@efrei.net', 12345678, '$2a$10$fR2ehVpEDTXcxNJnp//v5.sv3SY4BWzGFUDNu2r113/4GWT.HHjz2');
insert into academic_tutor (firstname, lastname, email, password) values ('academic','tutor','academic.tutor@efrei.fr', '$2a$10$tEKMqrs59ATngTpj7T3jxORvXA21d38G20.Re5vtmmde3IDvTU6ES');
insert into company_tutor (firstname, lastname, email, password) values ('company','tutor','company.tutor@efrei.fr', '$2a$10$tEKMqrs59ATngTpj7T3jxORvXA21d38G20.Re5vtmmde3IDvTU6ES');
insert into company_tutor (firstname, lastname, email, password) values ('company', 'employee', 'company.tutor@company.com', '$2a$10$tEKMqrs59ATngTpj7T3jxORvXA21d38G20.Re5vtmmde3IDvTU6ES');
insert into internship (title, start_date, end_date, description, company_name, id_student, id_academic_tutor, id_company_tutor) values (
    'DevOps Engineer', '2024-03-11', '2024-09-26', 
    'As a DevOps Engineer at Microsoft, my tasks will be to migrate the previous CI/CD system into a new one with powerful innovative technologies',
    'Microsoft Corporation',1, 2, 3);
insert into evaluation (type_document, grade, commentary, id_student, id_academic_tutor, id_company_tutor) values ('Internship Report', 15, 'Very good report', 1, 2, 3);
insert into digital_document (name, type, validated_by_school, id_student, id_academic_tutor, id_company_tutor, url, validated_by_company, confidential) values ('Internship Report', 'pdf', true, 1, 2, 3, 'https://firebasestorage.googleapis.com/v0/b/efrei-internship.appspot.com/o/Bug_1_Specifications.pdf?alt=media&token=71bdb746-b462-4037-b1a9-757b807ba104', true, false);
insert into auto_evaluation (name, type, validated_by_school, id_student, id_academic_tutor, id_company_tutor, input1, input2, input3, input4, input5, input6, radio1, radio1_example, radio2, radio2_example, radio3, radio3_example, radio4, radio4_example, radio5, radio5_example, radio6, radio6_example, contact_tutor, contact_way) values ('Internship Report', 'pdf', true, 1, 2, 3, 'I have learned a lot', 'I have improved my skills', 'I have been autonomous', 'I have been proactive', 'I have been curious', 'I have been a team player', 4, 'Example1', 4, 'Example2', 4, 'Example3', 4, 'Example4', 4, 'Example5', 4, 'Example6', true, 'email');