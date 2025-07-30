import React, { useState } from 'react';
import './App.css';
import Cookies from 'js-cookie';
import { useOutletContext } from 'react-router-dom';





function App()
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const UsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const PasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onClickSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    if(username=="Anushka"&&password=="1234"){
      Cookies.set("cookieconstant",username,{path:'/'} );
      
      window.location="http://localhost:3000/Home"
     
    }
    else{
      alert("invalid");
    }

  };
 
  // const loginUser=()=>{
  //   setUser({username:"Anushka", password:"1245"})
  //  }

  //  const logout=()=>{
  //   setUser(null);
  // }

   
  return (
    
    <div className="container">
      <h1 className ="heading"><p>Order</p> Tracker</h1>
      <form onSubmit={onClickSubmit}>
        <p className='label'>Username:</p>
        <input type="text" value={username} onChange={UsernameChange} placeholder="Enter per no" />
        <br />
        <p className='label'>Password:</p>
        <input type="password" value={password} onChange={PasswordChange} placeholder="Enter ADIO password" />
        <br />
        <button type="submit"   >Login</button>
      </form>

     
    </div>


  );
}

export default App;