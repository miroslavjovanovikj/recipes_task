var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
  name:{ type: String, text: true },
  author:{ type: String, text: true },
  source:{ type: String, text: true },
  prepTime:Number,
  prepInstruct:{ type: String, text: true},

});
module.exports = mongoose.model("Recipe", recipeSchema);
