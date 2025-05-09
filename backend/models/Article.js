const mongoose = require('mongoose'); // N3rfu mongoose bach nkhdmo m3a MongoDB

const Article = mongoose.model('Article', { // N3rfu l model dyal Article
    title: { // L title khass ykoun String w required
        type: String, 
        required: true 
    }, 
    idAuthor: { // L idAuthor khass ykoun String w required
        type: String, 
        required: true 
    },
    description: { // L description khass ykoun String w required
        type: String, 
        required: true 
    },
    date: { // L date khass ykoun Date w required
        type: Date, 
        required: true 
    },
    content: { // L content khass ykoun String w required
        type: String, 
        required: true 
    },
    image: { // L image khass ykoun String w required
        type: String, 
        required: true 
    },
    tags: { // L tags khass ykoun Array w required
        type: [String], 
        required: true 
    },

}); 

module.exports = Article; // N3rfu l module bach nst3mlo f chi blasa okhra