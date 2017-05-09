/* Morrissey Cheer Skill */

/* App ID for the skill */
var APP_ID = "amzn1.ask.skill.33912768-6423-4053-b695-7c9b1b8aedb6";

/* The AlexaSkill prototype and helper functions */
var AlexaSkill = require('./AlexaSkill');

/**
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Cheer = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Cheer.prototype = Object.create(AlexaSkill.prototype);
Cheer.prototype.constructor = Cheer;

Cheer.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Cheer.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewCheerRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Cheer.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Cheer.prototype.intentHandlers = {
    "ReciteCheerIntent": function (intent, session, response) {
        handleNewCheerRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a Fuji fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Bye Team Fuji";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Buy Team Fuji";
        response.tell(speechOutput);
    }
};

/**
 * Responds with the cheer text.
 */
function handleNewCheerRequest(response) {
    // Create speech output
    var speechOutput = "M.. O.. Double R.. I.. Double S.. E.. Y.. Why  why  why? Because we love. Morrissey!";
    var cardTitle = "Morrissey Cheer";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Cheer skill.
    var cheer = new Cheer();
    cheer.execute(event, context);
};

