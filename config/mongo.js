const { MongoClient } = require('mongodb');
const username = process.env.MONGO_USER || "max"
const password = process.env.MONGO_PASS || "fIh0SsjisQvfhMBe"
// heroku config:set MONGO_PASS="fIh0SsjisQvfhMBe"
// heroku config:set MONGO_USER="max"
const uri = `mongodb+srv://max:${password}@cluster0-fkwlp.mongodb.net/test?retryWrites=true&w=majority`;
mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })


// new Promise((resolve, reject) => {
mongoClient.connect((err) => {
    if (err) {
        console.log('error')
    } else {
        console.log('connected')
    }
});
// })
// module.exports = mongoClient.db('eat_da_burger').collection('burgers')

module.exports = mongoClient

// mongoClient.connect((err, client) => {
//     if (err) {
//         console.log('error')
//     } else {
//         console.log('connected')
//     }
// });