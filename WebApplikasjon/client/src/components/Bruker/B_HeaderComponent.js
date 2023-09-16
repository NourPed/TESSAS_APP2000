/*
 * B_HeaderComponent
 *
 * Komponent for navigering blant brukersidene.
 * 
 * Lagd av 6003
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StorageLocationContext } from '../StorageLocationContext';


function B_Header() {
  const { selectedStorage } = useContext(StorageLocationContext);

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <h2><a className="navbar-brand">{selectedStorage || 'BrukerID\\Tentativ'}</a></h2>
        <div>
          <ul className="navbar-nav mr-auto">

            <li className="nav-item">
              <h3><Link className="nav-link" to="/B_Bestill">Bestillinger</Link></h3>
            </li>

            <li className="nav-item">
              <h3><Link className="nav-link" to="B_AktiveBestillinger">Aktive Bestillinger</Link></h3>
            </li>

            <li className="nav-item">
              <h3><Link className="nav-link" to="/B_Tellelister">Tellelister</Link></h3>
            </li>

            <li className="nav-item">
              <h3><Link className="nav-link" to="/B_Veiledninger">Veiledninger</Link></h3>
            </li>

            <li className="nav-item">
              <h3><Link className="nav-link" to="/OmOss">Om Oss</Link></h3>
            </li>

          </ul>
        </div>
      </nav>
    </div>
  );
};

export default B_Header;
