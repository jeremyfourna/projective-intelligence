import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Questions } from './schema.js';

Meteor.methods({
	addQuestion(data) {
		const methodSchema = new SimpleSchema({
			title: { type: String },
			level: { type: Number },
			displayType: { type: String, allowedValues: ['scale', 'yesNo', 'qcm', 'qcmDefault'] },
			questionsGroupId: { type: String }
		});
		check(data, methodSchema);

		function yesNoChoices() {
			return [{
				choiceId: Random.id(),
				label: 'Oui'
			}, {
				choiceId: Random.id(),
				label: 'Non'
			}];
		}

		function qcmDefaultChoices() {
			return yesNoChoices().push({
				choiceId: Random.id(),
				label: 'Ne sais pas'
			});
		}

		function scaleChoices() {
			let arr = [];
			for (let i = 0; i < 10; i++) {
				arr.push({ choiceId: Random.id(), label: `${i + 1}` });
			}
			return arr;
		}

		data.deprecated = false;
		data.createdAt = new Date();
		data.choices = [];
		if (data.displayType === 'scale') {
			data.choices = scaleChoices();
		} else if (data.displayType === 'yesNo') {
			data.choices = yesNoChoices();
		} else if (data.displayType === 'qcmDefault') {
			data.choices = qcmDefaultChoices();
			data.displayType = 'qcm';
		}

		return Questions.insert(data);
	},
	updateQuestion(data) {
		let methodSchema = new SimpleSchema({
			ekloreQuestionId: { type: String },
			title: { type: String },
			level: { type: Number },
			deprecated: { type: Boolean }
		});
		check(data, methodSchema);
		return Questions.update({ _id: data.ekloreQuestionId }, {
			$set: {
				title: data.title,
				level: data.level,
				deprecated: data.deprecated
			},
			$inc: {
				version: 1
			}
		});
	},
	linkQuestionsGroupToQuestion(data) {
		let methodSchema = new SimpleSchema({
			questionsGroupId: { type: String },
			ekloreQuestionId: { type: String }
		});
		check(data, methodSchema);
		return Questions.update({ _id: data.ekloreQuestionId }, {
			$set: {
				questionsGroupId: data.questionsGroupId
			}
		});
	},
	unlikQuestionGroupFromQuestion(data) {
		let methodSchema = new SimpleSchema({
			ekloreQuestionId: { type: String }
		});
		check(data, methodSchema);
		return Questions.update({ _id: data.ekloreQuestionId }, {
			$unset: {
				questionsGroupId: ''
			}
		});
	},
	updateChoice(data) {
		let methodSchema = new SimpleSchema({
			label: { type: String },
			choiceId: { type: String },
			ekloreQuestionId: { type: String },
			choiceIndex: { type: Number, min: 0 }
		});
		check(data, methodSchema);
		let pos = 'choices.' + data.choiceIndex + '.label';
		return Questions.update({ _id: data.ekloreQuestionId }, {
			$set: {
				[pos]: data.label
			},
			$inc: {
				version: 1
			}
		});
	},
	addChoiceToQuestion(data) {
		let methodSchema = new SimpleSchema({
			ekloreQuestionId: { type: String }
		});
		check(data, methodSchema);
		return Questions.update({ _id: data.ekloreQuestionId }, {
			$push: {
				choices: {
					choiceId: Random.id()
				}
			}
		});
	},
	removeChoiceFromQuestion(data) {
		let methodSchema = new SimpleSchema({
			ekloreQuestionId: { type: String },
			choiceId: { type: String }
		});
		check(data, methodSchema);
		return Questions.update({ _id: data.ekloreQuestionId }, {
			$pull: {
				choices: {
					choiceId: data.choiceId
				}
			}
		});
	}
});
