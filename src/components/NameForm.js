import React, { useState } from "react";

import TaskSelect from "./TaskSelect";



export default function NameForm(){
    const [name, setName] = useState('');

    const handleNameChange = (e)=>{
        const ss = e.target.value.replace(/\s/g, "");
        setName(ss);
    }

    const handleNameSave = (e)=>{
        localStorage.setItem("name", JSON.stringify(name));
    }

    const savedName = JSON.parse(localStorage.getItem('name'));

    if(savedName === null || savedName === ""){
        return(
            <form>
                <input type="text" value={name} onChange={handleNameChange}>
                </input>
                <input type="submit" value="send" onClick={handleNameSave}></input>
            </form>
        )
    }else{
        return(
        <>  
          <h1>WITAJ {savedName}</h1>
            <TaskSelect></TaskSelect>  
        </>
        )
    }
}