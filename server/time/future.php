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
$time = $data->time;
$servername = "localhost";
$dbname = "react-crud";
$usernameDB = "root";
$passwordDB = "";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $usernameDB, $passwordDB);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $conn->prepare("SELECT * FROM tasks WHERE responsible_user = :userid AND expiration_date >= :time");
  $stmt->bindParam(":userid", $id, PDO::PARAM_INT);
  $stmt->bindParam(":time",  $time, PDO::PARAM_STR);
  $stmt->execute();
  
  if ($stmt->rowCount() > 0) {
    $tasks = $stmt->fetchAll();
    $response = array("success" => true, "message" => "Запрос выполнен успешно", "tasks" => $tasks);
  } else {
    $response = array("success" => false, "message" => "Неверный ");
  
  }
} catch(PDOException $e) {
  $response = array("success" => false, "message" => "Ошибка при подключении к базе данных");
}

header("Content-Type: application/json");
echo json_encode($response);