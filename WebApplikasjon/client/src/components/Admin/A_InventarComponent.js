/*
 * A_InventarComponent
 *
 * Denne komponenten tar seg av gjengivelsen av inventarsiden for admin.
 * Den lager en dynamisk tabell ut ifra hvor mange terminaler som befinner
 * seg i databasen og viser dem frem basert på navn, lokasjon, OS, serie-
 * nummer og terminalens ledighet.
 * Den har også noen input-bokser for å søke blant termnialer, legge inn
 * en ny terminal og sjekkbokser for å markere terminal(er) for sletting.
 * 
 * Lagd av 6004
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Card, Dropdown, DropdownButton, Form, Modal, Table } from 'react-bootstrap';
import TerminalHandler from '../handlers/TerminalHandler';
import SearchComponent from '../helpers/SearchComponent';

function A_Inventar() {
  // Henter nødvendige state-variabler og funksjoner fra TerminalHandler
  const {
    terminals,
    filteredTerminals,
    setTerminalName,
    setTerminalLocation,
    setTerminalOS,
    setTerminalSN,
    setTerminalAvailability,
    handleSearch,
    checkboxHandler,
    handleSubmit,
    handleDelete
  } = TerminalHandler();

  // Setter startverdi i drop-down menyen til ledig
  const [selectedItem, setSelectedItem] = useState('Ledig');

  // States for modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Funksjon for slettingsbekreftelse
  const confirmDelete = () => {
    handleDelete();
    handleClose();
  }

  return (
    <React.Fragment>
      <div className="mb-3 p-3 m-3">
        <h1>Liste over terminaler</h1>
        <hr></hr>
        {/* Bruker SearchComponent for å tillate søk blant terminaler */}
        <SearchComponent items={terminals} onSearch={handleSearch} />
        <br></br>
        {/* Tabell for å vise terminalene */}
        <Table responsive hover bordered style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>Terminalnavn</th>
              <th>Lokasjon</th>
              <th>OS</th>
              <th>Serienummer</th>
              <th>Ledig</th>
              <th>Markér for sletting</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapper gjennom de filtrerte terminalene og lager en tabellrad for hver
            dersom ikke 'index' brukes, her og i 'key', får man opp feilmeldinger i konsoll */}
            {filteredTerminals.map((terminal, index) => {
              return (
                <tr key={terminal._id || index}>
                  <td>{terminal.modell}</td>
                  <td>{terminal.location}</td>
                  <td>{terminal.operativsystem}</td>
                  <td>{terminal.serienummer}</td>
                  <td>{terminal.available ? 'Ja' : 'Nei'}</td>
                  <td>
                    {/* Sjekkboks(er) for å kunne velge terminal(er) for sletting */}
                    <Form.Check
                      type="checkbox"
                      onChange={(event) => checkboxHandler(event, terminal._id)}
                    />
                  </td>
                </tr>
              );
            })}
            {/* Legger til en rad for å legge til nye terminaler */}
            <tr>

              <td>
                <input type="text" placeholder="Legg inn navn" onChange={(e) => setTerminalName(e.target.value)}></input>
              </td>
              <td>
                <input type="text" placeholder="Legg inn lokasjon" onChange={(e) => setTerminalLocation(e.target.value)}></input>
              </td>
              <td>
                <input type="text" placeholder="Legg inn operativsystem" onChange={(e) => setTerminalOS(e.target.value)}></input>
              </td>
              <td>
                <input type="text" placeholder="Legg inn serienummer" onChange={(e) => setTerminalSN(e.target.value)}></input>
              </td>

              <td className="ledig-column"> {/* IKKE RØR! "Brute-force" på dynamisk reskalering av kolonnen til statisk */}
                {/* Design hentet fra: https://react-bootstrap.github.io/components/dropdowns/
                    Funksjonalitet hentet fra: https://www.pluralsight.com/guides/how-to-capture-the-value-of-dropdown-lists-with-react-bootstrap */}
                <DropdownButton id="dropdown-basic" title={selectedItem}>
                  <Dropdown.Item
                    eventKey="Ledig"
                    onClick={() => {
                      setTerminalAvailability(true);
                      setSelectedItem("Ledig");
                    }}
                  >
                    Ledig
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Ikke ledig"
                    onClick={() => {
                      setTerminalAvailability(false);
                      setSelectedItem("Ikke ledig");
                    }}
                  >
                    Ikke ledig
                  </Dropdown.Item>
                </DropdownButton>
              </td>

              <td className="marker-column"> {/* IKKE RØR! "Brute-force" på dynamisk reskalering av kolonnen til statisk */}
                {/* Legger til knapp for å legge til nye terminaler */}
                <Button variant="outline-success" onClick={handleSubmit}>Legg til ny</Button>{' '}
                {/* Implementerer modal for å dobbelsjekke med bruker om hen vil slette valgte terminaler */}
                <Button variant="danger" onClick={handleShow}>SLETT VALGTE</Button>{' '}
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
              Denne siden inneholder en liste over terminalene som befinner seg i beholdningen. Listen inneholder informasjon om terminalene som navnet, lokasjonen, operativsystem (OS), serienummer, og dens tilgjengelighet.
              <br></br>
              Her kan man også utføre operasjoner som oppretting av nye terminaler og sletting av terminaler ved å bruke sjekkboksene.
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
                  <li><b><i>Alle feltene må være utfylte</i></b> før man kan legge inn en terminal.</li>
                  <li>Terminalens tilgjengelighet er satt til "Ledig" som standard, men man kan ev. endre den til "Ikke ledig" dersom ønskelig.</li>
                  <li>Man kan deretter trykke på 'Legg til ny' for å legge inn den nylig registrerte terminalen.</li>
                  <li><b>NB!</b> 'SLETT VALGTE' sletter <b><i>IKKE</i></b> innholdet i feltene!</li>
                </ol>
                <br></br>
                <li>Sletting</li>
                <ol>
                  <li>Markér terminalene ved hjelp av sjekkboksene.</li>
                  <li>Trykk "SLETT".</li>
                  <li class="text-danger"><b>NB!</b> 'SLETT' sletter de markerte terminalene direkte; <b><i>den spør <u>IKKE</u> om bekreftelse!</i></b></li>
                </ol>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div>
        {/* Modal (pop-up vindu) for å bekrefte sletting */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>BEKREFT SLETTING</Modal.Title>
          </Modal.Header>
          <Modal.Body>Er du sikker på at du vil slette de valgte terminalene?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Avbryt
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              SLETT
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment >
  );
};

export default A_Inventar;
