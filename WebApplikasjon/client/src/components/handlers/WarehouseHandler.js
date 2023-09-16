/*
 * WarehouseHandler
 *
 * Denne filen tar seg av logikken rundt behandlingen av lager.
 * Dette er ting som søking, oppretting, oppdatering, og sletting.
 * 
 * Kopiert fra 'TerminalHandler.js' og tilpasset deretter.
 * 
 * Lagd av 6004
 */

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function WarehouseHandler() {
    const url = 'http://localhost:3500/api/v1/warehouse'; // URL til API-endpoint

    // Definerer states
    const [warehouses, setWarehouses] = useState([]); // Liste over lager
    const [filteredWarehouses, setFilteredWarehouses] = useState([]); // Liste over filtrerte lager
    const [warehouseName, setWarehouseName] = useState(""); // Varehusnavn
    const [warehouseLocation, setWarehouseLocation] = useState(""); // Lokasjon
    const [warehouseAddress, setWarehouseAddress] = useState(""); // Adresse
    const [warehousePhone, setWarehousePhone] = useState(""); // Telefon
    const [warehouseEmail, setWarehouseEmail] = useState(""); // Epost
    const [selectedWarehouse, setSelectedWarehouse] = useState(null); // Valgt lager
    const [currentWarehouseName, setCurrentWarehouseName] = useState(""); // Navnet på valgt lager
    const [currentWarehouseLocation, setCurrentWarehouseLocation] = useState(""); // Lokasjonen til valgt lager
    const [currentWarehouseAddress, setCurrentWarehouseAddress] = useState(""); // Adressen til valgt lager
    const [currentWarehousePhone, setCurrentWarehousePhone] = useState(""); // Telefonnr til valgt lager
    const [currentWarehouseEmail, setCurrentWarehouseEmail] = useState(""); // Eposten til valgt lager

    // Bruker useEffect for å hente lagerdata fra API
    useEffect(() => {
        axios.get(url) // Sender GET til API-endpoint
            .then(response => {
                // Setter lager og filtrerte lager til responsdata
                setWarehouses(response.data.warehouses);
                setFilteredWarehouses(response.data.warehouses);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Håndterer søk i lager
    const handleSearch = (warehouseList, query) => {
        const lowerCaseQuery = query.toLowerCase(); // Konverterer input til lowercase

        // Filtrerer varehuslisten basert på søkskriterie
        const filtered = warehouseList.filter((warehouse) => {
            // Sjekker om noen av de feltene angitt inneholder søkskriteriet
            return ['name', 'location_name', 'address', 'tlf', 'epost'].some((field) => {
                const value = warehouse[field];
                return typeof value === 'string' && value.toLowerCase().includes(lowerCaseQuery);
            });
        });
        setFilteredWarehouses(filtered); // Returnerer filtrert søkeresultat
    };

    // Håndtering av registrering for ny(e) lager(e)
    const handleInsert = () => {
        // Rudimentær inputvalidering
        if (warehouseName === "")
            alert("Navn kan ikke være tomt!");
        if (warehouseLocation === "")
            alert("Lokasjon kan ikke være tom!");
        if (warehouseAddress === "")
            alert("Adresse kan ikke være tom!");
        if (warehousePhone === "")
            alert("Telefonnummer kan ikke være tomt!");
        if (warehouseEmail === "")
            alert("Epost kan ikke være tom!");
        else {
            // Sender POST-forespørsel for å legge til nytt lager
            axios.post(url, {
                name: warehouseName,
                location_name: warehouseLocation,
                address: warehouseAddress,
                tlf: warehousePhone,
                email: warehouseEmail
            }).then(_ => {
                // Etter vellykket POST, gjør en ny GET for å hente
                // den oppdaterte listen over lagere
                axios.get(url)
                    .then(response => {
                        setWarehouses(response.data.warehouses);
                        setFilteredWarehouses(response.data.warehouses);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }).catch(error => {
                console.log(error);
            });
        }
    };

    // Håndterer oppdatering av lagerinformasjon
    const handleUpdate = () => {
        // "Sveiser på" IDen til det valgte varehuset i URLen for å spesifisere
        // hvilket lager som skal oppdateres
        const updateUrl = `${url}/${selectedWarehouse._id}`;

        // Sender en PATCH til APIet med dataene i de angitte feltene
        axios.patch(updateUrl, {
            name: currentWarehouseName,
            location_name: currentWarehouseLocation,
            address: currentWarehouseAddress,
            tlf: currentWarehousePhone,
            email: currentWarehouseEmail
        }).then(_ => {
            // Etter vellykket PATCH, gjør en ny GET for å hente
            // den oppdaterte listen over lagere
            axios.get(url)
                .then(response => {
                    setWarehouses(response.data.warehouses);
                    setFilteredWarehouses(response.data.warehouses);
                })
                .catch(error => {
                    console.log(error);
                });
        }).catch(error => {
            console.log(error);
        });

        console.log(updateUrl);
    };

    // Håndterer sletting av lager
    const handleDelete = (id) => {
        // Sender en DELETE til APIet med den "påsveiste" IDen
        axios.delete(`${url}/${id}`)
            .then(_ => {
                // Etter vellykket DELETE, gjør en ny GET for å hente
                // den oppdaterte listen over lagere
                axios.get(url)
                    .then(response => {
                        setWarehouses(response.data.warehouses);
                        setFilteredWarehouses(response.data.warehouses);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Håndterer valgt lager; tar inn ID
    const handleWarehouse = (id) => {
        // Finner valgt lager basert på ID
        const warehouse = warehouses.find(warehouse => warehouse._id === id);

        // Setter valgt lagers detaljer som nåværende lager
        setSelectedWarehouse(warehouse);
        setCurrentWarehouseName(warehouse.name);
        setCurrentWarehouseLocation(warehouse.location_name);
        setCurrentWarehouseAddress(warehouse.address);
        setCurrentWarehousePhone(warehouse.tlf);
        setCurrentWarehouseEmail(warehouse.email);
    };

    // Håndterer lukking av valgt lager
    const handleWarehouseClose = () => {
        setSelectedWarehouse(null);
    };

    // Returnerer states og funksjoner
    return {
        warehouses,
        setWarehouses,
        filteredWarehouses,
        setFilteredWarehouses,
        warehouseName,
        setWarehouseName,
        warehouseLocation,
        setWarehouseLocation,
        warehouseAddress,
        setWarehouseAddress,
        warehousePhone,
        setWarehousePhone,
        warehouseEmail,
        setWarehouseEmail,
        selectedWarehouse,
        setSelectedWarehouse,
        currentWarehouseName,
        setCurrentWarehouseName,
        currentWarehouseLocation,
        setCurrentWarehouseLocation,
        currentWarehouseAddress,
        setCurrentWarehouseAddress,
        currentWarehousePhone,
        setCurrentWarehousePhone,
        currentWarehouseEmail,
        setCurrentWarehouseEmail,
        handleSearch,
        handleInsert,
        handleDelete,
        handleUpdate,
        handleWarehouse,
        handleWarehouseClose
    };
}
