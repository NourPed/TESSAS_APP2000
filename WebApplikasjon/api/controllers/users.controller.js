//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const User = require('../models/User')

/* CRUD-funksjoner som skal tilbys client
Alle funksjonene benytter async - await syntaks for å ikke hindre andre oppgaver
som venter på å bli utført, jfr. promises.
Alle funksjonene tar objekt-request (req) og objekt-response (res) som parametere
for å tillate for å motta og sende informasjon mellom databasen og klienten,
Merk: ikke alle funksjonene benytter seg av req-parameteret, likevel tatt med */

//Returnerer alle brukere
const getAllUsers = async (req, res) =>{
    try{
        const user = await User.find({})
        res.status(200).json({user})
    } catch(error){
        res.status(500).json({ msg: error}) //500 = general server error
    }
}

//Returnerer 1 bruker med gitt brukernavn
const getUser = async (req, res) =>{
    try{
        const{id:username} = req.params
        const user = await User.findOne( { userName:username} )
    if(!user){
        return res.status(404).json({ msg: `No User with id: ${username}`} )
    }
    res.status(200).json({user})
    } catch (error){
        res.status(500).json({ msg: error})
    }
    
}

//Legger til 1 bruker med data som sendes medi req.body
const addUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  };
 
//Oppdaterer 1 bruker med gitt brukernavn og oppdaterer brukernavn og/eller passord   
const updateUser = async (req, res) => {
    try {
      const { id: username } = req.params;
  
      // Finner fram til bruker via findOne, leter på brukernavn (userName)
      const user = await User.findOne({ userName: username });
  
      if (!user) {
        return res.status(404).json({ msg: `No user with id: ${username}` });
      }
  
      //Oppdaterer feltene i user, legger ved "||" for å sikre at passordet forblir dersom man ikke får endret til nytt passord
      user.userName = req.body.userName || user.userName;
      user.password = req.body.password || user.password;
  
      // Kaller på save() for å sikre at krypterings-middleware i user-modellen faktisk benyttes. 
      await user.save();
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

//Sletter en bruker med et gitt brukernavn 
const deleteUser = async (req, res) =>{
    try{
        const {id:username} = req.params
        const user = await User.findOneAndDelete({userName:username})
        if(!user){
            return res.status(404).json({ msg: `No user with id: ${username}`} ) 
        }
        res.status(200).json({ user })
    }catch(error){
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
}
  
