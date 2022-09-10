import React from "react";
import ItemCard from "./ItemCard";
import { Card } from "semantic-ui-react";

const ItemList = ({itemLoad, setItemLoad}) => {
    const items= itemLoad.map((item)=> {
        return(
            <ItemCard
            key={item.id}
            />
        )
      
    })

}

export default ItemList;