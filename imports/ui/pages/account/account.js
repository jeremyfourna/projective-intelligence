import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';
import { Router } from 'meteor/iron:router';

import './account.jade';

Template.account.events({
	'click #logOut': function(event) {
		event.preventDefault();
		Meteor.logout((error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			} else {
				return Router.go('home');
			}
		});
	}
});
