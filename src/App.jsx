import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './Components/NavBar';
import Stylesheet from './Components/StyleSheet';

const useStyles = makeStyles({
  button: {
    backgroundColor: "red",
    padding: "20px"
  }
})
  
function App() {
const classes = useStyles();

  return (
    <div>
     <NavBar/>
     <h1>Welcome to WanderList</h1>
     <h2>We help wanderlusts like yourself pack for your next adventure</h2>
    <Button className= { classes.button }>Create List</Button>
    </div>
  );
}

export default App;
