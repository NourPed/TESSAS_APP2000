//utformet av mohammed fawzi mohammed - kandidatnr: 6000
const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    name:String,
    year: Number,
    content: String,
  });
  module.exports = dataSchema;
