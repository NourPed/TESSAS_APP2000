//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const OrderArchive = require('../models/OrderArchive')

/* CRUD-funksjoner som skal tilbys client
Alle funksjonene benytter async - await syntaks for å ikke hindre andre oppgaver
som venter på å bli utført, jfr. promises.
Alle funksjonene tar objekt-request (req) og objekt-response (res) som parametere
for å tillate for å motta og sende informasjon mellom databasen og klienten,
Merk: ikke alle funksjonene benytter seg av req-parameteret, likevel tatt med */

//Henter ut alle ordre i arkivet
const getAllOrdersArchive = async (req, res) =>{
    try{
        const ordersArchive = await OrderArchive.find({})
        res.status(200).json({ordersArchive})
    } catch(error){
        res.status(500).json({ msg: error}) //500 = general server error
    }
}

//Henter ut 1 ordre med gitt _id
const getOrderArchiveByID = async (req, res) =>{
    try{
        const{id:orderArchiveID} = req.params
        const orderArchive = await Order.findOne( { _id:orderArchive}) 
 
    if(!orderArchive){
        return res.status(404).json({ msg: `No order with id: ${orderArchiveID}`} )
    }
    res.status(200).json({orderArchive})
    } catch (error){
        res.status(500).json({ msg: error})
    }   
}

//Legger til ordre i arkivet, sender med data som kommer med i req.body
const addOrderArchive = async (req, res) =>{
    try{
        const orderArchive = await OrderArchive.create(req.body)
        res.status(201).json({orderArchive})
    } catch (error){
        res.status(500).json({msg: error})
    }
}

//Oppdaterer en ordre i arkivet, identifiseres ved _id og patcher basert på data i req.body
const updateOrderArchive = async (req, res) =>{
    try{
        const { id:orderArchiveID } = req.params
        const orderArchive = await OrderArchive.findOneAndUpdate({ _id:orderArchiveID}, req.body,{
            new:true,
            runValidators:true,
        })
        if(!orderArchive){
            return res.status(404).json({ msg: `No terminal with id: ${orderArchiveID}`} )
        }
        res.status(200).json({ orderArchive })
    } catch (error) {
        res.status(500).json({msg: error})
    }
      
}

//Sletter ordre i arkivet med gitt _id
const deleteOrderArchive = async (req, res) =>{
    try{
        const {id:orderArchiveID} = req.params
        const orderArchive = await OrderArchive.findOneAndDelete({_id:orderArchiveID})
        if(!orderArchive){
            return res.status(404).json({ msg: `No terminal with id: ${orderArchiveID}`} ) 
        }
        res.status(200).json({ orderArchive })
    }catch(error){
        res.status(500).json({msg: error})
    }
}


module.exports = {
    getAllOrdersArchive,
    getOrderArchiveByID,
    addOrderArchive,
    updateOrderArchive,
    deleteOrderArchive
}

