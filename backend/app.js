const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// "Base de datos" en memoria
let items = [
  { id: 1, nombre: 'Item 1' },
  { id: 2, nombre: 'Item 2' }
];

// GET → listar todos
app.get('/items', (req, res) => {
  res.json(items);
});

// GET → obtener por ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }

  res.json(item);
});

// POST → crear
app.post('/items', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  const nuevoItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    nombre
  };

  items.push(nuevoItem);

  res.status(201).json(nuevoItem);
});

// PUT → actualizar
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre } = req.body;

  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  item.nombre = nombre;

  res.json(item);
});

// DELETE → eliminar
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }

  items.splice(index, 1);

  res.json({ mensaje: 'Item eliminado' });
});

// Servidor
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});