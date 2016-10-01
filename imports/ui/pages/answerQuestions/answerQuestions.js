import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';

import { UserQuestions } from '../../../api/userQuestions/schema.js';

import './answerQuestions.jade';
import '../../components/loader.jade';

Template.answerQuestions.onCreated(function() {
	this.autorun(() => {
		this.subscribe('tenQuestionAtATime', Meteor.userId());
	});
});

Template.answerQuestions.helpers({
	questionData() {
		return UserQuestions.findOne({
			userId: Meteor.userId(),
			answered: false
		}, {
			sort: {
				level: 1
			}
		});
	},
	questionTypeRadio() {
		if (this.displayType === 'qcm' || this.displayType === 'yesNo') {
			return true;
		} else {
			return false;
		}
	}
});

Template.answerQuestions.events({
	'click #validateChoice': function(event) {
		event.preventDefault();
		const data = {
			userQuestionId: this._id
		};
		if (this.displayType === 'qcm' || this.displayType === 'yesNo') {
			data.choiceSelected = $('input[name="radioChoices"]:checked').val();
		} else {
			data.choiceSelected = $('#answerForRange').val();
		}
		if (!data.choiceSelected) {
			return Bert.alert('Vous devez sélectionner une réponse', 'danger', 'growl-top-right');
		}
		Meteor.call('answerQuestion', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				$('input[name="radioChoices"]:checked').removeAttr('checked');
				$('#answerForRange').val('5');
			}
		});
	}
});
