import { Meteor } from 'meteor/meteor';

import { Questions } from '../schema.js';
import { Answers } from '../../answers/schema.js';

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

Meteor.publish('allQuestionsForUserQuestionsGroups', (questionsGroupList) => {
	return Questions.find({ questionsGroupId: { $in: questionsGroupList } });
});

Meteor.publish('allQuestionsForAnswers', (answerId) => {
	let answer = Answers.findOne({ _id: answerId }, {
		fields: {
			questionsGroupId: 1
		}
	});
	if (answer.questionsGroupId) {
		return Questions.find({ questionsGroupId: answer.questionsGroupId }, {
			fields: {
				title: 1,
				displayType: 1,
				questionsGroupId: 1
			}
		});
	}
});
