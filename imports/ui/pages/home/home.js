import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './home.jade';
import '../../components/connect/connect.js';

Template.home.helpers({
	noUser() {
		if (!Meteor.userId()) {
			return true;
		} else {
			return false;
		}
	}
});
