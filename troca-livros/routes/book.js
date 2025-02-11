const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Rota para exibir todos os livros
router.get("/livros", async (req, res) => {
  const books = await Book.findAll();
  res.render("livros", { books });
});

// Rota para exibir o formulário de cadastro de livros
router.get("/livros/novo", (req, res) => {
  res.render("cadastro-livro");
});

// Rota para cadastrar um novo livro
router.post("/livros", async (req, res) => {
  const { title, author, description, category, imageUrl } = req.body;
  await Book.create({ title, author, description, category, imageUrl });
  res.redirect("/livros");
});

module.exports = router;

// Filtro e pesquisa de livros
router.get("/livros/busca", async (req, res) => {
    const { search, category } = req.query;
    let query = {};
  
    if (search) {
      query.title = { [Op.like]: `%${search}%` };
    }
    if (category) {
      query.category = category;
    }
  
    const books = await Book.findAll({ where: query });
    res.render("livros", { books });
  });
  
  router.get("/livros/:id", async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.render("detalhe-livro", { book });
  });

  router.get("/recomendacoes", async (req, res) => {
    const books = await Book.findAll({ limit: 5, order: [["createdAt", "DESC"]] });
    res.render("recomendacoes", { books });
  });
  
  const axios = require("axios");

router.get("/livros/api/:title", async (req, res) => {
  const title = req.params.title;
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`;
  
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar livro na API" });
  }
});
