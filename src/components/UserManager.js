import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import User from "./User";
import {ListGroup, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API = "http://localhost:3000/posts";


export default function UserManager() {
  const [usersList, setUsersList] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const getUsers = () => {
    fetch(API)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("oops...");
      })
      .then(setUsersList)
      .catch((err) => console.log(err));
  };

  useEffect(getUsers, []);
  return (
    <>
      <header className="d-flex align-items-center justify-content-center">
        <Container style={{marginTop: 50}} fluid="xs">
          <Row>
            <Col className=" d-flex align-items-center justify-content-center"><h2>Add new Task</h2></Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center justify-content-center">
            {
          showAdd?<Button 
          variant="outline-dark" 
          style={{background:"#7D29DF"}} 
          onClick={()=>setShowAdd(false)}>Choose</Button>:<Button 
          variant="outline-dark" 
          style={{background:"#7D29DF"}} 
          onClick={()=>setShowAdd(true)}>Add</Button>
        }
      
            </Col>
          </Row>
          <Row>
            <Col xs lg="2" className=" d-flex align-items-center justify-content-center">
            {
              showAdd?<AddUser refreshList={getUsers} />:null
            }
            </Col>
          </Row>
        </Container>

        
      </header>
    <main>
      <ListGroup style={{listStyleType: "none" }} className="border d-flex align-items-center justify-content-center">
        {usersList ? (
          usersList.map((userInfo) => (
            <User key={userInfo.id} user={userInfo} refreshList={getUsers}/>
          ))
        ) : (
          <>loading user...</>
        )}
      </ListGroup>
    </main>
    </>
  );
}

export { API };
