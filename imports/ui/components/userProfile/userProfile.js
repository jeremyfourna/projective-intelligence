import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Bert } from 'meteor/themeteorchef:bert';

import './userProfile.jade';

Template.userProfile.onRendered(function() {
	$(document).ready(function() {
		$('select').material_select();
	});
});

Template.userProfile.helpers({
	user() {
		return Meteor.user().profile;
	}
});

Template.userProfile.events({
	'click #validateProfile': function(event) {
		event.preventDefault();
		const data = {
			userId: Meteor.userId(),
			firstName: $('#firstName').val(),
			lastName: $('#lastName').val(),
			gender: $('#gender').val(),
			year: Number($('#year').val()),
			month: Number($('#month').val()),
			day: Number($('#day').val()),
			currentPosition: $('#currentPosition').val()
		};
		if (!data.firstName) {
			return Bert.alert('Votre prénom doit être renseigné', 'danger', 'growl-top-right');
		}
		if (!data.lastName) {
			return Bert.alert('Votre nom doit être renseigné', 'danger', 'growl-top-right');
		}
		if (!data.gender) {
			return Bert.alert('Votre genre doit être renseigné', 'danger', 'growl-top-right');
		}
		if (!data.year) {
			return Bert.alert('Votre année de naissance doit être renseignée', 'danger', 'growl-top-right');
		}
		if (!data.month) {
			return Bert.alert('Votre mois de naissance doit être renseigné', 'danger', 'growl-top-right');
		}
		if (!data.day) {
			return Bert.alert('Votre jour de naissance doit être renseigné', 'danger', 'growl-top-right');
		}
		if (!data.currentPosition) {
			return Bert.alert('Votre poste actuel doit être renseigné', 'danger', 'growl-top-right');
		}
		return Meteor.call('updatePersonalInfos', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
