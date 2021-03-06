<?php
require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');

$message=[];
$output=[
	'success' => null,
	'messages' => []
];
//Sanitize name field
$message['name'] = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
if(empty($message['name'])){
	$output['success'] = false;
	$output['messages'][] = 'missing name';
}
$message['email'] = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
if(empty($message['email'])){
	$output['success'] = false;
	$output['messages'][] = 'invalid email';
}
//Sanitize message field
$message['message'] = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
if(empty($message['message'])){
	$output['success'] = false;
	$output['messages'][] = 'missing message';
}
$message['subject'] = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
if(empty($message['subject'])){
	$output['success'] = false;
	$output['messages'][] = 'missing subject';
}

//things received from front end ajax call
// $_POST('name');
// print($_POST['email']);
// $_POST('email');
// $_POST('message');
if($output['success'] !== null){
	http_response_code(400);
	echo json_encode($output);
	exit();
}
$message['message'] = nl2br($message['message']); //convert newline characters to line break html tags

$mail = new PHPMailer;
// $mail->SMTPDebug = 3;           // Enable verbose debug output. Change to 0 to disable debugging output.

$mail->isSMTP();                // Set mailer to use SMTP.
$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers.
$mail->SMTPAuth = true;         // Enable SMTP authentication


$mail->Username = EMAIL_USER;   // SMTP username
$mail->Password = EMAIL_PASS;   // SMTP password
$mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
$mail->Port = 587;              // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->smtpConnect($options);
$mail->From = $message['email'];        // sender's email address (shows in "From" field)
$mail->FromName = $message['name'];     // sender's name (shows in "From" field)
$mail->addAddress(EMAIL_USER);  // Add a recipient
//$mail->addAddress('ellen@example.com');                        // Name is optional
// $mail->addReplyTo($_POST['email']);                          // Add a reply-to address
$mail->addReplyTo($message['email'], $message['name']);
$mail->addCC('w1057216@g.ucla.edu');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $message['subject'];
$mail->Body    = $message['message'];
$mail->AltBody = htmlentities($message['message']);

if(!$mail->send()) {
    // echo 'Message could not be sent.';
    // echo 'Mailer Error: ' . $mail->ErrorInfo;
    $output['success'] = false;
    $output['messages'][] = $mail->ErrorInfo;
} else {
    // echo 'Message has been sent';
    $output['success'] = true;
}
echo json_encode($output);

$mail->clearAddresses();
$mail->clearReplyTos();
$mail->clearCCs();
$auto_reply = 'Hello! Thank you for reaching out! I will get back to you as soon as possible. Text to 949)285-1898 for any urgent issues.';
$mail->FromName = 'Brian Kim';
$mail->Subject = 'Thank you for reaching out!';
$mail->Body = $auto_reply;
$mail->AltBody = $auto_reply;
$mail->addAddress($message['email']);
if(!$mail->send()) {
    $output['success'] = false;
    $output['messages'][] = $mail->ErrorInfo;
} else {
    $output['messages'][] = 'auto reply sent';
    $output['success'] = true;
}
// echo json_encode($output);
?>
