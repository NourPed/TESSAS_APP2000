//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
//Middleware-Funksjonen for auto-increment av Counter (counterschema) er utformet ved hjelp og inspirasjon fra følgende mongodbartikkel: 
// kilde: https://www.mongodb.com/basics/mongodb-auto-increment
const mongoose = require('mongoose');

//Oppretter en ny schema for counter/teller. Denne holder på _id

const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 1,
  },
});

const Counter = mongoose.model('Counter', CounterSchema);

const TerminalSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    default: 'Drammen',
  },
  modell: {
    type: String,
    default: 'WapMan'
  },
  serienummer: {
    type: String,
    default: 'xxx-xxx-xxx-xxx'
  },
  operativsystem: {
    type: String,
    default: "Windows"
  }
});

//Funksjonen leter fra objekt i collection CounterSchema(det eksistere kun ett objekt i denne samlingen)
//Incrementere så tallverdien og gir denne til datafelet id i schema TerminalSchema. Denne funksjonen kjører alltid før vi lagrer nytt terminal-objekt
//Kilde for middlewarefunksjonen: https://www.mongodb.com/basics/mongodb-auto-increment
TerminalSchema.pre('save', function (next) {
  const terminal = this;
  Counter.findByIdAndUpdate(
    { _id: 'terminalId' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
    function (error, counter) {
      if (error) {
        return next(error);
      }
      terminal.id = counter.seq;
      next();
    }
  );
});

module.exports = mongoose.model('Terminal', TerminalSchema);
