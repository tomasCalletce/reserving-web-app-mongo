const express = require('express')
const router = express.Router()



const Aula = require('../db/mongo/models/Aula')
const AsistenteTecnico = require('../db/mongo/models/AsistenteTecnico')

router.get('/admin', (req, res) => {
    res.render('admin')
})

router.post('/crearComputador', async (req, res) => {
    const info = req.body;

    try {

        await Aula.updateOne({codigo : info.aula},{$push:{
            computadoras : {
                idComputador : info.id,
                ram : info.RAM,
                cpu : info.CPU,
                gpu : info.GPU,
                horariosHoy : [],
                solicitudesMantenimiento : []
            }
        }})  

    } catch (error) {
        console.log(error)
    }


})
router.post('/crearAula', async(req, res) => {
    const info = req.body;
    

    const asis = await AsistenteTecnico.findOne({
        idAsistente : info.idAsistente
    })
    const aula = new Aula({
        codigo : info.aula,
        cupoMaximo : info.cupoMaximo,
        asistente : asis,
        computadoras : [],

    })
    
    try {
        aula.save().then((su)=>{
            res.status(200)
            console.log(su)
        }).catch((e)=>{
            console.log(e)
            res.send(404)
        })
        
    } catch (error) {
        console.log(error)
    }
  

})
router.post('/crearAsistenteTecnico', async(req, res) => {
    const info = req.body;
    console.log(info)

    try {

        const asistenteExiste = await AsistenteTecnico.find({idAsistente : info.idAsistente})
        const size = asistenteExiste.length;

        const asistente = new AsistenteTecnico({
            ...info
        })

        asistente.save().then((su)=>{
            res.send(true)
            console.log(su)
        }).catch((e)=>{
            console.log(e)
            res.send(false)
        })
    } catch (error) {
        console.log(error)
        res.send(false)
    }

   
})

module.exports = router