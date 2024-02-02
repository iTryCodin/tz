import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';import {Row, Col, Navbar, Nav, NavDropdown,Form, Button, Modal, Table, Container } from "react-bootstrap";

export default function TasksPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [select, setSelect] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [editMode, setEditMode] = useState(false);
  
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [creatorUser, setCreatorUser] = useState('');
  const [responsibleUser, setResponsibleUser] = useState('');
  const [disabledFields, setDisabledFields] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/'); 
    }
  }, []);

  function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  function logoutHandler() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');  
    navigate('/'); 
  }

  useEffect(() => {
     selectFill();
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
        const tasksBD = data.tasks;
        const dummyTasks = tasksBD.map(task => {
            return {
                id: task.id,
                name: task.heading,
                description: task.description,
                expiration_date: task.expiration_date,
                priority: task.priority,
                status: task.status,
                creator: task.creator_user,
                responsibleUser: task.responsible_user
            }   
         
        });  
        setTasks(dummyTasks);
       
     }
    })
    .catch((error) => {
      console.log("Ошибка при отправке запроса:", error);
    });
  };
   const toDay=()=>{
    const userID=localStorage.getItem('id'); 
    const time=getCurrentDate();
    fetch("http://server/time/today.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userID,time}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        const tasksBD = data.tasks;
        const dummyTasks = tasksBD.map(task => {
            return {
                id: task.id,
                name: task.heading,
                description: task.description,
                expiration_date: task.expiration_date,
                priority: task.priority,
                status: task.status,
                creator: task.creator_user,
                responsibleUser: task.responsible_user
            }   
        });  
        setTasks(dummyTasks);   
     }
    })
    .catch((error) => {
      console.log("Ошибка при отправке запроса:", error);
    });
   }
   const onWeek=()=>{
    const userID=localStorage.getItem('id'); 
    const start=getCurrentDate();
    const end=getCurrentDate(7);
    fetch("http://server/time/week.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userID,start,end}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        const tasksBD = data.tasks;
        const dummyTasks = tasksBD.map(task => {
            return {
                id: task.id,
                name: task.heading,
                description: task.description,
                expiration_date: task.expiration_date,
                priority: task.priority,
                status: task.status,
                creator: task.creator_user,
                responsibleUser: task.responsible_user
            }   
        });  
        setTasks(dummyTasks);   
     }
    })
    .catch((error) => {
      console.log("Ошибка при отправке запроса:", error);
    });
   }
    const future=()=>{
      const userID=localStorage.getItem('id'); 
      const time=getCurrentDate(7);
      fetch("http://server/time/week.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userID,time}),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          const tasksBD = data.tasks;
          const dummyTasks = tasksBD.map(task => {
              return {
                  id: task.id,
                  name: task.heading,
                  description: task.description,
                  expiration_date: task.expiration_date,
                  priority: task.priority,
                  status: task.status,
                  creator: task.creator_user,
                  responsibleUser: task.responsible_user
              }   
          });  
          setTasks(dummyTasks);   
       }
      })
      .catch((error) => {
        console.log("Ошибка при отправке запроса:", error);
      });
   }
  const addTask = () => {
    const data = {
      heading:heading,
      description:description,
      expiration_date: getCurrentDate(),
      creation_date: getCurrentDate(),
      updte_data: getCurrentDate(),
      priority:priority,
      status:status,
      creator_user: localStorage.getItem('id'),
      responsible_user: responsibleUser,
    };
   
    fetch("http://server/addTask.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        fetchTasks(); 
      }
    })
    .catch((error) => {
      console.log("Ошибка при отправке запроса:", error);
    });
  };
  const slaves = (selectID) => {
    const userID = localStorage.getItem('id'); 
    const slaveID = selectID; 
    fetch("http://server/slaves.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userID,slaveID}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        const tasksBD = data.tasks;
        const dummyTasks = tasksBD.map(task => {
            return {
                id: task.id,
                name: task.heading,
                description: task.description,
                expiration_date: task.expiration_date,
                priority: task.priority,
                status: task.status,
                creator: task.creator_user,
                responsibleUser: task.responsible_user
            }   
        });  
        setTasks(dummyTasks);   
     }
    })
    .catch((error) => {
      console.log("Ошибка при отправке запроса:", error);
    });
  }

  const editTask = (task) => {
    
    if (task.creator != localStorage.getItem('id')) {
      setDisabledFields(true);
      alert(task.creator);
    alert(localStorage.getItem('id'));
    }
    else{
      setDisabledFields(false);
    }
    setId(task.id);
    setEditMode(true);
    setHeading(task.name);
    setDescription(task.description);
    setExpirationDate(task.expiration_date);
    setPriority(task.priority);
    setResponsibleUser(task.responsible_user);
    setShowModal(true);
   
    
  };

  const updateTask = () => {
    const data = {
      id:id,
      heading:heading,
      description:description,
      expiration_date: getCurrentDate(),
      creation_date: getCurrentDate(),
      updte_data: getCurrentDate(),
      priority:priority,
      status:status,
      creator_user: localStorage.getItem('id'),
      responsible_user: responsibleUser,
    };
   
    fetch("http://server/updateTask.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        fetchTasks();
      }
    })
    .catch((error) => {
      console.log("Ошибка при отправке запроса:", error);
    });
  };
    
 
  const selectFill = () => {
    const userID=localStorage.getItem('id');     
    fetch("http://server/select.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userID}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        const selectDB = data.users;
      
        const dummyUsers = selectDB.map(select => {
            return {
                id: select.id,
                name: select.name,
            }   
         
        });  
        setSelect(dummyUsers);
       
     }
    })
    .catch((error) => {
      console.log("Ошибка при отправке запроса:", error);
    });
  };
  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
};
  function getCurrentDate(daysToAdd = 0) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysToAdd);
  
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
  
    return `${year}-${month}-${day}`;
  };

  return (
    
    <Container>  
      
  <div>
    <h1>Tasks Page</h1><Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand onClick={() => setShowModal(true)} >Добавить задачу</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={fetchTasks}>Все задачи</Nav.Link>
         
            <NavDropdown title="По отвественным" id="navbarScrollingDropdown">  
      {select.map((item) => (
        <NavDropdown.Item onClick={() => slaves(item.id)}>{item.name}</NavDropdown.Item>
      ))} 
    </NavDropdown>
           
            <NavDropdown title="По дате" id="navbarScrollingDropdown">
            <NavDropdown.Item onClick={toDay}>На сегодня</NavDropdown.Item>
            <NavDropdown.Item onClick={onWeek}>На неделю</NavDropdown.Item>
            <NavDropdown.Item onClick={future}>Больше недели</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={logoutHandler} >
            Выход
            </Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
    {/* Модальное окно для добавления/редактирования задачи */}
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? "Изменить задачу" : "Добавить задачу"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formTask">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task name"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            disabled={disabledFields}
          />
          <Form.Label>Описание</Form.Label>
          <Form.Control
            type="text"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={disabledFields}
          />
          <Form.Label>Дата окончания</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            disabled={disabledFields}
          />
          <Form.Label>Приоритет</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={disabledFields}
          />
          <Form.Label>Исполнитель</Form.Label>
          <Form.Select disabled={disabledFields} aria-label="Default select example"onChange={(e) => setResponsibleUser(e.target.value)}>
          <option>...</option>
          {select.map((select) => (
          <option value={select.id}>{select.name}</option>   
          ))}    
          </Form.Select>
          <Form.Label>Статус</Form.Label>
          <Form.Select aria-label="Default select example"onChange={(e) => setStatus(e.target.value)}>
          <option>...</option>
          <option value={'к выполнению'}>К выполнению</option>
          <option value={'выполняется'}>Выполняется</option>       
          <option value={'выполнена'}>Выполнена</option>    
          <option value={'отменена'}>Отменена</option>    
          </Form.Select>

        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {editMode ? (
          <Button variant="primary" onClick={updateTask}>
            Изменить
          </Button>
        ) : (
          <Button variant="primary" onClick={addTask}>
            Добавить
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>

    {/* Таблица с задачами */}
    <Table striped bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Заголовок</th>
          <th>Дата окончания</th>
          <th>Приоритет</th>
          <th>Статус</th>
          
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td style={{ color: 
            (task.status === 'выполнена') ? 'green' : 
            (task.status === 'отменена') ? 'gray' : 
            (task.expiration_date === getCurrentDate()) ? 'red' : 'black' 
            }}>{task.name}</td>
            <td>{task.expiration_date}</td>
            <td>{task.priority}</td>
            <td>{task.status }</td>
           
            <td className="d-grid gap-2">
              <Button  variant="warning"  onClick={() => editTask(task)}>
                Изменить
              </Button>{" "}
             
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
  
  </Container>  
  );
};
