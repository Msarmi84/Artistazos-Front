require('dotenv').config()
const mysql = require('mysql');
const db = require('./devConfig')


const conexion = mysql.createConnection(db.dbConfig);

conexion.connect((err, connection) => {
    if (err) throw err
    console.log('Conexion a la base de datos correcta')
})

module.exports = conexion;