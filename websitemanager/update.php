<?php

include 'select.php';

$name = $_POST["name"];
$description = $_POST["description"];
$price = $_POST["price"];
$id = $_POST["id"];

try {
    $rowsAffected = $db->exec("
    UPDATE miakomenu
    SET name = '". $name ."', description = '". $description. "', price = '". $price ."'
    WHERE id = '". $id ."'");
    print(json_encode(['success' => 'Success! ' . $id . ' removed from your Pokedex!']));
    
    $rowsAffected = $db->exec("
    SET @count = 0");
    $rowsAffected = $db->exec("
    UPDATE `miakomenu` SET `miakomenu`.`id` = @count:= @count + 1");


} catch (PDOException $pdoex) {
    print(json_encode(['error' => "Error: Pokemon " . $id . " not found in your Pokedex."]));
}

?>