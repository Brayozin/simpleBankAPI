const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const accountRouter = require('./routes/account')

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(accountRouter);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});