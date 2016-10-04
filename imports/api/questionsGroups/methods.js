import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { QuestionsGroups, questionsGroupSchema } from './schema.js';
import { Questions } from '../questions/schema.js';

Meteor.methods({
	addQuestionsGroup(data) {
		check(data, questionsGroupSchema);
		data.users = [];
		return QuestionsGroups.insert(data);
	},
	updateAQuestionsGroup(data) {
		let methodSchema = new SimpleSchema({
			questionsGroupId: { type: String },
			title: { type: String },
			level: { type: Number },
			label: { type: String },
			deprecated: { type: Boolean }
		});
		check(data, methodSchema);
		return QuestionsGroups.update({ _id: data.questionsGroupId }, {
			$set: {
				title: data.title,
				label: data.label,
				level: data.level,
				deprecated: data.deprecated
			},
			$inc: {
				version: 1
			}
		});
	},
	addQuestionsGroupToUser(data) {
		let methodSchema = new SimpleSchema({
			questionsGroupId: { type: String },
			userId: { type: String },
			questionsGroupIndex: { type: Number, min: 0 }
		});
		check(data, methodSchema);

		const questionsForUser = Questions.find({
			questionsGroupId: data.questionsGroupId
		}).fetch();

		questionsForUser.map((cur) => {
			cur.answered = false;
			cur.userId = data.userId;
			cur.questionId = cur._id;
			delete cur._id;
			delete cur.createdAt;
			delete cur.updatedAt;
			return Meteor.call('insertQuestion', cur);
		});

		Meteor.call('addUserIntoQuestionsGroup', data);
		return Meteor.call('addQuestionsGroupIntoUser', data);
	},
	addUserIntoQuestionsGroup(data) {
		let methodSchema = new SimpleSchema({
			questionsGroupId: { type: String },
			userId: { type: String },
			questionsGroupIndex: { type: Number, min: 0 }
		});
		check(data, methodSchema);
		return QuestionsGroups.update({ _id: data.questionsGroupId }, {
			$push: {
				users: {
					userId: data.userId,
					addedAt: new Date()
				}
			}
		});
	}
});
