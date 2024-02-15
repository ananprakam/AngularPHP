<?php
    // Include the connection file
    require "connection.php";

    // Decode the JSON data from the request body
    $data = json_decode(file_get_contents("php://input"));

    // Extract data fields
    $username   = $data->username;
    $age    = $data->age;

    // Prepare the SQL query using the new table name
    $query = "INSERT INTO users (username, email) VALUES ('$username', $email')";

    // Execute the query
    if(mysqli_query($con, $query)) {
        $response["msg"] = "User added successfully";
    } else {
        $response["msg"] = "Add user response from server failed";
    }

    // Send JSON response
    echo json_encode($response);
?>
