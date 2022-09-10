import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import User from "./User";
import {ListGroup, Button,CloseButton, Container, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API = "http://localhost:3000/posts";


export default function UserManager(props) {
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
            <Col className=" d-flex align-items-center justify-content-center" style={{color:'white'}}><h2 style={{fontSize: '3.5rem'}}>Add new Task</h2></Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center justify-content-center">
            {
          showAdd?<Button 
          variant="outline-dark" 
          style={{background:"#EB05FF", margin:'2rem'}} 
          onClick={()=>setShowAdd(false)}>Choose</Button>:<CloseButton 
          aria-label="Hide"  
          style={{marginRight: 10 ,backgroundColor: '#EB05FF', transform: 'rotate(45deg)', margin:'2rem', fontSize:'2rem'}} 
          onClick={()=>setShowAdd(true)}></CloseButton>

        }
      
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center justify-content-center">
            {
              showAdd?<AddUser refreshList={getUsers}></AddUser>:null
            }
            </Col>
          </Row>

        </Container>

        
      </header>
    <main>
      <ListGroup style={{listStyleType: "none", padding:0 }} className="border d-flex align-items-center justify-content-center">
        {usersList ? (
          usersList.map((userInfo) => (
            <User key={userInfo.id} user={userInfo} refreshList={getUsers}/>
          ))
        ) : (
          <Spinner animation="border" />
        )}
      </ListGroup>
    </main>
    </>
  );
}

export { API };
