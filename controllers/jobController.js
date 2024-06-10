//Import node modules
const { validationResult } = require("express-validator");

//Import Error Model
const HttpError = require("../models/http-error");

//Import Database Model
const Job = require("../models/job");

//Returns all the jobs available in the database
const getAllJobs = async (req, res, next) => {
  let jobs;

  try {
    jobs = await Job.find();
  } catch (err) {
    return next(new HttpError(err.message, 404));
  }

  res.status(200).json({
    jobs: jobs.map((elem) => elem.toObject({ getters: true })),
  });
};

//Returns all the jobs for today
const getTodayJobs = async (req, res, next) => {
  const today = req.params.date;
  let jobs;
  try {
    jobs = await Job.find({ appointmentDate: { $regex: today } });
  } catch (err) {
    return next(new HttpError(err.message, 404));
  }

  res.json({
    jobs: jobs.map((job) => job.toObject({ getters: true })),
  });
};

//Get specific job data by querying with job ID
const getJob = async (req, res, next) => {
  let jobId = req.params.id;

  let job;
  try {
    job = await Job.findById(jobId);
  } catch (err) {
    return next(new HttpError(err.message, 404));
  }

  if (!job) {
    return next(new HttpError("No jobs found to edit", 404));
  }
  res.json({ job: job.toObject({ getters: true }) });
};

//Create a new Job
const createJob = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(new HttpError(error.message, 422));
  }

  const { customerName, jobType, status, appointmentDate, technician } =
    req.body;

  const newJob = new Job({
    customerName,
    jobType,
    status,
    appointmentDate,
    technician,
  });

  try {
    await newJob.save();
  } catch (err) {
    return next(new HttpError(err.message, 404));
  }

  res.status(201).json({ job: newJob.toObject({ getters: true }) });
};

//Update a job by job ID
const updateJob = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(new HttpError(error.message, 422));
  }
  const { customerName, jobType, status, appointmentDate, technician } =
    req.body;

  const jobId = req.params.id;
  let job;
  try {
    job = await Job.findById(jobId);
  } catch (err) {
    return next(new HttpError(err.message, 404));
  }

  job.customerName = customerName;
  job.jobType = jobType;
  job.status = status;
  job.appointmentDate = appointmentDate;
  job.technician = technician;

  try {
    await job.save();
  } catch (err) {
    return next(new HttpError(err.message, 404));
  }

  res.status(200).json({ job: job.toObject({ getters: true }) });
};

//delete a job by job ID
const deleteJob = async (req, res, next) => {
  let jobId = req.params.id;
  try {
    await Job.deleteOne({ _id: jobId });
  } catch (err) {
    return next(new HttpError(err.message, 404));
  }

  res.status(200).json({ message: "Successfully deleted Job" });
};

//Exporting the functions
exports.getAllJobs = getAllJobs;
exports.getJob = getJob;
exports.getTodayJobs = getTodayJobs;
exports.createJob = createJob;
exports.updateJob = updateJob;
exports.deleteJob = deleteJob;
