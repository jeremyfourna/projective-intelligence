import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Answers, answerSchema } from './schema.js';

Meteor.methods({
	addAnswer(data) {
		check(data, answerSchema);
		data.questionsIdLinked = [];
		return Answers.insert(data);
	}
});
