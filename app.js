const express = require('express')
const ExpressError = require('./expressError')

const app = express()

app.listen(3000, ()=>{
    console.log('SERVER RUNNING ON PORT 3000')
})