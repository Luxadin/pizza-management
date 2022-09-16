import {useState, useEffect} from 'react';
//const API_BASE = "https://pizzamanagement.herokuapp.com";
const API_BASE = "http://localhost:3000"

function ToppingList() {

  const [toppings, setToppings] = useState([]);
  const [addPopupActive, setAddPopupActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [newTopping, setNewTopping] = useState("");

  useEffect(() =>{
    GetToppings();
    document.title = "Topping Management"
  }, [])

// Actively get the toppings from the database

  const GetToppings = () => {
    fetch(API_BASE + '/toppings')
    .then(res => res.json())
    .then(data => setToppings(data))
    .catch(err => console.error("Error: ", err));
  }

// Add a brand new topping to the list

  const addTopping = async() =>{
    const data = await fetch(API_BASE + "/toppings/new/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newTopping
      })
    })
    .then(res=>res.json())
    .catch();

    const response = data;

    //check if it's an error, if not then add the topping to the database
    if(response !== 400){
      setToppings([...toppings, data]);
    }


    setAddPopupActive(false);
    setNewTopping("");
  }

  const deleteTopping = async id => {
    const data = await fetch(API_BASE + "/toppings/delete/" + id, {
      method: "DELETE"
    }).then (res => res.json());

    setToppings(toppings => toppings.filter(toppings => toppings._id !== data._id));
  }

  return (
    <div className="App">
      <h1>Welcome, Pizza Manager!</h1>
      <h4>Your Toppings</h4>

      <div className = "toppings">
        {(toppings.map(topping => (        
          <div className ="list">
            <div className = "name">{topping.name}</div>
            <div className = "btn-edit" onClick={() => setEditActive(true)}>Edit</div>
            <div className = "btn-delete" onClick={() => deleteTopping(topping._id)}>Delete</div>
          </div>)))}
      </div>

      <div className='addPopup' onClick={() => setAddPopupActive(true)}>+</div>
      {addPopupActive ? (
        <div className="popup">
          <div className='closePopup' onClick={() => setAddPopupActive(false)}>x</div>
            <div className='content'>
              <h3>Add Topping</h3>
              <div className='ErrorMessage'></div>
              <input
                type="text"
                className="add-topping-input"
                onChange={e => setNewTopping(e.target.value)}
                value={newTopping}/>
                <div className='button' onClick={addTopping}>Create Topping</div>
            </div>
        </div>
      ): ''}
    </div>
  );
}

export default ToppingList;
