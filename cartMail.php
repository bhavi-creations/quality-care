<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Adjust the path to autoload.php based on your project

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assign POST data to variables
    $first = $_POST['first_name'] ?? ''; 
    $last = $_POST['last_name'] ?? ''; 
    $address = $_POST['address'] ?? '';
    $address2 = $_POST['address2'] ?? '';
    $location = $_POST['location'] ?? '';
    $pincode = $_POST['pin_code'] ?? '';
    $number = $_POST['number'] ?? '';
    $email = $_POST['mail'] ?? '';


    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings for Gmail SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'rameshpil li1428@gmail.com'; // Your Gmail email address
        $mail->Password = 'jjpksiywaevdyyrc'; // Your Gmail password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('rameshpilli1 428@gmail.com', 'Quality Care Labs'); // Your Gmail email and name
        $mail->addAddress('rameshpil li1428@gmail.com', 'Quality Care Labs'); // Recipient's email and name

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Message from Cart Page';
        $mail->Body = "
            <h1>New Message</h1>
            <p><strong>First Name:</strong> $first</p>
            <p><strong>Last Name:</strong> $last</p>
            <p><strong>Address 1:</strong> $address</p>
            <p><strong>Address 2:</strong> $address2</p>

            
            <p><strong>Location:</strong><br>$location</p>
            <p><strong>Pin Code:</strong><br>$pincode</p>
            <p><strong>Number:</strong> $number</p>
            <p><strong>Email:</strong> $email</p>
        ";

        $mail->send();
        echo '<script> window.alert("Message has been sent.\n\nPLEASE CLICK OK."); window.location.href="contact.html";</script>';

    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    // If accessed directly without POST data
    echo 'Access Denied';
}
