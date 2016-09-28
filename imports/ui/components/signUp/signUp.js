import { Template } from 'meteor/templating';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import './signUp.jade';

Template.signUp.events({
	'click #createAccount': function(event) {
		event.preventDefault();
		const data = {
			username: $('#createPseudo').val(),
			email: $('#createEmail').val(),
			password: $('#createPassword').val()
		};
		check(data.username, String);
		check(data.email, String);
		check(data.password, String);
		Accounts.createUser(data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
