<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
      header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

  exit(0);
}
// Получение данных из POST-запроса
$data = json_decode(file_get_contents("php://input"));

$id = $data->userID;
$slaveID = $data->slaveID;
// Подключение к базе данных
$servername = "localhost";
$dbname = "react-crud";
$usernameDB = "root";
$passwordDB = "";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $usernameDB, $passwordDB);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Подготовка и выполнение SQL-запроса для проверки логина и пароля
  $stmt = $conn->prepare("SELECT * FROM tasks WHERE responsible_user = :slaveID && creator_user = :userid");
  $stmt->bindParam(":userid", $id, PDO::PARAM_INT);
  $stmt->bindParam(":slaveID", $slaveID, PDO::PARAM_INT);
  $stmt->execute();
  
  // Проверка результата запроса
  if ($stmt->rowCount() > 0) {
    $tasks = $stmt->fetchAll();
    $response = array("success" => true, "message" => "Запрос выполнен успешно", "tasks" => $tasks);
  } else {
    // В случае неправильных логина или пароля
    $response = array("success" => false, "message" => "Неверный ");
  
  }
} catch(PDOException $e) {
  // В случае ошибки
  $response = array("success" => false, "message" => "Ошибка при подключении к базе данных");
}

// Возвращение JSON-ответа
header("Content-Type: application/json");
echo json_encode($response);