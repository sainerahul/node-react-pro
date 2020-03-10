const express = require('express');
const app = express()
const morgan = require('morgan');
const fs = require('fs');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
dotenv.config()


// const URI = 'mongodb+srv://sainerahul:sainerahul@nodeapi-xljwx.mongodb.net/test?retryWrites=true&w=majority'

 mongoose.connect(
    process.env.MONGO_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
)

    .then(() => console.log('DB Connected'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });
// mongoose.connection.on('error', err => {
//     console.log(`DB connection error: ${err.message}`)
// });

// bring in routes
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
// api docs
app.get('/',(req,res)=>{
    fs.readFile('docs/apiDocs.json',(err,data)=>{
        if(err){
            res.status(400).json({ error:err})
        }
        const docs = JSON.parse(data)
        res.json(docs)
    })
})
// middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())
app.use("/", postRoutes.router)
app.use("/", authRoutes.router)
app.use("/", userRoutes.router)

app.use(function(err,req,res,next){
    if(err.name==='UnauthorizedError'){
        res.status(401).json({error:'Unauthorized'})
    }
})
const port = process.env.PORT || 8080
app.listen(port)
console.log('listening')