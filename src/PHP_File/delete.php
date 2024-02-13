<?php
// เชื่อมต่อกับฐานข้อมูล
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "admin_pages";

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($_GET["id"] != "") {

    $id = $_GET["id"];

    $sql = "delete from vocabularydata  WHERE Id = '{$id}' LIMIT 1";

    if (mysqli_query($mysqli, $sql)) {
        http_response_code(204);
    } else {
        return http_response_code(422);
    }
}


// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();
