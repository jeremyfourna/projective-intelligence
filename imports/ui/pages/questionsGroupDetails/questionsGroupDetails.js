import { Template } from 'meteor/templating';

import './questionsGroupDetails.jade';
import '../../components/listQuestions/listQuestions.js';

Template.questionsGroupDetails.onRendered(function() {
	$(document).ready(function() {
		$('ul.tabs').tabs();
	});
});
