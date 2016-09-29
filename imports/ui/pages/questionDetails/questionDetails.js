import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import { Questions } from '../../../api/questions/schema.js';

import './questionDetails.jade';

Template.questionDetails.onCreated(function() {
	this.autorun(() => {
		this.subscribe('aQuestion', Router.current().params._id);
	});
});

Template.questionDetails.helpers({
	question() {
		return Questions.findOne({ _id: Router.current().params._id });
	}
});

Template.questionDetails.events({
	'click #return': function(event) {
		event.preventDefault();
		return Router.go('questionsGroupDetails', { _id: this.questionsGroupId });
	}
})
