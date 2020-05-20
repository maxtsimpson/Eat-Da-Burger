const mongoClient = require("../config/mongo.js")
const ObjectId = require('mongodb').ObjectId

class Burger {

    constructor() {
        this.connection;
    }

    async getConnection() {
        return new Promise((resolve, reject) => {
            mongoClient.connect((err, client) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(client.db('eat_da_burger').collection('burgers'))
                }
            })
        })
    }

    async insertOne(burger) {
        //return a promise to insert the burger. successful returns the burger else returns the error
        return new Promise((resolve, reject) => {
            this.connection.insertOne(burger, (err, result) => {
                if (err) reject(err);
                resolve(result.ops[0])
            })
        })
    }

    async selectAll() {
        //return a promise to insert the burger. successful returns the burger else returns the error
        return new Promise((resolve, reject) => {
            const cursor = this.connection.find()
            cursor.toArray()
                .then((burgers) => resolve(burgers))
                .catch((error) => reject(error))
        })
    }

    async updateOne(id, burger) {
        //return a promise to update a burger. successful returns the burger else returns the error
        //if burger contains _id it must match the id param
        //https://docs.mongodb.com/manual/tutorial/update-documents/

        //mongo is also picky about objectId. got the answer from stackoverflow
        //https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
        
        const burgerId = new ObjectId(id);

        return new Promise((resolve, reject) => {
            this.connection.replaceOne(
                {"_id" : burgerId},
                burger
            )
                .then((result) => {
                    console.log(result);
                    resolve(result.ops[0])
                })
                .catch((error) => { reject(error) });;
        })
    }
}

module.exports = Burger
