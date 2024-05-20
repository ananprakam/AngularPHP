<?php
// กำหนด Header เพื่ออนุญาตการเข้าถึงทางส่วนตัวจากโดเมนอื่น
header("Access-Control-Allow-Origin: *");
// ระบุว่าเซิร์ฟเวอร์อนุญาตการใช้งานวิธีการต่างๆ เช่น GET, POST, PUT, DELETE
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
// ระบุ Header ที่อนุญาตให้ส่งมากับคำขอ เช่น Origin, X-Requested-With, Content-Type, Accept
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

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

// ตรวจสอบว่าข้อมูลที่ได้รับถูกต้อง
if (isset($data->english_word) && isset($data->thai_word)) {
    // Extract data fields
    $english_word = $data->english_word;
    $thai_word = $data->thai_word;

    // Check if the english_word already exists in the database
    $check_query = $conn->prepare("SELECT * FROM vocabularydata WHERE english_word = ?");
    $check_query->bind_param("s", $english_word);
    $check_query->execute();
    $result = $check_query->get_result();

    if ($result->num_rows > 0) {
        $response["msg"] = "There is already an English word";
    } else {
        // Prepare the SQL query to insert data into the database
        $insert_query = $conn->prepare("INSERT INTO vocabularydata (english_word, thai_word) VALUES (?, ?)");
        $insert_query->bind_param("ss", $english_word, $thai_word);

        // Execute the query
        if ($insert_query->execute()) {
            $response["msg"] = "Vocabulary added successfully";
        } else {
            $response["msg"] = "Add vocabulary response from server failed";
        }
    }

    // Send JSON response
    echo json_encode($response);
} else {
    $response["msg"] = "Invalid input data";
    echo json_encode($response);
}

// Close the connection
$conn->close();
?>
