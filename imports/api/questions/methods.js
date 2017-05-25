import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Random } from 'meteor/random'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { Questions, choiceSchema } from './schema.js'
import { questions } from './defaultQuestions.js'

Meteor.methods({
	addQuestion(data) {
		const methodSchema = new SimpleSchema({
			title: { type: String },
			level: { type: Number },
			displayType: { type: String, allowedValues: ['scale', 'yesNo', 'qcm', 'qcmDefault'] },
			questionsGroupId: { type: String },
			choices: { type: [choiceSchema], optional: true, min: 2 }
		})
		check(data, methodSchema)

		function yesNoChoices() {
			return [{
				choiceId: Random.id(),
				label: 'Oui',
				qcmPoints: 3
			}, {
				choiceId: Random.id(),
				label: 'Non',
				qcmPoints: 2
			}]
		}

		function qcmDefaultChoices() {
			let data = yesNoChoices()
			data.push({
				choiceId: Random.id(),
				label: 'Ne sais pas',
				qcmPoints: 1
			})
			return data
		}

		function scaleChoices() {
			let arr = []
			for (let i = 0; i < 10; i++) {
				arr.push({ choiceId: Random.id(), label: `${i + 1}` })
			}
			return arr
		}

		data.createdAt = new Date()
		if (!data.choices) {
			data.choices = []
			if (data.displayType === 'scale') {
				data.choices = scaleChoices()
			} else if (data.displayType === 'yesNo') {
				data.choices = yesNoChoices()
			} else if (data.displayType === 'qcmDefault') {
				data.choices = qcmDefaultChoices()
				data.displayType = 'qcm'
			}
		}

		return Questions.insert(data)
	},
	updateQuestion(data) {
		const methodSchema = new SimpleSchema({
			questionId: { type: String },
			title: { type: String },
			level: { type: Number, min: 0 }
		})
		check(data, methodSchema)
		return Questions.update({ _id: data.questionId }, {
			$set: {
				title: data.title,
				level: data.level,
			}
		})
	},
	addChoice(data) {
		const methodSchema = new SimpleSchema({
			questionId: { type: String }
		})
		check(data, methodSchema)
		return Questions.update({ _id: data.questionId }, {
			$push: {
				choices: {
					choiceId: Random.id()
				}
			}
		})
	},
	updateChoice(data) {
		const methodSchema = new SimpleSchema({
			label: { type: String },
			choiceId: { type: String },
			questionId: { type: String },
			qcmPoints: { type: Number, min: 1, max: 3, optional: true },
			choiceIndex: { type: Number, min: 0 }
		})
		check(data, methodSchema)
		let pos = 'choices.' + data.choiceIndex + '.label'
		let pos1 = 'choices.' + data.choiceIndex + '.qcmPoints'
		return Questions.update({ _id: data.questionId }, {
			$set: {
				[pos]: data.label,
				[pos1]: data.qcmPoints
			}
		})
	},
	removeChoiceFromQuestion(data) {
		const methodSchema = new SimpleSchema({
			questionId: { type: String },
			choiceId: { type: String }
		})
		check(data, methodSchema)
		return Questions.update({ _id: data.ekloreQuestionId }, {
			$pull: {
				choices: {
					choiceId: data.choiceId
				}
			}
		})
	},
	addDefaultSetOfQuestions(data) {
		const methodSchema = new SimpleSchema({
			questionsGroupId: { type: String }
		})
		check(data, methodSchema)

		return questions.map((cur) => {
			cur.questionsGroupId = data.questionsGroupId
			return Meteor.call('addQuestion', cur)
		})
	}
})
