
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestModel = new Schema({
    userId: String,
    password: String,
    input: String,
  });

  module.exports = TestModel