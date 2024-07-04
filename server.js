const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const app = express();
const path = require('path');

// Añadir antes de definir las rutas
app.use(express.static(path.join(__dirname, 'views')));

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Inicio.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'El usuario ingresado ya existe' });
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
