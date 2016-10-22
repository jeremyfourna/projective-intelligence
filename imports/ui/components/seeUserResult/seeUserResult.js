import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { lodash } from 'meteor/stevezhu:lodash';

import { Answers } from '../../../api/answers/schema.js';
import { UserQuestions } from '../../../api/userQuestions/schema.js';

import './seeUserResult.jade';
import '../loader.jade';

Template.seeUserResult.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allAnswersForQuestionsGroupResult', this.data.questionsGroupId);
		this.subscribe('allUserQuestionsForUser', this.data.userId, this.data.questionsGroupId);
		this.subscribe('aUser', this.data.userId);
	});
});

Template.seeUserResult.onRendered(function() {
	$(document).ready(function() {
		$('ul.tabs').tabs();
	});
});

Template.seeUserResult.helpers({
	answerLevel4() {
		return Answers.find({
			questionsGroupId: this.questionsGroupId,
			answerLevel: 4
		});
	},
	answerLevel3() {
		return Answers.find({
			questionsGroupId: this.questionsGroupId,
			answerLevel: 3
		});
	},
	answerData() {
		return Answers.findOne({ _id: this.toString() });
	},
	resultForFinalScore() {
		let parentScope = Template.instance().data;
		let pos = `profile.score.${parentScope.questionsGroupId}`;
		let score = Meteor.users.findOne({
			_id: parentScope.userId
		}, {
			fields: {
				_id: 1,
				[pos]: 1
			}
		});
		let long = UserQuestions.find({
			userId: parentScope.userId,
			questionsGroupId: parentScope.questionsGroupId
		}).count();
		let result = {
			long,
			score: score.profile.score[parentScope.questionsGroupId],
		};
		return result;
	},
	resultForAnswer() {
		let result = {
			score: 0,
			long: this.questionsIdLinked.length
		};
		let userQuestionsForResult = UserQuestions.find({
			questionId: {
				$in: this.questionsIdLinked,
			},
			answered: true,
			userId: Template.instance().data.userId
		}, {
			fields: {
				choiceSelected: 1,
				userId: 1,
				answered: true,
				questionId: 1,
				questionsGroupId: 1,
				points: 1
			}
		}).fetch();
		userQuestionsForResult.map((cur) => {
			return result.score += cur.points;
		});
		return result;
	},
	lowAnswer() {
		let minBorn = this.long;
		let highBorn = this.long * 3;
		let gap = lodash.round((highBorn - minBorn) / 3, 2);
		if (this.long === 1) {
			if (this.score === 1) {
				return true;
			} else {
				return false;
			}
		} else {
			if (this.score < minBorn + gap) {
				return true;
			} else {
				return false;
			}
		}
	},
	midAnswer() {
		let minBorn = this.long;
		let highBorn = this.long * 3;
		let gap = lodash.round((highBorn - minBorn) / 3, 2);
		if (this.long === 1) {
			if (this.score === 2) {
				return true;
			} else {
				return false;
			}
		} else {
			if (this.score < minBorn + gap * 2) {
				return true;
			} else {
				return false;
			}
		}
	},
	highAnswer() {
		let minBorn = this.long;
		let highBorn = this.long * 3;
		let gap = lodash.round((highBorn - minBorn) / 3, 2);
		if (this.long === 1) {
			if (this.score === 3) {
				return true;
			} else {
				return false;
			}
		} else {
			if (this.score > minBorn + gap * 2) {
				return true;
			} else {
				return false;
			}
		}
	},
	answerHighAnswer() {
		return Template.parentData().highAnswer;
	},
	answerMidAnswer() {
		return Template.parentData().midAnswer;
	},
	answerLowAnswer() {
		return Template.parentData().lowAnswer;
	}
});
