/*
 * B_AktiveBestillingerComponent
 *
 * Denne komponenten tar seg av de aktive bestillingene på brukersiden.
 * Dens funksjonalitet består i å se informasjon om ordren(e) som status,
 * antall bestilt, datoer o.l.
 * Her behandler bruker oppgaver som kvittering av mottak og ev. tilbake-
 * sending av terminaler.
 * 
 * Lagd av 6003; noe funksjonalitet lagd av 6004
 */

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StorageLocationContext } from "../StorageLocationContext";

function B_AktiveBestillinger() {
  const [orders, setOrders] = useState([]); //Bestillinger opprettet av bruker
  const [selectedOrder, setSelectedOrder] = useState([]); //Linjen man håndterer
  const { selectedStorage } = useContext(StorageLocationContext); //BrukerContext (altså hvilket lagerinstans som operer)

  //Henter Brukers aktive bestillinger når siden lastes inn
  useEffect(() => {
    fetchOrders();
  }, []);

  //Funksjon for å hente bestillinger/orders fra database via server
  const fetchOrders = () => {
    axios.get('http://localhost:3500/api/v1/orders')
      .then(response => {
        const filteredeOrders = response.data.orders.filter(orders => orders.requestedBy === selectedStorage);
        setOrders(filteredeOrders);
      })
      .catch(error => {
        console.log(error);
      });
  };


  //Håndterer 'klikk' på 'Kvitter Mottak' knappen for å 'Kvittere' mottak av terminaler i en ordre
  const handleMottak = (orderId) => {
    const selectedOrder = orders.find(order => order._id === orderId);
    if (selectedOrder) {
      setSelectedOrder(selectedOrder);
      fetchOrders(); //Henter oppdatert liste av ordre (må gjengis her for å slippe å måtte refreshe siden)
    }

    const orderData = {
      status: 'I BRUK'
    };
    //Oppdaterer ordre fra transit til -> I BRUK
    axios.patch(`http://localhost:3500/api/v1/orders/${selectedOrder._id}`, orderData)
      .then(response => {
        toast.success('Mottak kvittert!')
        console.log(response.data); // Ved suksess skriver det som blir sendt i konsoll
      })
      .catch(error => {
        console.error(error); // Ved feil skriver feilmelding i konsoll
      });

  };


  //Håndterer 'klikk' på 'Tilbakesend' knappen for å sende tilbake brukte terminaler fra en ordre
  const handleTilbakesending = (orderId) => {
    const selectedOrder = orders.find(order => order._id === orderId);
    if (selectedOrder) {
      setSelectedOrder(selectedOrder);
      fetchOrders(); //Henter oppdatert liste av ordre (må gjengis her for å slippe å måtte refreshe siden)
    }
    const orderData = {
      status: 'TRANSIT RETUR'
    };
    //Oppdaterer ordre fra I BRUK til -> TRANSIT RETUR
    axios.patch(`http://localhost:3500/api/v1/orders/${selectedOrder._id}`, orderData)
      .then(response => {
        toast.success('Ordrestatus oppdatert: \'RETUR\'\nTerminaler tilbakesendes!')
        console.log(response.data); // Ved suksess skriver det som blir sendt i konsoll
      })
      .catch(error => {
        console.error(error); // Ved feil skriver feilmelding i konsoll
      });
  };

  const disableReceiveButton = (status) => {
    return status === 'TRANSIT RETUR' || status === 'VENTER' || status === 'I BRUK';
  };

  const disableReturnButton = (status) => {
    return status === 'TRANSIT RETUR' || status === 'VENTER' || status === 'TRANSIT';
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="mb-3 p-3 m-3">
        <h1>Aktive Bestillinger</h1>
        <Table responsive striped bordered style={{ padding: "10px" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px" }}>Status</th>
              <th style={{ padding: "10px" }}>Antall</th>
              <th style={{ padding: "10px" }}>Dato Forespurt</th>
              <th style={{ padding: "10px" }}>Dato Start</th>
              <th style={{ padding: "10px" }}>Dato Slutt</th>
              <th style={{ padding: "10px" }}>Kvitter Mottak</th>
              <th style={{ padding: "10px" }}>Tilbakesend</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id || index}>
                <td>{order.status}</td>
                <td>{order.amount}</td>
                <td>{order.requestedDate}</td>
                <td>{order.startDate}</td>
                <td>{order.endDate}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleMottak(order._id)} disabled={disableReceiveButton(order.status)}>
                    Kvitter mottak
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-warning"
                    onClick={() => handleTilbakesending(order._id)} disabled={disableReturnButton(order.status)}>
                    Tilbakesending
                  </Button>
                </td>
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
                <li>Her er en liste over bestillinger gjort fra ditt lager.</li>
                <li>Idet lageret deres mottar håndterminaler bestilt, trykker dere kvittér mottak her.</li>
                <li>Når dere er ferdig med bruk av terminaler trykker dere på tilbakesendingsknappen.</li>
                <li>Tilbakesendingsknappen vil i fremtidig versjon gi informasjon om adresse dere skal videresende terminalene til.</li>
                <li>Denne versjonen støtter kun fram og tilbakesending mellom Hovedlager: Lier og en brukers lokasjon.</li>
              </ol>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

    </React.Fragment>
  );
};

export default B_AktiveBestillinger;