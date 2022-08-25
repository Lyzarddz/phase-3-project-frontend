import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
     <h1>Hello World</h1>
    <Button className= { classes.button }>This is def button</Button>
    </div>
  );
}

export default App;
