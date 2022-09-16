// Dependencies
const express = require("express");

// Point Server to the route files
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Create an express server
const app = express();

// Set PORT
const PORT = process.env.PORT || 3000;

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON data
app.use(express.json());

app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Listener
app.listen(PORT, () => {
  console.log(`API server is listening at http://localhost:${PORT}! 🚀`);
});
