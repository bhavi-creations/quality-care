<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Adjust the path to autoload.php based on your project

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assign POST data to variables
    $name = $_POST['name'] ?? '';    
    $email = $_POST['email'] ?? '';
    $test = $_POST['test'] ?? '';
    $date = $_POST['date'] ?? '';
    $message = $_POST['message'] ?? '';



    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings for Gmail SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'rameshpi lli1428@gmail.com'; // Your Gmail email address
        $mail->Password = 'jjpksiywaevdyyrc'; // Your Gmail password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('rameshpill i1428@gmail.com', 'Quality Care Labs'); // Your Gmail email and name
        $mail->addAddress('rameshpi lli1428@gmail.com', 'Quality Care Labs'); // Recipient's email and name

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Message from Appointment Booking';
        $mail->Body = "
            <h1>New Message</h1>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Test Name:</strong> $test</p>
            <p><strong>Date:</strong><br>$date</p>
            <p><strong>Message:</strong><br>$message</p>
        ";

        $mail->send();
        echo '<script> window.alert("Message has been sent.\n\nPLEASE CLICK OK."); window.location.href="index.html";</script>';

    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    // If accessed directly without POST data
    echo 'Access Denied';
}
