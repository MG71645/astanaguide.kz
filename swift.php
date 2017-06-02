<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    
    require_once 'swift/lib/swift_required.php';
    
    
    $name = $_POST["name"];
    $email = $_POST["email"];
    $whatsapp = $_POST["whatsapp"];
    $telegram = $_POST["telegram"];
    
    $login = "landing@astanaguide.kz";
    $password = "l12341234";
    $sendFrom = array("landing@astanaguide.kz" => "astanaguide.kz");
    $sendTo = array('mg71645@gmail.com');
    
    
    $date = new DateTime('now', new DateTimeZone('Asia/Almaty'));
    $date = $date->format('d.m.y H:i');
    
    
    if($email || $whatsapp || $telegram)
    {
        $transport = Swift_SmtpTransport::newInstance('ssl://smtp.yandex.ru', 465)
            ->setUsername($login)
            ->setPassword($password);
        
        $mailer = Swift_Mailer::newInstance($transport);
        
        $message = "<b>Имя:</b> $name<br>";
        if($email) $message .= "<b>Email:</b> $email<br>";
        if($whatsapp) $message .= "<b>WhatsApp:</b> $whatsapp<br>";
        if($telegram) $message .= "<b>Telegram:</b> $telegram<br>";
        
        $message_send = Swift_Message::newInstance("$date - $name")
            ->setFrom($sendFrom)
            ->setTo($sendTo)
            ->setBody($message, 'text/html');
        
        $result = $mailer->send($message_send);
        echo $result;
        $regResult = array();
    }

?>