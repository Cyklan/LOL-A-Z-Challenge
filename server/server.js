require("dotenv").config()
const express = require("express")
const routes = require("./src/routes")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api", routes)

app.listen(42069, () => {
  console.log("Listening on port 42069")
})
