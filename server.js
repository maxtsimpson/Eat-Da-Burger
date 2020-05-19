// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
const connection = require("./config/mongo.js")
const express = require("express");
const Burger = require("./models/burger")

// Sets up the Express App
// =============================================================
let app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory to be served
app.use(express.static("public"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//create the model object and connect it
const burger = new Burger()
burger.getConnection().then((connection) => {
    burger.connection = connection

    // Import routes and give the server access to them.
    const routes = require("./controllers/burgers_controller.js")(burger);
    app.use(routes)

    console.log("===============")
    console.log(connection)
    console.log("===============")
    // Starts the server to begin listening
    // =============================================================
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });

})


