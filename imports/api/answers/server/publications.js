import { Meteor } from 'meteor/meteor';

import { Answers } from '../schema.js';

Meteor.publish('allAnswersForQuestionsGroup', (questionsGroupId) => {
	return Answers.find({
		questionsGroupId
	}, {
		sort: {
			level: 1
		}
	});
});

Meteor.publish('anAnswer', (answerId) => {
	return Answers.find({ _id: answerId });
});

Meteor.publish('allAnswersForQuestionsGroupResult', (questionsGroupId) => {
	return Answers.find({
		questionsGroupId
	}, {
		sort: {
			answerLevel: -1,
			level: 1
		}
	});
});

Meteor.publish('allAnswers', () => {
	return Answers.find({});
})
