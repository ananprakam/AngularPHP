<?php
// เชื่อมต่อกับฐานข้อมูล MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "admin_pages";

$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// รับข้อมูลที่ส่งมาจาก Angular
$data = json_decode(file_get_contents("php://input"));

// สร้างคำสั่ง SQL เพื่อบันทึกข้อมูล
$sql = "INSERT INTO vocabularydata (english_word, thai_word) VALUES ('$data->english_word', '$data->thai_word')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
