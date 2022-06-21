const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://shantanusaha11:sanu1234@mongodb.sd2hx.mongodb.net/inotebook?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo;
