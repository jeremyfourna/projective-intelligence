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
			password: $('#createPassword').val(),
			questionnaireId: $('#questionnaireId').val()
		};
		const verifyPassword = $('#verifyPassword').val();
		if (data.password !== verifyPassword) {
			return Bert.alert('Les deux mots de passe ne sont pas identiques', 'danger', 'growl-top-right');
		}
		check(data.username, String);
		check(data.email, String);
		check(data.password, String);
		check(data.questionnaireId, String);
		return Accounts.createUser(data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
