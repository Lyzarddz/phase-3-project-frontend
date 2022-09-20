// import React, {useState} from "react";
// import { Form } from "semantic-ui-react";

// const CreateItem = () => {
    // const [formData, setFormData] = useState({
    //     name: "",
    //     category: ""
    // });

    // function handleChange(event) {
    //     setFormData({
    //       ...formData,
    //       [event.target.name]: event.target.value,
    //     });
    //   }

      // function handleSubmit() {
      //   // Semantic UI React's Form component handles the preventDefault automatically!
    
      //   fetch("http://localhost:9292/items", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formData),
      //   })
      //     .then((r) => r.json());
      //     setFormData({ name: "", category:""})
      // }


//  return (
//     <div className="itemc">
//         <h2> Add Item to list: </h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group widths="equal">
//           <Form.Input
//             label="Name"
//             placeholder="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <br></br>
//           <Form.Input
//             label="Category"
//             placeholder="Category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//           />
//            <br></br>
//         </Form.Group>
//         <Form.Button  onClick={()=> {alert("Item Added")}}>Submit</Form.Button>
//       </Form>
//     </div>
//  )
// }

// export default CreateItem;