import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { check } from 'meteor/check';
import { Bert } from 'meteor/themeteorchef:bert';

import './signIn.jade';

Template.signIn.events({
	'click #connect': function(event) {
		event.preventDefault();
		const email = $('#signInEmail').val();
		const password = $('#singInPassword').val();
		check(email, String);
		check(password, String);
		Meteor.loginWithPassword(email, password, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
