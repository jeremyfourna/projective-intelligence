import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';

// Base components/layouts
import '../../ui/layouts/layout.js';
import '../../ui/components/notFound.jade';

// Pages
import '../../ui/pages/home/home.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/newQuestionsGroup/newQuestionsGroup.js';
import '../../ui/pages/questionsGroupDetails/questionsGroupDetails.js';
import '../../ui/pages/newQuestion/newQuestion.js';
import '../../ui/pages/questionDetails/questionDetails.js';
import '../../ui/pages/myQuestionnaire/myQuestionnaire.js';
import '../../ui/pages/account/account.js';
import '../../ui/pages/answerQuestions/answerQuestions.js';
import '../../ui/pages/newAnswer/newAnswer.js';
import '../../ui/pages/answerDetails/answerDetails.js';
import '../../ui/pages/seeQuestionnaireResult/seeQuestionnaireResult.js';

Router.configure({
	notFoundTemplate: 'notFound'
});

Router.route('/', {
	layoutTemplate: 'layout',
	name: 'home'
});

Router.route('/admin', function() {
	this.layout('layout');
	if (Meteor.user().profile.admin) {
		this.render('admin');
	} else {
		this.redirect('/');
	}
});

Router.route('/admin/newQuestionsGroup', {
	layoutTemplate: 'layout',
	name: 'newQuestionsGroup'
});

Router.route('/admin/questionsGroupDetails/:_id', {
	layoutTemplate: 'layout',
	name: 'questionsGroupDetails'
});

Router.route('/admin/questionsGroupDetails/:_id/newQuestion', {
	layoutTemplate: 'layout',
	name: 'newQuestion'
});

Router.route('admin/questionsGroupDetails/:_id/newAnswer', {
	layoutTemplate: 'layout',
	name: 'newAnswer'
});

Router.route('/admin/questionDetails/:_id', {
	layoutTemplate: 'layout',
	name: 'questionDetails'
});

Router.route('/admin/answerDetails/:_id', {
	layoutTemplate: 'layout',
	name: 'answerDetails'
});

Router.route('/myQuestionnaire', {
	layoutTemplate: 'layout',
	name: 'myQuestionnaire'
});

Router.route('/account', {
	layoutTemplate: 'layout',
	name: 'account'
});

Router.route('/answerQuestions/:_id', {
	layoutTemplate: 'layout',
	name: 'answerQuestions'
});

Router.route('/seeQuestionnaireResult/:_id/:user', {
	layoutTemplate: 'layout',
	name: 'seeQuestionnaireResult'
});
