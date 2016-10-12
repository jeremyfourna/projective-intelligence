import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import './listUsers.jade';
import '../loader.jade';

Template.listUsers.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allUsersForQuestionsGroup', Router.current().params._id);
		this.subscribe('userQuestionsForQuestionsGroup', Router.current().params._id);
	})
});

Template.listUsers.helpers({
	user() {
		return Meteor.users.find({
			'profile.questionsGroups._id': Router.current().params._id
		});
	},
	added() {
		let questionsGroup = this.profile.questionsGroups.filter((cur) => {
			return cur._id === Router.current().params._id;
		});
		return questionsGroup[0].added;
	},
	questionsGroup() {
		return this.profile.questionsGroups.filter((cur) => {
			return cur._id === Router.current().params._id
		})[0];
	},
	name() {
		return `${this.profile.firstName} ${this.profile.lastName}`;
	},
	isDone() {
		let data = this.profile.questionsGroups.filter((cur) => {
			return cur._id === Router.current().params._id
		})[0];
		if (data.nbAnswered === data.nbQuestions) {
			return true;
		} else {
			return false;
		}
	},
	currentScore() {
		let score = 0;
		if (this.profile.score) {
			score = this.profile.score[Router.current().params._id]
		}
		return score;
	}
});

Template.listUsers.events({
	'click .goSeeResult': function(event) {
		event.preventDefault();
		return Router.go('seeQuestionnaireResult', { _id: Router.current().params._id, user: this._id });
	},
})
