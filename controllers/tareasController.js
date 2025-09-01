const pool = require('../lib/db');     
require('dotenv').config();

async function crearTabla() {
  const dbName = process.env.MYSQL_DATABASE;
  await pool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci`);
  await pool.query(`USE \`${dbName}\``);

  const sql = `
    CREATE TABLE IF NOT EXISTS tareas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      descripcion VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB;
  `;
  await pool.query(sql);
  console.log('Tabla "tareas" verificada/creada.');
}

async function ping(req, res) {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send({
      status: 5000,
      error: err
    });
  }
}

const getTareas = async (req, res) => {
  try {
    const [elementos] = await pool.query('SELECT * FROM tareas');
    return res.status(200).send({
      status: 200,
      tareas: elementos,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: err,
    });
  }
}

const postTarea = async (req, res) => {
  try {
    const { descripcion } = req.body;
    if (!descripcion) {
      return res.status(400).send({
        status: 400,
        error: 'La descripción es obligatoria',
      });
    }

    const [result] = await pool.query(
      'INSERT INTO tareas (descripcion) VALUES (?)',
      [descripcion]
    );

    // result.insertId contiene el id generado
    return res.status(201).send({
      status: 201,
      tarea: {
        id: result.insertId,
        descripcion: descripcion
      }
    });

  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: err.sqlMessage || err.message || err,
    });
  }
};

const deleteTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM tareas WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({
        status: 404,
      });
    }

    return res.status(200).send({
      status: 200,
      id: id
    });
  } catch (err) {
        return res.status(500).send({
            error: err
        });
    }
}

module.exports = {
  crearTabla,
  getTareas,
  postTarea,
  deleteTarea,
  ping
};