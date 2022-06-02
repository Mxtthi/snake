<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
    <script src="gameSettings.js"></script>
    <script src="snake.js"></script>
    <script src="game.js"></script>
    <script src="input.js"></script>
</head>

<body>

    <div>
        <p id="highscore">Punkte: 0</p>
    </div>

    <?php

    require "../../database.php";

    session_start();

    if (!isset($_SESSION['auth']) || $_SESSION['auth'] !== true) {
        echo "<script>
    if (confirm('Du bist nicht eingeloggt. Als Gast fortfahren?')) {
        sessionStorage.setItem('loggedIn', false);
      } else {
        window.location.href = '../../login.php';
      }
    </script>";
    } else {
        echo "<script>sessionStorage.setItem('loggedIn', false);;</script>";
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


    ?>

</body>

</html>