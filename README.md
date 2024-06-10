# Job Management Backend

Backend for this assignment was created with Node JS + Express

## Table of Contents:

- [Installation](#installaltion)
- [Featurees](#features)
- [API Documentaion](#api-documentation)
- [Architecture](#architecture)
- [Libraries](#libraries)

### Installaltion

- Run `npm install` to install all the necessary packages.
- Create a `.env` file in the root directory of the project.
- Create new environment variables named `DB_USER`,`DB_PASSWORD`,`DB_NAME`.
- These variables correspond to MongoDB Atlas credentials.
- Run `npm start` and the project will run in development mode.
- Go to `https://job-management-beryl.vercel.app/` here to see the production build.

### Features

#### Robust Error Handling:

We handle error in two stages.

- On the entry point `app.js` if any request fails to go through our middlewares, This returns the error code along with error message, or a generic 500 status code with generic message.

- On our controller file. Here we check for errors for erroneous requests or edge cases. The error message and code are then sent our HttpError Class which extends the built in Error class and sets the code and message.

#### Structured Code:

The Backend is carefully structured for better undestanding and scalability.

- `App.js` file only contains the middelware, CORS configuration, database and server configuration. We use express middleware to send all api calls with `/jobs` to our routes file.
- `job-routes.js` within routes folder contains all our routes and handles the api calls. It sends out the incoming requests to appropriate function within our controller file.
- It also uses `express-validator` to validate the body of the incoming requests.
- `jobController.js` file within controllers folder contains all of the functions corresponding to the API calls. The controller also calls upon model file for job model.
- `job.js` within models folder contains our database model, which defines our Job model.

### API Documentation

#### Get(`/jobs`)

This calls the `getAllJobs` function within our controller and returns all the jobs in our database, with the query `Job.find()`. The return object is an array where `{getters: true}` is set for all of the elements, so that we can aceess their id easier.

#### Get(`/jobs/:id`)

This calls the `getJob` function within our controller and returns the job with the id matching the id provided in parameter, with the query `Job.findById()`. The return object is an object where `{getters: true}` is set, so that we can aceess the id easily. This also checks for the edge case where no Job is found for the given id.

#### Get(`/jobs/date/:date`)

This calls the `getTodayJobs` function within our controller and returns all the jobs in our database, which mathces the date string provided in the parameter, with the query `Job.find({ appointmentDate: { $regex: today } })`. This regex mathces all the entry in the database starting with the string.The return object is an array where `{getters: true}` is set for all of the elements, so that we can aceess their id easier.

#### Post(`/jobs`)

This calls the `CreateJob` function within our controller. This request first checks if the request body contains all the necessary fields, otherwise throws error. If the body is correct it creates a new job with the provided information. It also returns the newly created job as JSON object for testing purposes.

#### Put(`/jobs/:id`)

This calls the `updateJob` function within our controller. This request first checks if the request body contains all the necessary fields, otherwise throws error. If the body is correct it finds the job with the provided id, updates the entry and saves it. It also returns the newly created job as JSON object for testing purposes.

#### Delete(`/jobs/:id`)

This calls the `deleteJob` function within our controller. This request finds the job with the provided ID and deletes it with the query `Job.deleteOne()`. If successfull returns a success message.

### Architecture

This project uses a slightly modified version of the popular MVC architecture where the View is a seperate application. The reason for choosing this architecture is:

- Its scalabale, e.g. if we need to implement new features we only need to access routes and controllers. If we need a new actor we just need to access the models.
- Seperation of concerns allows easy integration of team members along with easier distribution of duties.
- Reusability allows us to reuse different parts of the project across multiple projects.
- Testabiltiy. As bugs are inevitable part of development, this architecture allows us to islolate,locate and solve these bugs easily.

### Libraries

Libraries choosen within the project has been selected after careful consideration and past experience.

-Both the server-side (Node.js & Express) and client-side (React) use JavaScript, This allowed me to use a single language throughout the entire application. This reduced context switching and made full-stack development more efficient.

#### NODE.JS

- Node.js is a asynchronous, event driven server side technolgoy, making it highly efficient for I/O applications like this one.

#### Express

- Express is a light and flexible framwework, along with its robust middelwares makes it a perfect choice for our application.

#### MongoDB

- MongoDB along with mongoose is very well documented and flexible database solution. Along, with its convenience of storing data in a JSON adjacent format (BSON) makes it perfect for quick setup and development for projects like this.

### Production

This project is hosted on vercel, so that you can test it out at ease. Simply click on the link below, and head on out.
`https://job-management-beryl.vercel.app/`
