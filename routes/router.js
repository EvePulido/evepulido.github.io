const express = require('express');
const router = express.Router();
const { getTareas, postTarea, deleteTarea, ping } = require('../controllers/tareasController');

router.get('/ping', ping);
router.get('/tareas', getTareas);
router.post('/tarea', postTarea);
router.delete('/tarea/:id', deleteTarea);

module.exports = router;