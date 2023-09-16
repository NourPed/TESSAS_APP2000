/*
 * StorageLocationContext
 *
 * Denne komponenten tar vare på hvilken instans brukeren opererer på.
 * 
 * Lagd av 6003
 */

import { createContext } from 'react';

export const StorageLocationContext = createContext({ selectedStorage: null, setSelectedStorage: () => {} });