const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  video: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  foodPartner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "foodPartner",
  },
});


const FoodModel = mongoose.model("Food", foodSchema);

module.exports = FoodModel;