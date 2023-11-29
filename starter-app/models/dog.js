const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dogSchema = new Schema(
  {
    pictures: {type: [String], required: true},
    name: {type: String, required: true},
    age: {type: Number, required: true},
    city: {type: String, required: true},
    weight: {type: Number},
    breed: {type: String},
    bio: {type: String},
    hasAkcCertification: {type: Boolean},
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner'
    }
  }
);

module.exports = mongoose.model("Dog", dogSchema);