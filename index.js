const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
// connect to mongodb;
mongoose.connect(`mongodb+srv://root:${process.env.PASSWORD}@cluster0.52kar.mongodb.net/myBlogApp`, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>{
    console.log("We connected to online Mongodb database ");
}).catch((err)=> {
    console.log(err);
})

app.use('/user', userRoute);

app.route('/').get((req, res)=> {
    return res.json("Your first rest api");
});

app.listen(5000, ()=> {
    console.log("your server is  running on port 5000");
})