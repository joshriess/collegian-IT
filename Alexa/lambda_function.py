"""
This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well
as testing instructions are located at http://amzn.to/1LzFrj6

For additional samples, visit the Alexa Skills Kit Getting Started guide at
http://amzn.to/1LGWsLG
"""

from __future__ import print_function
import requests, json

# --------------- Helpers that build all of the responses ----------------------

def build_speechlet_response(title, output, reprompt_text, should_end_session):
    return {
        'outputSpeech': {
            'type': 'PlainText',
            'text': output
        },
        'card': {
            'type': 'Simple',
            'title': "SessionSpeechlet - " + title,
            'content': "SessionSpeechlet - " + output
        },
        'reprompt': {
            'outputSpeech': {
                'type': 'PlainText',
                'text': reprompt_text
            }
        },
        'shouldEndSession': should_end_session
    }


def build_response(session_attributes, speechlet_response):
    return {
        'version': '1.0',
        'sessionAttributes': session_attributes,
        'response': speechlet_response
    }


# --------------- Functions that control the skill's behavior ------------------

def get_welcome_response():
    """ If we wanted to initialize the session to have some attributes we could
    add those here
    """

    currentRoom = getRoom()

    session_attributes = {}
    card_title = "Welcome"
    speech_output = "Welcome to the Hack K-State Escape game. " \
                    "You are currently in " + getFancyRoom(currentRoom) + ". "
    #                "Please open your browser, and navigate to " \
    #                "the game URL. When you are ready, say a command."
    #speech_output = "Welcome to the Escape Hack K-State game. " \
    #                "You wake up in a dark empty room, there's a door on the left and a door on the right. " \
    #                "You feel an eerie and uneasy feeling in your gut, where did everyone go?"
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.



    reprompt_text = "When you are ready, please say " \
                    "a command."
    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))


def handle_session_end_request():
    card_title = "Game Over!"
    speech_output = "Thank you for playing the Hack K-State Escape game. " \
                    "We hope you had fun! "
    # Setting this to true ends the session and exits the skill.
    should_end_session = True
    return build_response({}, build_speechlet_response(
        card_title, speech_output, None, should_end_session))


def getRoom():
    r = requests.get('http://hack-kstate-escape.herokuapp.com/player/room')
    data = json.loads(r.text)

    return data["room"]

def getFancyRoom(room):
    r = requests.get('http://hack-kstate-escape.herokuapp.com/rooms/' + room)
    data = json.loads(r.text)

    return data["niceName"]


def switchRoom(theRoom):
    switchRoom = {"room": theRoom}
    r = requests.post('http://hack-kstate-escape.herokuapp.com/player/room',switchRoom)


def getRoomInfo(theRoom):
    r = requests.get("http://hack-kstate-escape.herokuapp.com/rooms/" + theRoom)
    return json.loads(r.text)


def backIntent(intent, session):

    currentRoom = getRoom()
    data = getRoomInfo(currentRoom)

    if (data["back"] != False):
        switchRoom(data["back"])
        speech_output = "You are currently in " + getFancyRoom(data["back"])  + ". "
    else:
        speech_output = "You are as far back as you can go. Do something else."

    card_title = intent['name']
    session_attributes = {}
    should_end_session = False
    reprompt_text = "What would you like to do?"
    return build_response(session_attributes, build_speechlet_response(card_title, speech_output, reprompt_text, should_end_session))

def forwardIntent(intent, session):

    currentRoom = getRoom()
    data = getRoomInfo(currentRoom)

    if (data["forward"] != False):
        switchRoom(data["forward"])
        speech_output = "You are currently in " + getFancyRoom(data["forward"])  + ". "
    else:
        speech_output = "You cannot go forward. Do something else."

    card_title = intent['name']
    session_attributes = {}
    should_end_session = False
    reprompt_text = "What would you like to do?"
    return build_response(session_attributes, build_speechlet_response(card_title, speech_output, reprompt_text, should_end_session))

def leftIntent(intent, session):
    currentRoom = getRoom()

    data = getRoomInfo(currentRoom)

    if (data["left"] != False):
        switchRoom(data["left"])
        speech_output = "You are currently in " + getFancyRoom(data["left"])  + ". "
    else:
        speech_output = "You are as far left as you can go. Do something else."

    card_title = intent['name']
    session_attributes = {}
    should_end_session = False
    reprompt_text = "What would you like to do?"
    return build_response(session_attributes, build_speechlet_response(card_title, speech_output, reprompt_text, should_end_session))

