const mongoose = require("mongoose");

const url = "mongodb://localhost/pizza";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log(`Connection Has Been Made`);
  })
  .on("error", (error) => {
    console.log(`Error is : ${error}`);
  });

const connection = mongoose.connection;

module.exports = connection;
