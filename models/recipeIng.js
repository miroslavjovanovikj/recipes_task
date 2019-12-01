var mongoose = require('mongoose');

var recipeIngSchema= new mongoose.Schema({
recipe_id:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Recipe"
}],
ingredients_id:{
  id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Ingredients"
  },
name:String,

},
quantity:String

});
module.exports= mongoose.model("RecipeIng", recipeIngSchema);
