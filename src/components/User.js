import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroupItem, Container, Row, Col, Button, CloseButton } from 'react-bootstrap';
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
  const month = time.getMonth();
  const day = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();


let timeActual= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

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
          onClick={(e) =>{
          let reg = /\d+/g;
          let timeStart = user.time.start.match(reg);
          console.log(timeStart);

          setUser({
            ...user,
            time: {
              ...user.time,
              stop: year + '-' + month +'-'+ day +" "+ hours +':'+ minutes +":"+ seconds,
              direction: (year - timeStart[0]) + '-' + (month - timeStart[1]) +'-'+ (day - timeStart[2]) +" "+ (hours - timeStart[3]) +':'+ (minutes - timeStart[4]),
            },
          })
        }}
      >STOP</button>
      <button>Save</button>
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
      <Card style={{ width: '30rem', background:"#031956", color:'white', borderRadius: 30, marginTop:30, padding: "30px 25px", fontSize:'1.5rem'}}>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Czas rozpoczęcia zadania</Card.Subtitle>
        <Card.Text>
          {user.time.start}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Czas zakończenia zadania</Card.Subtitle>
        <Card.Text>
          {user.time.stop}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Czas trwania zadania</Card.Subtitle>
        <Card.Text>
          {user.time.direction}
        </Card.Text>
        <CloseButton aria-label="Hide"  style={{marginRight: 10 ,backgroundColor: '#EB05FF', fontSize:'1.5rem'}} onClick={() => deleteUser(user.id)}></CloseButton>
        <Button className=" d-flex align-items-center justify-content-center" variant="outline-dark" style={{background:"#EB05FF", border: 'none', marginTop:'2rem'}} onClick={() => setIsEditable(true)}>edit</Button>
      </Card.Body>
    </Card>
    </>
  );
}

export default User;
