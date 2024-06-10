const express = require("express");

const { check } = require("express-validator");

const route = express.Router();

const jobController = require("../controllers/jobController");

route.get("/", jobController.getAllJobs);

route.get("/:id", jobController.getJob);

route.get("/date/:date", jobController.getTodayJobs);

route.post(
  "/",
  [
    check("customerName").not().isEmpty(),
    check("jobType").not().isEmpty(),
    check("status").not().isEmpty(),
    check("appointmentDate").not().isEmpty(),
    check("technician").not().isEmpty(),
  ],
  jobController.createJob
);

route.put(
  "/:id",
  [
    check("customerName").not().isEmpty(),
    check("jobType").not().isEmpty(),
    check("status").not().isEmpty(),
    check("appointmentDate").not().isEmpty(),
    check("technician").not().isEmpty(),
  ],
  jobController.updateJob
);

route.delete("/:id", jobController.deleteJob);

module.exports = route;
