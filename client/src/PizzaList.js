import {useState, useEffect} from 'react';
//const API_BASE = "https://pizzamanagement.herokuapp.com";
const API_BASE = "http://localhost:3000"

function PizzaList() {

  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [addPopupActive, setAddPopupActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [newTopping, setNewTopping] = useState("");

  useEffect(() =>{
    GetPizzas();
    GetToppings();
    document.title = "Pizza Management"
  }, [])

// Actively get the toppings from the database

  const GetPizzas = () => {
    fetch(API_BASE + '/pizzas')
    .then(res => res.json())
    .then(data => setPizzas(data))
    .catch(err => console.error("Error: ", err));
  }

  const GetToppings = () => {
    fetch(API_BASE + '/toppings')
    .then(res => res.json())
    .then(data => setToppings(data))
    .catch(err => console.error("Error: ", err));
  }

// Add a brand new topping to the list

  const addPizza = async() =>{
    const data = await fetch(API_BASE + "/pizza/new/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(res=>res.json())
    .catch();

    const response = data;

    //check if it's an error, if not then add the pizza to the database
    if(response !== 400){
      setPizzas([...pizzas, data]);
    }


    setAddPopupActive(false);
    //setNewPizza("");
  }

//  const toggleEdit = () =>{
//    setEditActive(true);
//  }

  const deletePizza = async id => {
    const data = await fetch(API_BASE + "/pizza/delete/" + id, {
      method: "DELETE"
    }).then (res => res.json());

    setPizzas(pizzas => pizzas.filter(pizzas => pizzas._id !== data._id));
  }

  return (
    <div className="App">
      <h1>Welcome, Pizza Chef!</h1>
      <h4>Your Pizzas</h4>

      <div className = "pizzas">
        {(pizzas.map(pizza => (        
          <div className ="list">
            <div className = "Topping-List">{(pizza.toppings.map(toppings => (<div><p>{toppings}</p></div>)))}</div>
            <div className = "btn-edit" onClick={() => setEditActive(true)}>Edit</div>
            <div className = "btn-delete" onClick={() => deletePizza(pizza._id)}>Delete</div>
          </div>)))}
      </div>

      <div className='addPopup' onClick={() => setAddPopupActive(true)}>+</div>
      {addPopupActive ? (
        <div className="popup">
          <div className='closePopup' onClick={() => setAddPopupActive(false)}>x</div>
            <div className='content'>
              <h3>Add New Pizza</h3>
              <div className='ErrorMessage'></div>
              <div className='choices'>
                {(toppings.map(topping => (        
                    <div className ="choice">
                        <div className = "name">{topping.name}</div>
                        <input
                        type="checkbox"
                        name = {topping.name}
                        onChange={e => setNewTopping(e.target.value)}
                        value={newTopping}/>
                    </div>)))}             
                </div>   
                <div className='button' onClick={addPizza}>Create New Pizza</div>
            </div>
        </div>
      ): ''}
      </div>
  );
}

export default PizzaList;
