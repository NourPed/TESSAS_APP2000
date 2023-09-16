/*
 * A_LagerComponent
 *
 * Denne komponenten tar seg av gjengivelsen av lagersiden for admin.
 * Den lager en dynamisk tabell ut ifra hvor mange lagere som befinner
 * seg i databasen og viser dem frem basert på navn, lokasjon, adresse,
 * telefon, og epost.
 * Den har også noen input-bokser for å søke blant varehus, legge inn
 * et nytt varehus og modals for å behandle varehus; sletting/endring
 * osv.
 * 
 * Lagd av 6004
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Card, Form, Modal, Table } from 'react-bootstrap';
import WarehouseHandler from '../handlers/WarehouseHandler';
import SearchComponent from '../helpers/SearchComponent';

// Kopiert og tilpasset fra A_InventarComponent.js.
function A_Lager() {
    // Variabler for å håndtere lagerinformasjon
    const {
        warehouses,
        filteredWarehouses,
        setWarehouseName,
        setWarehouseLocation,
        setWarehouseAddress,
        setWarehousePhone,
        setWarehouseEmail,
        selectedWarehouse,
        setCurrentWarehouseName,
        setCurrentWarehouseLocation,
        setCurrentWarehouseAddress,
        setCurrentWarehousePhone,
        setCurrentWarehouseEmail,
        handleSearch,
        handleInsert,
        handleUpdate,
        handleDelete,
        handleWarehouse,
        handleWarehouseClose
    } = WarehouseHandler();

    // Her er skapes gjengivelsen av alle elementer på websiden.
    return (
        <React.Fragment>
            <div className="mb-3 p-3 m-3">
                <h1>Liste over lagere</h1>
                <hr></hr>
                <SearchComponent items={warehouses} onSearch={handleSearch} />
                <br></br>
                <Table responsive hover bordered style={{ padding: "10px" }}>
                    <thead>
                        <tr>
                            {/* Kolonnene i tabellen som holder på de ulike verdiene til JSON-objektene */}
                            <th style={{ padding: "10px" }}>Lager</th>
                            <th style={{ padding: "10px" }}>Lokasjon</th>
                            <th style={{ padding: "10px" }}>Adresse</th>
                            <th style={{ padding: "10px" }}>Telefon</th>
                            <th style={{ padding: "10px" }}>E-post</th>
                            <th style={{ padding: "10px" }}>Behandle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Denne delen av koden mapper over alle lagerne i arrayet "filteredWarehouses".
                          * For hvert lager, opprettes det en ny tabellrad med lagerets informasjon.
                          *
                          * Bruker "key"-attributtet på hver tabellrad for å gi hver rad en unik identifikator.
                          * Bruker lagerets unike ID (_id) som nøkkel.
                          * (https://legacy.reactjs.org/docs/lists-and-keys.html)
                          */}
                        {filteredWarehouses.map((warehouse, index) => {
                            return (
                                <tr key={warehouse._id || index}>
                                    <td>{warehouse.name}</td>
                                    <td>{warehouse.location_name}</td>
                                    <td>{warehouse.address}</td>
                                    <td>{warehouse.tlf}</td>
                                    <td>{warehouse.email}</td>
                                    <td>
                                        {/* Knappene for å endre eller slette et lager
                                          * Kaller på 'handleWarehouse' og 'handleDelete'-funksjonene og bruker den unike ID'en til objektet
                                          * for å gjøre endringene på rett objekt.
                                          */}
                                        <Button variant="outline-warning" onClick={() => handleWarehouse(warehouse._id)}>Endre</Button>{' '}
                                        <Button variant="danger" onClick={() => handleDelete(warehouse._id)}>SLETT</Button>{' '}
                                    </td>
                                </tr>
                            );
                        })}
                        {/* Legger til rader med input-felt hvor bruker kan legge inn fritekst for å opprette et nytt varehus med de angitte verdiene */}
                        <tr>
                            <td>
                                <input type="text" placeholder="Legg inn navn" onChange={(e) => setWarehouseName(e.target.value)}></input>
                            </td>
                            <td>
                                <input type="text" placeholder="Legg inn lokasjon" onChange={(e) => setWarehouseLocation(e.target.value)}></input>
                            </td>
                            <td>
                                <input type="text" placeholder="Legg inn adresse" onChange={(e) => setWarehouseAddress(e.target.value)}></input>
                            </td>
                            <td>
                                <input type="text" placeholder="Legg inn telefonnummer" onChange={(e) => setWarehousePhone(e.target.value)}></input>
                            </td>
                            <td>
                                <input type="text" placeholder="Legg inn epost" onChange={(e) => setWarehouseEmail(e.target.value)}></input>
                            </td>
                            <td className="marker-column"> {/* IKKE RØR! "Brute-force" på dynamisk reskalering av kolonnen til statisk */}
                                {/* Legger til knapp for å legge til et nytt varehus.
                                  * Kaller på 'handleInsert'-funksjonen for å legge til det nye varehuset med verdiene angitt ovenfor.
                                  */}
                                <Button variant="outline-success" onClick={handleInsert}>Legg til nytt</Button>{' '}
                            </td>
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
                            Denne siden inneholder en liste over lagere og informasjon om dem som navn, lokasjon, adresse, telefonnummer, og epost.
                            <br></br>
                            Her kan man også utføre operasjoner som oppretting og sletting av lagere.
                            <br></br>
                            <br></br>
                            <ul>
                                <li>Søking</li>
                                <ul>
                                    <li>Man bruker søkefeltet rett ovenfor tabellen ved å skrive inn ønsket søkeord og trykker deretter på 'Søk' eller 'Enter' på tastaturet.</li>
                                </ul>
                                <br></br>
                                <li>Oppretting</li>
                                <ol>
                                    <li><b><i>Alle feltene må være utfylte</i></b> før man kan legge inn et lager.</li>
                                    <li>Man kan deretter trykke på 'Legg til nytt' for å legge inn det nylig registrerte lageret.</li>
                                </ol>
                                <br></br>
                                <li>Endring</li>
                                <ol>
                                    <li>Ved å trykke på 'Endre' vil man få opp et popup-vindu som viser alle detaljene for det valgte lageret.</li>
                                    <li>Popup-vinduet inneholder også tekstfelt hvor bruker kan gjøre endringer på valgt(e) felt. Her behøver man <u>ikke</u> å fylle ut alle feltene; felt som ikke inneholder noe, vil automatisk beholde originalverdiene.</li>
                                </ol>
                                <br></br>
                                <li>Sletting</li>
                                <ul>
                                    <li>For å slette et lager, trykker man bare på 'SLETT' knappen.</li>
                                    <li class="text-danger"><b>NB!</b> 'SLETT' sletter lageret direkte; <b><i>den spør <u>IKKE</u> om bekreftelse!</i></b></li>
                                </ul>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

            <div style={{ textAlign: "left" }}>
                {/* 
                  * Modal for å håndtering av lagerdetaljer.
                  * Så lenge et varehus ikke er valgt, vises ikke modalen.
                  * Benytter react-bootstraps modal (https://react-bootstrap.github.io/components/modal/)
                  */}
                <Modal show={selectedWarehouse != null} onHide={handleWarehouseClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>VAREHUSDETALJER</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {/* Dersom selectedWarehouse har verdier, skal disse gjengis */}
                        {selectedWarehouse && (
                            <>
                                {/* Lager grupper med inputfelt i modalen for å tillate bruker å kunne endre
                              * verdier på et gitt varehus.
                              * (https://react-bootstrap.github.io/forms/overview/)
                              * (https://react-bootstrap.github.io/forms/form-control/)
                              * (https://react-bootstrap.github.io/forms/layout/)
                              */}
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Label>Navn: {selectedWarehouse.name}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Angi ny ID (navn)"
                                        onChange={(e) => setCurrentWarehouseName(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGroupLocation">
                                    <Form.Label>Lokasjon: {selectedWarehouse.location_name}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Angi ny lokasjon"
                                        onChange={(e) => setCurrentWarehouseLocation(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGroupAddress">
                                    <Form.Label>Adresse: {selectedWarehouse.address}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Angi ny adresse"
                                        onChange={(e) => setCurrentWarehouseAddress(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGroupPhone">
                                    <Form.Label>Telefon: {selectedWarehouse.tlf}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Angi ny telefon"
                                        onChange={(e) => setCurrentWarehousePhone(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Epost: {selectedWarehouse.email}</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Angi ny epost"
                                        onChange={(e) => setCurrentWarehouseEmail(e.target.value)} />
                                </Form.Group>

                            </>
                        )}
                    </Modal.Body>

                    <Modal.Footer>
                        {/* Knapper i modal for å utføre endringer i de angitte feltene i modalen eller lukke den */}
                        <Button variant="danger" onClick={handleUpdate}>ENDRE</Button>
                        <Button variant="primary" onClick={handleWarehouseClose}>Lukk</Button>{' '}
                    </Modal.Footer>

                </Modal>
            </div>

        </React.Fragment>
    );
};

export default A_Lager;
