import {useState, useEffect} from 'react';
const API_BASE = "https://pizzamanagement.herokuapp.com";
//const API_BASE = "http://localhost:3000"

function PizzaList() {

  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [addPopupActive, setAddPopupActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [editPopupActive, setEditPopupActive] = useState(false);
  const [newPizzaToppings, setNewPizzaToppings] = useState([]);
  const [newPizzaName, setNewPizzaName] = useState([]);
  const [activePizza, setActivePizza] = useState("");

  useEffect(() =>{
    getPizzas();
    getToppings();
    document.title = "Pizza Management"
  }, [])

// Actively get the toppings from the database

  const getPizzas = () => {
    fetch(API_BASE + '/pizzas')
    .then(res => res.json())
    .then(data => setPizzas(data))
    .catch(err => console.error("Error: ", err));
  }

  const getToppings = () => {
    fetch(API_BASE + '/toppings')
    .then(res => res.json())
    .then(data => setToppings(data))
    .catch(err => console.error("Error: ", err));
  }

// Add a brand new topping to the list

  const addPizza = async() =>{
    newPizzaToppings.sort();

    const data = await fetch(API_BASE + "/pizza/new/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newPizzaName,
        toppings: newPizzaToppings
      })
    })
    .then(res=>res.json())
    .catch();

    //check if it's an error, if not then add the pizza to the database
    if(data.errMessage === 'Error: Duplicate'){
      setErrorMessage(true);
    }
    else{
      setErrorMessage(false);
      setPizzas([...pizzas, data]);
      setAddPopupActive(false);
      setNewPizzaName("");
      setNewPizzaToppings([]);
    }
  }

  const deletePizza = async id => {
    const data = await fetch(API_BASE + "/pizza/delete/" + id, {
      method: "DELETE"
    }).then (res => res.json());

    setPizzas(pizzas => pizzas.filter(pizzas => pizzas._id !== data._id));
  }

  const editPizza = async pizza =>{
    const data = await fetch(API_BASE + "/pizza/edit/" + pizza._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newPizzaName,
        toppings: newPizzaToppings
      })
    }).then (res => res.json());


    if(data.errMessage === 'Error: Duplicate'){
      setErrorMessage(true);
    }
    else{
    setErrorMessage(false);
    setEditPopupActive(false);
    await getPizzas();
    }
  }

  const handleCheck = (e) => {
    if(e.target.checked){
      setNewPizzaToppings([...newPizzaToppings, e.target.value]);
      console.log(newPizzaToppings);
    }
    else{
      setNewPizzaToppings(newPizzaToppings => newPizzaToppings.filter(newPizzaToppings => newPizzaToppings !== e.target.value));
      console.log(newPizzaToppings);
    }
  }

  const exitEditClick = () => {
    setErrorMessage(false);
    setEditPopupActive(false);
  }

  const exitAddClick = () => {
    setErrorMessage(false);
    setNewPizzaToppings([]);
    setNewPizzaName("");
    setAddPopupActive(false);
  }

  const startEdit = id =>{
    setActivePizza(id);
    setEditPopupActive(true);
  }

  return (
    <div className="App">
      <h1>Welcome, Pizza Chef!</h1>
      <h2>Your Pizzas</h2>

      <div className = "pizzas">
        {(pizzas.map(pizza => (        
          <div className ="list" key={pizza._id}>
            <div className = "pizza-name">{pizza.name}</div>
            <div className = "topping-list">{(pizza.toppings.map(toppings => (
              <div><p>{toppings}</p></div>)))}</div>
            <div className = "btn-edit" onClick={() => startEdit(pizza)}>Edit</div>
            <div className = "btn-delete" onClick={() => deletePizza(pizza._id)}>Delete</div>
          </div>)))}
      </div>

      <div className='addPopup' onClick={() => setAddPopupActive(true)}>+</div>
      {addPopupActive ? (
        <div className="popup">
          <div className='closePopup' onClick={exitAddClick}>x</div>
            <div className='content'>
              <h3>Add New Pizza</h3>
              <div className='ErrorMessage'>{errorMessage ? 'Error: Duplicate or Empty String' : ''}</div>

              <input
                type="text"
                className="add-topping-input"
                onChange={e => setNewPizzaName(e.target.value)}
                value={newPizzaName}/>

              <div className='choices'>
                {(toppings.map(topping => (        
                    <div className ="choice" >
                        <div className = "name">{topping.name}</div>
                        <input
                        type="checkbox"
                        name = {topping.name}
                        onChange={e => handleCheck(e)}
                        value={topping.name}/>
                    </div>)))}             
                </div>   

                <div className='button' onClick={addPizza}>Create New Pizza</div>
            </div>
        </div>
      ): ''}

      
    {editPopupActive ? (
        <div className="popup">
          <div className='closePopup' onClick={exitEditClick}>x</div>
            <div className='content'>
              <h3>Edit Topping</h3>
              <div className='ErrorMessage'>{errorMessage ? 'Error: Duplicate or Empty String' : ''}</div>

              <input
                type="text"
                className="add-topping-input"
                onChange={e => setNewPizzaName(e.target.value)}
                value={newPizzaName}/>

              <div className='choices'>
                {(toppings.map(topping => (        
                    <div className ="choice" >
                        <div className = "name">{topping.name}</div>
                        <input
                        type="checkbox"
                        name = {topping.name}
                        onChange={e => handleCheck(e)}
                        value={topping.name}/>
                    </div>)))}             
                </div>   

              <div className='button' onClick={() => editPizza(activePizza)}>Edit Pizza</div>
            </div>
        </div>
      ): ''}  
      </div>
  );
}

export default PizzaList;
