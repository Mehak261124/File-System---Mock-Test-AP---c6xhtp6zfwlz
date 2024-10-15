const express = require("express");
const bodyParser = require("body-parser");
const router = require("../routes/fileSystem");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
