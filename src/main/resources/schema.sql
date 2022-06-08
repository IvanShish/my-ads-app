BEGIN;

CREATE TABLE ad_states
(
    id     UUID PRIMARY KEY,
    state  TEXT    NOT NULL,
    actual BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE users
(
    id                 UUID PRIMARY KEY,
    email              VARCHAR(120) NOT NULL,
    encrypted_password VARCHAR(255) NOT NULL,
    first_name         VARCHAR(50)  NOT NULL,
    last_name          VARCHAR(50)  NOT NULL,
    actual             BOOLEAN      NOT NULL DEFAULT TRUE
);

CREATE TABLE ads
(
    id          UUID PRIMARY KEY,
    title       VARCHAR(60) NOT NULL,
    description TEXT        NOT NULL,
    category    TEXT        NOT NULL,
    condition   TEXT        NOT NULL,
    price       FLOAT       NOT NULL,
    actual      BOOLEAN     NOT NULL DEFAULT TRUE,
    state_id    UUID        NOT NULL,
    user_id     UUID        NOT NULL,
    CONSTRAINT ad_state FOREIGN KEY (state_id) REFERENCES ad_states (id) ON UPDATE CASCADE,
    CONSTRAINT ad_user FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE
);

create table chat_messages
(
    id             UUID PRIMARY KEY,
    actual         BOOLEAN NOT NULL DEFAULT TRUE,
    ad_id          VARCHAR(255),
    ad_title       TEXT,
    chat_id        VARCHAR(255),
    content        TEXT,
    recipient_id   VARCHAR(255),
    recipient_name TEXT,
    sender_id      VARCHAR(255),
    sender_name    TEXT,
    status         TEXT,
    timestamp      TIMESTAMP
);

create table chat_rooms
(
    id           UUID PRIMARY KEY,
    actual       BOOLEAN NOT NULL DEFAULT TRUE,
    ad_id        VARCHAR(255),
    chat_id      VARCHAR(255),
    sender_id    VARCHAR(255),
    recipient_id VARCHAR(255)
);

COMMIT;
