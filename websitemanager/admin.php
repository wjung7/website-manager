<?php


$username = $_POST["username"];
$password = $_POST["password"];

header("Content-Type: application/json");

if ($username == "" || $password = "") {
    print(json_encode(['response'=>"Pass in username and password"]));
} elseif ($username == "username" && $password = "password123") {
    print(json_encode(['response'=>"confirmed"]));
} else {
    print(json_encode(['response'=>"Wrong username or password"]));
}