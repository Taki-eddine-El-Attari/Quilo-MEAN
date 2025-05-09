const mongoose = require('mongoose'); // N3rfu mongoose bach nkhdmo m3a MongoDB

const Author = mongoose.model('Author', { // N3rfu l model dyal Author
    name: { // L name khass ykoun String w required
        type: String, 
        required: true 
    }, 
    lastname: { // lastName khass ykoun String w required
        type: String, 
        required: true 
    },
    email: { // L email khass ykoun String w required
        type: String, 
        required: true,
        unique: true // L email khass ykoun unique, ma ykhdmch chi wahed akhor b7alou
    },
    password: { // L password khass ykoun String w required
        type: String, 
        required: true 
    },
    about: { // L About khass ykoun String w required
        type: String, 
        required: true
    },
    image: { // L image khass ykoun String w required
        type: String, 
        required: true 
    },
});

module.exports = Author; // N3rfu l model bach n9dro nst3mlo f chi blasa okhra