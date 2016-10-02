import { Template } from 'meteor/templating';

import './questionsGroupDetails.jade';
import '../../components/listQuestions/listQuestions.js';
import '../../components/loader.jade';

Template.questionsGroupDetails.onRendered(function() {
	$(document).ready(function() {
		$('ul.tabs').tabs();
	});
});
