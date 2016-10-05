import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import './newAnswer.jade';

Template.newAnswer.onRendered(function() {
	$(document).ready(function() {
		$('select').material_select();
	});
});

Template.newAnswer.events({
	'click #createNewAnswer': function(event) {
		event.preventDefault();
		const data = {
			level: Number($('#level').val()),
			type: $('#type').val(),
			questionsGroupId: Router.current().params._id,
			createdAt: new Date()
		};
		return Meteor.call('addAnswer', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Router.go('answerDetails', { _id: result });
			}
		});
	}
});
