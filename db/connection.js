const { Pool } = require('pg');
//imports pool class from pg library

//new Pool creates an instance with the database connection details.
const pool = new Pool(
    {
      user: 'postgres',
      password: 'password',
      host: 'localhost',
      database: 'employees_db'
    });

//Connecting to the database and display success/error message by using a promise with connect, then, and catch methods

pool.connect()
    .then(() => console.log(`You are now connected to the employees_db database.`))
    .catch((err) => console.log(`There has been a connection error:`, err));

// Export the pool to be used in other modules
module.exports = pool