const moment = require('moment');
const Sequelize = require('sequelize');

const { FormData } = require('../modal/db.modal');

async function clearOldData() {
  const cutoffDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
  const result = await FormData.destroy({
    where: {
      date: {
        [Sequelize.Op.lt]: cutoffDate
      }
    }
  });
  console.log(`Deleted ${result} entries`);
}

module.exports = clearOldData;