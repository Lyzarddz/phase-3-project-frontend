import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bton: {
    fontSize: '20px',
    color: "white"
  },
  title: {
    flexGrow: 1,
    padding: "30px",
    fontSize: "35px"
    
  },
}));

 function NavBar() {
  const classes = useStyles();
  


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            WanderList
          </Typography>
          <h1 className='navBtn'>-We help wanderlusts pack for their next adventure-</h1>
        </Toolbar>
      </AppBar>
    </div>
  );
}
 export default NavBar