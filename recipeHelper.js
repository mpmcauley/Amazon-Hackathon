// This code sample shows how to call and receive external rest service data, within your skill Lambda code.

// var AWS = require('aws-sdk');

var https = require('https');

exports.handler = function( event, context ) {
    var recipes = {
        cookies: {
            name: "cookies",
            ingredients: [
                {name: "milk", ammount: "one cup of"},
                {name: "butter", ammount: "all of the"},
                {name: "eggs", ammount: "one"}
            ]
        },
        secretsauce: {
            name: "secret sauce",
            ingredients: [
                {name: "butter", ammount: "two tablespoons of"},
                {name: "brownSugar", ammount: "two tablespoons of"},
                {name: "Garlic Cloves", ammount: "two"},
                {name: "Lemon Juice", ammount: "one tablespoon of"},
                {name: "Soy Sauce", ammount: "two teaspoons of"},
                {name: "pepper", ammount: "one half teaspoon"},
                {name: "mincedGinger", ammount: "one half teaspoon"}
            ]
        }
    };
    var say = "";
    var shouldEndSession = false;
    var sessionAttributes = {};
    var myRecipe = "";
    var recipeName = "";

    var currentRecipe = "";
    var currentIngredient = "";

    var recipes = {
        cookies: {
            name: "cookies",
            ingredients: [
                {name: "milk", ammount: "one cup of"},
                {name: "butter", ammount: "all of the"},
                {name: "eggs", ammount: "two"}
            ]
        },
        secretsauce: {
            name: "secret sauce",
            ingredients: [
                {name: "butter", ammount: "two tablespoons of"},
                {name: "brownSugar", ammount: "two tablespoons of"},
                {name: "Garlic Cloves", ammount: "two"},
                {name: "Lemon Juice", ammount: "one tablespoon of"},
                {name: "Soy Sauce", ammount: "two teaspoons of"},
                {name: "pepper", ammount: "one half teaspoon"},
                {name: "mincedGinger", ammount: "one half teaspoon"}
            ]
        }
    };

    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Hi, what recipes do you want to know?";
        context.succeed({sessionAttributes: sessionAttributes, response:
            buildSpeechletResponse(say, shouldEndSession) });

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "CheckRecipeIntent") {
            // TODO
            // do I have a recipe for {recipe}
            if (event.request.intent.slots.recipe.value ) {
                myRecipe = event.request.intent.slots.recipe.value;
                //recipeName = myRecipe.replace(/\s/g, '');
                if (recipes[myRecipe.replace(/ /g, "")]) {
                    say = "Damn right you have a recipe for " + myRecipe;
                } else {
                    say = "Sorry, you have never told me this recipe.";
                }
                context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });
                console.log("CheckRecipeIntent");
            }
            console.log("GetRecipeIntent");
        } else if (IntentName === "GetIngredientIntent") {
            var result = "";
            if (event.request.intent.slots.recipe.value) {
                    myRecipe = event.request.intent.slots.recipe.value;
                    recipeName = myRecipe.replace(/ /g, "");
                    var ingredients = recipes[recipeName].ingredients;
                    for (i = 0; i < ingredients.length; i++) {
                        result = result + ", " + ingredients[i].name;
                    }
                say = "The ingredients for " + myRecipe + " are" + result;
            } else {
                say = "Sorry bro, you don't have his recipe.";
            };
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

        } else if (IntentName === "GetIngredientAmountIntent") {
            var currentRecipe = event.request.intent.slots.recipe.value;
            var currentIngredient = event.request.intent.slots.ingredient.value;
            // TODO
            if (event.request.intent.slots.recipe.value) {
                console.log(currentRecipe);
                console.log(currentIngredient);
                recipe = currentRecipe.replace(/ /g, '');
                var ammount;
                var ingredientList = recipes[recipe].ingredients;
                for (var i = 0; i < ingredientList.length; i += 1) {
                    if (ingredientList[i].name === currentIngredient) {
                        ammount = ingredientList[i].ammount;
                    }
                }
                say = "You need " + ammount + " " + currentIngredient;
                shouldEndSession = true;
            } else {
                console.log("FUCK");
                say = "Sorry, I can't find that ingredient";
            }

            console.log("GetIngredientAmmountIntent");
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

        } else if (IntentName === "GetListOfRecipesIntent") {
            var result = "";
            var recipeKeys = Object.keys(recipes);
            for(i = 0; i < recipeKeys.length; i++) {
                result = result + ", " + recipes[recipeKeys[i]].name;
            }
            say = "the recipes that you currently have are" + result;
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });
            console.log("GetListOfRecipesIntent");

        } else if (IntentName === "AMAZON.StopIntent" || IntentName === "AMAZON.CancelIntent") {
            say = "Happy Cooking!";
            shouldEndSession = true;
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });


        } else if (IntentName === "AMAZON.HelpIntent" ) {
            say = "Just ask me for a recipe."
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

        }
    }
};

function buildSpeechletResponse(say, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: "<speak>" + say + "</speak>"
        },
        reprompt: {
            outputSpeech: {
                type: "SSML",
                ssml: "<speak>Please try again. " + say + "</speak>"
            }
        },
        card: {
            type: "Simple",
            title: "My Card Title",
            content: "My Card Content, displayed on the Alexa App or alexa.amazon.com"
        },
        shouldEndSession: shouldEndSession
    };
}
