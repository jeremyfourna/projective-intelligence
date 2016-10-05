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
