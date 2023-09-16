//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
//Her defineres http-adresser for de ulike CRUD-operasjonene.
//En adresse angis, samt hvilken funksjon fra controller-modulen som skal kalles på ved bruk av adresses.
const express = require('express')
const router = express.Router()
const mongoSanitize = require('express-mongo-sanitize')

const{
    getAllWarehouses,
    getWarehouse,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse
} = require('../controllers/warehouse.controller')

router.use(mongoSanitize())

router.get('/', getAllWarehouses)

router.get('/:id', getWarehouse)

router.post('/', addWarehouse)

router.patch('/:id', updateWarehouse)

router.delete('/:id', deleteWarehouse)

module.exports = router
