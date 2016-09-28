import { Template } from 'meteor/templating';

import './header.jade';

Template.header.helpers({
	isUserAdmin() {
		return Meteor.user().profile.admin;
	}
});
