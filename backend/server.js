const express = require('express'); // N3rfu express
const articleRoute = require('./routes/ArticleRoute'); // N3iyeto l routes dyal Article
const authorRoute = require('./routes/AuthorRoute'); // N3iyeto l routes dyal Author
const cors = require('cors'); // N3rfu cors bach nkhdmo m3a l requests mn frontend

require('./config/connect'); // n3iyeto l connection m3a MongoDB

const app = express(); // N3rfu l app mn express
app.use(express.json()); // N3rfu l json bach nkhdmo m3a l data li ghadi tjina f l body
app.use(cors()); // N3rfu cors bach nsifto l requests mn frontend

app.use('/articles', articleRoute); // N3rfu l route dyal articles
app.use('/authors', authorRoute); // N3rfu l route dyal authors

app.use('/getimage', express.static('./uploads')); // N3rfu l route dyal uploads bach nkhdmo m3a l images


app.listen(3000, () => { // Bach nkhedmo f port 3000 
    console.log('✨Server is running on port 3000✅✨');
});