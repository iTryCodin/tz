
import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Table, Container } from "react-bootstrap";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Загрузка задач при загрузке страницы
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    // Здесь можно выполнить запрос на сервер для получения списка задач
    // и обновить состояние tasks
    const dummyTasks = [
      { id: 1, name: "Task 1" },
      { id: 2, name: "Task 2" },
      { id: 3, name: "Task 3" },
    ];
    setTasks(dummyTasks);
  };

  const addTask = () => {
    // Здесь можно выполнить запрос на сервер для добавления новой задачи
    // и обновить состояние tasks
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
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task name"
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
  </Container>  
);
}