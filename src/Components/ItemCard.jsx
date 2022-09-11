import React , {useEffect}from "react";
import { Card, Container, Grid , List} from "semantic-ui-react";

const ItemCard = ({ handleDeleteItem , items}) => {
    
const { id } = items

    function handleDeleteClick () {
        fetch(`http://localhost:9292/items/${id}`,{
          method: "DELETE",
        })
        .then((resp) => resp.json())
        .then(() => {
          handleDeleteItem(items)
        })
      }

      useEffect(()=>{
        console.log(items)
      })

      function handleEditClick () {
      }

      return (
        <Card>
            <div className="itemL">
              
                <Grid>
                   Item: {items.name}
                </Grid>
                <Grid>
                Category: {items.category}
                </Grid>
                <button className='="del-btn' onClick={handleDeleteClick}> Delete </button>
                <button className='="del-btn' onClick={handleEditClick}> Edit </button>
                <button className='="del-btn' onClick={handleEditClick}> + </button>
                <br></br>
                <br></br>
                

            </div>
        </Card>
      )

}
export default ItemCard