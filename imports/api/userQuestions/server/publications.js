import { Meteor } from 'meteor/meteor';

import { UserQuestions } from '../schema.js';

Meteor.publish('tenQuestionAtATime', (userId, questionsGroupId) => {
	return UserQuestions.find({
		userId,
		questionsGroupId,
		answered: false
	}, {
		sort: {
			level: 1
		},
		limit: 10
	});
});

Meteor.publish('userQuestionsNotAnswered', (userId) => {
	return UserQuestions.find({
		userId,
		answered: false
	}, {
		fields: {
			userId: 1,
			answered: 1
		}
	});
});

Meteor.publish('userQuestionsForQuestionsGroup', (questionsGroupId) => {
	return UserQuestions.find({
		questionsGroupId
	}, {
		fields: {
			_id: 1,
			questionsGroupId: 1,
			userId: 1,
			answered: 1
		}
	});
});

Meteor.publish('allUserQuestionsForUser', (userId, questionsGroupId) => {
	return UserQuestions.find({
		userId,
		questionsGroupId,
		answered: true
	}, {
		fields: {
			choiceSelected: 1,
			userId: 1,
			answered: true,
			questionId: 1,
			questionsGroupId: 1
		}
	});
});
