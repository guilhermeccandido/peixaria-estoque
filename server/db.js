const firebird = require('node-firebird');
const options = {
  host: 'localhost',
  port: 3050,
  database: 'C:\\peixaria-estoque\\banco_peixaria.fdb', 
  user: 'admin',
  password: 'admin',
};

module.exports = {
  query: (sql, params, callback) => {
    firebird.attach(options, (err, db) => {
      if (err) throw err;

      db.query(sql, params, (err, result) => {
        if (err) callback(err);
        else callback(null, result);

        db.detach();
      });
    });
  },
};

