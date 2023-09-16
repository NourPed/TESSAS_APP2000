/*
 * SearchComponent.js
 *
 * Denne filen lager et søkefelt og behandler events derav.
 * 
 * Lagd av 6004
 */

import React, { useState } from 'react';

// En komponent for å søke etter terminaler.
// Den tar inn en liste med terminaler og en funksjon som skal kjøres når man søker.
function SearchComponent({ items = [], onSearch }) {
  const [query, setQuery] = useState(''); // Oppretter en (lokal) state for søkefeltet med en tom streng som startverdi

    // Funksjon for å håndtere søket; kaller funksjonen 'onSearch' med søkestrengen.
  const handleSearch = (event) => {
    // Koden ville ikke submitte formen når man trykket 'enter'
    // Stjålet fra https://bobbyhadz.com/blog/react-enter-key-submit-form
    event.preventDefault(); // Hindrer default (måtte trykke på button)
    onSearch(items, query);
  };

  // Returnerer søket.
  // '<form onSubmit={handleSearch}>' submitter formen ved å trykke enter i stedet for knappen
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Søk..."
      />
      <button onClick={handleSearch}>Søk</button>
    </form>
  );
};

export default SearchComponent;
