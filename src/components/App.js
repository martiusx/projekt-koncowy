
import React from "react";
import UserManager from "./UserManager";
import '../App.css';

function App() {
  return (
    <div style={{background: "#D9DFF8", width: "100%", minHeight:"100vh"}} className=" d-flex align-items-center justify-content-center">
      <div style={{background: "#344FA1", width: "40rem", minHeight:"100vh", borderRadius:55, marginTop:'5rem'}}>
           <UserManager></UserManager>
      </div>
    </div>
);

}

export default App;
