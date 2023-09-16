//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const mongoose = require('mongoose')

const WarehouseSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'must provide name for warehouse'],
        trim: true,
        maxlength: [20, 'name cannot be longer than 20 characters'],
        default: "L81"
        //eks: L81 (interne "koder" tess benytter)
    },

    location_name:{
        type:String,
        default: "TESS-Drammen"
        //eks: tess-drammen
    },

    tlf:{
        type:String,
        default: "+47 00 00 00 00"

    },

    address:{
        type:String,
        default: "N/A"
    },

    email:{
        type:String,
        default: "N/A"
    },

    longitude:{
        type: Number,
        default: 0.0
    },
    
    latitude:{
        type: Number,
        default: 0.0
    }

 //Koden under tar referanser til terminal og orders, det er ikke sikkert dette er 
 //nødvendig for oss. Drøft med gruppa 

/*     terminals: {
        type: Schema.Types.ObjectId, 
        ref: 'Terminal',
        default: [
            '63e3af8803567dc0d2037d10',
            '63e3b225bb843d58ed1df4f0' 
        ]
    },

    orders:{
        type: {type: Schema.Types.ObjectId, ref: 'Order'},
        default: {}
    } */

})

module.exports = mongoose.model('Warehouse', WarehouseSchema)
