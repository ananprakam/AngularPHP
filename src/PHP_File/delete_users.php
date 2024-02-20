<?php

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the data sent from Angular
    $data = json_decode(file_get_contents("php://input"));

    // Check if the data is not null and contains the user id
    if ($data !== null && isset($data->id)) {
        // Connect to the database
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "admin_pages";

        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Escape user input for security
        $id = $conn->real_escape_string($data->id);

        // SQL to delete a user with the given id
        $sql = "DELETE FROM users WHERE id='$id'";

        if ($conn->query($sql) === TRUE) {
            // If deletion is successful, return success message
            echo json_encode(array("message" => "User deleted successfully"));
        } else {
            // If there is an error with the SQL query, return error message
            echo json_encode(array("error" => "Error deleting user: " . $conn->error));
        }

        // Close database connection
        $conn->close();
    } else {
        // If data is null or does not contain user id, return error message
        echo json_encode(array("error" => "User id not provided or data is null"));
    }
} else {
    // If the request method is not POST, return error message
    echo json_encode(array("error" => "Invalid request method"));
}
