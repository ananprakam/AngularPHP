<?php
// ตัวแปรสำหรับการเชื่อมต่อฐานข้อมูล
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "admin_pages";

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// คำสั่ง SQL เพื่อดึงข้อมูล
$sql = "SELECT id, username, email FROM users";
$result = $conn->query($sql);

// ตรวจสอบการดึงข้อมูล
if ($result->num_rows > 0) {
  // แสดงข้อมูลในรูปแบบของ JSON
  $output = array();
  while($row = $result->fetch_assoc()) {
    $output[] = $row;
  }
  echo json_encode($output);
} else {
  echo "0 results";
}
$conn->close();
?>
