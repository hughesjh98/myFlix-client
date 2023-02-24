import React from "react";

const LoginView = () =>{
     const handleEvent = (event) => {
        event.preventDefault();

        const data = {
            access: username,
            secret:password
        }

        fetch("https://movie-dash.herokuapp.com/login", {
            method:"POST",
            body:JSON.stringify(data)
        })
     };




return (
    <form onSubmit={handleSubmit}>
        <label>
             username:
             <input type="text"/>
              </label>
        <label>
            password:
             <input type="password"/>
             </label>
        <button type="submit"> submit</button>
    </form>
)
}