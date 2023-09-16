//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const Terminal = require('../models/Terminal')

/* CRUD-funksjoner som skal tilbys client
Alle funksjonene benytter async - await syntaks for å ikke hindre andre oppgaver
som venter på å bli utført, jfr. promises.
Alle funksjonene tar objekt-request (req) og objekt-response (res) som parametere
for å tillate for å motta og sende informasjon mellom databasen og klienten,
Merk: ikke alle funksjonene benytter seg av req-parameteret, likevel tatt med */

//Returnerer alle terminaler
const getAllTerminals = async (req, res) =>{
    try{
        const terminals = await Terminal.find({})
        res.status(200).json({terminals})
    } catch(error){
        res.status(500).json({ msg: error}) //500 = general server error
    }
}

//Returnerer en terminal med gitt _id
const getTerminal = async (req, res) =>{
    try{
        const{id:terminalID} = req.params
        const terminal = await Terminal.findOne( { _id:terminalID} )
    if(!terminal){
        return res.status(404).json({ msg: `No terminal with id: ${terminalID}`} )
    }
    res.status(200).json({terminal})
    } catch (error){
        res.status(500).json({ msg: error})
    }
    
}

//Legger til 1 terminal med data gitt i req.body
const addTerminals = async (req, res) =>{
    try{
        const terminal = await Terminal.create(req.body)
        res.status(201).json({terminal})
    } catch (error){
        res.status(500).json({msg: error})
    }
}

//Oppdaterer 1 terminal med gitt _id og fyller inn data sendt med req.body
const updateTerminals = async (req, res) =>{
    try{
        const { id:terminalID } = req.params
        const terminal = await Terminal.findOneAndUpdate({ _id:terminalID}, req.body,{
            new:true,
            runValidators:true,
        })
        if(!terminal){
            return res.status(404).json({ msg: `No terminal with id: ${terminalID}`} )
        }
        res.status(200).json({ terminal })
    } catch (error) {
        res.status(500).json({msg: error})
    }
      
}

//Sletter en terminal med gitt _id
const deleteTerminals = async (req, res) =>{
    try{
        const {id:terminalID} = req.params
        const terminal = await Terminal.findOneAndDelete({_id:terminalID})
        if(!terminal){
            return res.status(404).json({ msg: `No terminal with id: ${terminalID}`} ) 
        }
        res.status(200).json({ terminal })
    }catch(error){
        res.status(500).json({msg: error})
    }
}

//Returnerer alle terminaler som har available(tilgjenglighet) satt til ledig
const getAvailableTerminals = async (req, res) => {
    try {
      const terminals = await Terminal.find({ available: true })
      res.status(200).json({ terminals })
    } catch (error) {
      res.status(500).json({ msg: error })
    }
  }

//Returnerer alle terminaler som har available(tilgjenglighet) satt til ikke-ledig
const getUnavailableTerminals = async (req, res) => {
    try {
      const terminals = await Terminal.find({ available: false })
      res.status(200).json({ terminals })
    } catch (error) {
      res.status(500).json({ msg: error })
    }
  }

  //Metode for å returnere 1 terminal basert på serienummer
  const getTerminalBySn = async (req, res) =>{
    try{
        const{id:terminalSN} = req.params
        const terminal = await Terminal.findOne( { serienummer:terminalSN} )
    if(!terminal){
        return res.status(404).json({ msg: `No terminal with id: ${terminalSN}`} )
    }
    res.status(200).json({terminal})
    } catch (error){
        res.status(500).json({ msg: error})
    }   
}


module.exports = {
    getAllTerminals,
    getTerminal,
    addTerminals,
    updateTerminals,
    deleteTerminals,
    getAvailableTerminals,
    getUnavailableTerminals,
    getTerminalBySn,
}
  
