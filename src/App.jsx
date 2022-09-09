import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stylesheet from './Components/StyleSheet';
import MainPg from './Components/MainPg';
import ItemList from './Components/ItemList';
import { useEffect, useState } from 'react';




function App() {

  const [listLoad, setListLoad] = useState([]);
  const [itemLoad, setItemLoad] = useState([]);




  return (
    <Router>
      <ItemList/>

    <NavBar/>
    <Routes>
     <Route path="/" element= {<MainPg/>} />
    </Routes>
    </Router> 
  )
}

export default App;
