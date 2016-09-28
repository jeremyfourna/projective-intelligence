import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const QuestionsGroups = new Mongo.Collection('questionsGroups');

QuestionsGroups.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});

export const userInQuestionsGroupSchema = new SimpleSchema({
	userId: {
		type: String,
		label: 'User Id'
	},
	addedAt: {
		type: Date,
		label: 'Date when the user added the question group Id in the sign up component'
	}
});

export const questionsGroupSchema = new SimpleSchema({
	title: {
		type: String,
		label: 'Question group title'
	},
	company: {
		type: String,
		label: 'Company linked to the question group'
	},
	companyPicture: {
		type: String,
		label: 'Company\s picture',
		optional: true
	},
	createdAt: {
		type: Date,
		label: 'Creation date'
	},
	updatedAt: {
		type: Date,
		label: 'Update date',
		optional: true
	},
	users: {
		type: [userInQuestionsGroupSchema],
		label: 'List the users that will answer to the question group',
		optional: true
	}
});

QuestionsGroups.schema = questionsGroupSchema;

QuestionsGroups.helpers({
	usersCount() {
		return this.users.length;
	}
});
