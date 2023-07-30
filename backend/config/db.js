const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const connectDB = async () => {
    try {
         const conn = await mongoose.connect('mongodb://127.0.0.1:27017/chatapp', {
            useNewUrlParser:true,
            useUnifiedTopology: true,
         });
         console.log('Mongodb Server started'); 
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
}

module.exports = connectDB;