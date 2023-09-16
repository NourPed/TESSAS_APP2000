/*
 * OrderHandler
 *
 * Denne filen tar seg av logikken rundt behandlingen av bestillinger.
 * Dette er oppgaver som mottak, oppdatering, og sletting av bestillinger.
 * 
 * Noe logikk hentet fra 'TerminalHandler.js' og tilpasset deretter.
 * 
 * Migrasjon fra `B_BestillingerComponent` og bugfix i `handleReceiveTerminal`
 * av 6004; resten av koden er lagd av 6003
 */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function OrderHandler() {
    // Statiske URL'er
    const ordersUrl = 'http://localhost:3500/api/v1/orders'; // URL til API-endpoint
    const terminalsUrl = 'http://localhost:3500/api/v1/terminals'; // URL til API-endpoint
    const orderArchiveUrl = 'http://localhost:3500/api/v1/OrderArchive'; // URL til API-endpoint

    // Definerer states
    const [orders, setOrders] = useState([]); // Bestillinger opprettet av bruker
    const [orderArchive, setArchive] = useState([]); // Bestillinger gjennomført/ordrearkiv
    const [terminals, setTerminals] = useState([]); // Håndterminaler
    const [showModal, setShowModal] = useState(false); // Pop-upvindu Bootstrap
    const [selectedOrder, setSelectedOrder] = useState(null); // Valgt bestilling
    const [selectedTerminals, setSelectedTerminals] = useState([]); // Valgte terminaler

    // Henter Bestillinger og tilgjengelige håndterminaler når siden lastes inn
    useEffect(() => {
        fetchOrders();
        fetchTerminals();
        fetchArchive();
    }, []);

    // Funksjon for å hente bestillinger/orders fra database via server
    const fetchOrders = () => {
        axios.get(`${ordersUrl}`)
            .then(response => {
                setOrders(response.data.orders);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Funksjon for å hente terminaler fra database via server hvor 'available' = false
    const fetchTerminals = () => {
        axios.get(`${terminalsUrl}`)
            .then(response => {
                setTerminals(response.data.terminals.filter(terminal => terminal.available));
            })
            .catch(error => {
                console.log(error);
            });
    };

    const fetchArchive = () => {
        axios.get(`${orderArchiveUrl}`)
            .then(response => {
                setArchive(response.data.ordersArchive);
                console.log(response.data);
            })
            .catch(error => {
                console.log('Feil i fetching av arkiv:' + error);
            });
    };

    // Håndterer 'klikk' på 'Håndter' knappen for å 'håndtere' en bestilling/rad
    const handleOrder = (orderId) => {
        const selectedOrder = orders.find(order => order._id === orderId);
        if (selectedOrder) {
            setSelectedOrder(selectedOrder);
            fetchTerminals(); //Henter oppdatert liste av tilgjengelige terminaler (må gjengis her for å slippe å måtte refreshe siden)
            setShowModal(true);
        }
    };

    // Håndterer valg av termnialer og oppdaterer 'Terminals' slik at vi kan sette available: false på sendte terminaler
    const handleTerminalSelection = (index, terminal) => {
        const updatedTerminals = [...selectedTerminals];
        updatedTerminals[index] = terminal;
        setSelectedTerminals(updatedTerminals);
    };


    // Håndterer 'klikk' på 'Submit' knappen i popup vinduets form / oppdaterer ordrestatus og terminalstatus
    const handleOrderSubmit = () => {
        const orderData = {
            status: 'TRANSIT',
            orderTerminals: selectedTerminals
        };
        // Oppdaterer ordre fra pending til ->transit
        axios.patch(`${ordersUrl}/${selectedOrder._id}`, orderData)
            .then(response => {
                toast.success('Ordrehåndtering vellykket!\nStatus: TRANSIT');
                console.log(response.data); // Ved suksess skriver det som blir sendt i konsoll
                fetchOrders();
            })
            .catch(error => {
                toast.error('Noe gikk galt :(');
                console.error(error);// Ved feil skriver feilmelding i konsoll
            });

        // Oppdaterer terminaler til -> false/utilgjengelig
        const updatedTerminals = selectedTerminals.map(terminalSerienummer => {
            const terminal = terminals.find(t => t.serienummer === terminalSerienummer);
            const updatedTerminal = {
                available: false,
                location: selectedOrder.requestedBy
            };

            return axios.patch(`${terminalsUrl}/${terminal._id}`, updatedTerminal);
        });

        //Bruker axios.all for å sende flere Post requests, siden man kan velge flere terminaler
        axios.all(updatedTerminals)
            .then(responses => {
                console.log(responses); // Ved suksess skriver det som blir sendt i konsoll
            })
            .catch(error => {
                console.error(error); // Ved feil skriver feilmelding i konsoll
            });

        setSelectedOrder(null);
        setSelectedTerminals([]);
        setShowModal(false);
        fetchOrders(); //Henter ordre pånytt på slutten av submit funksjonen for at siden skal oppdatere seg dynamisk
    };

    /*
     * Håndterer klikk på kvitter mottak
     * sender ordren til arkiv collection og sletter den fra aktive ordre. Setter også terminal tilbake til ledig
     * 
     * Kommentar fra 6004: grunnen til buggen var at `handleOrderSubmit` oppdaterer tilgjengeligheten på terminalene
     * i db men endringene har ikke blitt oppdatert pga at `useEffect` kun kjøres ved innlasting av komponenten; dvs
     * at man jobber med utdaterte data de - som først ble innhentet - fra `handleOrderSubmit`.
     */
    const handleReceiveTerminal = async (orderId) => {
        // Finner ordren basert på unik ID
        const selectedOrder = orders.find(order => order._id === orderId);
        setSelectedOrder(selectedOrder);

        // Data for om ordren som skal arkiveres
        const archiveData = {
            amount: selectedOrder.amount,
            requestedDate: selectedOrder.requestedDate,
            startDate: selectedOrder.startDate,
            endDate: selectedOrder.endDate,
            requestedBy: selectedOrder.requestedBy,
            orderTerminals: selectedOrder.orderTerminals
        };

        try {
            // Sending av data til serveren for ordrearkivering.
            // Sender forespørsler og avventer respons (await)
            const archiveResponse = await axios.post(`${orderArchiveUrl}`, archiveData);
            toast.success('Mottak kvittert og ordre arkivert!');

            // Henter siste terminaler fra db
            let fetchedTerminals;
            try {
                // GETter og venter på respons (await) før den går videre
                const terminalsResponse = await axios.get(`${terminalsUrl}`);
                fetchedTerminals = terminalsResponse.data.terminals;
            } catch (error) {
                toast.error('Feil ved fetching av terminaler:', error);
                console.error("Feil ved fetching av terminaler: ", error);
                throw error;
            }

            // Henter og lager liste med oppdaterte terminaler rett før man patcher
            const updateTerminalPromises = selectedOrder.orderTerminals.map(serienummer => {
                // Finner terminalen som samsvarer
                const terminal = fetchedTerminals.find(t => t.serienummer === serienummer);
                if (terminal) {
                    const updatedTerminal = {
                        ...terminal,
                        available: true,
                        location: 'Lier'
                    };
                    // Sender den oppdaterte terminalen med en PATCH
                    return axios.patch(`${terminalsUrl}/${terminal._id}`, updatedTerminal);
                }
            });

            // Venter på at alle oppdateringer er fullført
            const terminalResponses = await axios.all(updateTerminalPromises);

            // Kjører delete på ordren
            const deleteResponse = await axios.delete(`${ordersUrl}/${selectedOrder._id}`);

            // Fetcher oppdaterte lister
            fetchArchive();
            fetchOrders();
        } catch (error) {
            console.error(error);
        }
    };

    return {
        orders,
        setOrders,
        orderArchive,
        setArchive,
        terminals,
        setTerminals,
        showModal,
        setShowModal,
        selectedOrder,
        setSelectedOrder,
        selectedTerminals,
        setSelectedTerminals,
        fetchOrders,
        fetchTerminals,
        fetchArchive,
        handleOrder,
        handleTerminalSelection,
        handleOrderSubmit,
        handleReceiveTerminal
    };
}