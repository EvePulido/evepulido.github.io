const express = require('express');
const path = require('path');
const cors = require("cors");
require('dotenv').config();
const { crearTabla } = require('../controllers/tareasController.js');

const app = express();
app.use(express.json());
app.use(cors());
const router = require('../routes/router.js');

// Usa las rutas
app.use('/api', router);

app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

crearTabla();

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`Server running on port ${process.env.NODE_DOCKER_PORT}`);
});