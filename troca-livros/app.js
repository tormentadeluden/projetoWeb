const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");

const app = express();

// Configuração do Handlebars corretamente
const hbs = exphbs.create();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(authRoutes);

app.get("/", (req, res) => res.render("home"));
app.get("/login", (req, res) => res.render("login"));
app.get("/cadastro", (req, res) => res.render("cadastro"));

// Sincronizar banco de dados e iniciar o servidor
sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
}).catch((err) => {
  console.error("Erro ao sincronizar o banco de dados:", err);
});

const bookRoutes = require("./routes/book");
app.use(bookRoutes);

require("dotenv").config();