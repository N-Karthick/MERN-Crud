const mongoose = require("mongoose");
const user = mongoose.Schema;
let detailsSchema = new user({
  name: String,
  email: String,
  phone: Number,
  address: String,
  city: String,
  state: String,
  country: String,
  password: String,
  image: {
    type: String,
  }
});
const DetailsModel = mongoose.model("UserDetails", detailsSchema);

module.exports = DetailsModel;
