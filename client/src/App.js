import {useState } from 'react';
import ToppingList from './ToppingList';
import PizzaList from './PizzaList';

function App() {

  const [role, setRole] = useState(true);

  return (
    <div className="App">
      <div className = "toggle-role" onClick={() => setRole(!role)}>Toggle Role</div>
      {role ? <ToppingList/> : <PizzaList/>}
    </div>
  );
}

export default App;
