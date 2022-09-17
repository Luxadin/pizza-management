import {useState, useEffect} from 'react';
const API_BASE = 'https://pizzamanagement.herokuapp.com';
//const API_BASE = 'http://localhost:3000'

function ToppingList() {

  const [toppings, setToppings] = useState([]);
  const [addPopupActive, setAddPopupActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [editPopupActive, setEditPopupActive] = useState(false);
  const [newTopping, setNewTopping] = useState('');
  const [activeTopping, setActiveTopping] = useState('');

  useEffect(() =>{
    getToppings();
    document.title = 'Topping Management'
  }, [])

// Actively get the toppings from the database

  const getToppings = () => {
    fetch(API_BASE + '/toppings')
    .then(res => res.json())
    .then(data => setToppings(data))
    .catch(err => console.error('Error: ', err));
  }

// Add a brand new topping to the list

  const addTopping = async() =>{
    const data = await fetch(API_BASE + '/toppings/new/', {
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
    if(response.errMessage === 'Error: Duplicate'){
      setErrorMessage(true);
    }
    else{
      setErrorMessage(false);
      setToppings([...toppings, data]);
      setAddPopupActive(false);
      setNewTopping('');
    }
    console.log(errorMessage);
  }

  const deleteTopping = async id => {
    const data = await fetch(API_BASE + '/toppings/delete/' + id, {
      method: "DELETE"
    }).then (res => res.json());

    setToppings(toppings => toppings.filter(toppings => toppings._id !== data._id));
  }

  const editTopping = async topping =>{
    const data = await fetch(API_BASE + '/toppings/edit/' + topping._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newTopping
      })
    }).then (res => res.json());
    
    if(data.errMessage === 'Error: Duplicate'){
      setErrorMessage(true);
    }
    else{
    setErrorMessage(false);
    setEditPopupActive(false);
    await getToppings();
    }
  }

  const exitEditClick = () => {
    setErrorMessage(false);
    setEditPopupActive(false);
    setNewTopping('');
  }

  const exitAddClick = () => {
    setErrorMessage(false);
    setAddPopupActive(false);
    setNewTopping('');
  }

  const startAdd = () =>{
    setAddPopupActive(true);
    setEditPopupActive(false);
  }

  const startEdit = id =>{
    setActiveTopping(id);
    setAddPopupActive(false);
    setEditPopupActive(true);
  }

  return (
    <div className='App'>
      <h1>Welcome, Pizza Manager!</h1>
      <h2>Your Toppings</h2>

      <div className='toppings'>
        {(toppings.map(topping => (        
          <div className='list' key={topping._id}>
            <div className='name'>{topping.name}</div>
            <div className='btn-edit' onClick={() => startEdit(topping)}>Edit</div>
            <div className='btn-delete' onClick={() => deleteTopping(topping._id)}>Delete</div>
          </div>)))}
      </div>

      <div className='addPopup' onClick={startAdd}>+</div>

      {addPopupActive ? (
        <div className='popup'>
          <div className='closePopup' onClick={exitAddClick}>x</div>
            <div className='content'>
              <h3>Add Topping</h3>
              <div className='ErrorMessage'>{errorMessage ? 'Error: Duplicate or Empty String' : ''}</div>
              <input
                type='text'
                className='add-topping-input'
                onChange={e => setNewTopping(e.target.value)}
                value={newTopping}/>
                <div className='button' onClick={addTopping}>Create Topping</div>
            </div>
        </div>
      ): ''}

      {editPopupActive ? (
        <div className='popup'>
          <div className='closePopup' onClick={exitEditClick}>x</div>
            <div className='content'>
              <h3>Edit Topping</h3>
              <div className='ErrorMessage'>{errorMessage ? 'Error: Duplicate or Empty String' : ''}</div>
              <input
                type='text'
                className='edit-topping-input'
                onChange={e => setNewTopping(e.target.value)}
                value={newTopping}/>
                <div className='button' onClick={() => editTopping(activeTopping)}>Edit Topping</div>
            </div>
        </div>
      ): ''}      
    </div>
  );
}

export default ToppingList;
