const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const endpointSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    trim: true,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Endpoint", endpointSchema);
