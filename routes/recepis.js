var express  = require('express'),
    Recipe   = require('../models/recipe'),
    Ingredient = require('../models/ingredient'),
    RecipeIng  = require('../models/recipeIng')
    router   = express.Router();


router.get("/", function(req,res){
  res.redirect("/recepis");
});
router.get("/recepis", function(req,res){

      Recipe.find().populate("ingr_id").exec(function(err,oneRcipe){
        if(err){
          console.log(err);
        }else{
          Ingredient.find({},function(err,listIngr){
            if(err){
              console.log(err)
            }else{
              RecipeIng.find().populate("recipe_id").exec(function(err,findAll){
                if(err){
                  console.log(err);
                }else{
                  res.render("recepis",{findAll:findAll, oneRcipe:oneRcipe, listIngr:listIngr });
                }
          });
        }
      });
    }
  });
});

router.get("/recepis/new", function(req,res){
  Ingredient.find({},function(err, listIng){
    if(err){
      console.log(err);
    }else{
      res.render("new",{listIng:listIng});
    }
  });
});

router.post("/recepis", function(req, res){
  Recipe.create(req.body.recipe, function(err, createRecipe){
    if(err){
      console.log(err);
  }else{
    debugger;
    var ingNames = req.body.names;
    for (var objName in ingNames) {
        if (Object.keys(ingNames[objName]).length > 0 ) {

             Ingredient.findOne({name: objName}, function(err,ing){
                 var name =ing.name;
                 var quan=ingNames[ing.name];
                 var obj={name:name, quan:quan};

                  RecipeIng.create(obj, function(err, ingredientDetails){
                  ingredientDetails.ingredients_id.name = ing.name;
                  ingredientDetails.ingredients_id.id = ing._id;
                  ingredientDetails.quantity = ingNames[ing.name];
                  ingredientDetails.recipe_id.push(createRecipe);
                  createRecipe.save();
                  ingredientDetails.save();
                });
              });
            }
       }
        res.redirect("/recepis")
    }
  });
});

router.get("/recepis/:id", function(req,res){
  Recipe.findById(req.params.id,function(err,showRecipe){
    if(err){
      console.log(err);
    }else{
      RecipeIng.find({},function(err,showIng){
        if(err){
          console.log(err);
        }else{
          res.render("show", {showRecipe:showRecipe, showIng:showIng});
          console.log(showIng);
        }
      });
    }
  });
});

router.post("/results", function(req,res){
    var names=req.body.ingredients;
    var timePrep= req.body.prepTime;
    var instr= req.body.br;

    RecipeIng.find( { "ingredients_id.name":names}).populate("recipe_id").exec(function(err, findIngri){
        if(err){
          console.log(err);
        }else{
          Recipe.find({prepTime:timePrep},function(err,preptime){
            if(err){
              console.log(err);
            }else{
              Recipe.find({$text:{$search:instr}},function(err,instruct){
                if(err){
                  console.log(err);
                }else
                  RecipeIng.find({},function(err,allings){
                    if(err){
                      console.log(err);
                    }else{
                      if(findIngri&&preptime===undefined||instruct&&preptime===undefined){
                            // console.log(preptime);
                            // console.log(findIngri);
                            // console.log(instruct);
                            Object.entries(findIngri).length=0
                            Object.entries(preptime).length=0
                            Object.entries(preptime).length=0
                            res.render("results", {preptime:preptime,findIngri:findIngri,instruct:instruct,allings:allings});
                          }else{
                            res.render("results", {preptime:preptime,findIngri:findIngri,instruct:instruct,allings:allings});
                      }
                    }
                  });
              });
              }
            });
      }
    });
});
module.exports = router;
