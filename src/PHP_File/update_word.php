<?php
// กำหนด Header เพื่ออนุญาตการเข้าถึงทางส่วนตัวจากโดเมนอื่น
header("Access-Control-Allow-Origin: *");
// ระบุว่าเซิร์ฟเวอร์อนุญาตการใช้งานวิธีการต่างๆ เช่น GET, POST, PUT, DELETE
header("Access-Control-Allow-Methods: POST, GET, DELETE");

// ระบุ Header ที่อนุญาตให้ส่งมากับคำขอ เช่น Origin, X-Requested-With, Content-Type, Accept
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

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

// ตรวจสอบเมธอดของคำขอ
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['id'])) {
        // รับค่า id ที่ส่งมาจาก Angular
        $id = $conn->real_escape_string($_GET['id']);

        // สร้างคำสั่ง SQL เพื่อเลือกข้อมูลที่ต้องการจากฐานข้อมูล
        $sql = "SELECT id, english_word, thai_word FROM vocabularydata WHERE id='$id'";

        // ทำคำสั่ง SQL
        $result = $conn->query($sql);

        // ตรวจสอบว่ามีข้อมูลที่ถูกต้องหรือไม่
        if ($result->num_rows > 0) {
            // ดึงข้อมูลเป็นแถวๆ มาจากผลลัพธ์
            $row = $result->fetch_assoc();
            // สร้างอาเรย์ของข้อมูลเพื่อแสดงผล
            $data = array(
                "id" => $row["id"],
                "english_word" => $row["english_word"],
                "thai_word" => $row["thai_word"]
            );
            // แปลงข้อมูลเป็น JSON และส่งกลับไปยัง Angular
            echo json_encode($data);
        } else {
            // ถ้าไม่พบข้อมูล ส่งข้อความว่า "ไม่พบข้อมูล" กลับไปยัง Angular
            echo "No data found";
        }
    } else {
        // หากไม่มีการส่ง id มากับการร้องขอ ส่งข้อความว่า "ข้อผิดพลาด" กลับไปยัง Angular
        echo "Error: ID not provided";
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    // รับข้อมูลที่ส่งมาจาก Angular
    $data = json_decode(file_get_contents("php://input"));

    // ตรวจสอบว่า $data ไม่เป็น null และมี properties ที่ต้องการ
    if ($data !== null && isset($data->id) && isset($data->english_word) && isset($data->thai_word)) {
        // หากข้อมูลถูกต้อง ให้ escape ค่าที่ได้รับเพื่อป้องกัน SQL Injection
        $id = $conn->real_escape_string($data->id);
        $english_word = $conn->real_escape_string($data->english_word);
        $thai_word = $conn->real_escape_string($data->thai_word);

        // สร้างคำสั่ง SQL เพื่ออัปเดตข้อมูล
        $sql = "UPDATE vocabularydata SET english_word='$english_word', thai_word='$thai_word' WHERE id='$id'";

        // ทำคำสั่ง SQL
        if ($conn->query($sql) === TRUE) {
            echo json_encode(array("message" => "Record updated successfully"));
        } else {
            echo json_encode(array("message" => "Error updating record: " . $conn->error));
        }
    } else {
        // หากข้อมูลไม่ถูกต้อง ให้ส่งข้อความแจ้งเตือนกลับไปยัง Angular
        echo "Error: ID, English word, and/or Thai word not provided or data is null";
    }
} else {
    // หากไม่มีการร้องขอ GET หรือ POST ส่งข้อความว่า "ข้อผิดพลาด" กลับไปยัง Angular
    echo "Error: Invalid request method";
}

// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();
?>
