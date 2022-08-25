import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/user";


export default function NameForm(refreshList){
    //users information
    const [user, setUser] = useState({
        name: "",
    });

    //list of names from the database
    const [nameList, setNameList] = useState([]);

    //the name stored on the localhost
    const savedName = JSON.parse(localStorage.getItem('name'));

    //saving name in localhost
    const handleNameSave = (e)=>{
        localStorage.setItem("name", JSON.stringify(user.name));
        getName();

    }
    //add the user to the database
    const addUser = (e) =>{
            fetch(API, {
                method: "POST",
                body: JSON.stringify(user),
                headers:{
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data)=>{
                console.log(data);
                refreshList();
            }) 
            .catch((error) =>{
                console.log(error)
            })
        }        


        //extracting names from the database
        const getName = ()=>{
            axios.get(API).then((response) => {
                const categories = [];
                response.data.forEach(element => {
                    categories.push(element.name);
                });
                setNameList(categories);
                
            })
            }

//completing the names list at the start of the page
useEffect(() =>{
    const timer = setTimeout(()=>{
        getName();
    }, 1);
    return () => clearTimeout(timer);
}, []);

    //checking if the name is saved in localhost
    if(savedName === null || savedName === ""){
        
        return(
            
            <form onSubmit={addUser}>
                <input type="text" value={user.name} onChange={(e)=>{
                    if(nameList.includes(e.target.value)){
                        console.log('to imie już istnieje')
                    }else{
                        setUser({
                            ...user,
                            name: e.target.value.replace(/\s/g, ""),
                        })} 
                    }
                   
                }
                >
                </input>
                <input type="submit" value="send" onClick={handleNameSave}></input>
            </form>
        )
    }else{
        return(
            
            <>
                <h1>
                    WITAJ {savedName}
                </h1>
            </>
           

        )
    }
}