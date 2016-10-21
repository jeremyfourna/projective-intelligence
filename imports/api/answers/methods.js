import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { lodash } from 'meteor/stevezhu:lodash';

import { Answers, answerSchema } from './schema.js';
import { Questions } from '../questions/schema.js';

Meteor.methods({
	addAnswer(data) {

		function populateQuestionsIdLinked(arrayOfAnswersId, arrayOfQuestionsId) {
			if (arrayOfAnswersId.length === 0) {
				return arrayOfQuestionsId;
			} else {
				let answersIdList = Answers.find({
					_id: {
						$in: arrayOfAnswersId
					}
				}, {
					fields: {
						_id: 1,
						questionsIdLinked: 1,
						answersIdLinked: 1
					}
				}).fetch();
				return answersIdList.map((cur) => {
					return populateQuestionsIdLinked(cur.answersIdLinked, cur.questionsIdLinked);
				});
			}
		}

		check(data, answerSchema);
		if (!data.questionsIdLinked) {
			data.questionsIdLinked = [];
		}
		if (!data.answersIdLinked) {
			data.answersIdLinked = [];
		} else {


			data.questionsIdLinked = lodash.flattenDeep(populateQuestionsIdLinked(data.answersIdLinked, []));
		}
		return Answers.insert(data);
	},
	addQuestionToAnswer(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			questionId: { type: String }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$addToSet: {
				questionsIdLinked: data.questionId
			}
		});
	},
	addAnswerToAnswersLinked(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			lowerAnswerId: { type: String }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$addToSet: {
				answersIdLinked: data.lowerAnswerId
			}
		});
	},
	removeQuestionFromAnswer(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			questionId: { type: String }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$pull: {
				questionsIdLinked: data.questionId
			}
		});
	},
	removeQuestionFromAnswersLinked(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			lowerAnswerId: { type: String }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$pull: {
				answersIdLinked: data.lowerAnswerId
			}
		});
	},
	updateAnswer(data) {
		let methodSchema = new SimpleSchema({
			answerId: { type: String },
			level: { type: Number, min: 1 },
			lowAnswer: { type: String },
			midAnswer: { type: String, optional: true },
			highAnswer: { type: String },
			title: { type: String, optional: true }
		});
		check(data, methodSchema);
		return Answers.update({ _id: data.answerId }, {
			$set: {
				level: data.level,
				lowAnswer: data.lowAnswer,
				midAnswer: data.midAnswer,
				highAnswer: data.highAnswer,
				title: data.title
			}
		});
	},
	addDefaultSetOfAnswers(data) {
		const methodSchema = new SimpleSchema({
			questionsGroupId: { type: String }
		});
		check(data, methodSchema);
		const questions = Questions.find({
			questionsGroupId: data.questionsGroupId
		}, {
			fields: {
				_id: 1,
				level: 1,
				displayType: 1
			},
			sort: {
				level: 1
			}
		}).fetch();

		if (questions.length !== 81) {
			throw new Meteor.Error(500, 'Erreur 500 : Le set de réponse par défaut ne convient pas aux questions de ce groupe de questions', 'Le set de réponse par défaut ne convient pas aux questions de ce groupe de questions');
		}

		questions.map((cur) => {
			let answerData = {
				questionsGroupId: data.questionsGroupId,
				createdAt: new Date(),
				level: cur.level,
				title: `Titre pour la question n°${cur.level}`,
				answerLevel: 1,
				type: cur.displayType,
				questionsIdLinked: [cur._id],
				lowAnswer: 'low answer',
				midAnswer: 'mid answer',
				highAnswer: 'high answer'
			}
			return Meteor.call('addAnswer', answerData);
		});

		let higherAnswerLevel2 = [{
			title: 'Aptitudes',
			lowQuestion: 2,
			topQuestion: 20
		}, {
			title: 'Compétences',
			lowQuestion: 21,
			topQuestion: 32
		}, {
			title: 'Motivations',
			lowQuestion: 37,
			topQuestion: 54
		}, {
			title: 'Joie et Talents',
			lowQuestion: 33,
			topQuestion: 36
		}, {
			title: 'Territoire',
			lowQuestion: 55,
			topQuestion: 58
		}, {
			title: 'Travailler ensemble',
			lowQuestion: 59,
			topQuestion: 61
		}, {
			title: 'Stratégie',
			lowQuestion: 62,
			topQuestion: 65
		}, {
			title: 'Vicariance',
			lowQuestion: 66,
			topQuestion: 75
		}, {
			title: 'Empathie',
			lowQuestion: 76,
			topQuestion: 78
		}, {
			title: 'Sentiment d\'Efficacité Personnel et Estime de Soi',
			lowQuestion: 79,
			topQuestion: 82
		}];

		const answersLevel1 = Answers.find({
			answerLevel: 1
		}, {
			fields: {
				_id: 1,
				answerLevel: 1,
				level: 1
			},
			sort: {
				level: 1
			}
		}).fetch();

		higherAnswerLevel2.map((cur, index) => {
			let answerList = answersLevel1.filter((cur1) => {
				return cur1.level >= cur.lowQuestion && cur1.level <= cur.topQuestion;
			});
			let answerIdList = answerList.map((cur) => {
				return cur._id
			});
			let answerData = {
				title: cur.title,
				level: index + 1,
				answerLevel: 2,
				answersIdLinked: answerIdList,
				questionsGroupId: data.questionsGroupId,
				createdAt: new Date(),
				lowAnswer: 'low answer',
				midAnswer: 'mid answer',
				highAnswer: 'high answer'
			};
			return Meteor.call('addAnswer', answerData);
		});

		let higherAnswerLevel3 = [{
			title: 'Ego centré',
			lowQuestion: 1,
			topQuestion: 4
		}, {
			title: 'Allo centré',
			lowQuestion: 5,
			topQuestion: 7
		}, {
			title: 'Intelligence Projective',
			lowQuestion: 8,
			topQuestion: 10
		}];

		const answersLevel2 = Answers.find({
			answerLevel: 2
		}, {
			fields: {
				_id: 1,
				answerLevel: 1,
				level: 1
			},
			sort: {
				level: 1
			}
		}).fetch();

		higherAnswerLevel3.map((cur, index) => {
			let answerList = answersLevel2.filter((cur1) => {
				return cur1.level >= cur.lowQuestion && cur1.level <= cur.topQuestion;
			});
			let answerIdList = answerList.map((cur) => {
				return cur._id
			});
			let answerData = {
				title: cur.title,
				level: index + 1,
				answerLevel: 3,
				answersIdLinked: answerIdList,
				questionsGroupId: data.questionsGroupId,
				createdAt: new Date(),
				lowAnswer: 'low answer',
				midAnswer: 'mid answer',
				highAnswer: 'high answer'
			};
			return Meteor.call('addAnswer', answerData);
		});

		let finalQuestion = [{
			title: 'Résultat final',
			level: 1,
			answerLevel: 4,
			createdAt: new Date(),
			questionsGroupId: data.questionsGroupId,
			lowAnswer: 'low answer',
			midAnswer: 'mid answer',
			highAnswer: 'high answer'
		}];

		const answersLevel3 = Answers.find({
			answerLevel: 3
		}, {
			fields: {
				_id: 1,
				answerLevel: 1,
				level: 1
			},
			sort: {
				level: 1
			}
		}).fetch();

		return finalQuestion.map((cur) => {
			let answerIdList = answersLevel3.map((cur) => {
				return cur._id
			});
			cur.answersIdLinked = answerIdList;
			return Meteor.call('addAnswer', cur);
		});
	}
});
