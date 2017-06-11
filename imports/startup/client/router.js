import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';

// Base components/layouts
import '../../ui/layouts/layout.js';
import '../../ui/components/notFound.jade';

// Import all JS file for each page of the app

// Home page of the app
import '../../ui/pages/home/home.js';
// Administration page of the app
import '../../ui/pages/admin/admin.js';
// Page to create a new questions group aka a full questionnaire
import '../../ui/pages/newQuestionsGroup/newQuestionsGroup.js';
// Page to see all questions and answers of a questions group
import '../../ui/pages/questionsGroupDetails/questionsGroupDetails.js';
// Page to add manually a question inside a questions group
import '../../ui/pages/newQuestion/newQuestion.js';
// Page to see the question's details
import '../../ui/pages/questionDetails/questionDetails.js';
// User page where all the questionnaires are listed with the current state
import '../../ui/pages/myQuestionnaire/myQuestionnaire.js';
// User page with the account information
import '../../ui/pages/account/account.js';
// Page where the user answer a question from the questions group
import '../../ui/pages/answerQuestions/answerQuestions.js';
// Page to add manually an answer inside a questions group
import '../../ui/pages/newAnswer/newAnswer.js';
// Page to see the answer's details
import '../../ui/pages/answerDetails/answerDetails.js';
// User page to see the result of a questions group and also to download the pdf with the results
import '../../ui/pages/seeQuestionnaireResult/seeQuestionnaireResult.js';

Router.configure({
	notFoundTemplate: 'notFound'
});

// Define route URL with which template to use via the ui/pages folder

Router.route('/', {
	layoutTemplate: 'layout',
	name: 'home'
});

Router.route('/admin', function() {
	this.layout('layout');
	// Check if user is logged and if he/she has admin rights
	// If yes go to the admin page
	if (Meteor.user().profile.admin) {
		this.render('admin');
	} else { // If no redirect the user to home page
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
