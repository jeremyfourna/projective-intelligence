import { Template } from 'meteor/templating';

import './header.jade';

Template.header.onRendered(function() {
	$('.button-collapse').sideNav({
		menuWidth: 300, // Default is 240
		edge: 'right', // Choose the horizontal origin
		closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
	});
});

Template.header.helpers({
	isUserAdmin() {
		return Meteor.user().profile.admin;
	}
});
