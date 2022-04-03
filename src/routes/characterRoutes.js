const express = require('express');
const routes = express.Router();

routes.get('/',(req,res)=>{
    res.send('GET /')
})

routes.get('/:id',(req,res)=>{
    res.send('GET /id')
})

routes.post('/',(req,res)=>{
    res.send('POST /')
})

routes.put('/:id',(req,res)=>{
    res.send('PUT /:id')
})

routes.delete('/',(req,res)=>{
    res.send('DELETE /:id')
})
module.exports = routes