const express = require('express');
const dotenv = require('dotenv');
const app = express();
const connectionDb = require('./config/db');
const memorieRouter = require('./routes/memories.router');
const userRouter = require('./routes/user.router');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
dotenv.config();

// Set up port number
const PORT = process.env.PORT || 3000;

// Enable CORS middleware
app.use(cors());
// SET UP BODY PARSER MIDDLEWARES
app.use(bodyParser.json())
// Set up middleware
app.use(express.json());

// Serve images statically
app.use('/images', express.static(path.join(__dirname, '/images')));

// Implement routes in the server
app.use('/api', memorieRouter);

// User routes in the server
app.use('/user', userRouter)


// SET UP THE PORT 
app.listen(PORT, () => {
  console.log('The backend is running at port', PORT);
  connectionDb();
});


