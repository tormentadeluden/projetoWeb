const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.get("/notificacoes", async (req, res) => {
  const messages = await Message.findAll({ where: { receiverId: req.session.user.id, status: "Não lida" } });
  res.render("notificacoes", { messages });
});

module.exports = router;