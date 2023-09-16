/*
 * App
 *
 *Selve applikasjonen,
 *Bruker Browserrouter for å laste inn en "bunke" med komponenter og tilhørende routes ifra
 *enten MainBruker eller MainAdmin hovedkomponentene.
 *access variablen blir her brukt for å simulere skifte mellom instanser, i virkeligheten
 *ville dette basert seg på IP-aksessesring som er beskrevet i sluttrapporten 
 * Lagd av 6003
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainBruker from './components/MainComponent';
import MainAdmin from './components/MainComponentAdmin';
export const AppContext = createContext();

function App() {
  const [access, setAccess] = useState(1);

  return (
    <div className="App">
      <AppContext.Provider value={{ access, setAccess }}>
        <BrowserRouter>
          {access == "1" ? <MainBruker /> : <MainAdmin />}
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );

};

export default App;
