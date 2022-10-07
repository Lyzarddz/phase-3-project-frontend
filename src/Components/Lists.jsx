import React, {useState, useEffect, useReducer} from "react";
import { Divider, List , Form} from "semantic-ui-react";
import Box from '@mui/material/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@mui/material/TextField';


const Lists = ({ item, setItem , setListId }) => {
  
  const [listLoad, setListLoad] = useState([]);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
  const [formData, setFormData] = useState({
      name: ""
  });
  const [editFormData, setEditFormData] = useState({
    name:""
  });


  useEffect(() => {
    fetch("http://localhost:9292/lists")
    .then((resp) => resp.json())
    .then((data) => {
      setListLoad(data)
    })
  }, [reducerValue])


  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function getListData(id) {
    fetch(`http://localhost:9292/items?list_id=${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setItem(data);
        setListId(id);
      })
  }

  function handleSubmit() {
    // Semantic UI React's Form component handles the preventDefault automatically!

    fetch("http://localhost:9292/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json());
      setFormData({ name: ""});
      forceUpdate()
  }
  
  function handleDeleteList(listToDelete){
    const updatedLists= listLoad.filter((list) => list.id !== listToDelete.id);
    setListLoad(updatedLists);
  }

  function handleDeleteClick (value) {
    fetch(`http://localhost:9292/lists/${value.id}`,{
      method: "DELETE",
    })
    .then((resp) => resp.json())
    .then(() => {
      handleDeleteList(listLoad);
      forceUpdate();
    })
  }

  function handleEditList(list) {
    const updatedList= listLoad.map((l) =>
   l.id === list.id ? list : l);
    setListLoad(updatedList);
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
      handleEditList(listLoad);
      forceUpdate();
    }) 
  }

  const items = item.map((value, id, list_id) => {
    list_id = value.list_id
    id = value.id

    return(
      <div>
        <h3>{value.name}</h3>
      </div>
    )
  
  })

  const lists= listLoad.map((l, idx)=> {
    return (
          <div key={idx} style={{ width: '8%' }}>
      <Box 
        sx={{
          display: 'grid',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          p: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        <div className="listBtn" onClick={ () => getListData(l.id)}> 
        <h3>{l.name} </h3> 
        </div>
        <div>
          
        <TextField id="outlined-basic" label="Rename List" variant="outlined" value={editFormData.name} 
        onChange={(e) => {setEditFormData(e.target.value)}}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleEditClick(l)
            setEditFormData({name:""})
         }
       }}
       />
        </div>
        <IconButton aria-label="delete" onClick={() => handleDeleteClick(l)} >
  <DeleteIcon fontSize="small" />
</IconButton>
      </Box>
    </div>
    )
  })

    return (
        <List >
    <h3  className="lists">* Your Lists: </h3>
    <Divider>
    <ul className="listsh"> {lists}
     </ul>     
    </Divider>
    <div className="lists">
        <h3 > Create list: </h3>
      <Form onSubmit={handleSubmit}>
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
    </div>
      </List>
    )
}

export default Lists;