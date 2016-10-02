import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import { Questions } from '../../../api/questions/schema.js';

import './listQuestions.jade';

Template.listQuestions.onCreated(function() {
	this.autorun(() => {
		this.subscribe('questionsLinkedToQuestionsGroup', Router.current().params._id);
	});
});

Template.listQuestions.helpers({
	question() {
		return Questions.find({ questionsGroupId: Router.current().params._id }, {
			sort: {
				level: 1
			}
		});
	}
});

Template.listQuestions.events({
	'click #createNewQuestion': function(event) {
		event.preventDefault();
		return Router.go('newQuestion', { _id: Router.current().params._id });
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
