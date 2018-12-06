const { Router } = require('express');
const mongoose = require('mongoose');

const router = Router();

const EmployeeSchema = new mongoose.Schema({
  name: String,
  job: String,
});

const Employee = mongoose.model('Employee', EmployeeSchema);

/* GET users listing. */
router.get('/tavern/employees', (req, res) => {
  Employee.find({}, (error, employees) => {
    if (error) { console.error(error); }
    res.json({
      employees,
    });
  }).sort({ _id: 1 });
});

module.exports = router;
