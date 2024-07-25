import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/bookRoutes.js'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to the MERN stack Tutorial");

});
app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App Connected to Database");
        app.listen(PORT, () => {
            console.log(`App is listing on : ${PORT}`)
        });

    })
    .catch((error) => {
        console.log(error)
    })
