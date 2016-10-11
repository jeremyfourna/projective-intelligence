import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import { UserQuestions } from '../../../api/userQuestions/schema.js';

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
	nbQuestionsAnswered() {
		return UserQuestions.find({
			questionsGroupId: Router.current().params._id,
			userId: this._id,
			answered: true
		}).count();
	},
	nbQuestions() {
		return UserQuestions.find({
			questionsGroupId: Router.current().params._id,
			userId: this._id
		}).count();
	},
	isDone() {
		let nbQuestionsAnswered = UserQuestions.find({
			questionsGroupId: Router.current().params._id,
			userId: this._id,
			answered: true
		}).count();
		let nbQuestions = UserQuestions.find({
			questionsGroupId: Router.current().params._id,
			userId: this._id
		}).count();
		if (nbQuestionsAnswered === nbQuestions) {
			return true;
		} else {
			return false;
		}
	},
	currentScore() {
		let questionsGroupId = Router.current().params._id;
		return this.profile.score[questionsGroupId];
	}
});

Template.listUsers.events({
	'click .goSeeResult': function(event) {
		event.preventDefault();
		return Router.go('seeQuestionnaireResult', { _id: Router.current().params._id, user: this._id });
	},
})
