/*eslint no-undef: "off"*/

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/lfergon:exportcsv';

import { Questions } from '../../../api/questions/schema.js';

import './listUsers.jade';
import '../loader.jade';

Template.listUsers.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allUsersForQuestionsGroup', Router.current().params._id);
		this.subscribe('allQuestionsForCount', Router.current().params._id);
	})
});

Template.listUsers.helpers({
	// _ -> Array
	user() {
		// Get all users that aswered to this questionsGroup and sort them by score high to low
		let pos = `profile.score.${Router.current().params._id}`;
		return Meteor.users.find({ 'profile.questionsGroups._id': Router.current().params._id }, {
			sort: {
				[pos]: -1
			}
		});
	},
	// _ -> Number
	scoreMax() {
		// To know the score max possible just multiply by 3 the number of questions in a questionsGroup
		let nbQuestions = Questions.find({}, {
			fields: {
				_id: 1
			}
		}).count();
		return nbQuestions * 3;
	},
	// _ -> Boolean
	added() {
		// Filter the user's profile to know if he added the questions into his profile
		// added is a Boolean property
		let questionsGroup = this.profile.questionsGroups.filter((cur) => {
			return cur._id === Router.current().params._id;
		});
		return questionsGroup[0].added;
	},
	// _ -> Object
	// Object format
	/*
	{
		"_id" : String,
		"added" : Boolean,
		"nbAnswered" : Number,
		"nbQuestions" : Number
	}
	*/
	questionsGroup() {
		return this.profile.questionsGroups.filter((cur) => {
			return cur._id === Router.current().params._id
		})[0];
	},
	// _ -> String
	name() {
		return `${this.profile.firstName} ${this.profile.lastName}`;
	},
	// _ -> Boolean
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
	// _ -> Number
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
		return Router.go('seeQuestionnaireResult', {
			_id: Router.current().params._id,
			user: this._id
		});
	},
	'click #downloadCSV': function() {
		return Meteor.call('exportCSV', Router.current().params._id, (error, fileContent) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				let blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
				return saveAs(blob, `result_for_questionsGroup_${Router.current().params._id}.csv`);
			}
		});
	}
});
