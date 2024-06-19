import express from 'express'
import initapp from './src/module/app.router.js'
 import dotenv from 'dotenv'
 import createInvoice from "./src/services/pdf.service.js";
dotenv.config()
const app = express()
const port =process.env.PORT || 3000
//  app.set('case sensitive routing',true)
initapp(app,express)

 app.listen(port, () => console.log(`Example app listening on port ${port}!`))