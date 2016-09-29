import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import './newQuestion.jade';

Template.newQuestion.onRendered(function() {
	$(document).ready(function() {
		$('select').material_select();
	});
});

Template.newQuestion.events({
	'click #createNewQuestion': function(event) {
		event.preventDefault();
		const data = {
			title: $('#title').val(),
			level: Number($('#level').val()),
			displayType: $('#displayType').val(),
			questionsGroupId: Router.current().params._id
		};
		return Meteor.call('addQuestion', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Router.go('questionDetails', { _id: result });
			}
		});
	}
});
