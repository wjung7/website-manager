-- CSE154 password lookup website
-- Table creation:
-- key an id number, and then strings representing
--  the password, username, and website:
CREATE TABLE IF NOT EXISTS miakomenu(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    description VARCHAR(64),
    price DECIMAL(4,2)
);