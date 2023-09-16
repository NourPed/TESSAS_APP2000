//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const express = require('express')
const router = express.Router()
const mongoSanitize = require('express-mongo-sanitize')

const {
    getAllTerminals,
    addTerminals,
    updateTerminals,
    deleteTerminals,
    getTerminal,
    getAvailableTerminals,
    getUnavailableTerminals,
    getTerminalBySn,

} = require('../controllers/terminals.controller')

router.use(mongoSanitize())

router.get('/', getAllTerminals)

router.get('/available', getAvailableTerminals)

router.get('/unavailable', getUnavailableTerminals)

router.get('/:id', getTerminal)

router.get('/serialnumber/:id', getTerminalBySn)

router.post('/', addTerminals)

router.patch('/:id', updateTerminals)

router.delete('/:id', deleteTerminals)

module.exports = router
