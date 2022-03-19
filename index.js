const express = require('express')
const cors = require('cors')

const app = express()

//Config JSON response
app.use(express.json())
const mongodb = require('./db/conn')
// Solve CORS
app.use(cors({
  credentials: true,
  origin: '*'
}))

// Public folder for images
app.use(express.static('public'))

//Routes
const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)

app.listen(process.env.PORT || 5000)