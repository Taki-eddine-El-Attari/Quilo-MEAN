const express = require("express"); // N3rfu express bach nkhdmo m3a l routes
const router = express.Router(); // N3iyeto l router dyal express

const Article = require("../models/Article"); // N3iyeto l model dyal Article

const multer = require("multer"); // N3rfu multer bach nkhdmo m3a l files
filename = "";
const mystorage = multer.diskStorage({
  // N3rfu l storage dyal multer
  destination: "./uploads", // N7to l files li ghadi tjina f l folder uploads
  filename: (req, file, redirect) => {
    // N3rfu smiya dyal l files li ghadi n7to f l folder uploads
    let date = Date.now(); // date dyal db
    let fl = date + "." + file.mimetype.split("/")[1]; // smiya dyal file mkewen mn date w . w l mimetype dyal file (.png wla .jpg ...)
    redirect(null, fl); // smiya dyal file li ghadi n7eto f l folder uploads
    filename = fl; // smiya dyal file li ghadi nkhedmo biha f l routes
  },
});
const upload = multer({ storage: mystorage }); // N3rfu l upload dyal multer bach nkhdmo f l routes

router.post("/add", upload.single("image"), async (req, res) => {
  // N3rfu l route dyal POST /ajouter
  console.log("POST /add body:", req.body); // <-- debug incoming fields
  let data = req.body; // N3rfu l data li ghadi tjina f l body

  try {
    const article = new Article(data); // N3rfu l article jdid
    article.idAuthor = data.idAuthor; // <-- set author id from the request
    article.image = filename; // N7to l image li jena f l body
    article.date = new Date(); // N7to l date li tcreea fiha l article
    article.tags = data.tags.split(","); // N7to l tags li jena f l body w n9smohom 3la l virgule
    await article.save(); // N7fdo l article f MongoDB
    res.status(201).json(article); // N3tiw l response 201 w n3tiw l article li t7fed
  } catch (error) {
    res.status(400).json({ message: error.message }); // Ila kan chi khata f l save, n3tiw l response 400 w n3tiw chi message dyal khata
  }
});

router.get("/getAll", async (req, res) => {
  // N3rfu l route dyal GET /getAll
  try {
    const articles = await Article.find(); // N9raw l articles li kaynin f MongoDB
    res.status(200).json(articles); // N3tiw l response 200 w n3tiw l articles
  } catch (error) {
    res.status(500).json({ message: error.message }); // Ila kan chi khata f l find, n3tiw l response 500 w n3tiw chi message dyal khata
  }
});

router.get("/getById/:id", async (req, res) => {
  // N3rfu l route dyal GET /getById/:id
  try {
    let id = req.params.id; // N3rfu l id li jena f l params
    const article = await Article.findById({ _id: id }); // N9raw l article li 3ndou l id li jena f l params
    if (!article) return res.status(404).json({ message: "Article not found" }); // Ila ma l9ina chi article, n3tiw l response 404 w n3tiw chi message dyal ma l9inach
    res.status(200).json(article); // N3tiw l response 200 w n3tiw l article
  } catch (error) {
    res.status(500).json({ message: error.message }); // Ila kan chi khata f l findById, n3tiw l response 500 w n3tiw chi message dyal khata
  }
});

router.get("/getByAuthor/:idAuthor", async (req, res) => {
  // N3rfu l route dyal GET /getByAuthor/:idAuthor
  try {
    let idAuthor = req.params.idAuthor; // N3rfu l idAuthor li jena f l params
    console.log("Searching articles for idAuthor:", idAuthor); // debugging
    const articles = await Article.find({ idAuthor: idAuthor }); // N9raw l articles li 3ndou l idAuthor li jena f l params
    res.status(200).json(articles); // N3tiw l response 200 w n3tiw l articles
  } catch (error) {
    res.status(500).json({ message: error.message }); // Ila kan chi khata f l find, n3tiw l response 500 w n3tiw chi message dyal khata
  }
});

router.delete("/delete/:id", async (req, res) => {
  // N3rfu l route dyal DELETE /delete/:id
  try {
    const article = await Article.findByIdAndDelete(req.params.id); // N9raw l article li 3ndou l id li jena f l params w nms7o f MongoDB
    if (!article) return res.status(404).json({ message: "Article not found" }); // Ila ma l9ina chi article, n3tiw l response 404 w n3tiw chi message dyal ma l9inach
    res.status(200).json(article); // N3tiw l response 200 w n3tiw l article li t7fed
  } catch (error) {
    res.status(500).json({ message: error.message }); // Ila kan chi khata f l findByIdAndDelete, n3tiw l response 500 w n3tiw chi message dyal khata
  }
});

router.put("/update/:id", upload.single("image"), async (req, res) => {
  // N3rfu l route dyal PUT /update/:id
  try {
    let id = req.params.id; // N3rfu l id li jena f l params
    let data = req.body; // N3rfu l data li jena f l body
    data.tags = data.tags.split(","); // N7to l tags li jena f l body w n9smohom 3la l virgule
    if (filename.length > 0) {
      // Ila kan chi image jdid, n7toh f l article
      data.image = filename; // N7to l image li jena f l body
    }
    const article = await Article.findByIdAndUpdate(id, data, { new: true }); // N9raw l article li 3ndou l id li jena f l params w n7dtoh f MongoDB
    filename = ""; // N7to l smiya dyal l file bach ma t3awdch t7fed f l uploads
    if (!article) return res.status(404).json({ message: "Article not found" }); // Ila ma l9ina chi article, n3tiw l response 404 w n3tiw chi message dyal ma l9inach
    res.status(200).json(article); // N3tiw l response 200 w n3tiw l article li t7fed
  } catch (error) {
    res.status(500).json({ message: error.message }); // Ila kan chi khata f l findByIdAndUpdate, n3tiw l response 500 w n3tiw chi message dyal khata
  }
});

module.exports = router; // N3rfu l router bach n9dro nst3mlo f chi blasa okhra
