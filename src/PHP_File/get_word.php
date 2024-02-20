<?php
// กำหนด Header เพื่ออนุญาตการเข้าถึงทางส่วนตัวจากโดเมนอื่น
header("Access-Control-Allow-Origin: *");
// ระบุว่าเซิร์ฟเวอร์อนุญาตการใช้งานวิธีการต่างๆ เช่น GET, POST, PUT, DELETE
header("Access-Control-Allow-Methods: POST, GET, DELETE");

// ตรวจสอบว่ามีการร้องขอ GET และมีค่า id ที่ส่งมากับการร้องขอหรือไม่
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['id'])) {
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

    // ปิดการเชื่อมต่อฐานข้อมูล
    $conn->close();
} else {
    // หากไม่มีการร้องขอ GET หรือไม่มีการส่ง id มากับการร้องขอ ส่งข้อความว่า "ข้อผิดพลาด" กลับไปยัง Angular
    echo "Error: Invalid request or ID not provided";
}
?>
