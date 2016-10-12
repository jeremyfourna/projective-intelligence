import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';

import { Answers } from '../../../api/answers/schema.js';
import { Questions } from '../../../api/questions/schema.js';

import './answerDetails.jade';
import '../../components/loader.jade';

Template.answerDetails.onCreated(function() {
	this.autorun(() => {
		this.subscribe('anAnswer', Router.current().params._id);
		this.subscribe('allQuestionsForAnswers', Router.current().params._id);
	});
});

Template.answerDetails.onRendered(function() {
	$('textarea').trigger('autoresize');
})

Template.answerDetails.helpers({
	answer() {
		return Answers.findOne({ _id: Router.current().params._id });
	},
	questionNotInAnswer() {
		return Questions.find({
			_id: {
				$nin: this.questionsIdLinked
			},
			questionsGroupId: this.questionsGroupId,
			displayType: this.type
		}, {
			sort: {
				level: 1
			},
			fields: {
				title: 1,
				level: 1
			}
		});
	},
	notYesNoAnswer() {
		if (this.type !== 'yesNo') {
			return true;
		} else {
			return false;
		}
	},
	question() {
		return Questions.findOne({
			_id: this.toString()
		}, {
			fields: {
				title: 1,
				level: 1
			}
		});
	}
});

Template.answerDetails.events({
	'click #return': function(event) {
		event.preventDefault();
		return Router.go('questionsGroupDetails', { _id: this.questionsGroupId });
	},
	'click .addToAnswer': function(event) {
		event.preventDefault();
		const data = {
			answerId: Router.current().params._id,
			questionId: this._id
		};
		Meteor.call('addQuestionToAnswer', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	},
	'click .removeFromAnswer': function(event) {
		event.preventDefault();
		const data = {
			answerId: Router.current().params._id,
			questionId: this._id
		};
		Meteor.call('removeQuestionFromAnswer', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	},
	'click #updateAnswer': function(event) {
		event.preventDefault();
		const data = {
			answerId: Router.current().params._id,
			level: Number($('#level').val()),
			lowAnswer: $('#lowAnswer').val(),
			midAnswer: $('#midAnswer').val(),
			highAnswer: $('#highAnswer').val()
		};
		Meteor.call('updateAnswer', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Bert.alert('Réponse mise à jour', 'success', 'growl-top-right');
			}
		});
	}
});
