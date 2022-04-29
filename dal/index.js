const { MongoClient } = require("mongodb");

const client = new MongoClient('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log('Here');

client.connect(err => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log('Successfully connected to DB')
    
})

module.exports = client;