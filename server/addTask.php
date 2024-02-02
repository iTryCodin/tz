<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Получение данных из POST-запроса
$data = json_decode(file_get_contents("php://input"), true);
print_r ($data);
// Подключение к базе данных
$servername = "localhost";
$dbname = "react-crud";
$usernameDB = "root";
$passwordDB = "";

$conn = new mysqli($servername, $usernameDB, $passwordDB, $dbname);

// Проверка наличия соединения с БД
if ($conn->connect_error) {
  die("Ошибка соединения с базой данных: " . $conn->connect_error);
}


// Проверка на наличие данных
if(isset($data['data'])) {
  $heading = $data['data']['heading'] ?? '';
  $description = $data['data']['description'] ?? '';
  $expiration_date = $data['data']['expiration_date'] ?? '';
  $creation_date = $data['data']['creation_date'] ?? '';
  $update_date = $data['data']['updte_data'] ?? '';
  $priority = $data['data']['priority'] ?? '';
  $status = $data['data']['status'] ?? '';
  $creator_user = $data['data']['creator_user'] ?? '';
  $responsible_user = $data['data']['responsible_user'] ?? '';

// Создание и выполнение SQL запроса для добавления записи
$sql = "INSERT INTO tasks (heading, description, expiration_date, creation_date, updte_data, priority, status, creator_user, responsible_user)
        VALUES ('$heading', '$description', '$expiration_date', '$creation_date', '$update_date', '$priority', '$status', '$creator_user', '$responsible_user')";;
echo $sql;
}
if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Закрытие соединения с базой данных
$conn->close();
?>expiration_date