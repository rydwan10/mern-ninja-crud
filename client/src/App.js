import { useState, useEffect } from 'react'
import './App.css';

import NinjaList from './components/NinjaList';
import AddNinja from './components/AddNinja';

function App() {
  const [ninjas, setNinjas] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const getNinja = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/ninjas');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const getActualData = async () => {
    const data = await getNinja();
    setNinjas(data)
  }

  useEffect(() => {
    getActualData();
  }, [])

  return (
    <div className="outer-container">
      <div className="form-container">
        <AddNinja getActualData={() => { getActualData() }} />
      </div>
      <div className="container">
        <NinjaList ninjas={ninjas} isLoading={isLoading} getActualData={() => { getActualData() }} />
      </div>
    </div>
  );
}

export default App;
