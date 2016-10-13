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

Template.seeUserResult.helpers({
	answer() {
		return Answers.find({
			questionsGroupId: this.questionsGroupId
		}, {
			sort: {
				level: 1
			}
		});
	},
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
	answerLevel2() {
		return Answers.find({
			questionsGroupId: this.questionsGroupId,
			answerLevel: 2
		});
	},
	answerLevel1() {
		return Answers.find({
			questionsGroupId: this.questionsGroupId,
			answerLevel: 1
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
	resultForFinalScore() {
		let parentScope = Template.parentData(1);
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
	resultForLevel3() {
		console.log(this);
		let parentScope = Template.parentData(1);
		let result = {
			score: 0,
			long: 0
		};
		return result;
	},
	resultForQCMAnswer() {
		let result = {
			score: 0,
			long: this.questionsIdLinked.length
		};
		let userQuestionsForResult = UserQuestions.find({
			questionId: {
				$in: this.questionsIdLinked,
			},
			answered: true,
			userId: Template.parentData(1).userId
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
			long: this.questionsIdLinked.length
		};
		let userQuestionsForResult = UserQuestions.find({
			questionId: {
				$in: this.questionsIdLinked,
			},
			answered: true,
			userId: Template.parentData(1).userId
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
			return result.score += pointForScaleQuestion(Number(cur.choiceSelected));
		});
		return result;
	},
	resultForYesNoAnswer() {
		let result = {
			score: 0,
			long: this.questionsIdLinked.length
		};
		let userQuestionsForResult = UserQuestions.find({
			questionId: {
				$in: this.questionsIdLinked,
			},
			answered: true,
			userId: Template.parentData(1).userId
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
			return result.score += cur.pointsForChoiceSelectedQCMQuestion;
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
