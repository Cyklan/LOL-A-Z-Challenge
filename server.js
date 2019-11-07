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

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
