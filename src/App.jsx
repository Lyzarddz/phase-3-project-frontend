import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stylesheet from './Components/StyleSheet';
import MainPg from './Components/MainPg';
import Lists from './Components/Lists';
import { useEffect, useState } from 'react';
import ItemList from './Components/ItemList';




function App() {

 
  
  return (
    <Router>
    <NavBar/>
    <Routes>
     <Route path="/" element= {<MainPg/>} />
    </Routes>
    </Router> 
  )
}

export default App;
