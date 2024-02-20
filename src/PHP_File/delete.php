<?php
// กำหนด Header เพื่ออนุญาตการเข้าถึงทางส่วนตัวจากโดเมนอื่น
header("Access-Control-Allow-Origin: *");
// ระบุว่าเซิร์ฟเวอร์อนุญาตการใช้งานวิธีการต่างๆ เช่น GET, POST, PUT, DELETE
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
// ระบุ Header ที่อนุญาตให้ส่งมากับคำขอ เช่น Origin, X-Requested-With, Content-Type, Accept
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// เชื่อมต่อกับฐานข้อมูล
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "admin_pages";

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// Extract query parameters
$id = $_GET['id'];

// SQL
$sql = "DELETE FROM vocabularydata WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$result = $stmt->execute();

if ($result) {
    $response = array("message" => "Course deleted successfully");
    http_response_code(200);
} else {
    $response = array("message" => "Error deleting course");
    http_response_code(500);
}

echo json_encode($response);


// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();
?>
