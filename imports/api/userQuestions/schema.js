import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const UserQuestions = new Mongo.Collection('userQuestions');

UserQuestions.deny({
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

export const choiceSchema = new SimpleSchema({
	choiceId: {
		type: String,
		label: 'Choice ID'
	},
	label: {
		type: String,
		label: 'tradID via i18n'
	}
});

export const userQuestionSchema = new SimpleSchema({
	questionId: {
		type: String,
		label: 'Question ID'
	},
	userId: {
		type: String,
		label: 'User Id'
	},
	answered: {
		type: Boolean,
		label: 'Does the user has answered the question ?'
	},
	level: {
		type: Number,
		label: 'Question level',
		min: 1
	},
	choices: {
		type: [choiceSchema],
		label: 'Choices list',
		minCount: 2
	},
	choiceSelected: {
		type: String,
		label: 'User choice',
		optional: true
	},
	answerDate: {
		type: Date,
		label: 'Answer date',
		optional: true
	},
	displayType: {
		type: String,
		label: 'Question display',
		allowedValues: ['scale', 'yesNo', 'qcm']
	},
	title: {
		type: String,
		label: 'Question title'
	},
	questionsGroupId: {
		type: String,
		label: 'questionGroup\s ID',
		optional: true
	}
});

UserQuestions.schema = userQuestionSchema;
