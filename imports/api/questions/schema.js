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
	title: {
		type: String,
		label: 'Question title'
	},
	level: {
		type: Number,
		label: 'Question level',
		min: 0
	},
	choices: {
		type: [choiceSchema],
		label: 'Choices list',
		optional: true
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

Questions.helpers({
	rangeQuestion() {
		if (this.displayType === 'scale') {
			return true;
		} else {
			return false;
		}
	},
	qcmQuestion() {
		if (this.displayType === 'qcm') {
			return true;
		} else {
			return false;
		}
	},
	yesNoQuestion() {
		if (this.displayType === 'yesNo') {
			return true;
		} else {
			return false;
		}
	}
});
