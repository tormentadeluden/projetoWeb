const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const session = require("express-session");

router.use(session({ secret: "trocaLivros", resave: false, saveUninitialized: false }));

// Rota de cadastro
router.post("/cadastro", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await User.create({ name, email, password });
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Erro ao cadastrar usuário.");
  }
});

// Rota de login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("E-mail ou senha incorretos!");
  }

  req.session.user = user;
  res.redirect("/perfil");
});

module.exports = router;
