import React from "react";
import ItemCard from "./ItemCard";
import { Card } from "semantic-ui-react";

const ItemList = ({itemLoad, setItemLoad, handleDeleteItem, items}) => {
    const cards= items?.map((item)=> {
        return(
            <ItemCard
            key={item.id}
            itemLoad={itemLoad}
            setItemLoad = {setItemLoad}
            handleDeleteItem={handleDeleteItem}
            items={items}
            />
        )
      
    })

    return (
        <Card>
            {cards}
        </Card>
    )

}

export default ItemList;