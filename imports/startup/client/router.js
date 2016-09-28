import { Router } from 'meteor/iron:router';

// Base components/layouts
import '../../ui/layouts/layout.js';
import '../../ui/components/notFound.jade';

// Pages
import '../../ui/pages/home/home.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/newQuestionsGroup/newQuestionsGroup.js';
import '../../ui/pages/questionsGroupDetails/questionsGroupDetails.js';

Router.configure({
	notFoundTemplate: 'notFound'
});

Router.route('/', {
	layoutTemplate: 'layout',
	name: 'home'
});

Router.route('/admin', {
	layoutTemplate: 'layout',
	name: 'admin'
});

Router.route('/admin/newQuestionsGroup', {
	layoutTemplate: 'layout',
	name: 'newQuestionsGroup'
});

Router.route('/admin/questionsGroupDetails/:_id', {
	layoutTemplate: 'layout',
	name: 'questionsGroupDetails'
});
