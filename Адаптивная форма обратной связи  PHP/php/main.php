<?php
$name = $_POST['name'];
$surname = $_POST['surname'];
$patronymic = $_POST['patronymic'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

/*преобразуем все символы, которые пользователь попытается добавить в форму*/
$name = htmlspecialchars($name); 
$surname = htmlspecialchars($surname);
$patronymic = htmlspecialchars($patronymic);
$email = htmlspecialchars($email);
$phone = htmlspecialchars($phone);
$message = htmlspecialchars($message);

/*декодируем url, если пользователь попытается его добавить в форму*/
$name = urldecode($name);
$surname = urldecode($surname);
$patronymic = urldecode($patronymic);
$email = urldecode($email);
$phone = urldecode($phone);
$message = urldecode($message);

/*удалим пробелы с начала и конца строки, если таковые имеются*/
$name = trim($name);
$surname = trim($surname);
$patronymic = trim($patronymic);
$email = trim($email);
$phone = trim($phone);
$message = trim($message);


if (mail("E@mail.ru", "Заявка с сайта", "Имя: ".$name." Фамилия: ".$surname." Отчество: ".$patronymic." Телефон: ".$phone." E-mail: ".$email. " Сообщение: " .$message,"From: MyCompany@mail.ru \r\n"))
 {     echo "сообщение успешно отправлено"; 
} else { 
    echo "при отправке сообщения возникли ошибки";
}?>