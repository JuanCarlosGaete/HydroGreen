import express from 'express';
const route = express.Router()

route.get('/', (req, res) =>{
    res.render('index')
})

route.get('/homeAdmin', (req, res) =>{
    res.render('homeAdmin')
})


export default route;