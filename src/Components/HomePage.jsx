import React from 'react'
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from 'react-router-dom';


const HomePage = () =>{
    const navigate = useNavigate();

    function makeList(e) {
        e.preventDefault();
        navigate("/list");
        console.log("clicked")
      }


    return (
        <div className= 'primary'>
     <h1 >Welcome to WanderList</h1>
     <h2>We help wanderlusts like yourself pack for your next adventure</h2>
     <div className='navBtn'>
     <Button className='btn' color="inherit" to="/list" onClick= {makeList} >Create List</Button>
     </div>
     </div>
    )
   
}

export default HomePage