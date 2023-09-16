/*
 * A_DocumentationComponent
 *
 * Komponeneten skulle i utgangspunktet gjøre det mulig for admin å kunne
 * laste opp dokumentasjon som ville populert tabellen i 'Veiledninger'.
 * Pga. mangel på tid ble ikke denne komponenten fullført; i stedet har
 * den dummyfunksjonalitet for å kunne "fake" opplasting av dokumenter fra
 * datamaskin og gjengi dem i tabellen i dokumentasjonssiden i admininstansen.
 * 
 * Lagd av 6004 (Struktur basert på 6003 sitt komponentdesign)
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Button, Card, Form, Table } from 'react-bootstrap';

function A_Dokumentasjon() {
    const [files, setFiles] = useState([]);

    const handleUpload = (event) => {
        event.preventDefault();

        // Henter filene
        let uploadedFiles = event.target.files;

        // Konverterer filene til et array av filer
        let filesArr = Array.from(uploadedFiles);

        // Legger alle filene i setFiles
        setFiles(files => [...files, ...filesArr]);
    };

    return (
        <React.Fragment>
            <div>
                <Form.Group controlId="formFileMultiple" className="mb-3 p-3 m-3" style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "10px", marginRight: "10px", }}>
                    <div className="d-flex align-items-center">
                        <Form.Control type="file" multiple onChange={handleUpload} />
                        <Button variant="primary" type="submit">Last</Button>{' '}
                    </div>
                </Form.Group>
            </div>

            <div className="mb-3 p-3 m-3">
                <Table hover bordered>
                    <thead>
                        <tr>
                            <th>Filnavn</th>
                            <th>Velg</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Populerer tabellen med filene som ble "lastet opp" */}
                        {files.map((file, index) => (
                            <tr key={index}>
                                <td>{file.name}</td>
                                <td><Form.Check type="checkbox" /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div style={{ textAlign: "right" }}>
                    <Button variant="danger" style={{ marginRight: "120px" }}>SLETT</Button>
                </div>
            </div>

            <div>
                <Card>
                    <Card.Header>Informasjon til sluttbruker</Card.Header>
                    <Card.Body style={{ textAlign: "left" }}>
                        <Card.Title style={{ textAlign: "left" }}>Slik fungerer denne siden</Card.Title>
                        <Card.Text style={{ wordWrap: "break-word" }}>
                            Denne siden har ikke funksjonaliteten som ble planlagt/tiltenkt ila. prosjektet grunnet mangel på tid.
                            <br></br>
                            Pr. nå har siden kun dummyfunksjonalitet for å kunne velge filer fra brukerens datamaskin og oppretter "entries" i tabellen med de valgte filene. Så straks man navigerer bort fra siden forsvinner det som ble "lastet opp".
                            <br></br>
                            Pga. sikkerhetsmessige grunner tillater ikke JS å lese eller skrive filer direkte fra/til filsystemet.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default A_Dokumentasjon;