def rightIntent(intent, session):
    currentRoom = getRoom()

    data = getRoomInfo(currentRoom)

    if (data["right"] != False):
        switchRoom(data["right"])
        speech_output = "You are currently in " + getFancyRoom(data["right"])  + ". "
    else:
        speech_output = "You are as far right as you can go. Do something else."

    card_title = intent['name']
    session_attributes = {}
    should_end_session = False
    reprompt_text = "What would you like to do?"
    return build_response(session_attributes, build_speechlet_response(card_title, speech_output, reprompt_text, should_end_session))

def searchIntent(intent, session):

    currentRoom = getRoom()

    r = requests.get('http://hack-kstate-escape.herokuapp.com/rooms/' + currentRoom)
    data = json.loads(r.text)

    cutsceneResponse = {"hasCutscene": "true"}
    postReq = requests.post('http://hack-kstate-escape.herokuapp.com/player/cutscene', cutsceneResponse)

    searchObject = data["search"]

    keyCheck = requests.get("http://hack-kstate-escape.herokuapp.com/player/key")
    keyData = json.loads(keyCheck.text)

    if (keyData["hasKey"]):
        searchText = searchObject["hasKeyText"]
        if (data["exit"]):
            # YOU WIN!
            return handle_session_end_request()
    else:
        searchText = searchObject["text"]

    if (searchObject["found"]):
        if (searchObject["found"]["key"]):
            keyResponse = {"hasKey": "true"}
            keyReq = requests.post('http://hack-kstate-escape.herokuapp.com/player/key', keyResponse)

    card_title = intent['name']
    session_attributes = {}
    should_end_session = False
    speech_output = searchText
    reprompt_text = "What would you like to do?"
    return build_response(session_attributes, build_speechlet_response(card_title, speech_output, reprompt_text, should_end_session))

def catchAll(intent, session):
    card_title = 'did not recognize'
    session_attributes = {}
    should_end_session = False
    speech_output = "I'm not quite sure what you said, please try again"
    reprompt_text = "Please try again"
    return build_response(session_attributes, build_speechlet_response(card_title, speech_output, reprompt_text, should_end_session))


# --------------- Events ------------------

def on_session_started(session_started_request, session):
    """ Called when the session starts """

    print("on_session_started requestId=" + session_started_request['requestId']
          + ", sessionId=" + session['sessionId'])


def on_launch(launch_request, session):
    """ Called when the user launches the skill without specifying what they
    want
    """

    print("on_launch requestId=" + launch_request['requestId'] +
          ", sessionId=" + session['sessionId'])
    # Dispatch to your skill's launch
    return get_welcome_response()


def on_intent(intent_request, session):
    """ Called when the user specifies an intent for this skill """

    print("on_intent requestId=" + intent_request['requestId'] +
          ", sessionId=" + session['sessionId'])

    intent = intent_request['intent']
    intent_name = intent_request['intent']['name']

    # Dispatch to your skill's intent handlers
    if intent_name == "backIntent":
        return backIntent(intent, session)
    elif intent_name == "forwardIntent":
        return forwardIntent(intent, session)
    elif intent_name == "leftIntent":
        return leftIntent(intent, session)
    elif intent_name == "rightIntent":
        return rightIntent(intent, session)
    elif intent_name == "searchIntent":
        return searchIntent(intent, session)
    elif intent_name == "AMAZON.HelpIntent":
        return get_welcome_response()
    elif intent_name == "AMAZON.CancelIntent" or intent_name == "AMAZON.StopIntent":
        return handle_session_end_request()
    else:
        #return catchAll(intent, session)
        raise ValueError("Invalid intent")


def on_session_ended(session_ended_request, session):
    """ Called when the user ends the session.

    Is not called when the skill returns should_end_session=true
    """
    print("on_session_ended requestId=" + session_ended_request['requestId'] +
          ", sessionId=" + session['sessionId'])
    # add cleanup logic here


# --------------- Main handler ------------------

def lambda_handler(event, context):
    """ Route the incoming request based on type (LaunchRequest, IntentRequest,
    etc.) The JSON body of the request is provided in the event parameter.
    """
    print("event.session.application.applicationId=" +
          event['session']['application']['applicationId'])

    """
    Uncomment this if statement and populate with your skill's application ID to
    prevent someone else from configuring a skill that sends requests to this
    function.
    """
    # if (event['session']['application']['applicationId'] !=
    #         "amzn1.echo-sdk-ams.app.[unique-value-here]"):
    #     raise ValueError("Invalid Application ID")

    if event['session']['new']:
        on_session_started({'requestId': event['request']['requestId']},
                           event['session'])

    if event['request']['type'] == "LaunchRequest":
        return on_launch(event['request'], event['session'])
    elif event['request']['type'] == "IntentRequest":
        return on_intent(event['request'], event['session'])
    elif event['request']['type'] == "SessionEndedRequest":
        return on_session_ended(event['request'], event['session'])
