const express = require("express")
const cors = require("cors")
const path = require("path")
const logger = require('morgan');

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, "./my-images")))
app.use(logger('dev'));

const port = 4000 || process.env.PORT

app.use(require("./routes.js"))

app.listen(port, ()=>{
    console.log("server open")
})