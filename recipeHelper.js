// This code sample shows how to call and receive external rest service data, within your skill Lambda code.

// var AWS = require('aws-sdk');

var https = require('https');

exports.handler = function( event, context ) {
    var say = "";
    var shouldEndSession = false;
    var sessionAttributes = {};
    var myState = "";
    var pop = 0;
    var rank = 0;
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
        say = "Hi, what would you like to make today?";
        context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "CheckRecipeIntent") {
            // TODO
            // do I have a recipe for {recipe}
            if (event.request.intent.slots.recpie.value) {
                currentRecipe = event.request.intent.slots.recpie.value;

                var post_data = {"recipe" : currentRecipe};
                say = currentRecipe;


            }
            console.log("GetRecipeIntent");
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });
        } else if (IntentName === "GetIngredientIntent") {
            // TODO
            console.log("GetIngredientIntent");
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
            // TODO
            console.log("GetListOfRecipesIntent");
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });
        } else if (IntentName === "AMAZON.StopIntent" || IntentName === "AMAZON.CancelIntent") {
            say = "You asked for " + sessionAttributes.requestList.toString() + ". Thanks for playing!";
            shouldEndSession = true;
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });


        } else if (IntentName === "AMAZON.HelpIntent" ) {
            say = "Just say the name of a U.S. State, such as Massachusetts or California."
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
