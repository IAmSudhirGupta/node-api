var mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Connected to Mongoose...");
    },
    (err) => {
      console.log("Error connecting to Mongoose...", err);
    }
  );
