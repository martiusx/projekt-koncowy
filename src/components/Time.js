
import React from "react";
import {useState, useEffect} from 'react';

const Time = (props)=>{

 
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



  return(
    <div>
        <p>{`Local time is ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`} </p>
    </div>
  )
}

export default Time;