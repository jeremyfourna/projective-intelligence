import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

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
	}
});
