import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stylesheet from './Components/StyleSheet';
import ItemList from './Components/ItemList';


function App() {


  return (
    <Router>

    <NavBar/>
    <Routes>
     <Route path="/" element= {<ItemList/>} />
    </Routes>
    </Router> 
  )
}

export default App;
