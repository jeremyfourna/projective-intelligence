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
	user() {
		let pos = `profile.score.${Router.current().params._id}`;
		return Meteor.users.find({
			'profile.questionsGroups._id': Router.current().params._id
		}, {
			sort: {
				[pos]: -1
			}
		});
	},
	scoreMax() {
		let nbQuestions = Questions.find({}, {
			fields: {
				_id: 1
			}
		}).count();
		return nbQuestions * 3;
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
	'click #downloadCSV': function(event) {
		var nameFile = 'fileDownloaded.csv';
		Meteor.call('exportCSV', Router.current().params._id, (error, fileContent) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				let blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
				return saveAs(blob, nameFile);
			}
		});
	}
});
