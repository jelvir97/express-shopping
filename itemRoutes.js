const express = require('express')
const router = new express.Router()
const items = require('./fakeDB')

router.get('/', (req,res,next)=>{
    res.json({items})
})

router.post('/', (req,res,next)=>{
    items.push(req.body.item)
    res.json({added:req.body.item})
})

router.get('/:name', (req,res,next)=>{
    console.log('Looking for items named' + req.params.name)
    for(let i of items){
        if(i.name === req.params.name){
            return res.json(i)
        }
    }
})

router.patch('/:name',(req,res,next)=>{
    for(let x in items){
        if(items[x].name === req.params.name){
            items[x] = req.body.item
            return res.json({'updated': items[x]})
        }
    }
})

router.delete('/:name', (req,res,next)=>{
    for(let x in items){
        if(items[x].name === req.params.name){
            items[x] = null
            items.splice(x,1)
            return res.json({'message': 'Deleted'})
        }
    }
})

module.exports = router 