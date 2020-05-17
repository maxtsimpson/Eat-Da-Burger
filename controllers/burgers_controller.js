const Burger = require("../models/burger")
const burger = new Burger()

// burger.insertOne({
//         burger_name: 'cheeseburger',
//         devoured: 0
// })
// .then((burger) => console.log(burger))
// .catch((error) => console.error(error))

burger.updateOne({
    _id: '5ebff25bc5b52608d81d6b16',
    burger_name: 'cheeseburger',
    devoured: 1
})
    .then((burger) => console.log(burger))
    .catch((error) => console.error(error))

// burger.selectAll()
// .then((burgers) => console.table(burgers))
// .catch((error) => console.error(error))

// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Chirp = require("../models/chirp.js");


// Routes
// =============================================================
module.exports = function (app) {

    // Get all burgers
    app.get("/api/all", function (req, res) {

        //find all burgers and return as json
        burger.selectAll().then((results) => {
            // results are available to us inside the .then
            res.body(results);
        }).catch((error) => {
            res.status(500);
            res.body(error)
            res.end();
        });

    });

    // Add a burger
    app.post("/api/new", (req, res) => {

        //add a burger and return added as json
        console.log("burger Data:");
        console.log(req.body);

        if (typeof req.body.burger_name !== "string" ) {
            res.status(400);
            res.body("burger_name must be a string")
            res.end();
        }

        if (typeof req.body.devoured !== "boolean") {
            res.status(400);
            res.body("devoured must be a boolean")
            res.end();
        }

        burger.insertOne({
            burger_name: req.body.burger_name,
            devoured: req.body.devoured,
        }).then((burger) => {
            // burger here would be the newly created burger
            res.body(burger)
            res.end();
        }).catch((error) => {
            res.status(500);
            res.body(error)
            res.end();
        });

    });

    app.put("/api/update/:burgerid", (req, res) => {
        //update a burger and return updated as json
        console.log("burger Data:");
        let burger = req.body 
        console.log(req.body);
        console.log("burger id:");
        console.log(req.params.burgerid);
        if(req.params.burgerid !== null) {
            burger.updateOne(req.params.burgerid,burger)
            .then((updatedBurger) => {
                // burger here would be the newly created burger
                res.body(updatedBurger)
                res.end();
            }).catch((error) => {
                res.status(500);
                res.body(error)
                res.end();
            });
        } else {
            res.status(400);
            res.body("you must include the id of the burger you want to update")
            res.end();
        }

        
    })

};