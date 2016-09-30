import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';
import { lodash } from 'meteor/stevezhu:lodash';

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
	},
	'click #addChoice': function(event) {
		event.preventDefault();
		const data = {
			questionId: Router.current().params._id
		};
		return Meteor.call('addChoice', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	},
	'click .saveLabel': function(event) {
		event.preventDefault();
		const questionChoices = Questions.findOne({
			_id: Router.current().params._id
		}, {
			fields: {
				choices: 1
			}
		}).choices;
		const data = {
			questionId: Router.current().params._id,
			choiceId: this.choiceId,
			label: $(`#${this.choiceId}`).val(),
			choiceIndex: lodash.findIndex(questionChoices, ['choiceId', this.choiceId])
		};
		return Meteor.call('updateChoice', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Bert.alert('Label mis à jour', 'success', 'growl-top-right');
			}
		});
	},
	'click #updateQuestion': function(event) {
		event.preventDefault();
		const data = {
			questionId: Router.current().params._id,
			title: $('#title').val(),
			level: Number($('#level').val())
		};
		return Meteor.call('updateQuestion', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Bert.alert('Question mise à jour', 'success', 'growl-top-right');
			}
		});
	}
})
