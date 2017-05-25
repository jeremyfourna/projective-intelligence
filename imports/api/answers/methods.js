import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { lodash } from 'meteor/stevezhu:lodash';
import R from 'ramda'


import { Answers, answerSchema } from './schema.js';
import { Questions } from '../questions/schema.js';
import { UserQuestions } from '../userQuestions/schema.js'
import { QuestionsGroups } from '../questionsGroups/schema.js'

import { finalQuestion, higherAnswerLevel3, higherAnswerLevel2 } from './defaultAnswers.js'

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
			data.questionsIdLinked = lodash.uniq(lodash.flattenDeep(populateQuestionsIdLinked(data.answersIdLinked, [])));
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

		// Add all answer for all user questions
		questions.map((cur) => {
			const answerData = {
				questionsGroupId: data.questionsGroupId,
				createdAt: new Date(),
				level: cur.level,
				title: `Titre pour la question n°${cur.level}`,
				answerLevel: 1,
				type: cur.displayType,
				questionsIdLinked: [cur._id],
				lowAnswer: cur.lowAnswer || 'low answer',
				midAnswer: cur.midAnswer || 'mid answer',
				highAnswer: cur.highAnswer || 'high answer'
			}
			return Meteor.call('addAnswer', answerData);
		});

		// Fetch all those level 1 answer
		const answersLevel1 = Answers.find({
			answerLevel: 1,
			questionsGroupId: data.questionsGroupId
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
				lowAnswer: cur.lowAnswer || 'low answer',
				midAnswer: cur.midAnswer || 'mid answer',
				highAnswer: cur.highAnswer || 'high answer'
			};
			return Meteor.call('addAnswer', answerData);
		});

		// Fetch all those level 2 answer
		const answersLevel2 = Answers.find({
			answerLevel: 2,
			questionsGroupId: data.questionsGroupId
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
				lowAnswer: cur.lowAnswer || 'low answer',
				midAnswer: cur.midAnswer || 'mid answer',
				highAnswer: cur.highAnswer || 'high answer'
			};
			return Meteor.call('addAnswer', answerData);
		});

		// Fetch all those level 3 answer
		const answersLevel3 = Answers.find({
			answerLevel: 3,
			questionsGroupId: data.questionsGroupId
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

		return finalQuestion(data).map((cur) => {
			let answerIdList = answersLevel3.map((cur) => {
				return cur._id
			});
			cur.answersIdLinked = answerIdList;
			return Meteor.call('addAnswer', cur);
		});
	},
	resultForPDF(data) {
		const methodSchema = new SimpleSchema({
			questionsGroupId: { type: String },
			userId: { type: String }
		});
		check(data, methodSchema);

		const answersLevel3 = Answers.find({
			questionsGroupId: data.questionsGroupId,
			answerLevel: 3
		}).fetch()

		const answersLevel2 = Answers.find({
			questionsGroupId: data.questionsGroupId,
			answerLevel: 2
		}).fetch()

		const questionsGroup = QuestionsGroups.findOne({ _id: data.questionsGroupId })



		function resultForAnswer(answer) {
			function scoreToScale(result) {
				const maxScore = R.multiply(3, result.long)
				const slice = R.divide(maxScore, 5)
				return Math.ceil(result.score / slice)
			}

			function answerText(answer, result) {
				if (R.lte(result.score, 2)) {
					return answer.lowAnswer
				} else if (R.equals(result.score, 3)) {
					return answer.midAnswer
				} else {
					return answer.highAnswer
				}
			}

			const result = {
				title: answer.title,
				score: 0,
				long: answer.questionsIdLinked.length
			}
			const userQuestionsForResult = UserQuestions.find({
				questionId: {
					$in: answer.questionsIdLinked,
				},
				answered: true,
				userId: data.userId
			}, {
				fields: {
					choiceSelected: 1,
					userId: 1,
					answered: true,
					questionId: 1,
					questionsGroupId: 1,
					points: 1
				}
			}).fetch()

			userQuestionsForResult.map((cur) => {
				return result.score += cur.points
			})

			result.score = scoreToScale(result)
			result.text = answerText(answer, result)

			return result
		}

		return {
			company: questionsGroup.company,
			level3: R.map(resultForAnswer, answersLevel3),
			level2: R.map(resultForAnswer, answersLevel2)
		}
	}
});
