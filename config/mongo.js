const { MongoClient } = require('mongodb');
const username = process.env.MONGO_USER
const password = process.env.MONGO_PASS

const uri = `mongodb+srv://max:${password}@cluster0-fkwlp.mongodb.net/test?retryWrites=true&w=majority`;
mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

mongoClient.connect((err) => {
    if (err) {
        console.log('error')
    } else {
        console.log('connected')
    }
});

module.exports = mongoClient