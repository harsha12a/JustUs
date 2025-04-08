import express from "express"
import cors from "cors"
import dotenv from "dotenv"

let app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('JustUs Server is running')
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})