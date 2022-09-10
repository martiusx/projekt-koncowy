import React, {useState, useEffect} from "react";
import axios from "axios";
import SingleUserComponent from "./SingleUserComponent";

function FetchUserComponent(){
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        axios
        .get('http://localhost:3000/posts')
        .then((res) => {
            console.log(res);
            setUsers(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    return(
        <>
            {users.map((user) => {
                return <option key={user.id}><SingleUserComponent  user={user}></SingleUserComponent></option>
            })}
        </>
    )
}

export default FetchUserComponent;