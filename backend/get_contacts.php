<?php
// backend/get_contacts.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "db.php";

$sql = "SELECT id, full_name, email, subject, message, created_at FROM contact_messages ORDER BY id DESC";
$result = $conn->query($sql);

$messages = array();

if ($result) {
    while($row = $result->fetch_assoc()) {
        $messages[] = array(
            "id" => (int)$row['id'],
            "name" => $row['full_name'],
            "email" => $row['email'],
            "subject" => $row['subject'],
            "message" => $row['message'],
            "createdAt" => $row['created_at']
        );
    }
    echo json_encode(["success" => true, "data" => $messages]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}

$conn->close();
?>