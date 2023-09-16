/*
 * MainComponentAdmin
 *
 * [Legg inn beskrivelse av komponenten her]
 * 
 * Lagd av 6003
 */

import React, { useContext } from 'react';
import { AppContext } from '../App';

//ADMIN SIDER
import A_Bestillinger from './Admin/A_BestillingerComponent';
import A_Dokumentasjon from './Admin/A_DocumentationComponent';
import A_Header from './Admin/A_HeaderComponent';
import A_Inventar from './Admin/A_InventarComponent';
import A_Lager from './Admin/A_LagerComponent';
import A_Tellelister from './Admin/A_TellelisterComponent';
import LogIn from './logIn'


//GENERISKE SIDER
import Footer from './FooterComponent';
import OmOss from './OmOssComponent';

import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

function MainAdmin() {
    const { access, setAccess } = useContext(AppContext);

    const toggleAccess = () => {
        setAccess(access === 1 ? 2 : 1);
    };

    return (
        <React.Fragment>
            <A_Header toggleAccess={toggleAccess} />
            <button onClick={toggleAccess}>Bytt til BRUKER</button>
            <Switch>
            <Route path='/login' component={LogIn} />

                <Route path='/A_Inventar' component={A_Inventar} />
                <Route path='/A_Bestillinger' component={A_Bestillinger} />
                <Route path='/A_Tellelister' component={A_Tellelister} />
                <Route path='/A_Dokumentasjon' component={A_Dokumentasjon} />
                <Route path='/A_Lager' component={A_Lager} />
                <Route path='/OmOss' component={OmOss} />
                <Redirect to="/A_Inventar" />
            </Switch>
            <hr />
            <Footer />
        </React.Fragment>
    );
};

export default withRouter(MainAdmin);
