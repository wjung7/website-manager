<?php
//Won Young Jung
//CSE 154 AL with Duncan Deutsch

$db = new PDO("mysql:dbname=testDB;host=localhost;charset=utf8", "root", "");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $resultSet = $db->query("SELECT * from miakomenu");
    $jsonData = [];
    foreach ($resultSet as $row) {
        $passwordRow = [
            $row["id"], $row["name"], $row["description"], $row["price"],
        ];
        array_push($jsonData, $passwordRow);
    }
    print(json_encode($jsonData));
    
?>