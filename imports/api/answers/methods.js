import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Answers, answerSchema } from './schema.js';

Meteor.methods({
	addAnswer(data) {
		check(data, answerSchema);
		data.questionsIdLinked = [];
		return Answers.insert(data);
	},
	addQuestionToAnswer(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			questionId: { type: String }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$addToSet: {
				questionsIdLinked: data.questionId
			}
		});
	},
	removeQuestionFromAnswer(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			questionId: { type: String }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$pull: {
				questionsIdLinked: data.questionId
			}
		});
	},
	updateAnswer(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			level: { type: Number, min: 1 },
			lowAnswer: { type: String },
			midAnswer: { type: String, optional: true },
			highAnswer: { type: String }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$set: {
				level: data.level,
				lowAnswer: data.lowAnswer,
				midAnswer: data.midAnswer,
				highAnswer: data.highAnswer
			}
		});
	}
});
