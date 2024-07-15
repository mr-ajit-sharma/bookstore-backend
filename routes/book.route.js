import express from 'express'
import { Book } from '../models/book.model.js'

const router=express.Router()
// route for saving new book
router.post('/', async (req, res) => {
    try {
        // const {id}=req.params
        const { title, author, publishYear } = await req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).json({
                message: "please provide all the required fields"
            })
        }
        // if(Book.id===id){
        //     return res.status(201).json({
        //         message:"this user is already exist"
        //     })
        // }
        const book = await Book.create({
            title,
            author,
            publishYear
        })
        return res.status(200).json({
            message: "book is created successfully",
            book
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message || "server issue is creating the book"
        })
    }
})
// getting all the books
router.get('/', async (req, res) => {
    console.log("hello")
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            message: "successfully gettinng all the books",
            books
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error in getting all the books"
        })
    }
})
// getting single book
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        return res.status(200).json({
            message: "successfully get the book",
            book
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error in getting the book"
        })
    }
})
// update the book
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({
                message: "please fill all the required field"
            })
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).json({ message: "book not found" })
        }
        return res.status(200).json({
            message: "successfully updated the book",
            result
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal message error to update the books"
        })
    }
})
// delete the book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const books = await Book.findByIdAndDelete(id)
        if (!books) {
            return res.status(404).json({ message: "the books is not found" })
        }
        return res.status(200).json({
            message: "successfully deleted the books"
        })
    } catch (error) {
        return res.status(500).json({
            message: `server error while deleting, ${error}`
        })
    }
})
export default router