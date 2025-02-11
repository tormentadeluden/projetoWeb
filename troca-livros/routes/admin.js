const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/Book");

router.get("/admin", async (req, res) => {
  const users = await User.findAll();
  const books = await Book.findAll();
  res.render("admin", { users, books });
});

// Deletar livro
router.post("/admin/delete-book/:id", async (req, res) => {
  await Book.destroy({ where: { id: req.params.id } });
  res.redirect("/admin");
});

// Deletar usuário
router.post("/admin/delete-user/:id", async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.redirect("/admin");
});

module.exports = router;