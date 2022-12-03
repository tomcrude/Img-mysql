const express = require("express")
const cors = require("cors")
const path = require("path")
const logger = require('morgan');

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, "./my-images")))
app.use(logger('dev'));

const port = 5000 || process.env.PORT

app.use(require("./routes.js"))

app.listen(port,"0.0.0.0", ()=>{
    console.log("server open")
})