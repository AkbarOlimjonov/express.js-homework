const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()

const port = process.env.PORT || 3001

// Importing routes
const courseRouter = require('./routes/courses')
const homeRouter = require('./routes/home')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(morgan('tiny'))

//routes
app.use('/', homeRouter)
app.use('/courses', courseRouter)




app.listen(port, () => {
    console.log(`Server http://localhost:${port}`)
})