const express = require("express")
const cors = require("cors")
const path = require("path")
const logger = require('morgan');

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, "./my-images")))
app.use(logger('dev'));


app.use(require("./routes.js"))

app.listen(4000 || process.env.PORT, ()=>{
    console.log("server open")
})