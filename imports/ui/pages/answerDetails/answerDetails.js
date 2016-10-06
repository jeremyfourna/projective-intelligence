import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import { Answers } from '../../../api/answers/schema.js';
import { Questions } from '../../../api/questions/schema.js';

import './answerDetails.jade';
import '../../components/loader.jade';

Template.answerDetails.onCreated(function() {
	this.autorun(() => {
		this.subscribe('anAnswer', Router.current().params._id);
		this.subscribe('allQuestionsForAnswers', Router.current().params._id);
	});
});

Template.answerDetails.helpers({
	answer() {
		return Answers.findOne({ _id: Router.current().params._id });
	},
	question() {
		return Questions.find({ questionsGroupId: this.questionsGroupId });
	}
});
