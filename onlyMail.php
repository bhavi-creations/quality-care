<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Adjust the path to autoload.php based on your project

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assign POST data to variables
  
    $email = $_POST['mail'] ?? '';
     

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings for Gmail SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'rameshpilli14 28@gmail.com'; // Your Gmail email address
        $mail->Password = 'jjpksiywaevdyyrc'; // Your Gmail password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('rameshpilli 1428@gmail.com', 'Quality Care Labs'); // Your Gmail email and name
        $mail->addAddress('rameshpilli1428@gmail.com', 'Quality Care Labs'); // Recipient's email and name

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Message from Appointment Booking';
        $mail->Body = "
            
            <p><strong>Email:</strong> $email</p>
           
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
