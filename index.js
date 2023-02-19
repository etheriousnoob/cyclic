require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/books');

const app = express();

mongoose.set('strictQuery', false);
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected : ${conn.connection.host}');
    } catch (error){
        console.log(error);
        process.exit(1);
    }
}

app.get('/', (req,res) =>{
    res.send({title:'Books'});
});

app.get('/add-note', async(req,res) =>{
    try{
        await Book.insertMany([
            {
                title:"Sons of Anarchy",
                body:"body text",
            },
            {
                title:"ovnon",
                body:"body text",
            }
        ]);

    }catch(error){
        console.log("err", + error);
    }
});


app.get('/books' , async (req,res)=>{
    const book = await Book.find();

    if (book){
        res.json(book)
    } else {
        res.send("Something went wrong");
    }
});
connectDB().then(()=>{
    app.listen(3000,function(){
    console.log("Server is running on port 3000")
});
});