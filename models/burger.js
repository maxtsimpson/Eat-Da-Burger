const mongoClient = require("../config/mongo.js")

class Burger {

    constructor() {
        this.connection;
    }

    async getConnection() {
        return new Promise((resolve, reject) => {
            mongoClient.connect((err, client) => {
                if (err) {
                    console.log('failed to connect')
                    reject(err)
                } else {
                    console.log('connected')
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

        return new Promise((resolve, reject) => {
            this.connection.replaceOne(
                { _id: id },
                burger
            )
                .then((result) => {

                    resolve(result.ops[0])
                })
                .catch((error) => { reject(error) });;
        })
    }
}

module.exports = Burger
