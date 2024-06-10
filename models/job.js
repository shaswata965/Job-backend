const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = Schema({
  customerName: { type: String, required: true },
  jobType: { type: String, required: true },
  status: { type: String, required: true },
  appointmentDate: { type: String },
  technician: { type: String, required: true },
});

module.exports = mongoose.model("Job", jobSchema);
