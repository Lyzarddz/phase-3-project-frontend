import React, {useState} from "react";
import { Form } from "semantic-ui-react";

const CreateList = () => {
    const [formData, setFormData] = useState({
        name: ""
    });

    function handleChange(event) {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
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
          setFormData({ name: ""})
        
      }


 return (
    <div className="listsc">
        <h2> Create list: </h2>
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
 )
}

export default CreateList;