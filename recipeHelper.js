// This code sample shows how to call and receive external rest service data, within your skill Lambda code.

// var AWS = require('aws-sdk');

var https = require('https');

var recipes = {
    cookies: {
        ingredients: {
            milk: "one cup of",
            butter: "all of the",
            eggs: "one"
        }
    },
    secretsauce: {
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
}

exports.handler = function( event, context ) {
    var say = "";
    var shouldEndSession = false;
    var sessionAttributes = {};
    var myState = "";
    var pop = 0;
    var rank = 0;
    var currentRecipe = "";
    var currentIngredient = "";

    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Hi, what would you like to make today?";
        context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "GetRecipeIntent") {
            // TODO
            // do I have a recipe for {recipe}
            if (event.request.intent.slots.recpie.value) {
                currentRecipe = event.request.intent.slots.recpie.value;

                var post_data = {"recipe" : currentRecipe};
                say = currentRecipe;

            }
            console.log("GetRecipeIntent");
        } else if (IntentName === "GetIngredientIntent") {
            // TODO
            // "do "
            console.log("GetIngredientIntent");
        } else if (IntentName === "GetIngredientAmmountIntent") {
            // TODO
            currentIngredient = event.request.intent.slots.;
            console.log("GetIngredientAmmountIntent");
        }else if (IntentName === "GetListOfRecipesIntent") {
            // TODO
            console.log("GetListOfRecipesIntent");
        }

        // if (IntentName === "StateRequestIntent") {
        //
        //     if (event.request.intent.slots.usstate.value) {
        //
        //         myState = event.request.intent.slots.usstate.value;
        //
        //
        //         // call external rest service over https post
        //         var post_data = {"usstate": myState};
        //
        //         var post_options = {
        //             host:  'rmwum5l4zc.execute-api.us-east-1.amazonaws.com',
        //             port: '443',
        //             path: '/prod/stateresource',
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Content-Length': Buffer.byteLength(JSON.stringify(post_data))
        //             }};
        //             var post_req = https.request(post_options, function(res) {
        //                 res.setEncoding('utf8');
        //                 var returnData = "";
        //                 res.on('data', function (chunk) {
        //                     returnData += chunk;
        //                 });
        //                 res.on('end', function () {
        //                     // returnData: {"usstate":"Delaware","attributes":[{"population":900000},{"rank":45}]}
        //
        //                     pop = JSON.parse(returnData).attributes[0].population;
        //
        //                     say = "The population of " + myState + " is " + pop;
        //
        //                     // add the state to a session.attributes array
        //                     if (!sessionAttributes.requestList) {
        //                         sessionAttributes.requestList = [];
        //                     }
        //                     sessionAttributes.requestList.push(myState);
        //
        //                     // This line concludes the lambda call.  Move this line to within any asynchronous callbacks that return and use data.
        //                     context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });
        //
        //                 });
        //               });
        //         post_req.write(JSON.stringify(post_data));
        //         post_req.end();
        //
        //     }

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
