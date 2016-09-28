import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { check } from 'meteor/check';
import { Bert } from 'meteor/themeteorchef:bert';
import { Router } from 'meteor/iron:router';

import { QuestionsGroups, questionsGroupSchema } from '../../../api/questionsGroups/schema.js';

import './newQuestionsGroup.jade';

Template.newQuestionsGroup.events({
	'click #createNewQuestionsGroup': function(event) {
		event.preventDefault();
		const data = {
			title: $('#title').val(),
			company: $('#company').val(),
			createdAt: new Date()
		};
		check(data, questionsGroupSchema);
		Meteor.call('addQuestionsGroup', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Router.go('questionsGroupDetails', { _id: result });
			}
		});
	}
});
