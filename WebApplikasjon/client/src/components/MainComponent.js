/*
 * MainComponent
 *
 * [Legg inn beskrivelse av komponenten her]
 * 
 * Lagd av 6003
 */

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

//BRUKER SIDER
import B_AktiveBestillinger from './Bruker/B_AktiveBestillingerComponent';
import B_Bestill from './Bruker/B_BestillComponent';
import B_Header from './Bruker/B_HeaderComponent';
import B_Tellelister from './Bruker/B_TellelisterComponent';
import B_Veiledninger from './Bruker/B_VeiledningerComponent';

//GENERISKE SIDER
import Footer from './FooterComponent';
import OmOss from './OmOssComponent';

import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { StorageLocationContext } from './StorageLocationContext';

function MainBruker() {
  const { access, setAccess } = useContext(AppContext);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [storageLocations, setStorageLocations] = useState([]);
  const toggleAccess = () => {
    setAccess(access === 1 ? 2 : 1);
  };

  function SwitchWarehouse(e) {
    setSelectedStorage(e.target.value);
  };

  // Bruker useEffect for å hente data
  useEffect(() => {
    // GET opp mot API
    axios.get('http://localhost:3500/api/v1/warehouse')
      .then(response => {
        const locations = response.data.warehouses.map(item => item.location_name); // Feilen var at vi mappet over et objekt og ikke et array (i.e. måtte legge til 'warehouses')
        setStorageLocations(locations);
        setSelectedStorage(locations[0]) // Hvis denne ikke blir satt så har ikke Axios kjørt 
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <StorageLocationContext.Provider value={{ selectedStorage, setSelectedStorage }}>
      <React.Fragment>
        <B_Header toggleAccess={toggleAccess} />
        <button onClick={toggleAccess}>Bytt til ADMIN</button>
        <select id="select1" onChange={SwitchWarehouse}>
          {storageLocations.map((location_name) =>
            <option key={location_name} value={location_name}>{location_name}</option>
          )}
        </select>

        <Switch>
          <Route path='/B_Bestill' component={B_Bestill} />
          <Route path='/B_AktiveBestillinger' component={B_AktiveBestillinger} />
          <Route path='/B_Tellelister' component={B_Tellelister} />
          <Route path='/B_Veiledninger' component={B_Veiledninger} />
          <Route path='/OmOss' component={OmOss} />

          <Redirect to="/B_Bestill" />
        </Switch>
        <hr />
        <Footer />
      </React.Fragment>
    </StorageLocationContext.Provider>
  );
};

export default withRouter(MainBruker);

//Kilder:
/*
SELECT/Drop down listen er bygd utifra å modifisere kode funnet fra https://www.geeksforgeeks.org/how-to-get-selected-value-in-dropdown-list-using-javascript/ 
Alt med ruting kommer i hovedsak fra https://reactrouter.com/en/main som er dokumentasjons nettsiden for REACT-Router
*/