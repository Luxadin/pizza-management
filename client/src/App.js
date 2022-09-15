import {useState, useEffect} from 'react';
const API_BASE = process.env.API_BASE || "http://localhost:3000";

function App() {

  const [toppings, setToppings] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTopping, setNewTopping] = useState("");

  useEffect(() =>{
    GetToppings();
  }, [])

  const GetToppings = () => {
    fetch(API_BASE + '/toppings')
    .then(res => res.json())
    .then(data => setToppings(data))
    .catch(err => console.error("Error: ", err));
  }

  const addTopping = async() =>{
    const data = await fetch(API_BASE + "/toppings/new/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newTopping
      })
    }).then(res=>res.json());

    setToppings([...toppings, data]);

    setPopupActive(false);
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
        {toppings.map(topping => (        
          <div className ="topping">
            <div className = "name">{topping.name}</div>
            <div className = "edit-topping">Edit</div>
            <div className = "delete-topping" onClick={() => deleteTopping(topping._id)}>Delete</div>
          </div>))}
      </div>

      <div className='addPopup' onClick={() => setPopupActive(true)}>+</div>
      {popupActive ? (
        <div className="popup">
          <div className='closePopup' onClick={() => setPopupActive(false)}>x</div>
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

export default App;
