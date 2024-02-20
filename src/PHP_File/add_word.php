<?php
// กำหนด Header เพื่ออนุญาตการเข้าถึงทางส่วนตัวจากโดเมนอื่น
header("Access-Control-Allow-Origin: *");
// ระบุว่าเซิร์ฟเวอร์อนุญาตการใช้งานวิธีการต่างๆ เช่น GET, POST, PUT, DELETE
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
// ระบุ Header ที่อนุญาตให้ส่งมากับคำขอ เช่น Origin, X-Requested-With, Content-Type, Accept
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Include the connection file
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

// Decode the JSON data from the request body
$data = json_decode(file_get_contents("php://input"));

// Extract data fields
$english_word   = $data->english_word;
$thai_word    = $data->thai_word;

// Check if the english_word already exists in the database
$check_query = "SELECT * FROM vocabularydata WHERE english_word = '$english_word'";
$result = $conn->query($check_query);

if ($result->num_rows > 0) {
    $response["msgg"] = "English word already exists";
    // Send JSON response
    echo json_encode($response);
    exit(); // สิ้นสุดการทำงานของสคริปต์เพื่อไม่ต้องดำเนินการต่อ
} else {
    // Prepare the SQL query to insert data into the database
    $query = "INSERT INTO vocabularydata (english_word, thai_word) VALUES ('$english_word', '$thai_word')";
    
    // Execute the query
    if (mysqli_query($conn, $query)) {
        $response["msg"] = "เพิ่มคำศัพท์เรียบร้อยแล้ว";
    } else {
        $response["msg"] = "Add vocabulary response from server failed";
    }
}

// Send JSON response
echo json_encode($response);



?>
