import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { UserQuestions, userQuestionSchema } from './schema.js';

Meteor.methods({
	insertQuestion(data) {
		check(data, userQuestionSchema);
		return UserQuestions.upsert({
			questionId: data.questionId,
			questionsGroupId: data.questionId,
			userId: data.userId
		}, {
			$set: {
				title: data.title,
				level: data.level,
				choices: data.choices,
				choiceSelected: '',
				displayType: data.displayType,
				answered: false
			}
		});
	},
	answerQuestion(data) {
		let methodSchema = new SimpleSchema({
			userQuestionId: { type: String },
			choiceSelected: { type: String }
		});
		check(data, methodSchema);
		return UserQuestions.update({ _id: data.userQuestionId }, {
			$set: {
				choiceSelected: data.choiceSelected,
				answered: true,
				answerDate: new Date()
			}
		});
	},
	saveQuestionResult(data) {
		let ResultSchema = new SimpleSchema({
			universeId: { type: String, optional: true },
			workshopId: { type: String, optional: true },
			result: { type: Number, decimal: true }
		});
		let methodSchema = new SimpleSchema({
			_id: { type: String },
			result: { type: [ResultSchema] }
		});
		check(data, methodSchema);
		check(data.result[0], Object);
		check(data.result[0].result, Number);
		if (data.result[0].universeId) {
			check(data.result[0].universeId, String);
		} else if (data.result[0].workshopId) {
			check(data.result[0].workshopId, String);
		}
		return UserQuestions.update({ _id: data._id }, {
			$set: {
				result: data.result
			}
		});
	}
});
