// Import Sequelize and the database configuration
const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');
const misc = require('../helpers/miscfunction');
const clearOldData = require('../helpers/cleaner');
let logError = misc.logError;

const { FormData } = require('../modal/db.modal');



exports.setFormData = (req, res) => {
  const sessionId = req.body.sessionId;
  const data = {
    formdata: req.body.formdata,
    date: req.body.date,
    status:"pending"
  };


  FormData.findOne({ where: { sessionId: sessionId } })
    .then(existingData => {
      if (existingData) {
        
        return existingData.update(data);
      } else {
        
        return FormData.create({...data, sessionId: sessionId});
      }
    })
    .then(() => {
  
      res.status(200).json({ message: "Form data saved successfully" });
    })
    .catch(error => {
      const errorMessage = "Error retrieving data from the database";
      logError(error, errorMessage);
      console.log(error);
      res.status(500).json({ error: error });
    });    
};


exports.getFormData = async (req, res) => {
  const sessionId = req.body.sessionId;

  // Clear old data before retrieving new data
  await clearOldData();

  FormData.findOne({ where: { sessionId: sessionId } })
    .then(data => {
      if (data) {
        res.status(200).json({ formdata: data.formdata, date: data.date });
      } else {
        res.status(404).json({ error: "Form data not found" });
      }
    })
    .catch(error => {
      const errorMessage = "Error retrieving data from the database";
      logError(error, errorMessage);
      console.log(error);
      res.status(500).json({ error: error });
    });
};
