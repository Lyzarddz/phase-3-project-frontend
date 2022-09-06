import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import { Link, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

 function NavBar() {
  const classes = useStyles();
  // const navigate = useNavigate();

  function goHome(e) {
    e.preventDefault();
    // navigate("/");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            WanderList
          </Typography>
          <Button color="inherit"  onClick = { goHome }>Home</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
 export default NavBar