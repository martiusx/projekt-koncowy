import React, {Component} from "react";
import {useState} from 'react';
import ReactDOM from "react-dom";

const TaskSelect = () =>{
  const [task, setTask] = useState([]);

  const addTask = (e) => {
    e.preventDefault()
    if(text === ''){
      console.log('puste');
    }else{
      setTask((prevState) => [...prevState, text]);
      console.log(task);
    }
   
  };
  let text = '';

  return(
    <form onSubmit={addTask}>
        <h1>Wybierz/Dodaj czynność</h1>
      <select>
        {
          task.map((el, index)=>{
            return <option key={index}>{el}</option>
          })
        }
      </select>
    <input type="text" onChange={(e)=>{
      text = e.target.value;
    }}></input>
    <button>Zapisz</button>
  </form>
  )
}

export default TaskSelect;