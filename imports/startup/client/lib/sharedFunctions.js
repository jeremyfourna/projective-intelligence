import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Match } from 'meteor/check';

const UniverseSchema = new SimpleSchema({
	universeId: { type: String },
	matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 }
});

const WorkshopSchema = new SimpleSchema({
	workshopId: { type: String },
	matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 }
});

const ChoiceSchema = new SimpleSchema({
	choiceId: { type: String },
	label: { type: String },
	universesLinked: { type: [UniverseSchema], minCount: 1 },
	workshopsLinked: { type: [WorkshopSchema], minCount: 1 }
});

export const validateScaleEkloreQuestion = function(data) {
	const scaleUserQuestionSchema = new SimpleSchema({
		_id: { type: String },
		questionId: { type: String },
		level: { type: Number, min: 1, optional: true },
		choices: { type: [ChoiceSchema], minCount: 10, maxCount: 10 },
		deprecated: { type: Boolean },
		universesLinked: { type: [UniverseSchema], minCount: 1 },
		workshopsLinked: { type: [WorkshopSchema], minCount: 1 },
		displayType: { type: String, allowedValues: ['scale'] },
		title: { type: String },
		version: { type: Number, min: 1 }
	});
	return Match.test(data, scaleUserQuestionSchema);
};

export const validateChoiceEkloreQuestion = function(data) {
	return Match.test(data, ChoiceSchema);
};

export const validateYesNoEkloreQuestion = function(data) {
	const yesNoUserQuestionSchema = new SimpleSchema({
		_id: { type: String },
		questionId: { type: String },
		level: { type: Number, min: 1, optional: true },
		choices: { type: [ChoiceSchema], minCount: 2, maxCount: 2 },
		deprecated: { type: Boolean },
		universesLinked: { type: [UniverseSchema], minCount: 1 },
		workshopsLinked: { type: [WorkshopSchema], minCount: 1 },
		displayType: { type: String, allowedValues: ['yesNo'] },
		title: { type: String },
		version: { type: Number, min: 1 }
	});
	return Match.test(data, yesNoUserQuestionSchema);
};

export const validateQcmEkloreQuestion = function(data) {
	const qcmUserQuestionSchema = new SimpleSchema({
		_id: { type: String },
		questionId: { type: String },
		level: { type: Number, min: 1, optional: true },
		choices: { type: [ChoiceSchema], minCount: 3 },
		deprecated: { type: Boolean },
		universesLinked: { type: [UniverseSchema], minCount: 1 },
		workshopsLinked: { type: [WorkshopSchema], minCount: 1 },
		displayType: { type: String, allowedValues: ['qcm'] },
		title: { type: String },
		version: { type: Number, min: 1 }
	});
	return Match.test(data, qcmUserQuestionSchema);
};
