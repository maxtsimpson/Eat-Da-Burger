const express = require("express");
const router = express.Router();

// const Burger = require("../models/burger")
// const burger = new Burger()
// Routes
// =============================================================
module.exports = (burger) => {
    // Get all burgers
    router.get("/", function (req, res) {

        //find all burgers and return as json
        burger.selectAll().then((burgers) => {
            //burgers is an array of burger objects
            res.render("index", {burgers});
        }).catch((error) => {
            res.status(500).json(error)
        });

    });

    // Add a burger
    router.post("/api/burgers", (req, res) => {

        //add a burger and return added as json

        if (typeof req.body.burger_name !== "string") {
            res.status(400).json("burger_name must be a string");
        }

        burger.insertOne({
            burger_name: req.body.burger_name,
            devoured: 0,
        }).then((burger) => {
            res.status(200).json({ id: burger._id })
        }).catch((error) => {
            res.status(500).json(error);
        });
    });

    router.put("/api/burgers/:burgerid", (req, res) => {
        //update a burger and return updated as json
        let newburger = {
            id: req.body.id,
            name: req.body.name,
            devoured: req.body.devoured
        }

        if (newburger.name === '') {
            newburger.name = null
        }

        if (req.params.burgerid !== null) {
            burger.updateOne(req.params.burgerid, newburger)
                .then((returnBurger) => {
                    res.status(200).json(returnBurger);
                }).catch((error) => {
                    console.log(error)
                    res.status(500).json(error);
                });
        } else {
            res.status(400).json("you must include the id of the burger you want to update")
        }


    })

    return router
}