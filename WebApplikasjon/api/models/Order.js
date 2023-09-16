//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  
    amount: {
        type: Number,
        required:[true, 'must provide number of terminals'],
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
        //Legger inn disse 4 i enum-klassen,  enkelt å endre på basert på behovet vi har
        type: String, enum: ['VENTER', 'GJENNOMFØRT', 'AVVIST', 'TRANSIT', 'I BRUK', 'TRANSIT RETUR'], //Endret til norsk, siden dette vendes mot bruker -F.E CC
        default: 'VENTER',
    },
    
    orderTerminals:{
        type: [String],
        default: null
    }
})

module.exports = mongoose.model('Order', OrderSchema)
