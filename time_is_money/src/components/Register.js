import React, { useState } from 'react'
import axios from "axios"

const Register = () => {

    const initialState = {
        name: "",
        username: "",
        password: "",
      };
      const [input, setInput] = useState(initialState);
      const [message, setMessage] = useState(null);
      const [status, setStatus] = useState("failed");

      const handleChange = (event) => {
        setInput({ ...input, [event.target.id]: event.target.value });
      };
    
      const handleSubmit = (data) => {
        data.preventDefault();
        console.log(input);
    
        const newUser = {
          name: input.name,
          username: input.username,
          password: input.password,
        };
    
        axios
          .post("http://localhost:8000/api/users/", newUser, {
            method: "post",
            credentials: "include",
            headers: {
              'Content-Type':'application/json'
            }, 
            })
            .then((res) => {
              console.log(res.data);
              setMessage(res.data.message);
              setStatus(res.data.status);
              setInput(res.data);
    
            });
      };
     

    return (
        <div>
          <h3 className="regTitle">Register </h3>
          <form onSubmit={handleSubmit}>
              <div className="grid">
                  <label htmlFor="name" className="nameLabel">
                    Name:
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    // value={input.name}
                    placeholder="Ex: Firstname LastName"
                    id="name"
                    name="name"
                  />
                  <label htmlFor="username" className="userLabel">
                    Username:
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    // value={input.username}
                    placeholder="Ex: Hodl55"
                    id="username"
                    name="username" 
                  />
                  <label htmlFor="password" className="passLabel">
                    Password:
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    // value={input.password}
                    placeholder="Ex: ABcd1234"
                    id="password"
                    name="password" 
                  />
                  <input className="subBut" type="submit" />
              </div>
          </form>
        </div>
    )
}

export default Register
