/*
 * TerminalHandler
 *
 * Denne filen tar seg av logikken rundt behandlingen av terminaler.
 * Dette er ting som søking, oppretting, og sletting.
 * 
 * Lagd av 6004
 */

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function TerminalHandler() {
    const url = 'http://localhost:3500/api/v1/terminals'; // URL til API-endpoint

    // Definerer states
    const [terminals, setTerminals] = useState([]); // Liste over terminaler
    const [filteredTerminals, setFilteredTerminals] = useState([]); // Liste over filtrerte terminaler
    const [terminalName, setTerminalName] = useState(""); // Teminalnavn (modell)
    const [terminalLocation, setTerminalLocation] = useState(""); // Lokasjon
    const [terminalOS, setTerminalOS] = useState(""); // OS
    const [terminalSN, setTerminalSN] = useState(""); // Serienummer
    const [terminalAvailability, setTerminalAvailability] = useState(true); // Setter startvedi til 'Ledig'
    const [selectedTerminals, setSelectedTerminals] = useState([]); // Terminalvalg

    // Bruker useEffect for å hente terminaldata fra API
    useEffect(() => {
        axios.get(url)
            .then(response => {
                // Setter terminaler og filtrerte terminaler til responsdata
                setTerminals(response.data.terminals);
                setFilteredTerminals(response.data.terminals);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Håndterer søk i terminaler
    const handleSearch = (terminalsList, query) => {
        const lowerCaseQuery = query.toLowerCase(); // Konverterer input til lowercase
        const filtered = terminalsList.filter((terminal) => {
            // Sjekker om noen av de feltene angitt inneholder søkskriteriet
            return ['modell', 'location', 'serienummer', 'operativsystem'].some((field) => {
                const value = terminal[field];
                return typeof value === 'string' && value.toLowerCase().includes(lowerCaseQuery);
            });
        });
        setFilteredTerminals(filtered); // Returnerer søkeresultat
    };

    // Håndterer avkryssing av terminaler
    const checkboxHandler = (event, id) => {
        if (event.target.checked) {
            // Hentet hvordan man kan returnere et array med flere objekter fra her:
            // (https://codeburst.io/what-are-three-dots-in-javascript-6f09476b03e1)
            setSelectedTerminals([...selectedTerminals, id]); // Legger til terminal i listen over valgte terminaler
        } else {
            setSelectedTerminals(selectedTerminals.filter((terminalId) => terminalId !== id)); // Fjerner terminal fra listen over valgte terminaler
        }
    }

    // Håndtering av registrering for ny(e) terminal(er)
    const handleSubmit = () => {
        // Rudimentær inputvalidering
        if (terminalName === "")
            alert("Navn kan ikke være tomt!");
        if (terminalLocation === "")
            alert("Lokasjon kan ikke være tom!");
        if (terminalOS === "")
            alert("Operativsystem kan ikke være tomt!");
        if (terminalSN === "")
            alert("Serienummer kan ikke være tomt!");
        else {
            // Sender POST for å legge til ny terminal
            axios.post(url, {
                modell: terminalName,
                location: terminalLocation,
                operativsystem: terminalOS,
                serienummer: terminalSN,
                available: terminalAvailability
            }).then(_ => {
                // Etter vellykket POST, gjør en ny GET for å hente
                // den oppdaterte listen over terminaler
                axios.get(url)
                    .then(response => {
                        setTerminals(response.data.terminals);
                        setFilteredTerminals(response.data.terminals);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }).catch(error => {
                console.log(error);
            });
        }
    }

    /*
     * Håndterer sletting av terminal
     * Fikset bug hvor sletting av flere terminaler ikke viste med mindre man refreshet siden
     *https://www.w3schools.com/js/js_promise.asp
     *https://www.javascripttutorial.net/es6/javascript-promise-all/
     *https://dmitripavlutin.com/promise-all/
     */
    const handleDelete = () => {
        // Lager en array av slettingsforespørsler på gitt ID
        const deleteRequested = selectedTerminals.map((terminalId) => {
            return axios.delete(`${url}/${terminalId}`);
        });

        // Venter på at alle forespørsler blir fullført
        Promise.all(deleteRequested)
            .then(() => {
                // Så straks alle slettingene er fullført, oppdateres listen med terminaler
                axios.get(url)
                    .then(response => {
                        setTerminals(response.data.terminals);
                        setFilteredTerminals(response.data.terminals);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });

        setSelectedTerminals([]); // Tilbakestiller valgte terminaler til en tom liste
    }

    // Returnerer states og funksjoner
    return {
        terminals,
        filteredTerminals,
        terminalName,
        setTerminalName,
        terminalLocation,
        setTerminalLocation,
        terminalOS,
        setTerminalOS,
        terminalSN,
        setTerminalSN,
        terminalAvailability,
        setTerminalAvailability,
        selectedTerminals,
        handleSearch,
        checkboxHandler,
        handleSubmit,
        handleDelete
    };
}
