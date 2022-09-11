import React from "react";

// const ItemCard = ({ handleDeleteItem }) => {
    


    function handleDeleteClick () {
        fetch(`http://localhost:9292/items/${id}`,{
          method: "DELETE",
        })
        .then((resp) => resp.json())
        .then(() => {
          handleDeleteItem(plant)
        })
      }

// }
// export default ItemCard