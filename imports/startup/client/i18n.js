import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Bert } from 'meteor/themeteorchef:bert';

let getUserLanguage = function() {
	// Put here the logic for determining the user language
	return 'fr';
};

if (Meteor.isClient) {
	Meteor.startup(function() {
		TAPi18n.setLanguage(getUserLanguage()).fail((error) => {
			return Bert.alert(error, 'danger', 'growl-top-right');
		});
	});
}
