import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Answers = new Mongo.Collection('answers');

Answers.deny({
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

export const answerSchema = new SimpleSchema({
	level: {
		type: Number,
		label: 'Answer\'s level',
		min: 1
	},
	title: {
		type: String,
		label: 'Answer\'s title',
		optional: true
	},
	answerLevel: {
		type: Number,
		label: 'Answer\'s level for grouping answer',
		min: 1,
		max: 4
	},
	answersIdLinked: {
		type: [String],
		label: 'List the answer Id linked to this answer',
		optional: true
	},
	questionsGroupId: {
		type: String,
		label: 'Id of Answer\'s questionsGroup'
	},
	type: {
		type: String,
		label: 'Answer\'s type',
		allowedValues: ['scale', 'yesNo', 'qcm'],
		optional: true,
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
	questionsIdLinked: {
		type: [String],
		label: 'List the questions Id linked to this answer',
		optional: true
	},
	lowAnswer: {
		type: String,
		label: 'Phrase for the low answer',
		optional: true,
	},
	midAnswer: {
		type: String,
		label: 'Phrase for the mid answer',
		optional: true
	},
	highAnswer: {
		type: String,
		label: 'Phrase for the high answer',
		optional: true
	}
});

Answers.schema = answerSchema;

Answers.helpers({
	questionsIdLinkedCount() {
		return this.questionsIdLinked.length;
	},
	answersIdLinkedCount() {
		return this.answersIdLinked.length;
	}
})
