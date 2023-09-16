//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const mongoose = require('mongoose')

const OrderArchiveSchema = new mongoose.Schema({
  
    amount: {
        type: Number,
        //required:[true, 'must provide number of terminals'], midtlertidlig fjernet for feilsøking
        trim: true,

    },

    requestedDate: {
        type: String,
        //type: Date, fjerner Date midtlertidlig for å unngå formatering av data
        default: 'Ingen Verdi Gitt' //new Date(),
    },

    startDate: {
        type: String,
        //type: Date, fjerner Date midtlertidlig for å unngå formatering av data
        default: 'Ingen Verdi Gitt' //new Date(),
    },

    endDate: {
        type: String,
        default: 'Ingen Verdi Gitt'
        //Kommentert ut fra FE for å spare tid på formatering
        //type: Date,
        //default: new Date(+ new Date() + 7*24*60*60*1000) 
        //her settes end-Date til + 7 dager. Må endres 
        //slik at bruker selv kan bestemme 
    },

    requestedBy:{
        type: String,
        default: 'Drammen',
    },

    status:{
        type: String,
        default: 'Arkivert',
    },

    orderTerminals:{
        type: [String],
        default: null
    }
})

module.exports = mongoose.model('OrderArchive', OrderArchiveSchema)
