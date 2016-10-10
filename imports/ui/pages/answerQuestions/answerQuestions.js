import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';
import { Router } from 'meteor/iron:router';

import { UserQuestions } from '../../../api/userQuestions/schema.js';

import './answerQuestions.jade';
import '../../components/loader.jade';
import '../../components/userProfile/userProfile.js';

Template.answerQuestions.onCreated(function() {
	this.autorun(() => {
		this.subscribe('tenQuestionAtATime', Meteor.userId(), Router.current().params._id);
	});
});

Template.answerQuestions.helpers({
	userProfileOK() {
		let data = Meteor.user().profile;
		if (data.firstName && data.lastName && data.year && data.month && data.day && data.currentPosition && data.gender) {
			return true;
		} else {
			return false;
		}
	},
	questionData() {
		return UserQuestions.findOne({
			userId: Meteor.userId(),
			questionsGroupId: Router.current().params._id,
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
	'click #goSeeResult': function(event) {
		event.preventDefault();
		return Router.go('seeQuestionnaireResult', { _id: Router.current().params._id, user: Meteor.userId() });
	},
	'click #validateChoice': function(event) {
		event.preventDefault();
		const data = {
			userQuestionId: this._id
		};
		if (this.displayType === 'qcm') {
			data.choiceSelected = $('input[name="radioChoices"]:checked').val();
			data.qcmPoints = Number($('input[name="radioChoices"]:checked').attr('data-points'));
		} else if (this.displayType === 'yesNo') {
			data.choiceSelected = $('input[name="radioChoices"]:checked').val();
		} else if (this.displayType === 'scale') {
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
