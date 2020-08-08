CREATE TABLE gcm_candidate.candidate (
    id VARCHAR (64) NOT NULL PRIMARY_KEY,
    candidate_name VARCHAR(128) NOT NULL,
    birth_date TIMESTAMP (4) WITHOUT TIME ZONE,
    cpf VARCHAR (32) NOT NULL,
    mother_name VARCHAR (128) NOT NULL,
    father_name VARCHAR (128) NOT NULL,
    neighborhood VARCHAR (128) NOT NULL,
    zip_code VARCHAR (8) NOT NULL,
    country VARCHAR (128) NOT NULL,
    mobile_number VARCHAR (11) NOT NULL,
    phone_number VARCHAR (11) NOT NULL,
    scholling VARCHAR (128) NOT NULL,
    schol_name VARCHAR (128) NOT NULL,
    candidate_status VARCHAR (32) NOT NULL,
    enrollment_date TIMESTAMP (4) WITHOUT TIME ZONE NOT NULL,
    updated_date TIMESTAMP (4) WITHOUT TIME ZONE NULL,
) WITH (
    OIDS = false
) TABLESPACE pg_default;

CREATE UNIQUE INDEX candidate_cpf_rg_idx ON gcm_candidate.candidate (cpf, rg) WHERE ('cpf' IS NOT NULL, 'rg' IS NOT NULL) USING BTREE;