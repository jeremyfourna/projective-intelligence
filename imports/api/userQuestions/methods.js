import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { UserQuestions, userQuestionSchema } from './schema.js';

Meteor.methods({
	insertQuestion(data) {
		check(data, userQuestionSchema);
		return UserQuestions.upsert({
			questionId: data.questionId,
			questionsGroupId: data.questionsGroupId,
			userId: data.userId
		}, {
			$set: {
				title: data.title,
				level: data.level,
				choices: data.choices,
				displayType: data.displayType,
				answered: false
			}
		});
	},
	answerQuestion(data) {
		let methodSchema = new SimpleSchema({
			userQuestionId: { type: String },
			choiceSelected: { type: String },
			qcmPoints: { type: Number, min: 1, max: 3, optional: true },
			userId: { type: String },
			questionsGroupId: { type: String },
			displayType: { type: String, allowedValues: ['scale', 'yesNo', 'qcm'] }
		});
		check(data, methodSchema);
		Meteor.call('updateUserScore', data);
		return UserQuestions.update({ _id: data.userQuestionId }, {
			$set: {
				choiceSelected: data.choiceSelected,
				answered: true,
				pointsForChoiceSelectedQCMQuestion: data.qcmPoints,
				answerDate: new Date()
			}
		});
	}
});
