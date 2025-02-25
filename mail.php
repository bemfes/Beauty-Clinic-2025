<?php

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "Topic of mail";
$file = $_FILES['file'];

$c = true;

foreach ( $_POST as $key => $value ) {
    if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
      $body .= "
      " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
        <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
      </tr>
      ";
    }
  }
  $body = "<table style='width: 100%;'>$body</table>";

  // Настройки PHPMailer
  $mail = new PHPMailer\PHPMailer\PHPMailer();
  
  try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
  
    // Настройки вашей почты
    // Настройка отправки со своей почты себе
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    $mail->Username   = '2anastasiia@mail.ru'; // Логин на почте
    $mail->Password   = '5vrp5La4sn33G8Eqnx8a'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
  
    $mail->setFrom('2anastasiia@mail.ru', 'Заявка с вашего сайта'); // Адрес самой почты и имя отправителя
  
    // Настройки вашей почты
    // Настройка отправки с почты reg.ru себе
    // $mail->Host       = 'mail.hosting.reg.ru'; // SMTP сервера вашей почты
    // $mail->Username   = 'test@ustinanastasiia.ru'; // Логин на почте
    // $mail->Password   = 'martinredwall2802'; // Пароль на почте
    // $mail->SMTPSecure = 'ssl';
    // $mail->Port       = 465;
  
    // $mail->setFrom('test@ustinanastasiia.ru', 'Заявка с вашего сайта'); 

    // Получатель письма
    $mail->addAddress('2anastasiia@mail.ru');
  
    // Прикрипление файлов к письму
    if (!empty($file['name'][0])) {
      for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[] = "Не удалось прикрепить файл $filename";
        }
      }
    }
  
    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;
  
    $mail->send();
  
  } catch (Exception $e) {
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
  }
?>