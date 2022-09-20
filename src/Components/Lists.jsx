import React, {useState, useEffect} from "react";



const Lists = () => {
  
  
  const [listLoad, setListLoad] = useState([]);

  const lists= listLoad.map((l, idx)=> {
    return(
           <p key={idx}> - {l.name}</p>
    )

  })

  useEffect(() => {
    fetch("http://localhost:9292/lists")
    .then((resp) => resp.json())
    .then((data) => {
      setListLoad(data)
    })
  }, [])



    return (
      <div>
    <h4  className="lists">* Your Lists: {lists} </h4>
   </div>
    )
}




export default Lists;