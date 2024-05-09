const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const UserRoute = require('./router/userRouter');
const employeeRoute = require('./router/employeeRouter');
const connectToMongoDB = require('./db/dbConnection');
const cors = require('cors')
const cookieParser = require("cookie-parser");

//Database connection method call
connectToMongoDB();


// Middleware
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Serve images from the 'public' directory
app.use(express.static('public'));

// Routers middleware
app.use('/',UserRoute);
app.use('/',employeeRoute);


// Start server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
