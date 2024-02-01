import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal, Table, Container } from "react-bootstrap";

export default function TasksPage() {
  const navigate = useNavigate();
  

  const [tasks, setTasks] = useState({
    title: '',
    description: '',
    dueDate: '',
    createdAt: '',
    updatedAt: '',
    priority: '',
    status: '',
    creator: '',
    responsible: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [editMode, setEditMode] = useState(false);


  
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/'); // Перенаправить на страницу авторизации, если пользователь не авторизован
    }
  }, []);

  function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  function logoutHandler() {
    localStorage.removeItem('token');// Удаление токена из localStorage
    localStorage.removeItem('id');  
    navigate('/'); // Перенаправление на страницу авторизации
  }

  useEffect(() => {
    // Загрузка задач при загрузке страницы
     fetchTasks();
  }, []);

  const fetchTasks = () => {
    const userID=localStorage.getItem('id'); 
    
    fetch("http://server/task.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userID}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        alert(data.tasks.id)
      }
    })
    .catch((error) => {
      console.log("Ошибка при отправке запроса:", error);
    });
  };

  const addTask = () => {
    // Здесь можно выполнить запрос на сервер для добавления новой задачи
    // и обновить состояние tasks
    fetch("http://server/addTask.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          alert(data.tasks.id)
        }
      })
      .catch((error) => {
        console.log("Ошибка при отправке запроса:", error);
      });
    const newTask = { id: Date.now(), name: currentTask };
    setTasks([...tasks, newTask]);
    setCurrentTask("");
    handleClose();
  };

  const editTask = (task) => {
    setCurrentTask(task.name);
    setEditMode(true);
    setShowModal(true);
  };

  const updateTask = () => {
    // Здесь можно выполнить запрос на сервер для обновления задачи
    // и обновить состояние tasks
 
      fetch("http://server/addTask.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          alert(data.tasks.id)
        }
      })
      .catch((error) => {
        console.log("Ошибка при отправке запроса:", error);
      });

    const updatedTask = { ...currentTask };
    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    setCurrentTask("");
    handleClose();
  };

  const deleteTask = (task) => {
    // Здесь можно выполнить запрос на сервер для удаления задачи
    // и обновить состояние tasks
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
};
  return (
    <Container>  
  <div>
    <h1>Tasks Page</h1>

    {/* Кнопка для открытия модального окна */}
    <Button onClick={() => setShowModal(true)}>Add Task</Button>

    {/* Модальное окно для добавления/редактирования задачи */}
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? "Edit Task" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formTask">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            type="text"
            placeholder="Заголовок"
            value={tasks.title}
            onChange={(e) => setTask(e.target.value)}
          />
           <Form.Label>Описание</Form.Label>
          <Form.Control
            type="text"
            placeholder="Описание"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          />
           <Form.Label>Дата окончания</Form.Label>
          <Form.Control
            type="text"
            placeholder="Дата окончания"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          />
           <Form.Label>Приоритет</Form.Label>
           <Form.Control
            type="text"
            placeholder="Приоритет"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          />
           <Form.Label>Ответственный</Form.Label>
           <Form.Control
            type="text"
            placeholder="Ответственный"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {editMode ? (
          <Button variant="primary" onClick={updateTask}>
            Update
          </Button>
        ) : (
          <Button variant="primary" onClick={addTask}>
            Add
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>

    {/* Таблица с задачами */}
    <Table striped bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.name}</td>
            <td>
              <Button variant="warning" onClick={() => editTask(task)}>
                Edit
              </Button>{" "}
              <Button variant="danger" onClick={() => deleteTask(task)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
 


    <div className="d-grid gap-2 mt-3">  
    {/* Код страницы задач */}
            <button
              onClick={logoutHandler}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>  
    </div>
    
    </Container>  
  );
}