import React, { useState , useEffect, useReducer } from 'react';
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
import Lists from './Lists';
import { Form } from "semantic-ui-react";


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
  const [search, setSearch]= useState("")
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
  const [formData, setFormData] = useState({
    name: ""
});
  

  useEffect(() => {
    fetch("http://localhost:9292/items")
    .then((resp) => resp.json())
    .then((data) => {
      setLeft(data)
    })
  }, [reducerValue])

  const item = left.filter((item) =>
  item.name?.toLowerCase().includes(search.toLowerCase())
  )
   


   function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit() {
    // Semantic UI React's Form component handles the preventDefault automatically!

    fetch("http://localhost:9292/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json());
      setFormData({ name: "", category:""});
      forceUpdate();
  }

  


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

  console.log(item.id)
  function handleEdit() {
    fetch(`http://localhost:9292/${item.id}`, {
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

  function handleDeleteClick () {
    fetch(`http://localhost:9292/items/`,{
      method: "DELETE",
    })
    .then((resp) => resp.json())
    .then(() => {
      handleDeleteItem(item)
    })
  }

  function handleDeleteItem(itemToDelete){
    const updatedItems= left.filter((item) => item.id !== itemToDelete.id)
    setLeft(updatedItems);
  }

 
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
      <ListItemText id={labelId} primary={`${value?.name}`} />
      <IconButton aria-label="delete" onClick={handleDeleteClick} >
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
        <Lists/>
        <br></br>
        <br></br>
        <h3> Add Item to list: </h3>
      <Form onSubmit={handleSubmit} >
        <Form.Group widths="equal">
          <Form.Input
            label="Name"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <br></br>
        </Form.Group>
        <Form.Button >Submit</Form.Button>
      </Form>
    
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
  
    </div>
  );
}
export default MainPg;