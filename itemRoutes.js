const express = require('express')
const router = new express.Router()
const items = require('./fakeDB')
const ExpressError = require('./expressError')

router.get('/', (req,res,next)=>{
    try{
        if(items) return res.json({items})
        throw new ExpressError('No items in fakeDB', 404)
    }catch(err){
        next(err)
    }

})

router.post('/', (req,res,next)=>{
    try{
        if(req.body.item && req.body.item.name && req.body.item.price){
            items.push(req.body.item)
            return res.status(201).json({added:req.body.item})
        }
        throw new ExpressError('Invalid Request:Request body must have a JSON object named item with the keys of name and price',400)
    }catch(err){
        next(err)
    }
    
})

router.get('/:name', (req,res,next)=>{
    try{
        for(let i of items){
            if(i.name === req.params.name){
                return res.json(i)
            }
        }
        throw new ExpressError('Item not found', 404)
    }catch(err){
        next(err)
    }
})

router.patch('/:name',(req,res,next)=>{
    try{
        if(!req.body.item || !req.body.item.name || !req.body.item.price){
            throw new ExpressError('Invalid Request:Request body must have a JSON object named item with the keys of name and price',400)
        }
        for(let x in items){
            if(items[x].name === req.params.name){
                items[x] = req.body.item
                return res.json({'updated': items[x]})
            }
        }
        throw new ExpressError('Item not found', 404)
    }catch(err){
        next(err)
    }
})

router.delete('/:name', (req,res,next)=>{
    try{
        for(let x in items){
            if(items[x].name === req.params.name){
                items[x] = null
                items.splice(x,1)
                return res.json({'message': 'Deleted'})
            }
        }
        throw new ExpressError('Item not found', 404)
    }catch(err){
        next(err)
    }

})

module.exports = router 