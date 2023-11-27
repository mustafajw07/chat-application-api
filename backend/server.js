const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')


const app = express()
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization");
    next();
  });
dotenv.config();
connectDB()


app.get('/', (req,res) => {
    res.send('Api is working')
})

app.use('/api/user' , userRoutes)
app.use('/api/chat' , chatRoutes)
app.use('/api/message' , messageRoutes)


const PORT = 5000

app.listen(PORT,() => {console.log('Backend server started on PORT 5000');})