const mongoClient = require("../config/mongo.js")

const getConnection = async () => {
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

getConnection()
    .then((burgers) => {
        burgers.insertOne({
            burger_name: 'cheeseburger',
            devoured: 0
        }, (err, result) => {
            if (err) console.log(err);
            else console.log(result.ops[0])
        })
    })
    .catch((error) => { throw error })


