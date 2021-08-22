<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/PHPMailer/PHPMailer/src/Exception.php';
require 'vendor/PHPMailer/PHPMailer/src/PHPMailer.php';
require 'vendor/PHPMailer/PHPMailer/src/SMTP.php';

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['mobile']) && isset($_POST['subject']) && isset($_POST['message'])) {

	// Variables
	$name = strip_tags($_POST['name']);
	$mobile = strip_tags($_POST['mobile']);
	$email = strip_tags($_POST['email']);
	$subject = strip_tags($_POST['subject']);
	$message = strip_tags($_POST['message']);
	try {
		$phpEmail = new PHPMailer();
		$phpEmail->IsSMTP();
		$phpEmail->CharSet = "UTF-8";
		$phpEmail->Host = 'relay-hosting.secureserver.net';
		$phpEmail->SMTPAuth = true;
		//$phpEmail->SMTPAutoTLS = false; 
		$phpEmail->Port = 587;
		$phpEmail->SMTPDebug = 1;
		// $phpEmail->SMTPSecure = 'none';
		//$phpEmail->Host= "sg2nwvpweb069.shr.prod.sin2.secureserver.net";//smtpout.secureserver.net";// (or alternatively relay-hosting.secureserver.net)
		//$phpEmail->Port= 587;//3535;//or 465 or 80 or 25
		//$phpEmail->SMTPAuth= true; //always
		$phpEmail->SMTPSecure = "tsl"; //only if using port 465
		$phpEmail->SMTPOptions = array(
			'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,
				'allow_self_signed' => true
			)
		);
		$phpEmail->Username = "jncoirexports@gmail.com";
		$phpEmail->Password = "JnCoir@123";
		$phpEmail->SetFrom('jncoirexports@gmail.com', 'JN Coir Exports');
		$phpEmail->FromName = "JN Coir Exports";
		$phpEmail->AddAddress("contact@jncoirexports.com");
		$phpEmail->Subject = $subject;
		$phpEmail->Body = "<strong>Name:</strong> $name <br>
							<strong>Email:</strong> <a href=mailto:$email?subject=RE:$subject>$email</a> <br> <br>
							<strong>Mobile:</strong> $mobile <br>
							<strong>Message:</strong> $message <br>";
		$phpEmail->IsHTML(true);
		if (!$phpEmail->Send()) {
			echo "<pre>";
			print_r($phpEmail);
			exit;
			//return $phpEmail->ErrorInfo;
		} else {
			return "Message Sent!";
		}
	} catch (phpmailerException $ex) {
		return $ex->errorMessage();
	}
}
