<?php
// เชื่อมต่อกับฐานข้อมูล
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database_name";

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// รับค่า id จากแอปพลิเคชันที่ต้องการลบ
$id = $_GET['id'];

// สร้างคำสั่ง SQL สำหรับลบข้อมูล
$sql = "DELETE FROM vocabularydata WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    // ส่งข้อความกลับไปยังแอปพลิเคชันว่าลบข้อมูลสำเร็จ
    echo json_encode(array("message" => "Delete successful"));
} else {
    // ส่งข้อความกลับไปยังแอปพลิเคชันว่าเกิดข้อผิดพลาดในการลบข้อมูล
    echo json_encode(array("message" => "Error: " . $sql . "<br>" . $conn->error));
}

// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();
?>
