const express = require("express")
const cors = require("cors")
const path = require("path")
const logger = require('morgan');

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, "./my-images/")))
app.use(logger('dev'));


app.use(require("./routes.js"))

const { PORT=3001, LOCAL_ADDRESS='0.0.0.0' } = process.env
app.listen(PORT, LOCAL_ADDRESS, () => {
  console.log('server listening at', PORT);
});