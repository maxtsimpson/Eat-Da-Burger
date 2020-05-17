const mongoClient = require("../config/mongo.js")

class Burger {
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
            });
        })
    }
    async insertOne(burger) {
        //return a promise to insert the burger. successful returns the burger else returns the error
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then((burgers) => {
                    burgers.insertOne(burger, (err, result) => {
                        if (err) reject(err);
                        resolve(result.ops[0])
                    })
                })
                .catch((error) => { throw error })
        })
    }
    async selectAll() {
        //return a promise to insert the burger. successful returns the burger else returns the error
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(async (burgers) => {
                    const cursor = burgers.find()
                    let results = await cursor.toArray()
                    // if (err) reject(err);
                    resolve(results)

                })
                .catch((error) => { throw error })
        })
    }
    async updateOne(id,burger) {
        //return a promise to update a burger. successful returns the burger else returns the error
        //if burger contains _id it must match the id param
        //https://docs.mongodb.com/manual/tutorial/update-documents/

        return new Promise((resolve, reject) => {
            this.getConnection()
                .then((burgers) => {
                    burgers.replaceOne(
                        { _id: id },
                        burger
                    )
                        .then((result) => {

                            resolve(result.ops[0])
                        })
                        .catch((error) => { reject(error) });;
                })
                .catch((error) => { throw error })
        })
    }
}

module.exports = Burger
