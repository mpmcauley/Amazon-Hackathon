exports.handler = function( event, context ) {
    var say = "";
    var shouldEndSession = false;
    var sessionAttributes = {};
    var myRecipe = "";

    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Welcome to Recipe builder...lets get going big fella";
        context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "GetRecipeIntent") {

            if (event.request.intent.slots.recipe.value) {

                myRecipe = event.request.intent.slots.recipe.value;
                say = "this recipe is " + myRecipe;


                            add the state to a session.attributes array
                            if (!sessionAttributes.requestList) {
                                sessionAttributes.requestList = [];
                            }
                             sessionAttributes.requestList.push(myRecipe);

                            // This line concludes the lambda call.  Move this line to within any asynchronous callbacks that return and use data.
                            context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

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
            say = "No idea if this intent works. But we will see if I talk";
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
