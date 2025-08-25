import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "cors";

// Importar modelo de Usuario
import Usuario from "./models/models.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Rutas absolutas para usar con path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*
  MIDDLEWARES
*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Archivos estáticos (CSS, JS, imágenes)
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/layout", express.static(path.join(__dirname, "views/layout")));
app.use("/", express.static(path.join(__dirname, "views")));

/*
  RUTAS
*/

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Index.html"));
});

// Registro de usuario
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = new Usuario(email, password);
    const nuevoUsuario = await usuario.registrar();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Inicio de sesión
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.iniciarSesion(email, password);
    res.status(200).json({ message: "Login successful", user: usuario });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

/*
  SERVIDOR
*/

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}`);
});
