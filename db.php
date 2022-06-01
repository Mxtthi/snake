<?php
session_start();

//Database-Verbindung
require "../../database.php";

if (isset($_SESSION["username"])) {

    $highscore = htmlentities($_POST["highscore"]);
    $username = htmlentities($_SESSION["username"]);
    $userID = htmlentities($_SESSION["id"]);

    $sql = "INSERT INTO snake (highscore, username, userID)
    VALUES (?, ?, ?);";
    $stmt = $db->prepare($sql);
    $stmt->execute([$highscore, $username, $userID]);
}

$sql = "SELECT * FROM snake ORDER BY highscore DESC";
$stmt = $db->query($sql);
$data = $stmt->fetchAll();

$month = date('m');
$day = date('d');

echo "<div id='result'>";
echo "<p>TOP 10 ALLTIME:</p>";
$count = 0;
$arr = [];
for ($i = 0; $i < count($data); $i++) {
    if (isset($data[$i])) {
        if (!($count < 10)) {
            break;
        }
        if (!(in_array($data[$i]["username"], $arr)) && $data[$i]["userID"] != 0) {
            array_push($arr, $data[$i]["username"]);
            $count++;
            echo substr($data[$i]["username"], 0, 32) . ": " . $data[$i]["highscore"] . " Punkte" . "<br>";
        }
    }
}

echo "<p>TOP 10 DAILY:</p>";
$count = 0;
$arr = [];
for ($i = 0; $i < count($data); $i++) {

    if (!($count < 10)) {
        break;
    }

    if (isset($data[$i])) {

        $date = explode(" ", $data[$i]["created_at"]);
        $date = explode("-", $date[0]);

        if ($date[1] == $month && $date[2] == $day) {
            if (!(in_array($data[$i]["username"], $arr)) && $data[$i]["userID"] != 0) {
                array_push($arr, $data[$i]["username"]);
                $count++;
                echo substr($data[$i]["username"], 0, 32) . ": " . $data[$i]["highscore"] . " Punkte" . "<br>";
            }
        }
    }
}
echo "</div>";
