import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';



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
  const navigate = useNavigate();

  function goHome(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            WanderList
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
 export default NavBar