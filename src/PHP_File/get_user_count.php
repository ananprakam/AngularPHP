<?php
// สร้างการเชื่อมต่อกับฐานข้อมูล
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "admin_pages";

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// เช็คการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// คำสั่ง SQL เพื่อดึงจำนวนผู้ใช้
$sql = "SELECT COUNT(*) AS user_count FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // แปลงข้อมูลให้เป็น JSON และส่งกลับ
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo "0 results";
}

$conn->close();
?>
