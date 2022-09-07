import React from 'react'
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';


const HomePage = () =>{


    return (
        <div className= 'primary'>
     <h1 >Welcome to WanderList</h1>
     <h2>We help wanderlusts like yourself pack for your next adventure</h2>
     <div className='navBtn'>
     <Button color="inherit" to="/" >Create List</Button>
     </div>
     </div>
    )
   
}

export default HomePage