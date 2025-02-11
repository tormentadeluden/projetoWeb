const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Message = require("../models/Message");
const Review = require("../models/Review");

router.get("/dashboard", async (req, res) => {
  const totalLivros = await Book.count();
  const totalMensagens = await Message.count();
  const totalAvaliacoes = await Review.count();

  res.render("dashboard", { totalLivros, totalMensagens, totalAvaliacoes });
});

module.exports = router;
