/*
 * HeaderComponent
 *
 * Navigeringsbar for å navigere adminsidene.
 * 
 * Lagd av 6003
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Link } from 'react-router-dom';

function A_Header() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <h2><a className="navbar-brand">Administrator</a></h2>
        <div>
          <ul className="navbar-nav mr-auto">

            <li className="nav-item">
              <h3><Link className="nav-link" to="/A_Inventar">Inventar</Link></h3>
            </li>

            <li className="nav-item">
              <h3><Link className="nav-link" to="/A_Bestillinger">Bestillinger</Link></h3>
            </li>

            <li className="nav-item">
              <h3><Link className="nav-link" to="/A_Tellelister">Tellelister</Link></h3>
            </li>

            <li className="nav-item">
              <h3><Link className="nav-link" to="/A_Dokumentasjon">Dokumentasjon</Link></h3>
            </li>

            <li className="nav-item">
              <h3><Link className="nav-link" to="/A_Lager">Lager</Link></h3>
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

export default A_Header;
