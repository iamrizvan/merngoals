const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const port = process.env.PORT ||  5000
const {errorHandler} = require('./middleware/errormiddleware')


connectDB()
const app = express()
app.use(express.json())

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server is listening on port ${port}`))