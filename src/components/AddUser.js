import React, { useState, useEffect } from "react";
import { API } from "./UserManager";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function AddUser({ refreshList, props }) {
  const [user, setUser] = useState({
    name: "",
    time: {
      start: 0,
      stop: 0,
      direction: 0,
    },
  });

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


  const addUser = (e, props) => {
    e.preventDefault();
    fetch(API, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        refreshList();
      })
      .catch((error) => {
        console.log(error);
      });

  };


  return (
    <>    
    <form style={{marginBottom:'2.5rem'}} onSubmit={addUser} >
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
      <button style={{background:"#EB05FF", border: 'none', marginLeft:'2rem', padding:'.3rem .7rem',borderRadius:'5px'}} onClick={(e) =>{
      setUser({
        ...user,
        time:{
          ...user.time,
          start: timeActual,
        }
      })
      }}>Save</button>
    </form>
    </>

  );
}

export default AddUser;
