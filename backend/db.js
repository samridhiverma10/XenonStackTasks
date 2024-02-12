const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");
const url =
  "mongodb+srv://GauravNagpal:gaurav6583@cluster0.nbkhf.mongodb.net/get-guidance?retryWrites=true&w=majority";

module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDb connected nicely");
    })
    .catch((error) => console.log(error));
};
