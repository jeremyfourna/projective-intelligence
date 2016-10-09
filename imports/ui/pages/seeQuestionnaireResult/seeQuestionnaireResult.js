import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import './seeQuestionnaireResult.jade';
import '../../components/seeUserResult/seeUserResult.js';

Template.seeQuestionnaireResult.helpers({
	questionsGroupId() {
		return Router.current().params._id;
	},
	userId() {
		return Router.current().params.user;
	}
})
