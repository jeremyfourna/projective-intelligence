import { Template } from 'meteor/templating';

import './questionsGroupDetails.jade';
import '../../components/listQuestions/listQuestions.js';
import '../../components/listUsers/listUsers.js';
import '../../components/listAnswers/listAnswers.js';
import '../../components/scoreGraph/scoreGraph.js';

Template.questionsGroupDetails.onRendered(function() {
	$(document).ready(function() {
		$('ul.tabs').tabs();
	});
});
