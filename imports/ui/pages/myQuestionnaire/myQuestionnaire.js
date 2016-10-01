import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';

import { QuestionsGroups } from '../../../api/questionsGroups/schema.js';
import { Questions } from '../../../api/questions/schema.js';

import './myQuestionnaire.jade';

Template.myQuestionnaire.onCreated(function() {
	this.autorun(() => {
		let questionnaireList = [];
		Meteor.user().profile.questionsGroups.map((cur) => {
			if (!cur.added) {
				return questionnaireList.push(cur._id);
			}
		});
		this.subscribe('questionsGroupsForUser', questionnaireList);
		this.subscribe('allQuestionsForUserQuestionsGroups', questionnaireList);
	});
});

Template.myQuestionnaire.helpers({
	availableQuestionnaire() {
		let questionnaireList = [];
		Meteor.user().profile.questionsGroups.map((cur) => {
			if (!cur.added) {
				return questionnaireList.push(cur._id);
			}
		});
		return QuestionsGroups.find({ _id: { $in: questionnaireList } });
	},
	questionsCount() {
		return Questions.find({ questionsGroupId: this._id }).count();
	}
});

Template.myQuestionnaire.events({
	'click #addQuestionnaire': function(event) {
		event.preventDefault();
		const data = {
			questionsGroupId: this._id,
			userId: Meteor.userId()
		};
		return Meteor.call('addQuestionsGroupToUser', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
