import express, { Router } from 'express';
const router=express.Router();
import { Book } from '../models/bookModel.js';


router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Send all Required fields : title, author, publishYear",
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook)
        return res.status(201).send(book);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })

    }
})
router.get('/', async (req, res) => {

    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })

    }
})
router.get('/:id', async (req, res) => {

    try {
        const { id } = req.params;
        var book;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            book = await Book.findById(id);
        }
        if (!book) {
            return res.status(404).json({ message: "Book Not found" });
        }
        return res.status(200).json({book});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })

    }
})

router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send All Required fields : title,author,publishedYear',
            });
        }

        const { id } = req.params;
        var result;

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            result = await Book.findByIdAndUpdate(id, req.body);
        }

        if (!result) {
            return res.status(404).json({ message: "Book Not found" });
        }
        return res.status(200).send({ message: 'Book Updated Succesfully' });

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message });

    }
});
router.delete('/delete/:id',async(req,res)=>{
    try {
        const {id} =req.params;
        var result ;

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            result = await Book.findById(id);
        }

        if(!result){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(202).json({message: "Book delete Successfully"});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
        
    }
})

export default router;

