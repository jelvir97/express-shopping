const express = require('express')
const ExpressError = require('./expressError')
const itemRoutes = require('./itemRoutes')

const app = express()

app.use(express.json())

app.use('/items',itemRoutes)

app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
})

app.use((err,req,res,next)=>{
    let message = err.message
    let status = err.status ? err.status:500
    return res.status(status).json({
        error: {message, status}
      });
})

app.listen(3000, ()=>{
    console.log('SERVER RUNNING ON PORT 3000')
})