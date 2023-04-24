const dbConfig = require('../config/db.config');
// const pool = mysql.createPool(dbConfig);

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: "mysql"
});




const FormData = sequelize.define('formdata', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  formdata: { type: Sequelize.JSON },
  date: { type: Sequelize.STRING },
  sessionId:{type: Sequelize.STRING},
  status:{type: Sequelize.STRING}
}, { timestamps: true });


sequelize.sync();

module.exports = { FormData };



// module.exports = {
//     query: function() {
//       const args = Array.prototype.slice.call(arguments);
//       const sql = args.shift();
//       const values = Array.isArray(args[0]) ? args[0] : args;
//       const callback = args.pop();
  
//       pool.getConnection(function(err, connection) {
//         if (err) {
//           return callback(err);
//         }
  
//         connection.query(sql, values, function(error, results) {
//           connection.release();
  
//           if (error) {
//             return callback(error);
//           }
  
//           callback(null, results);
//         });
//       });
//     }
//   };
  