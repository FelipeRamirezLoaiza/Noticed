import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Usuario from './models/models.js'; // Importar la clase Usuario

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar middleware
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Inicio.html'));
});

// Ruta para registro de usuario
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = new Usuario(email, password);
    const nuevoUsuario = await usuario.registrar();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.iniciarSesion(email, password);
    res.status(200).json({ message: 'Login successful', user: usuario });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
