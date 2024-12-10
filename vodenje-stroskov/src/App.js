// frontend_moj/src/App.js

import logo from './logo.svg';
import './App.css';
import SideBar from './components/Sidebar.jsx';
import TableComponent from './components/CostTracking.jsx';
import React, { useState, useEffect } from 'react';
import DodajOsebo from './components/DodajOsebo';

function App() {
  const [osebe, setOsebe] = useState([]);

  // Pridobivanje oseb iz backenda
  useEffect(() => {
    const fetchOsebe = async () => {
      try {
        const response = await fetch('/api/zaposleni');
        if (response.ok) {
          const data = await response.json();
          setOsebe(data);
        } else {
          console.error("Napaka pri pridobivanju oseb.");
        }
      } catch (error) {
        console.error("Napaka omrežja:", error);
      }
    };
    fetchOsebe();
  }, []);

  // Dodaj novo osebo v stanje
  const handleDodajOsebo = (novaOseba) => {
    setOsebe([...osebe, novaOseba]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <SideBar />
        <TableComponent />

        <h1>Seznam oseb</h1>
        <ul>
          {osebe.map((oseba) => (
            <li key={oseba.id}>
              {oseba.ime} {oseba.priimek} - {oseba.polozaj}
            </li>
          ))}
        </ul>

        <DodajOsebo onDodaj={handleDodajOsebo} />
      </header>
    </div>
  );
}

export default App;
