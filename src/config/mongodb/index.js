const mongoose = require('mongoose');
async function connect()
{
    try {
        await mongoose.connect('mongodb://localhost:27017/sang_dev', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
        });
        console.log("Connect ok");

    } catch (error) {
        console.log("Error");
    }
}

module.exports={connect};