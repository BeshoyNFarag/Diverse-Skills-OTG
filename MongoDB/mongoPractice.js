const express = require ('express');
const app = express();
const {connectToDB, getDB} = require('./db.js');
const {ObjectId} = require('mongodb')



app.use(express.json())

// Connect to the database before starting the server
let db; 
connectToDB((err) => {
    if (!err) {
        app.listen(3000, () => {
        console.log('Server is running on port 3000')
        })

        db = getDB(); // Get the database connection after successful connection
    }

});




app.get('/books', (req, res) => {
    
    const page =  req.query.p
    const booksPerPage = 3
    let books = []
    // this collection function is what we use to reference a collection in the database 
    db.collection('books')
    .find()
    .sort({rating: -1})
    .limit(booksPerPage)
    .skip(page * booksPerPage)
    .forEach( book => books.push(book))
    .then( () => {res.status(200).json(books)} )
    

});


app.get( '/books/:id', (req,res)=> {

        if (ObjectId.isValid(req.params.id)){

            db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err =>
            res.status(500).json(err)
        )

    } else {
        res.status(500).json({ message: 'error homie' });
    }

   
  
} )

app.post('/books', (req,res) => {
    const book = req.body

    db.collection('books')
    .insertOne(book)
    .then(result => {
        res.status(201).json(result)
    }).catch(err => {
        res.status(500).json(err)
    })


} )

app.delete('/books/:id', (req,res) => {

    if (ObjectId.isValid(req.params.id)){

        db.collection('books')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err =>
            res.status(500).json(err)
        )

    } else {
        res.status(500).json({ message: 'error homie' });
    }

})

app.patch('/books/:id', (req,res) => {

    if (ObjectId.isValid(req.params.id)){
        const updates = req.body
        db.collection('books')
        .updateOne({_id: new ObjectId(req.params.id)}, {$set: {updates}})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err =>
            res.status(500).json(err)
        )

    } else {
        res.status(500).json({ message: 'error homie' });
    }


})