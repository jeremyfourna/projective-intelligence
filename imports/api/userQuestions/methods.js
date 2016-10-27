import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { lodash } from 'meteor/stevezhu:lodash';

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
			displayType: { type: String, allowedValues: ['scale', 'yesNo', 'qcm'] },
			questionsGroupIndex: { type: Number, min: 0 }
		});
		check(data, methodSchema);
		Meteor.call('updateUserScore', data);
		return UserQuestions.update({ _id: data.userQuestionId }, {
			$set: {
				choiceSelected: data.choiceSelected,
				answered: true,
				points: data.qcmPoints,
				answerDate: new Date()
			}
		});
	},
	fixQCMPoints() {

		function definePoints(choice, typeOfQuestion) {
			if (typeOfQuestion === 'range') {
				if (Number(choice.label) < 4) {
					choice.qcmPoints = 1;
				} else if (Number(choice.label) < 7) {
					choice.qcmPoints = 2;
				} else {
					choice.qcmPoints = 3;
				}
			} else {
				if (choice.label === 'Oui') {
					choice.qcmPoints = 3;
				} else if (choice.label === 'Non') {
					choice.qcmPoints = 2;
				} else if (choice.label === 'Ne sais pas') {
					choice.qcmPoints = 1;
				}
			}
			return choice;
		}

		let data = UserQuestions.find({}, {
			fields: {
				_id: 1,
				choices: 1,
				displayType: 1,
				answered: 1,
				choiceSelected: 1
			}
		}).fetch();
		return data.map((cur) => {
			cur.choices.map((cur1) => {
				return definePoints(cur1, cur.displayType);
			});
			if (cur.answered) {
				let ind = lodash.findIndex(cur.choices, ['label', cur.choiceSelected]);
				let pos = cur.choices[ind];
				if (ind !== -1) {
					UserQuestions.update({ _id: cur._id }, {
						$set: {
							choiceSelected: pos.label,
							points: pos.qcmPoints
						}
					});
				}
			}
			return UserQuestions.update({ _id: cur._id }, {
				$set: {
					choices: cur.choices
				}
			});
		});
	}
});
