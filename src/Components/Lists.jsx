import React, {useState, useEffect, useReducer} from "react";
import { Divider, List , Form} from "semantic-ui-react";
import Box from '@mui/material/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const Lists = () => {
  
  const [listLoad, setListLoad] = useState([]);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
  const [formData, setFormData] = useState({
      name: ""
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
  
  const lists= listLoad.map((l, idx)=> {


  function handleDeleteList(listToDelete){
    const updatedLists= lists.filter((list) => list.id !== listToDelete.id)
    setListLoad(updatedLists);
  }
const { id } = l

  function handleDeleteClick () {
    fetch(`http://localhost:9292/lists/${id}`,{
      method: "DELETE",
    })
    .then((resp) => resp.json())
    .then(() => {
      handleDeleteList(lists);
      forceUpdate();
    })
  }

    const listClick = (e) => {
      console.log(l.name)
    }
    return (
      
          <div key={idx} style={{ width: '8%' }}>
      <Box onClick={listClick}
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
        {l.name}
        <IconButton aria-label="delete" onClick={() => handleDeleteClick(l)} >
  <DeleteIcon />
</IconButton>
      </Box>
    </div>
    )

  })


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


    return (
        <List>
    <h3  className="lists">* Your Lists: </h3>
    <Divider>
    <ul className="listsh" >{lists}
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