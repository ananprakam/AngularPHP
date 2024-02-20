<?php
// กำหนด Header เพื่ออนุญาตการเข้าถึงทางส่วนตัวจากโดเมนอื่น
header("Access-Control-Allow-Origin: *");
// ระบุว่าเซิร์ฟเวอร์อนุญาตการใช้งานวิธีการต่างๆ เช่น GET, POST, PUT, DELETE
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
// ระบุ Header ที่อนุญาตให้ส่งมากับคำขอ เช่น Origin, X-Requested-With, Content-Type, Accept
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
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
$sql = "SELECT id, english_word, thai_word FROM vocabularydata";
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
