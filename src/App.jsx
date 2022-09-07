import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stylesheet from './Components/StyleSheet';
import HomePage from './Components/HomePage';
import ItemList from './Components/ItemList';


function App() {


  return (
    <Router>

    <NavBar/>
    <Routes>
     <Route path="/" element= {<HomePage />} />
     <Route path="/list" element= {<ItemList/>} />
    </Routes>
    </Router> 
  )
}

export default App;
