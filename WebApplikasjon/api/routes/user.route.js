//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const express = require('express')
const router = express.Router()
const mongoSanitize = require('express-mongo-sanitize')

const{
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller');

router.use(mongoSanitize())

router.get('/', getAllUsers)

router.get('/:id', getUser)

router.post('/', addUser)

router.patch('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router
