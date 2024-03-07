// routes/api/books.js

const express = require('express');
const router = express.Router();

// Load Book model
const Book = require('../../models/Book'); // Correct import path

// @route   GET api/books/test
// @desc    Tests books route
// @access  Public
router.get('/test', (req, res) => res.send('book route testing!'));

// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get('/', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

// @route   GET api/books/:id
// @desc    Get single book by id
// @access  Public
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (!book) {
        return res.status(404).json({ nobookfound: 'No Book found' });
      }
      res.json(book);
    })
    .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
});

// @route   POST api/books
// @desc    Add/save book
// @access  Public
router.post('/', (req, res) => {
  // Validate request body
  if (!req.body.title || !req.body.isbn || !req.body.author) {
    return res.status(400).json({ error: 'Title, ISBN, and Author are required' });
  }

  Book.create(req.body)
    .then(book => res.json({ msg: 'Book added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
});

// @route   PUT api/books/:id
// @desc    Update book by id
// @access  Public
router.put('/:id', (req, res) => {
  // Validate request body
  if (!req.body.title || !req.body.isbn || !req.body.author) {
    return res.status(400).json({ error: 'Title, ISBN, and Author are required' });
  }

  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(book => {
      if (!book) {
        return res.status(404).json({ nobookfound: 'No Book found' });
      }
      res.json({ msg: 'Updated successfully', book });
    })
    .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
});

// @route   DELETE api/books/:id
// @desc    Delete book by id
// @access  Public
router.delete('/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(book => {
      if (!book) {
        return res.status(404).json({ error: 'No such a book' });
      }
      res.json({ msg: 'Book entry deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
});

module.exports = router;
