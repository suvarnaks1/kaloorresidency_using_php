<?php
header("Content-Type: application/json");
require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // POST request-ൽ നിന്ന് വരുന്ന JSON ഡാറ്റ വായിക്കുന്നു
    $input = json_decode(file_get_contents("php://input"), true);

    $booking_id = "KGR-" . strtoupper(uniqid()); // ഒരു Unique Booking ID ഉണ്ടാക്കുന്നു
    $full_name  = $input['fullName'] ?? '';
    $email      = $input['email'] ?? '';
    $phone      = $input['phone'] ?? '';
    $room_type  = $input['roomType'] ?? '';
    $rooms      = (int)($input['rooms'] ?? 1);
    $checkin    = $input['checkin'] ?? '';
    $checkout   = $input['checkout'] ?? '';
    $message    = $input['message'] ?? '';
    $total      = (float)($input['totalAmount'] ?? 0);

    // Validation (അത്യാവശ്യ വിവരങ്ങൾ ഉണ്ടെന്ന് ഉറപ്പ് വരുത്തുന്നു)
    if (empty($full_name) || empty($email) || empty($phone) || empty($checkin) || empty($checkout)) {
        echo json_encode(["success" => false, "message" => "Please fill all required fields."]);
        exit;
    }

    // SQL Query (Prepared Statement വഴി SQL Injection തടയുന്നു)
    $stmt = $conn->prepare("INSERT INTO bookings (booking_id, full_name, email, phone, room_type, rooms, checkin, checkout, message, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssisssd", $booking_id, $full_name, $email, $phone, $room_type, $rooms, $checkin, $checkout, $message, $total);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "booking_id" => $booking_id, "message" => "Booking confirmed successfully!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>