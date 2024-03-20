const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'armas',
    password: 'Juanccg1109'
});

module.exports = pool.promise();