/* App ID for the skill */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/* Array containing space facts */
var FACTS = [
    "The world's youngest parents were age 8 and 9. They lived in China and had their child in 1910.",
    "In the 16th and 17th centuries in the country of Turkey, anyone caught drinking coffee was put to death.",
    "Abraham Lincoln's dog, Fido, was also assassinated.",
    "In England, the Speaker of the House is not allowed to speak.",
    "About 3,000 years ago, most Egyptians died by the time they were 30.",
    "If a statue in the park of a person on a horse has both front legs in the air, the person died in battle. If the horse has one front leg in the air, the person died as a result of wounds received in battle. If the horse has all four legs on the ground, the person died of natural causes.",
    "The youngest pope was 11 years old.",
    "Richard Versalle, a tenor performing at New York's Metropolitan Opera House, suffered a heart attack and fell 10 feet from a ladder to the stage just after singing the line, 'You can only live so long.'",
    "60.7 percent of eligible voters participated in the 2004 presidential election, the highest percentage in 36 years. However, more than 78 million did not vote. This means President Bush was re-elected by less than 31% of all eligible voters in the United States.",
    "David Bowie used to think he was being stalked by someone who is dressed like a giant pink rabbit. Bowie noticed the fan at several recent concerts, but became alarmed when he got on a plane and the bunny was also on board.",
    "Wayne's World was filmed in two weeks.",
    "The first Ford cars had engines made by Dodge.",
    "In Ancient Egypt , priests plucked every hair from their bodies, including their eyebrows and eyelashes.",
    "More than 8,100 US troops are still listed as missing in action from the Korean War.",
    "Toto was paid $125 per week while filming The Wizard of Oz."
];


/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me an odd history fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random odd history fact from the FACTS list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your odd history fact: " + randomFact;
    var cardTitle = "Your Odd History Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the OddHistory skill.
    var fact = new Fact();
    fact.execute(event, context);
};

