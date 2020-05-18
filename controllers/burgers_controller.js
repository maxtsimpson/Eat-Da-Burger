const express = require("express");
const router = express.Router();

const Burger = require("../models/burger")
const burger = new Burger()
// Routes
// =============================================================
// const routerToExport = (burger) => {
    // Get all burgers
    router.get("/", function (req, res) {

        //find all burgers and return as json
        burger.selectAll().then((burgers) => {
            //burgers is an array of burger objects
            console.log("finished select all")
            console.log(burgers)
            res.render("index", {burgers});
        }).catch((error) => {
            res.status(500);
            res.json(error)
            res.end();
        });

    });

    // Add a burger
    router.post("/api/burgers", (req, res) => {

        //add a burger and return added as json
        console.log("burger Data:");
        console.log(req.body);

        if (typeof req.body.burger_name !== "string") {
            res.status(400);
            // res.body("burger_name must be a string")
            res.end();
        }

        if (typeof req.body.devoured !== "boolean") {
            res.status(400);
            // res.body("devoured must be a boolean")
            res.end();
        }

        burger.insertOne({
            burger_name: req.body.burger_name,
            devoured: req.body.devoured,
        }).then((burger) => {
            res.json({ id: burger._id }).end();
        }).catch((error) => {
            res.status(500);
            res.body(error)
            res.end();
        });
    });

    router.put("/api/burgers/:burgerid", (req, res) => {
        //update a burger and return updated as json
        console.log("burger Data:");
        let newburger = req.body
        console.log(req.body);
        console.log("burger id:");
        console.log(req.params.burgerid);
        if (req.params.burgerid !== null) {
            burger.updateOne(req.params.burgerid, newburger)
                .then(() => {
                    // burger here would be the newly created burger
                    res.status(200).end();
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

// }

module.exports = router