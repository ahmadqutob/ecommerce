import express from 'express'
import initapp from './src/module/app.router.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = 3000

initapp(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))