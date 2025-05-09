const express = require('express'); // N3rfu express bach nkhdmo m3a l routes
const router = express.Router(); // N3iyeto l router dyal express

const bcrypt = require('bcrypt'); // N3rfu bcrypt bach n7fdo l password f MongoDB b chi tariqa amina 

const jwt = require('jsonwebtoken'); // N3rfu jwt bach nkhdmo m3a l tokens

const Author = require('../models/Author'); // N3iyeto l model dyal Author

const multer = require('multer'); // N3rfu multer bach nkhdmo m3a l files
filename = ''; 
const mystorage = multer.diskStorage({ // N3rfu l storage dyal multer
    destination: './uploads', // N7to l files li ghadi tjina f l folder uploads
    filename: (req, file, redirect)=>{ // N3rfu smiya dyal l files li ghadi n7to f l folder uploads
        let date = Date.now(); // date dyal db
        let fl = date + '.' + file.mimetype.split('/')[1]; // smiya dyal file mkewen mn date w . w l mimetype dyal file (.png wla .jpg ...)
        redirect(null, fl); // smiya dyal file li ghadi n7eto f l folder uploads
        filename = fl; // smiya dyal file li ghadi nkhedmo biha f l routes
    }
});
const upload = multer({storage: mystorage}); // N3rfu l upload dyal multer bach nkhdmo f l routes


router.post('/register',upload.any('image'), async (req, res) => { // N3rfu l route dyal POST /register
    let data = req.body; // N3rfu l data li ghadi tjina f l body

    try {
        const author = new Author(data); // N3rfu l author jdid
        author.image = filename; // N7to l image li jena f l body
        salt = bcrypt.genSaltSync(10); // N3rfu l salt li ghadi n7fdo bih l password
        author.password = bcrypt.hashSync(data.password, salt); // N7fdo l password f MongoDB b chi tariqa amina
        await author.save(); // N7fdo l author f MongoDB
        filename = ''; // N7fdo l smiya dyal file bach ma t3awdch t7fed f l route dyal register
        res.status(201).json(author); // N3tiw l response 201 w n3tiw l author li t7fed
    } catch (error) {
        res.status(400).json({ message: error.message }); // Ila kan chi khata f l save, n3tiw l response 400 w n3tiw chi message dyal khata
    }
});

router.post('/login', async (req, res) => { // N3rfu l route dyal POST /login
    let data = req.body; // N3rfu l data li ghadi tjina f l body

    try {
        let author = await Author.findOne({ email: data.email}); // N9raw l author li 3ndou l email w l password li jena f l body
        if (!author) { // Ila ma l9ina chi author, n3tiw l response 404 w n3tiw chi message dyal ma l9inach
            return res.status(404).json({ message: 'Author not found' });
        }
        const formPassword = String(data.password); // N3rfu l password li jena f l body
        const hashedPassword = String(author.password); // N3rfu l password li 3ndou f MongoDB
        let valid = bcrypt.compareSync(formPassword, hashedPassword); // N9arnou l password li jena f l body m3a l password li 3ndou f MongoDB
        if (!valid){ // Ila ma kanch l password sahih, n3tiw l response 400 w n3tiw chi message dyal khata
            return res.status(400).json({ message: 'Invalid credentials' }); 
        }else{
            let payload = { // N3rfu l payload li ghadi n7to f l token
                id: author._id, // N7to l id dyal author li 3ndou l email w l password s7i7e
                email: author.email, // N7to l email dyal author li 3ndou l email w l password s7i7e
                fullname: author.name + ' ' + author.lastname // N7to l fullname dyal author li 3ndou l email w l password s7i7e
            };
            let token = jwt.sign(payload, '12345'); // N7fdo l token li ghadi n3tiw l author 
            res.send({mytoken: token}); // N3tiw l response 200 w nsifeto token li ghadi n3tiw l author
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // Ila kan chi khata f l findOne, n3tiw l response 500 w n3tiw chi message dyal khata
    }
});

router.get('/getAll', async (req, res) => { // N3rfu l route dyal GET /getAll
    try {
        const authors = await Author.find(); // N9raw l authors li kaynin f MongoDB
        res.status(200).json(authors); // N3tiw l response 200 w n3tiw l authors
    } catch (error) {
        res.status(500).json({ message: error.message }); // Ila kan chi khata f l find, n3tiw l response 500 w n3tiw chi message dyal khata
    }
});

router.get('/getById/:id', async (req, res) => { // N3rfu l route dyal GET /getById/:id
    try {
        let id = req.params.id; // N3rfu l id li jena f l params
        const author = await Author.findById({ _id: id }); // N9raw l author li 3ndou l id li jena f l params
        if (!author) return res.status(404).json({ message: 'Author not found' }); // Ila ma l9ina chi author, n3tiw l response 404 w n3tiw chi message dyal ma l9inach
        res.status(200).json(author); // N3tiw l response 200 w n3tiw l author
    } catch (error) {
        res.status(500).json({ message: error.message }); // Ila kan chi khata f l findById, n3tiw l response 500 w n3tiw chi message dyal khata
    }
});

router.delete('/delete/:id', async (req, res) => { // N3rfu l route dyal DELETE /delete/:id
    try {
        const author = await Author.findByIdAndDelete(req.params.id); // N9raw l author li 3ndou l id li jena f l params w nms7o f MongoDB
        if (!author) return res.status(404).json({ message: 'Author not found' }); // Ila ma l9ina chi author, n3tiw l response 404 w n3tiw chi message dyal ma l9inach
        res.status(200).json(author); // N3tiw l response 200 w n3tiw l author li t7fed
    } catch (error) {
        res.status(500).json({ message: error.message }); // Ila kan chi khata f l findByIdAndDelete, n3tiw l response 500 w n3tiw chi message dyal khata
    }
});

router.put('/update/:id',upload.any('image'), async (req, res) => { // N3rfu l route dyal PUT /update/:id
    try {
        let id = req.params.id; // N3rfu l id li jena f l params
        let data = req.body; // N3rfu l author li jena f l body
        if(filename.length > 0){ // Ila kan chi image jdid, n7toh f l article 
            data.image = filename; // N7to l image li jena f l body
        }
        const author = await Author.findByIdAndUpdate(id, data, { new: true }); // N9raw l author li 3ndou l id li jena f l params w n7dtho f MongoDB
        filename = ''; // N7to l smiya dyal l file bach ma t3awdch t7fed f l uploads
        if (!author) return res.status(404).json({ message: 'Author not found' }); // Ila ma l9ina chi author, n3tiw l response 404 w n3tiw chi message dyal ma l9inach
        res.status(200).json(author); // N3tiw l response 200 w n3tiw l author li t7fed
    } catch (error) {
        res.status(500).json({ message: error.message }); // Ila kan chi khata f l findByIdAndUpdate, n3tiw l response 500 w n3tiw chi message dyal khata
    }
});

module.exports = router; // N3rfu l module bach nst3mlo f chi blasa okhra