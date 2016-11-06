
exports.handler = function( event, context ) {
    var say = "";
    var shouldEndSession = false;
    var sessionAttributes = {};
    var myRecipe = "";

    if (event.request.type === "LaunchRequest") {
        say = "Welcome to Recipe builder...lets get going big fella";
        context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "GetRecipeRequestIntent") {

            if (event.request.intent.slots.recipe.value) {

                myRecipe = event.request.intent.slots.recipe.value;

                say = "Damn right you have a recipe for " + myRecipe;


                if (event.request.intent.slots.recpie.value) {
                    currentRecipe = event.request.intent.slots.recpie.value;

                    var post_data = {"recipe" : currentRecipe};
                    // say = currentRecipe;

                }
                console.log("GetRecipeIntent");

            } else if (IntentName === "GetIngredientIntent") {
                // TODO
                console.log("GetIngredientIntent");
            } else if (IntentName === "GetIngredientAmmountIntent") {
                // TODO
                console.log("GetIngredientAmmountIntent");
            }else if (IntentName === "GetListOfRecipesIntent") {
                // TODO
                console.log("GetListOfRecipesIntent");
            }

        } else if (IntentName === "AMAZON.StopIntent" || IntentName === "AMAZON.CancelIntent") {
            say = "Happy cooking";
            shouldEndSession = true;
            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });


        } else if (IntentName === "AMAZON.HelpIntent" ) {
            say = "Ask me if you have a recipe for something"
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
<<<<<<< HEAD




=======
>>>>>>> d4271bef7e9c5d30b2141572e18c8bbc5638249a
