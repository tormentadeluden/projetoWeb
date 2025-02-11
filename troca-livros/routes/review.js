const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Rota para enviar avaliações
router.post("/avaliacoes", async (req, res) => {
  const { reviewerId, reviewedId, rating, comment } = req.body;
  await Review.create({ reviewerId, reviewedId, rating, comment });
  res.redirect("/perfil/" + reviewedId);
});

// Rota para visualizar avaliações do usuário
router.get("/perfil/:id", async (req, res) => {
  const reviews = await Review.findAll({ where: { reviewedId: req.params.id } });
  res.render("perfil", { reviews });
});

module.exports = router;
