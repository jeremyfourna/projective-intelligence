import { Meteor } from 'meteor/meteor';

import { UserQuestions } from '../userQuestions/schema.js';

Meteor.users.deny({
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

Meteor.users.helpers({
	questionsCount() {
		return UserQuestions.find({ userId: this._id }).count();
	},
	questionsNotAnsweredCount() {
		return UserQuestions.find({ userId: this._id, answered: false }).count();
	}
});
