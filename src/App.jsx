import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stylesheet from './Components/StyleSheet';
import MainPg from './Components/MainPg';
import ItemList from './Components/ItemList';
import { useEffect, useState } from 'react';




function App() {

  const [listLoad, setListLoad] = useState([]);
  const [itemLoad, setItemLoad] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/lists")
    .then((resp) => resp.json())
    .then((data) => {
      setListLoad(data)
    })
  }, [])


  useEffect(() => {
    fetch("http://localhost:9292/items")
    .then((resp) => resp.json())
    .then((data) => {
      setItemLoad(data)
      console.log(listLoad)
    })
  }, [])

  




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
