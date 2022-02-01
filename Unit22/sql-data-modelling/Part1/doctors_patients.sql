DROP DATABASE IF EXISTS doctors_patients;
CREATE DATABASE doctors_patients;

\c doctors_patients

CREATE TABLE doctor_list (
    doc_id SERIAL PRIMARY KEY,
    doc_name TEXT NOT NULL,
    department TEXT NOT NULL
);

CREATE TABLE visit (
    visit_id SERIAL PRIMARY KEY,
    doc_id INTEGER REFERENCES doctor_list,
    patient_id INTEGER REFERENCES patient_list,
    visit_date DATE NOT NULL
);

CREATE TABLE patient_list (
    pat_id SERIAL PRIMARY KEY,
    pat_name TEXT NOT NULL,
    pat_age INTEGER NOT NULL,
    pat_gender TEXT NOT NULL,
    primary_doctor_id INTEGER REFERENCES doctor_list
);

CREATE TABLE disease (
    dis_id SERIAL PRIMARY KEY,
    visit_id INTEGER REFERENCES visit,
    dis_description TEXT NOT NULL,
    dis_code TEXT NOT NULL
)
