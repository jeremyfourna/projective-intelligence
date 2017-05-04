import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';
import { Router } from 'meteor/iron:router';
import { lodash } from 'meteor/stevezhu:lodash';

import { UserQuestions } from '../../../api/userQuestions/schema.js';

import './answerQuestions.jade';
import '../../components/loader.jade';
import '../../components/userProfile/userProfile.js';

Template.answerQuestions.onCreated(function() {
	this.autorun(() => {
		this.subscribe('tenQuestionAtATime', Meteor.userId(), Router.current().params._id);
		this.subscribe('allQuestions', Router.current().params._id);
	});
});

Template.answerQuestions.helpers({
	questionLevel() {
		return this.level - 1;
	},
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
			userQuestionId: this._id,
			userId: Meteor.userId(),
			questionsGroupId: Router.current().params._id,
			displayType: this.displayType,
			questionsGroupIndex: lodash.findIndex(Meteor.user().profile.questionsGroups, ['_id', Router.current().params._id])
		};

		function pointForScaleQuestion(choiceSelected) {
			if (choiceSelected < 4) {
				return 1;
			} else if (choiceSelected < 7) {
				return 2;
			} else {
				return 3;
			}
		}

		if (this.displayType === 'scale') {
			data.choiceSelected = $('#answerForRange').val();
			data.qcmPoints = pointForScaleQuestion(Number($('#answerForRange').val()));
		} else {
			data.choiceSelected = $('input[name="radioChoices"]:checked').val();
			data.qcmPoints = Number($('input[name="radioChoices"]:checked').attr('data-points'));
		}
		if (!data.choiceSelected) {
			return Bert.alert('Vous devez sélectionner une réponse', 'danger', 'growl-top-right');
		}
		return Meteor.call('answerQuestion', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				$('input[name="radioChoices"]:checked').removeAttr('checked');
				$('#answerForRange').val('5');
			}
		});
	}
});
