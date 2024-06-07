const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const processSchema = new mongoose.Schema({
    status: String,
    parameters: Object,
    output: String,
    serviceid: String,
    channelid: String,
    createdAt: { type: Date, default: Date.now },
    logs: [String]
});

module.exports = mongoose.model("Process", processSchema);