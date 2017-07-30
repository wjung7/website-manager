<?php
//Won Young Jung
//CSE 154 AL with Duncan Deutsch

include 'select.php';

$name = $_POST["name"];
$description = $_POST["description"];
$price = $_POST["price"];

try {
$rowsAffected = $db->exec("
INSERT INTO miakomenu
    (name, description, price)
VALUES
    ('$name', '$description', '$price') ");
    print(json_encode(['success' => 'Success! ' . $name . ' added to your Pokedex!']));

$rowsAffected = $db->exec("
SET @count = 0");
$rowsAffected = $db->exec("
UPDATE `miakomenu` SET `miakomenu`.`id` = @count:= @count + 1");


} catch (PDOException $pdoex) {
    print(json_encode(['error' => "Error: Pokemon " . $name . " already found"]));
}