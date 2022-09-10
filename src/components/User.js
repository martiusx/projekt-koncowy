import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroupItem, Container, Row, Col, Button } from 'react-bootstrap';
import {API} from "./UserManager";


function EditUser({ userToEdit, onEditUser }) {
  const [user, setUser] = useState(userToEdit);

  const [time, setTime] = useState(new Date());

  useEffect(
    () => {
      const intervalId = setInterval(() => {
      
        setTime(new Date());
      }, 1);
      return () => {
        clearInterval(intervalId)
      }
    } 
  )

  const year = time.getFullYear();
  const minuts = time.getMinutes();
  const seconds = time.getSeconds();

let timeActual= `${year} ${minuts} ${seconds}`;

  const editUser = (e) => {
    e.preventDefault();
    fetch(API + `/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onEditUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={editUser}>
      <input
        type="text"
        value={user.name}
        onChange={(e) =>
          setUser({
            ...user,
            name: e.target.value,
          })
        }
      />
      <input
        type="text"
        value={user.time.start}
        onChange={(e) =>
          setUser({
            ...user,
            time: {
              ...user.time,
              start: e.target.value,
            },
          })
        }
      />
      <button
          value={'STOP'}
          onClick={(e) =>
          setUser({
            ...user,
            time: {
              ...user.time,
              stop: timeActual,
            },
          })
        }
      >STOP</button>
      <button
        onClick={(e) =>
          setUser({
            ...user,
            time: {
              ...user.time,
              direction:user.time.start,
            },
          })
        }
      />
      <button>Zapisz</button>
    </form>
  );
}

function User({ user, setUser, refreshList }) {
  const [isEditable, setIsEditable] = useState(false);

  const deleteUser = (userId) => {
    fetch(API + `/${userId}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        refreshList();
      }
    });
  };
  if (isEditable) {
    return (
      <EditUser
        userToEdit={user}
        onEditUser={() => {
          refreshList();
          setIsEditable(false);
        }}
      />
    );
  }
  return (
    <>
    <ListGroupItem as='li' className="border d-flex align-items-center justify-content-center">
      <Card style={{color:"black", width: "40vw"}}>
        <Card.Body style={{textAlign: "center"}}>
          <Card.Title className="border d-flex align-items-center justify-content-center" style={{background:"#7D29DF", color:"#CAA8F3", height: 200}}>{user.name} </Card.Title>
          <Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Czas rozpoczęcia zadania</Card.Subtitle>
          {user.time.start}
          <Card.Subtitle className="mb-2 text-muted">Czas zakończenia zadania</Card.Subtitle>
          {user.time.stop}
          <Card.Subtitle className="mb-2 text-muted">Czas trwania zadania</Card.Subtitle>
          {user.time.start - user.time.stop}
          </Card.Text>
      
      <Button variant="outline-dark" style={{background:"#7D29DF", marginRight: 10}} onClick={() => deleteUser(user.id)}>delete</Button>
      <Button variant="outline-dark" style={{background:"#7D29DF"}} onClick={() => setIsEditable(true)}>edit</Button>
      </Card.Body>
      </Card>
    </ListGroupItem>
    </>
  );
}

export default User;
