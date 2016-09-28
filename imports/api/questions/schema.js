import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Questions = new Mongo.Collection('questions');

Questions.deny({
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
		label: 'tradID via i18n',
		optional: true
	}
});

export const questionSchema = new SimpleSchema({
	level: {
		type: Number,
		label: 'Question level',
		min: 0
	},
	choices: {
		type: [ChoiceSchema],
		label: 'Choices list',
		optional: true
	},
	deprecated: {
		type: Boolean,
		label: 'Is the question deprecated or not'
	},
	questionsGroupId: {
		type: String,
		label: 'Question group ID'
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
	createdAt: {
		type: Date,
		label: 'Question creation date'
	},
	updatedAt: {
		type: Date,
		label: 'Update date',
		optional: true
	},
});

Questions.schema = questionSchema;
