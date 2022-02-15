const express = require('express')
const path = require('path')
const logger = require('./logger')

const app = express()

app.use(logger)


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/users',require('./routes/api/users'))

app.use(express.static(path.join(__dirname,'public')))

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT}`)
})