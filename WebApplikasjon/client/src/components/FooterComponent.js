/*
 * FooterComponent
 *
 * Footer med info om app- og firmanavn gruppe o.l.
 * 
 * Lagd av 6003
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

function Footer() {
    return (
        <div>
            <article className="">
                <h4>TESS Terminal LogiApp</h4>
                <p>Utviklet for TESS AS | Utviklet av Gruppe 1 | Vår 2023 ©</p>
            </article>

        </div>
    );
};

export default Footer;