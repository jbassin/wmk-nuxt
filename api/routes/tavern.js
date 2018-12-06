const { Router } = require('express');
const mongoose = require('mongoose');

const router = Router();

const EmployeeSchema = new mongoose.Schema({
  name: String,
  job: String,
});

const MoneyflowSchema = new mongoose.Schema({
  text: String,
  value: Number,
});

const ProspectSchema = new mongoose.Schema({
  text: String,
  value: Number,
});

const Employee = mongoose.model('Employee', EmployeeSchema);
const Moneyflow = mongoose.model('Moneyflow', MoneyflowSchema);
const Prospect = mongoose.model('Prospect', ProspectSchema);

router.get('/tavern/employees', (req, res) => {
  Employee.find({}, (error, employees) => {
    if (error) { console.error(error); }
    res.json({
      employees,
    });
  }).sort({ _id: 1 });
});

router.get('/tavern/moneyflow', (req, res) => {
  Moneyflow.find({}, (error, moneyflow) => {
    if (error) { console.error(error); }
    res.json({
      moneyflow,
    });
  }).sort({ _id: 1 });
});

router.get('/tavern/prospects', (req, res) => {
  Prospect.find({}, (error, prospects) => {
    if (error) { console.error(error); }
    res.json({
      prospects,
    });
  }).sort({ _id: 1 });
});

module.exports = router;
