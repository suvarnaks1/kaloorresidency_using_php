<?php
header("Content-Type: application/json");
require_once "db.php";

$sql = "SELECT * FROM bookings ORDER BY id DESC";
$result = $conn->query($sql);

$bookings = array();

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Room type display name set cheyyunnu
        $roomNames = [
            "non-ac" => "Non AC Room",
            "ac" => "AC Room",
            "deluxe" => "Deluxe Room",
            "double-deluxe" => "Double Deluxe Room",
            "king" => "King Size Room"
        ];
        
        $roomTypeKey = $row['room_type'];
        $roomTypeName = isset($roomNames[$roomTypeKey]) ? $roomNames[$roomTypeKey] : $roomTypeKey;

        $bookings[] = array(
            "id" => $row['booking_id'],
            "name" => $row['full_name'],
            "email" => $row['email'],
            "phone" => $row['phone'],
            "roomType" => $row['room_type'],
            "roomTypeName" => $roomTypeName,
            "rooms" => (int)$row['rooms'],
            "checkin" => $row['checkin'],
            "checkout" => $row['checkout'],
            "total" => (float)$row['total_amount'],
            "message" => $row['message'],
            "createdAt" => isset($row['created_at']) ? $row['created_at'] : ""
        );
    }
}

echo json_encode(["success" => true, "data" => $bookings]);
$conn->close();
?>