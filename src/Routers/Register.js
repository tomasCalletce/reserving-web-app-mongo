const express = require('express');
const router = express.Router();


const Usuario = require('../db/mongo/models/Usuario')


router.get('/registro', (req, res) => {
    res.render('Registro')
})

router.post('/registrate', async (req, res) => {
    const user = req.body
    const usuario = new Usuario({
        nombre : user.nombre,
        codigo : user.codigo,
        email : user.email,
        pasword : user.password,
        isAdmin : false
    })
   
    try{
        usuario.save().then((su)=>{
            res.send(true)
            console.log(su)
        }).catch((e)=>{
            console.log(e)
            res.send(false)
        })
        
    }catch{
        console.log('Failed to create user')
    }

})







module.exports = router