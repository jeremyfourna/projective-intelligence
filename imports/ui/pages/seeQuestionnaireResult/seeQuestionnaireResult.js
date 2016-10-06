import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { lodash } from 'meteor/stevezhu:lodash';

import { Answers } from '../../../api/answers/schema.js';
import { UserQuestions } from '../../../api/userQuestions/schema.js';

import './seeQuestionnaireResult.jade';

Template.seeQuestionnaireResult.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allAnswersForQuestionsGroupResult', Router.current().params._id);
		this.subscribe('allUserQuestionsForUser', Meteor.userId(), Router.current().params._id);
	});
});

Template.seeQuestionnaireResult.helpers({
	answer() {
		return Answers.find({
			questionsGroupId: Router.current().params._id
		}, {
			sort: {
				level: 1
			}
		});
	},
	scaleAnswer() {
		if (this.type === 'scale') {
			return true;
		} else {
			return false;
		}
	},
	yesNoAnswer() {
		if (this.type === 'yesNo') {
			return true;
		} else {
			return false;
		}
	},
	qcmAnswer() {
		if (this.type === 'qcm') {
			return true;
		} else {
			return false;
		}
	},
	resultForQCMAnswer() {
		let result = {
			score: 0,
			questionsLenght: this.questionsIdLinked.length
		};
		let userQuestionsForResult = UserQuestions.find({
			questionId: {
				$in: this.questionsIdLinked,
			},
			answered: true,
			userId: Meteor.userId()
		}, {
			fields: {
				choiceSelected: 1,
				userId: 1,
				answered: true,
				questionId: 1,
				questionsGroupId: 1,
				pointsForChoiceSelectedQCMQuestion: 1
			}
		}).fetch();
		userQuestionsForResult.map((cur) => {
			return result.score += cur.pointsForChoiceSelectedQCMQuestion;
		});
		return result;
	},
	resultForScaleAnswer() {
		function pointForScaleQuestion(choiceSelected) {
			if (choiceSelected < 4) {
				return 1;
			} else if (choiceSelected < 7) {
				return 2;
			} else {
				return 3;
			}
		}

		let result = {
			score: 0,
			questionsLenght: this.questionsIdLinked.length
		};
		let userQuestionsForResult = UserQuestions.find({
			questionId: {
				$in: this.questionsIdLinked,
			},
			answered: true,
			userId: Meteor.userId()
		}, {
			fields: {
				choiceSelected: 1,
				userId: 1,
				answered: true,
				questionId: 1,
				questionsGroupId: 1
			}
		}).fetch();
		userQuestionsForResult.map((cur) => {
			return result.score += pointForScaleQuestion(cur.choiceSelected);
		});
		return result;
	},
	resultForYesNoAnswer() {
		function pointForYesNoQuestion(choiceSelected) {
			if (choiceSelected === 'Oui') {
				return 3;
			} else if (choiceSelected === 'Non') {
				return 2;
			} else {
				return 1;
			}
		}

		let result = {
			score: 0,
			questionsLenght: this.questionsIdLinked.length
		};
		let userQuestionsForResult = UserQuestions.find({
			questionId: {
				$in: this.questionsIdLinked,
			},
			answered: true,
			userId: Meteor.userId()
		}, {
			fields: {
				choiceSelected: 1,
				userId: 1,
				answered: true,
				questionId: 1,
				questionsGroupId: 1
			}
		}).fetch();
		userQuestionsForResult.map((cur) => {
			return result.score += pointForYesNoQuestion(cur.choiceSelected);
		});
		return result;
	},
	lowAnswer() {
		let minBorn = this.questionsLenght;
		let highBorn = this.questionsLenght * 3;
		let gap = lodash.round((highBorn - minBorn) / 3, 2);
		if (this.score < minBorn + gap) {
			return true;
		} else {
			return false;
		}
	},
	midAnswer() {
		let minBorn = this.questionsLenght;
		let highBorn = this.questionsLenght * 3;
		let gap = lodash.round((highBorn - minBorn) / 3, 2);
		if (this.score < minBorn + gap * 2) {
			return true;
		} else {
			return false;
		}
	},
	highAnswer() {
		let minBorn = this.questionsLenght;
		let highBorn = this.questionsLenght * 3;
		let gap = lodash.round((highBorn - minBorn) / 3, 2);
		if (this.score > minBorn + gap * 2) {
			return true;
		} else {
			return false;
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
