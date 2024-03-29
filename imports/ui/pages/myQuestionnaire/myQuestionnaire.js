import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';
import { lodash } from 'meteor/stevezhu:lodash';
import { Router } from 'meteor/iron:router';

import { QuestionsGroups } from '../../../api/questionsGroups/schema.js';
import { UserQuestions } from '../../../api/userQuestions/schema.js';
import { Questions } from '../../../api/questions/schema.js';

import './myQuestionnaire.jade';
import '../../components/loader.jade';

Template.myQuestionnaire.onCreated(function() {
	this.autorun(() => {
		let questionnaireList = [];

		if (Meteor.userId()) {
			if (Meteor.user() !== undefined) {
				Meteor.user().profile.questionsGroups.map((cur) => {
					return questionnaireList.push(cur._id);
				});
			} else {
				return Router.go('home');
			}
		}

		this.subscribe('questionsGroupsForUser', questionnaireList);
		this.subscribe('allQuestionsForUserQuestionsGroups', questionnaireList);
		this.subscribe('userQuestionsNotAnswered', Meteor.userId());
	});
});

Template.myQuestionnaire.helpers({
	userQuestionsGroups() {
		return Meteor.user().profile.questionsGroups;
	},
	questionnaireData() {
		return QuestionsGroups.findOne({ _id: this._id }, {
			fields: {
				title: 1,
				company: 1
			}
		});
	},
	availableQuestionnaire() {
		let questionnaireList = [];
		Meteor.user().profile.questionsGroups.map((cur) => {
			if (!cur.added) {
				return questionnaireList.push(cur._id);
			}
		});
		if (questionnaireList.length) {
			return QuestionsGroups.find({ _id: { $in: questionnaireList } });
		} else {
			return false;
		}
	},
	questionsCount() {
		return Questions.find({ questionsGroupId: this._id }).count();
	},
	userHasAddedQuestionsGroups() {
		let questionnaireList = [];
		Meteor.user().profile.questionsGroups.map((cur) => {
			if (cur.added) {
				return questionnaireList.push(cur._id);
			}
		});
		if (questionnaireList.length === 0) {
			return false;
		} else {
			return true;
		}
	},
	notAnsweredQuestions() {
		return UserQuestions.find({
			userId: Meteor.userId(),
			questionsGroupId: this._id,
			answered: false
		}).count();
	},
});

Template.myQuestionnaire.events({
	'click .goSeeResult': function(event) {
		event.preventDefault();
		return Router.go('seeQuestionnaireResult', { _id: this._id, user: Meteor.userId() });
	},
	'click #addQuestionnaire': function(event) {
		event.preventDefault();
		$('#addQuestionnaire').addClass('disabled')
		const data = {
			questionsGroupId: this._id,
			userId: Meteor.userId(),
			questionsGroupIndex: lodash.findIndex(Meteor.user().profile.questionsGroups, ['_id', this._id])
		};
		return Meteor.call('addQuestionsGroupToUser', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	},
	'click #addNewQuestionnaire': function(event) {
		event.preventDefault();
		const data = {
			questionsGroupId: $('#questionnaireId').val(),
			userId: Meteor.userId()
		};
		return Meteor.call('addNewQuestionsGroupIntoProfile', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
