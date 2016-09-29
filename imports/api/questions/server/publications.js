import { Meteor } from 'meteor/meteor';

import { Questions } from '../schema.js';

Meteor.publish('allQuestions', () => {
	return Questions.find({});
});

Meteor.publish('aQuestion', (questionId) => {
	return Questions.find({ _id: questionId });
});

Meteor.publish('questionsLinkedToQuestionsGroup', (questionsGroupId) => {
	return Questions.find({ questionsGroupId });
});

Meteor.publish('allQuestionsForCountQuestionsGroups', () => {
	return Questions.find({}, {
		fields: {
			questionsGroupId: 1
		}
	});
});
