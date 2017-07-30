<?php

//php file that puts in menu to the db

include 'select.php';

$id = $_POST["id"];

if (isset($id)) {
    try {
        $rowsAffected = $db->exec("
        DELETE FROM miakomenu
        WHERE id = '". $id ."'");
        print(json_encode(['success' => 'Success! ' . $id . ' removed from your Pokedex!']));
        $rowsAffected = $db->exec("
        update miakomenu
        set id = id - 1 where id > '".$id."'");
    } catch (PDOException $pdoex) {
        print(json_encode(['error' => "Error: Pokemon " . $id . " not found in your Pokedex."]));
    }
}

?>