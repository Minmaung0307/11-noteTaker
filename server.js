//'must' Dependencies
const express = require("express");

//'must' Server to Routes
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

//'must' Set Port
const PORT = process.env.PORT || 3000;

//'must' Create Express Server
const app = express();

//Parse(convert) Json data
app.use(express.json());
app.use(express.static("public"));
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

//Parse(convert) String / Array data
app.use(express.urlencoded({ extended: true }));

//let app to listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
