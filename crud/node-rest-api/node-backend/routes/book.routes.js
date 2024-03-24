const express = require('express');
const app = express();

const bookRoute = express.Router();
let Book = require('../model/Book');

// Add Book
bookRoute.route('/add-book').post(async (req, res, next) => {
    try {
        const data = await Book.create(req.body);
        res.json(data);

    } catch (error) {
        return next(error);
    }
});

// Get all Books
bookRoute.route('/').get(async (req, res, next) => {
    try {
        const data = await Book.find({});
        res.json(data);
    } catch (error) {
        return next(error);
    }
})

// Get single Book
bookRoute.route('/read-book/:id').get(async (req, res, next) => {
    try {
        const data = await Book.findById(req.params.id);
        res.json(data);
    } catch (error) {
        return next(error);
    }
})

// Update Book
bookRoute.route('/update-book/:id').put(async (req, res, next) => {
    try {
        const data = await Book.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.json(data);
        console.log('Book updated successfully!');
    } catch (error) {
        return next(error);
    }
})

// Delete Book
bookRoute.route('/delete-book/:id').delete(async (req, res, next) => {
    try {
        const data = await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'Book deleted successfully', data });
    } catch (error) {
        return next(error);
    }
});
module.exports = bookRoute;
