import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { QuestionsGroups } from '../questionsGroups/schema.js';
import { Questions } from '../questions/schema.js';

Meteor.methods({
	addQuestionsGroupIntoUser(data) {
		let methodSchema = new SimpleSchema({
			userId: { type: String },
			questionsGroupId: { type: String },
			questionsGroupIndex: { type: Number, min: 0 }
		});
		check(data, methodSchema);
		const pos = `profile.questionsGroups.${data.questionsGroupIndex}.added`;
		const pos1 = `profile.questionsGroups.${data.questionsGroupIndex}.nbAnswered`;
		const pos2 = `profile.questionsGroups.${data.questionsGroupIndex}.nbQuestions`;
		let nbQuestions = Questions.find({ questionsGroupId: data.questionsGroupId }, {
			fields: {
				_id: 1
			}
		}).count();
		return Meteor.users.update({ _id: data.userId }, {
			$set: {
				[pos]: true,
				[pos1]: 0,
				[pos2]: nbQuestions
			}
		});
	},
	addNewQuestionsGroupIntoProfile(data) {
		let methodSchema = new SimpleSchema({
			userId: { type: String },
			questionsGroupId: { type: String }
		});
		check(data, methodSchema);
		let questionsGroupIdExist = QuestionsGroups.findOne({ _id: data.questionsGroupId });
		if (questionsGroupIdExist) {
			return Meteor.users.update({ _id: data.userId }, {
				$push: {
					'profile.questionsGroups': { _id: data.questionsGroupId, added: false }
				}
			});
		} else {
			throw new Meteor.Error(500, 'Erreur 500 : L\'identifiant du questionnaire n\'existe pas', 'L\'identifiant du questionnaire n\'existe pas');
		}
	},
	updatePersonalInfos(data) {
		let methodSchema = new SimpleSchema({
			userId: { type: String },
			firstName: { type: String },
			lastName: { type: String },
			gender: { type: String },
			year: { type: Number, min: 1900, max: 2016 },
			month: { type: Number, min: 1, max: 12 },
			day: { type: Number, min: 1, max: 31 },
			currentPosition: { type: String }
		});
		check(data, methodSchema);
		return Meteor.users.update({ _id: data.userId }, {
			$set: {
				'profile.firstName': data.firstName,
				'profile.lastName': data.lastName,
				'profile.gender': data.gender,
				'profile.year': data.year,
				'profile.month': data.month,
				'profile.day': data.day,
				'profile.currentPosition': data.currentPosition
			}
		});
	},
	updateUserScore(data) {
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
		const pos = `profile.score.${data.questionsGroupId}`;
		const pos1 = `profile.questionsGroups.${data.questionsGroupIndex}.nbAnswered`;
		let num = Number(data.choiceSelected);
		if (data.displayType === 'scale') {
			if (num < 4) {
				return Meteor.users.update({ _id: data.userId }, {
					$inc: {
						[pos]: 1,
						[pos1]: 1
					}
				});
			} else if (num < 7) {
				return Meteor.users.update({ _id: data.userId }, {
					$inc: {
						[pos]: 2,
						[pos1]: 1
					}
				});
			} else {
				return Meteor.users.update({ _id: data.userId }, {
					$inc: {
						[pos]: 3,
						[pos1]: 1
					}
				});
			}
		} else {
			return Meteor.users.update({ _id: data.userId }, {
				$inc: {
					[pos]: data.qcmPoints,
					[pos1]: 1
				}
			});
		}
	}
});
