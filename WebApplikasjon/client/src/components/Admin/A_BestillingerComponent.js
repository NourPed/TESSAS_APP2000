/*
 * A_BestillingerComponent
 *
 * Denne komponenten er behandlingssiden for ordre. Den lager en liste over aktive
 * bestillinger og en historikk (ordrearkiv) hvor man kan se informasjon angående
 * ordre som f.eks. lager, status, antall, datoer m.m.
 * Her behandler administrator mottak og sending av terminaler.
 * 
 * Lagd av 6003; noe funksjonalitet lagd av 6004
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Card, Form, Modal, Table } from 'react-bootstrap';
import OrderHandler from '../handlers/OrderHandler';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function A_Bestillinger() {
  const {
    orders,
    orderArchive,
    terminals,
    showModal,
    setShowModal,
    selectedOrder,
    handleOrder,
    handleTerminalSelection,
    handleOrderSubmit,
    handleReceiveTerminal
  } = OrderHandler();

  const disableReceiveButton = (status) => {
    return status === 'TRANSIT' || status === 'I BRUK';
  };

  //Html med Boostrap React
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="mb-3 p-3 m-3">
        <h1>Liste over bestillinger</h1>
        <hr></hr>
        <Table responsive hover bordered style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px" }}>Lager</th>
              <th style={{ padding: "10px" }}>Status</th>
              <th style={{ padding: "10px" }}>Antall</th>
              <th style={{ padding: "10px" }}>Dato Forespurt</th>
              <th style={{ padding: "10px" }}>Dato Start</th>
              <th style={{ padding: "10px" }}>Dato Slutt</th>
              <th style={{ padding: "10px" }}>Terminaler</th>
              <th style={{ padding: "10px" }}>Håndtér</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id || index}>
                <td>{order.requestedBy}</td>
                <td>{order.status}</td>
                <td>{order.amount}</td>
                <td>{order.requestedDate}</td>
                <td>{order.startDate}</td>
                <td>{order.endDate}</td>
                <td>{order.orderTerminals}</td>
                <td>
                  {(order.status === "TRANSIT" || order.status === "I BRUK" || order.status === "TRANSIT RETUR") && (
                    <Button
                      variant="outline-primary"
                      onClick={() => handleReceiveTerminal(order._id)} disabled={disableReceiveButton(order.status)}>
                      Kvitter mottak
                    </Button>
                  )}
                  {order.status === "VENTER" && (
                    <Button variant="outline-warning" onClick={() => handleOrder(order._id)}>
                      Håndtér
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br></br>
        <h1>Ordrearkiv</h1>
        <hr></hr>
        <Table responsive hover bordered style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px" }}>LagerKunde</th>
              <th style={{ padding: "10px" }}>Status</th>
              <th style={{ padding: "10px" }}>Antall</th>
              <th style={{ padding: "10px" }}>Dato Forespurt</th>
              <th style={{ padding: "10px" }}>Dato Start</th>
              <th style={{ padding: "10px" }}>Dato Slutt</th>
              <th style={{ padding: "10px" }}>Terminaler</th>
            </tr>
          </thead>
          <tbody>
            {orderArchive && orderArchive.map((archive, index) => (
              <tr key={archive._id || index}>
                <td>{archive.requestedBy}</td>
                <td>{archive.status}</td>
                <td>{archive.amount}</td>
                <td>{archive.requestedDate}</td>
                <td>{archive.startDate}</td>
                <td>{archive.endDate}</td>
                <td>{archive.orderTerminals}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div>
        <Card>
          <Card.Header>Informasjon til sluttbruker</Card.Header>
          <Card.Body style={{ textAlign: "left" }}>
            <Card.Title style={{ textAlign: "left" }}>Slik fungerer denne siden</Card.Title>
            <Card.Text style={{ wordWrap: "break-word" }}>
              <ol>
                <li>Her vises en oversikt over alle bestillinger fra bruker.</li>
                <li>Ved å trykke på håndter vil du få opp input-felt hvor velger en ledig håndterminal basert på serienummer</li>
                <li>Serienummeret finner du typisk på baksiden av terminalen med en prefix: "S/N:"</li>
                <li>Deretter "Submitter" du håndteringen og Bruker/Lageret får en oppdatert statuskode på sine aktive bestillinger</li>
                <li>I det bruker mottar terminalene til sin lokasjon, kvitterer de mottak i applikasjonen som vil oppdatere status til: 'I BRUK'</li>
                <li>Når lageret er ferdig med terminalen sender de den tilbake, da vil ordre ha status 'TRANSIT RETUR'</li>
                <li>Til slutt kvitterer Administrator mottak og ordren er ferdigstilt med status 'GJENNOMFØRT'</li>
              </ol>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ordrebehandling</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Order Details:</h5>
          {selectedOrder && (
            <div>
              <p>Ordre-ID: {selectedOrder._id}</p>
              <p>Antall: {selectedOrder.amount}</p>
            </div>
          )}
          <h5>Velg terminaler:</h5>
          {selectedOrder && (
            <Form>
              {Array(selectedOrder.amount).fill().map((_, index) => (
                <Form.Group controlId={`terminal-${index}`} key={index}>
                  <Form.Label>Terminal {index + 1}</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => handleTerminalSelection(index, e.target.value)}
                  >
                    <option value="">Velg terminal:</option>
                    {terminals.map(terminal => (
                      <option key={terminal._id} value={terminal.serienummer}>
                        {terminal.serienummer}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              ))}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Avbryt</Button>
          <Button variant="primary" onClick={handleOrderSubmit}>Velg</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default A_Bestillinger;

  //Kilder: 
  //https://axios-http.com/docs/intro
  //https://react-bootstrap.github.io/components/Modal +/Button +/Card +/Table +/Form