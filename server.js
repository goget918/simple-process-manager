const mongoose = require("mongoose");
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Make sure we are running node 10.0+
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 10 || (major === 10 && minor <= 0)) {
  console.log("Please go to nodejs.org and download version 10 or greater. 👌\n ");
  process.exit();
}

// import environmental variables from our variables.env file
require("dotenv").config({ path: ".env" });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(`🚫 Error → : ${err.message}`);
});

const glob = require("glob");
const path = require("path");

glob.sync("./models/*.js").forEach(function (file) {
  require(path.resolve(file));
});

const app = require("./app");
app.set("port", process.env.PORT || 80);

// Use CORS middleware
app.use(cors({
  origin: 'http://149.28.44.250:3000', // Frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));

// Create HTTP server and initialize socket.io with CORS configuration
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://149.28.44.250:3000", // Frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

global.io = io;

server.listen(app.get("port"), () => {
  console.log(`Express running → On PORT : ${server.address().port}`);
});

// Export io for use in other files
module.exports = io;
