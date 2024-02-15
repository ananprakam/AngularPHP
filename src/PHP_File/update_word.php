<?php
// ตรวจสอบว่ามีการส่งข้อมูลผ่านเมธอด POST หรือไม่
if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
            echo "Record updated successfully";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    } else {
        // หากข้อมูลไม่ถูกต้อง ให้ส่งข้อความแจ้งเตือนกลับไปยัง Angular
        echo "Error: ID, English word, and/or Thai word not provided or data is null";
    }

    // ปิดการเชื่อมต่อฐานข้อมูล
    $conn->close();
} else {
    // หากไม่มีการส่งข้อมูลผ่านเมธอด POST ให้ส่งข้อความแจ้งเตือนกลับไปยัง Angular
    echo "Error: Invalid request method";
}
?>
