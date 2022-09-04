
import React, {Component} from "react";
import {useState, useEffect} from 'react';
import ReactDOM from "react-dom";

const Time = ()=>{

 
  const [time, setTime] = useState(new Date());
  const [savedTimeStart, setSavedTimeStart] = useState({
    hours:0,
    minutes:0,
    seconds: 0,
    day:0,
    month:0,
    year:0,
  });
  const [savedTimeStop, setSavedTimeStop] = useState({
    hours:0,
    minutes:0,
    seconds: 0,
    day:0,
    month:0,
    year:0,
  });
  const [timeDirection, setTimeDirection] = useState({
    hours:0,
    minutes:0,
    seconds: 0,
    day:0,
    month:0,
    year:0,
  })
  const [start, setStart] = useState(true);

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


  const getTimeStart = () =>{
    const savedDateStart = new Date();

    setSavedTimeStart({
      hours:savedDateStart.getHours(),
      minutes:savedDateStart.getMinutes(),
      seconds:savedDateStart.getSeconds(),
      day:savedDateStart.getDate(),
      month:savedDateStart.getMonth(),
      year:savedDateStart.getFullYear(),
    })
    setStart(false);
  }


  const getTimeStop = () =>{
    const savedDateStop = new Date();

    setSavedTimeStop({
      hours:savedDateStop.getHours(),
      minutes:savedDateStop.getMinutes(),
      seconds:savedDateStop.getSeconds(),
      day:savedDateStop.getDate(),
      month:savedDateStop.getMonth(),
      year:savedDateStop.getFullYear(),
    })
    setStart(true);
  }

  const getTimeDirection = (e)=>{
    e.preventDefault();
    setTimeDirection({
      hours:savedTimeStop.hours - savedTimeStart.hours,
      minutes:savedTimeStop.minutes- savedTimeStart.minutes,
      seconds:savedTimeStop.seconds- savedTimeStart.seconds,
      day:savedTimeStop.day - savedTimeStart.day,
      month:savedTimeStop.month - savedTimeStart.month,
      year:savedTimeStop.year - savedTimeStart.year,
    })

  }

 

  return(
    <div>
      <form onSubmit={getTimeDirection}>
        <p>{`Local time is ${year} ${minuts} ${seconds} GMT+3`} </p>
        {
          start?<button onClick={getTimeStart}>Start</button>:<button onClick={getTimeStop}>Stop</button>
        }     
       <span>{timeDirection.hours}{timeDirection.minutes}{timeDirection.seconds}</span>
      </form>
    </div>
  )
}

export default Time;