const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 3000

// Importing routes
const courseRouter = require('./routes/courses')
const homeRouter = require('./routes/home')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())




//routes
app.use('/', homeRouter)
app.use('/courses', courseRouter)


app.listen(port, () => {
    console.log(`Server http//localhost:${port}`)
})