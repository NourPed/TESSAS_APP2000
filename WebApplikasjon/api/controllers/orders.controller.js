//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const Order = require('../models/Order')

/* CRUD-funksjoner som skal tilbys client
Alle funksjonene benytter async - await syntaks for å ikke hindre andre oppgaver
som venter på å bli utført, jfr. promises.
Alle funksjonene tar objekt-request (req) og objekt-response (res) som parametere
for å tillate for å motta og sende informasjon mellom databasen og klienten,
Merk: ikke alle funksjonene benytter seg av req-parameteret, likevel tatt med */


//Henter alle ordre 
const getAllOrders = async (req, res) =>{
    try{
        const orders = await Order.find({})
        res.status(200).json({orders})
    } catch(error){
        res.status(500).json({ msg: error}) //500 = general server error
    }
}

//Henter 1 med gitt _id
const getOrderByID = async (req, res) =>{
    try{
        const{id:orderID} = req.params
        const order = await Order.findOne( { _id:orderID}) 
 
    if(!order){
        return res.status(404).json({ msg: `No order with id: ${orderID}`} )
    }
    res.status(200).json({order})
    } catch (error){
        res.status(500).json({ msg: error})
    }   
}
//Returnerer ordre som er forespurt av et gitt lager/lokasjon
//Brukes ikke av front-end, men er beholdt da den kan være nyttig i evt. videreutvikling
const getOrderByLocation = async (req, res) =>{
    try{
        const {locationID:location} = req.params
        const order = await Order.find({ requestedBy: location }) 
    if(!order){
        return res.status(404).json({ msg: `No orders with by warehouse: ${location}`})
    }
    res.status(200).json({order})

    }catch (error){
        res.status(500).json({ msg: error})
    }
}

//Legger til en ordre med data som følger i req.body
const addOrder = async (req, res) =>{
    try{
        const order = await Order.create(req.body)
        res.status(201).json({order})
    } catch (error){
        res.status(500).json({msg: error})
    }
}

//Oppdaterer en ordre (med gitt _id) ved å patche inn data som sendes med i req.body
const updateOrder = async (req, res) =>{
    try{
        const { id:orderID } = req.params
        const order = await Order.findOneAndUpdate({ _id:orderID}, req.body,{
            new:true,
            runValidators:true,
        })
        if(!order){
            return res.status(404).json({ msg: `No terminal with id: ${orderID}`} )
        }
        res.status(200).json({ order })
    } catch (error) {
        res.status(500).json({msg: error})
    }
      
}

//Sletter en ordre med gitt _id
const deleteOrder = async (req, res) =>{
    try{
        const {id:orderID} = req.params
        const order = await Order.findOneAndDelete({_id:orderID})
        if(!order){
            return res.status(404).json({ msg: `No terminal with id: ${orderID}`} ) 
        }
        res.status(200).json({ order })
    }catch(error){
        res.status(500).json({msg: error})
    }
}


module.exports = {
    getAllOrders,
    getOrderByID,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderByLocation
}

