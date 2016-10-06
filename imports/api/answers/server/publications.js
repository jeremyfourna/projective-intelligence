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
