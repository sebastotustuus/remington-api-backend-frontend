import "reflect-metadata"
import 'dotenv/config'
import Router from "./server"
import express from "express"
import { connectionToMongo } from "./repositories/conection/mongodb"

const app = express()
const router = new Router()

app.use(router.registerRoutes())

connectionToMongo(process.env.MONGO_URI).then(res => {
    app.listen(8000, () => {
        console.log('Server on port: ' + 8000)
    })
}).catch(err => {
    console.log(`Error connection with DataBase: ${err}`)
})

