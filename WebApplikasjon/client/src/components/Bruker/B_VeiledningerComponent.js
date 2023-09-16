/*
 * B_VeiledningerComponent
 *
 * Uferdig komponent. Innholdet i siden er statisk.
 * Komponeneten skulle i utgangspunktet gjøre det mulig for bruker å kunne
 * laste ned dokumentasjon som admin hadde lastet opp.
 * Pga. mangel på tid ble ikke denne komponenten fullført.
 * 
 * Lagd av 6003 og 6004
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Button, Card, Table } from 'react-bootstrap';

function B_Veiledninger() {
    return (
        <React.Fragment>
            <div className="mb-3 p-3 m-3">
                <Table hover bordered>
                    <thead>
                        <tr>
                            <th>Veiledninger</th>
                            <th>Last ned</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Opptellingsveiledning.pdf</td>
                            <td><Button variant="primary">Last ned</Button>{' '}</td>
                        </tr>
                        <tr>
                            <td>Forsendelseveiledning.pdf</td>
                            <td><Button variant="primary">Last ned</Button>{' '}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div>
                <Card>
                    <Card.Header>Informasjon til sluttbruker</Card.Header>
                    <Card.Body style={{ textAlign: "left" }}>
                        <Card.Title style={{ textAlign: "left" }}>Slik fungerer denne siden</Card.Title>
                        <Card.Text style={{ wordWrap: "break-word" }}>
                            Denne siden har ikke funksjonaliteten som ble planlagt/tiltenkt ila. prosjektet grunnet mangel på tid.
                            <br></br>
                            Siden skulle i utgangspunktet fungere slik at dokumenter som ble lastet opp av admin ble fetchet og fylt inn i denne tabellen hvor bruker kunne ev. lastet dem ned, men av sikkerhetsmessige årsaker tillater ikke JS å lese eller skrive filer direkte fra/til filsystemet og det ble derfor ikke tid til overs for å få implementert denne løsningen.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>
 
    );
};

export default B_Veiledninger;

/*
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Velg flere filer</Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group>
*/