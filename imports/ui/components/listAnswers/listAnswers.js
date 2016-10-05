import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import './listAnswers.jade';
import '../loader.jade';

import { Answers } from '../../../api/answers/schema.js';

Template.listAnswers.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allAnswersForQuestionsGroup', Router.current().params._id);
	});
});

Template.listAnswers.helpers({
	answer() {
		return Answers.find({ questionsGroupId: Router.current().params._id }, {
			sort: {
				level: 1
			}
		});
	},
	myIndex(index) {
		return index + 1;
	},
});

Template.listAnswers.events({
	'click #createNewAnswer': function(event) {
		event.preventDefault();
		return Router.go('newAnswer', { _id: Router.current().params._id });
	},
	'click #addDefaultSetOfQuestions': function(event) {
		event.preventDefault();
		const data = {
			questionsGroupId: Router.current().params._id
		};
		return Meteor.call('addDefaultSetOfQuestions', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
