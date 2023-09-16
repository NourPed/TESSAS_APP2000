/*
 * B_BestillComponent
 *
 * Denne komponenten tar seg av bestillingen av terminaler på brukersiden
 * ved å legge inn et ønsket antall terminaler og deretter å klikke på
 * kalenderen når man ønsker start- og sluttdato for bookingen av disse.
 * 
 * Lagd av 6003 og 6004
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from "react";
import { Button, Card } from 'react-bootstrap';
import CalendarBox from "../helpers/CalendarComponent";
import TerminalAmount from "../helpers/TerminalAmountComponent";

import axios from 'axios';
import { StorageLocationContext } from "../StorageLocationContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function B_Bestill() {
  const [num, setNum] = useState(1); // Startverdi er 1 i boksen

  // Array av to elementer: start- og sluttdato. Må ikke initialiseres med "new",
  // da dette byr på køddet som skjedde tidligere; må initialiseres med "null"s
  const [dateRange, setDateRange] = useState([null, null]);

  /*
   * Egenmekka metode for å (muligens) forenkle POSTing/GETting
   * Fjerner tidspunkt og gjengir det med formatet DD-MM-YYYY
   * OBS! +1 må brukes fordi månedene i arrayet telles f.o.m. 0 t.o.m. 11
   */
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`; // Output endres her
  };

  const { selectedStorage } = useContext(StorageLocationContext);

  const knappetrykksHandler = () => {
    if (num <= 0)
      alert("Antall kan ikke være null eller mindre!")
    else if (dateRange[0] === null || dateRange[1] === null)
      alert("Start- og sluttdato MÅ velges!\nSlutt- og statdato kan være samme dag.")
    else {
      const orderData = {
        amount: num,
        requestedBy: selectedStorage,
        requestedDate: formatDate(new Date()),
        startDate: formatDate(dateRange[0]),
        endDate: formatDate(dateRange[1])
      };

      axios.post('http://localhost:3500/api/v1/orders', orderData)
        .then(response => {
          console.log(response.data);
          toast.success('Ordreforespørsel vellyket!');
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      <h1>Bestillinger</h1><hr />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Card style={{ width: '18rem' }}>
          <TerminalAmount num={num} setNum={setNum} />
          <CalendarBox dateRange={dateRange} setDateRange={setDateRange} />
          <Button variant="primary" onClick={knappetrykksHandler}>Send forespørsel</Button>{' '}
        </Card>
        <br></br>
      </div>

      <div>
        <Card>
          <Card.Header>Informasjon til sluttbruker</Card.Header>
          <Card.Body style={{ textAlign: "left" }}>
            <Card.Title style={{ textAlign: "left" }}>Slik fungerer denne siden</Card.Title>
            <Card.Text style={{ wordWrap: "break-word" }}>
              <ol>
                <li>Velg ønsket antall håndterminaler du ønsker å bestille.</li>
                <li>Trykk deretter i kalenderen først én gang for å velge startdato; trykk så én gang til for å velge sluttdato.</li>
                <li>Til slutt trykk send forespørsel, du kan nå gå under fanen "Aktive Bestillinger" for å se status på din ordre</li>
              </ol>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

    </React.Fragment>
  );
};

export default B_Bestill;

//Toastify kode ble funnet her: https://fkhadra.github.io/react-toastify/introduction/ 