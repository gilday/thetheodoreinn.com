import {handler as alexahandler} from 'alexa-sdk'

const languageStrings = {
    'en': {
        translation: {
            SKILL_NAME: 'The Theodore Inn',
            DUNNO: 'I do not know who you are',
            HELP_MESSAGE: 'You can say book the room, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Peace out!',
        },
    },
}

const handlers = {
    'WhoAmI': function () {
        if (!this.event.session.user.accessToken) {
            this.emit(':tellWithLinkAccountCard', 'to start using this skill, please use the companion app to log-in to your Google account')
            return
        }
        this.emit(':tellWithCard', this.t('DUNNO'), this.t('SKILL_NAME'), this.t('DUNNO'))
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE')
        const reprompt = this.t('HELP_MESSAGE')
        this.emit(':ask', speechOutput, reprompt)
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'))
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'))
    },
}

export default function handler (event, context) {
    const alexa = alexahandler(event, context)
    alexa.APP_ID = 'amzn1.ask.skill.91a1cf91-9819-4a63-802a-27bfe4b60ded'
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
}
