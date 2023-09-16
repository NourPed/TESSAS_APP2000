//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
//Her defineres http-adresser for de ulike CRUD-operasjonene.
//En adresse angis, samt hvilken funksjon fra controller-modulen som skal kalles på ved bruk av adresses.
const express = require('express')
const router = express.Router()
const mongoSanitize = require('express-mongo-sanitize')
const {
    getAllOrdersArchive,
    getOrderArchiveByID,
    addOrderArchive,
    updateOrderArchive,
    deleteOrderArchive,
}
 = require('../controllers/orderArchive.controller')

router.use(mongoSanitize())

router.get('/', getAllOrdersArchive)

router.get('/:id', getOrderArchiveByID)

router.post('/', addOrderArchive)

router.patch('/:id', updateOrderArchive)

router.delete('/:id', deleteOrderArchive)



module.exports = router
