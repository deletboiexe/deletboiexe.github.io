require("dotenv").config()
const path = require("path")
const fs = require("fs")
const express = require("express")
const app = express()

app.use("/assets", express.static(path.join(__dirname, "assets")))
const routeFiles = fs.readdirSync("./routes").filter(file => file.endsWith(".js"))
for(const file of routeFiles) {
    const route = require(`./routes/${file}`)
    app.get(route.route, (req, res) => route.execute(app, req, res))
}

app.get("/*", (req, res) => res.redirect("/404"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port *:${PORT.toString()}`))