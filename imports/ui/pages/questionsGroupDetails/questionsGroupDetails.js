import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import './questionsGroupDetails.jade';
import '../../components/listQuestions/listQuestions.js';
import '../../components/listUsers/listUsers.js';
import '../../components/listAnswers/listAnswers.js';
import '../../components/scoreGraph/scoreGraph.js';
import '../../components/egoGraph/egoGraph.js';

Template.questionsGroupDetails.onRendered(function() {
	$(document).ready(function() {
		$('ul.tabs').tabs();
	});
});

Template.questionsGroupDetails.helpers({
	questionsGroupId() {
		return Router.current().params._id;
	}
});
