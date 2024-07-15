import express from 'express'
import mongoose from 'mongoose'
import { MONGO_URL, PORT } from './config.js'
import bookRouter from './routes/book.route.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
const app = express()
// middleware for parsing the body
app.use(express.json())

// middleware for handling the cors policy
// 1.allow all origin for default of cors
app.use(cors())
// 2.allow  custom origin
// app.use(cors({
//     origin:"http://localhost:5173",
//     methods:["GET,POST,PUT,DELETE"],
//     allowedHeaders:['Content-Type']
// }))

app.use('/books',bookRouter)
app.get('/', (req, res) => {
    res.send('hello world')
})

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("database is connected")
        app.listen(PORT, (err) => {
            if (err) {
                console.log(`server is not able to connect on the port ${PORT}`)

            }
            console.log(`server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(`server is not able to connect database ${err}`)
    })