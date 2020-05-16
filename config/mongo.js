const { MongoClient } = require('mongodb');
const username = process.env.MONGO_USER || "max"
const password = process.env.MONGO_PASS || "fIh0SsjisQvfhMBe"
// heroku config:set MONGO_PASS="fIh0SsjisQvfhMBe"
// heroku config:set MONGO_USER="max"
const uri = `mongodb+srv://max:${password}@cluster0-fkwlp.mongodb.net/test?retryWrites=true&w=majority`;

module.exports = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
