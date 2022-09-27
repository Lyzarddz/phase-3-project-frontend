import React, { useState , useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
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

const MainPg = () => {

  const classes = useStyles();
  const [item, setItem] = useState([]);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
  const [editFormData, setEditFormData] = useState("")
  const [toggle, setToggle] = useState(true)
  const [formData, setFormData] = useState({
    name: ""
});

  useEffect(() => {
    fetch("http://localhost:9292/items")
    .then((resp) => resp.json())
    .then((data) => {
      setItem(data)
    })
  }, [reducerValue])
   
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

  function handleDeleteItem(itemToDelete){
    const updatedItems= item.filter((items) => items.id !== itemToDelete.id)
    setItem(updatedItems);
  }

  function handleDeleteClick (value) {
    fetch(`http://localhost:9292/items/${value.id}`,{
      method: "DELETE",
    })
    .then((resp) => resp.json())
    .then(() => {
      handleDeleteItem(item);
      forceUpdate();
    })
  }

  function handleEditItem(item) {
    const updatedItem= item.map((i) =>
   i.id === item.id ? item : i);
    setItem(updatedItem);
  };

  function handleEditClick(value) {
   
    fetch(`http://localhost:9292/lists/${value.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: editFormData
    }),
  })
    .then((response) => response.json())
    .then(() => {
      handleEditItem(item);
      setEditFormData("");
      forceUpdate();
    }) 
  }
  
  const customList = (title, listItems) => (
    
    <Card>
      <CardHeader className='primary' title={title}/>
        <Divider />
      <List className={classes.list} dense component="div" role="list">
        {listItems.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            
            <ListItem key={value.id} role="listitem" > 
            {toggle ? (
              <p
               onDoubleClick={() => {
              setToggle(false)
             }}
             >{value.name} </p>
              ) : (
                <input
                type='text'
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setToggle(true)
                 }
               }}
              />
              )}


    
      <IconButton aria-label="delete" onClick={() => handleDeleteClick(value)} >
  <DeleteIcon />
</IconButton>

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
      <Grid item>{customList('Items To Pack', item)}</Grid>
      <Grid item>
      </Grid>
    
    </Grid>
  
    </div>
  );
}
export default MainPg;