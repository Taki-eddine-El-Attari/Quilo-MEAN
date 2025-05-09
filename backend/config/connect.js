const mongoose = require('mongoose'); // N3rfu mongoose bach nkhdmo m3a MongoDB

mongoose.connect('mongodb://localhost:27017/blogs')// N3rfu l connection m3a MongoDB
.then(() => {
    console.log('✨Connected to MongoDB✅✨'); // Ila l connection m3a MongoDB s7i7a
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err); // Ila kan chi khata f l connection, n3rfu l erreur
});

module.exports = mongoose; // N3rfu l module bach nst3mlo f chi blasa okhra b7al server.js