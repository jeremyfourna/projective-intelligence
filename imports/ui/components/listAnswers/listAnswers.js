import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import './listAnswers.jade';
import '../answersList/answersList.js';
import '../loader.jade';

import { Answers } from '../../../api/answers/schema.js';

Template.listAnswers.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allAnswersForQuestionsGroup', Router.current().params._id);
	});
});

Template.listAnswers.helpers({
	answerLevel4() {
		return Answers.find({
			questionsGroupId: Router.current().params._id,
			answerLevel: 4
		}, {
			sort: {
				level: 1
			}
		});
	},
	answerLevel3() {
		return Answers.find({
			questionsGroupId: Router.current().params._id,
			answerLevel: 3
		}, {
			sort: {
				level: 1
			}
		});
	},
	answerLevel2() {
		return Answers.find({
			questionsGroupId: Router.current().params._id,
			answerLevel: 2
		}, {
			sort: {
				level: 1
			}
		});
	},
	answerLevel1() {
		return Answers.find({
			questionsGroupId: Router.current().params._id,
			answerLevel: 1
		}, {
			sort: {
				level: 1
			}
		});
	}
});

Template.listAnswers.events({
	'click #createNewAnswer': function(event) {
		event.preventDefault();
		return Router.go('newAnswer', { _id: Router.current().params._id });
	},
	'click #addDefaultSetOfAnswers': function(event) {
		event.preventDefault();
		const data = {
			questionsGroupId: Router.current().params._id
		};
		return Meteor.call('addDefaultSetOfAnswers', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
