BEGIN;

INSERT INTO ad_states (id, state)
VALUES (uuid_generate_v4(), 'DRAFT'),
       (uuid_generate_v4(), 'ACTIVELY'),
       (uuid_generate_v4(), 'WITHDRAWN'),
       (uuid_generate_v4(), 'DELETED');

COMMIT;