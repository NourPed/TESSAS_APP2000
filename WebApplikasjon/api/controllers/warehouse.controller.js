//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const Warehouse = require('../models/Warehouse')

/* CRUD-funksjoner som skal tilbys client
Alle funksjonene benytter async - await syntaks for å ikke hindre andre oppgaver
som venter på å bli utført, jfr. promises.
Alle funksjonene tar objekt-request (req) og objekt-response (res) som parametere
for å tillate for å motta og sende informasjon mellom databasen og klienten,
Merk: ikke alle funksjonene benytter seg av req-parameteret, likevel tatt med */

//Returnerer alle warehouses (lager)
const getAllWarehouses = async(req, res) =>{
    try{
        const warehouses = await Warehouse.find({})
        res.status(200).json({warehouses})
    } catch(error){
        res.status(500).json({ msg: error})
    }
}

//Returnerer et warehouse/lager med gitt _id
const getWarehouse = async(req, res) =>{
    try{
        const{id:warehouseId} = req.params
        const warehouse = await Warehouse.findOne( {_id:warehouseId} )
        if(!warehouse){
            return res.status(404).json({ msg: `No warehouse with id: ${warehouseId}`})
        }
        res.status(200).json({warehouse})
    } catch(error){
        res.status(500).json({ msg: error})
    }
}

//Legger til et warehouse/lager med gitt _id
const addWarehouse = async (req, res) =>{
    try{
        const warehouse = await Warehouse.create(req.body)
        res.status(201).json({warehouse})
    } catch (error){
        res.status(500).json({msg: error})
    }
}

//Oppdaterer et warehouse/lager med en gitt _id, sender med data fra req.body 
const updateWarehouse = async (req, res) => {
    try{
        const { id: warehouseId} = req.params
        const warehouse = await Warehouse.findOneAndUpdate({_id:warehouseId}, req.body,{
            new: true,
            runValidators:true,
        })
        if(!warehouse){
            return res.status(404).json({ msg: `No warehouse with id: ${warehouseId}`})
        }
        res.status(200).json({ warehouse})
    } catch(error){
        res.status(500).json({ msg:error })
    }
}

//Sletter et warehouse/lager med gitt _id
const deleteWarehouse = async (req, res) => {
    try{
        const{id:warehouseId} = req.params
        const warehouse = await Warehouse.findOneAndDelete({ _id:warehouseId })
        if(!warehouse){
            return res.status(404).json({ msg: `No warehouse with id: ${warehouseId}`})
        }
        res.status(200).json({ warehouse })
    } catch(error){
        res.status(500).json({ msg: error})
    }
}

module.exports = {
    getAllWarehouses,
    getWarehouse,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse,
}
