import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateItem from './CreateItem';
import CreateList from './CreateList';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    paddingTop: '35px'
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 400,
    height: 600,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const MainPg = () => {

 

  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const [listLoad, setListLoad] = useState([]);
  const [itemLoad, setItemLoad] = useState([]);
  const [search, setSearch] = useState("");

  console.log(left)

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
      setLeft(data)
    })
  }, [])

  // function handleDeleteItem(itemToDelete){
  //   const updatedItems= itemLoad.filter((item) => item.id !== itemToDelete.id)
  //   setItemLoad(updatedItems);
  // }


  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  const numberOfChecked = (listItems) => intersection(checked, listItems).length;

  const handleToggleAll = (listItems) => () => {
    if (numberOfChecked(listItems) === listItems.length) {
      setChecked(not(checked, listItems));
    } else {
      setChecked(union(checked, listItems));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const { id } = left;

  function handleEdit() {
    fetch(`http://localhost:9292/items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: "",
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  }

  // function handleDeleteClick () {
  //   fetch(`http://localhost:9292/items/${id}`,{
  //     method: "DELETE",
  //   })
  //   .then((resp) => resp.json())
  //   .then(() => {
  //     handleDeleteItem(items)
  //   })
  // }
 


useEffect (() => {
console.log(left)
}, [])


  const customList = (title, listItems) => (
    
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(listItems)}
            checked={numberOfChecked(listItems) === listItems.length && listItems.length !== 0}
            indeterminate={numberOfChecked(listItems) !== listItems.length && numberOfChecked(listItems) !== 0}
            disabled={listItems.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(listItems)}/${listItems.length} selected`}
      />
       
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {listItems.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value.id} role="listitem" >
              <ListItemIcon onClick={handleToggle(value)}>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
     </ListItemIcon>
      <ListItemText id={labelId} primary={`${value?.category}`} />
      <IconButton aria-label="delete" >
  <DeleteIcon />
</IconButton>
<Button className='primary' onClick={handleEdit}>Edit</Button>
      </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
  

  

  return (
    <div className='primary'>
        <h1 >Welcome to WanderList</h1>
        <h2>-We help wanderlusts pack for their next adventure-</h2>
        <CreateList/>
        <h2 className='primary'>Let's get packing!</h2>
        <p>(Scroll below to add custom item to list)</p>

    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList('Items', left)}</Grid>
   

    
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('My Items', right)}</Grid>
    </Grid>
    <CreateItem/>
    </div>
  );
}
export default MainPg;