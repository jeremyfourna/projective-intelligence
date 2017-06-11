import { Accounts } from 'meteor/accounts-base';

import { QuestionsGroups } from '../../api/questionsGroups/schema.js';

// When a user register, this function is launched
Accounts.onCreateUser((options, user) => {
	// We still want the default hook's 'profile' behavior.
	// Check if the id passed via the registration form is a real questions group
	const questionsGroupExist = QuestionsGroups.findOne({
		_id: options.questionnaireId
	}, {
		fields: {
			_id: 1
		}
	});
	if (options.profile) {
		user.profile = options.profile;
		// Set user as not admin
		// Need to do it manually in the DB to be admin
		user.profile.admin = false;
	} else {
		user.profile = {
			firstName: '',
			lastName: '',
			admin: false
		};
	}
	// Questions group is real so we add it inside user's profile
	if (questionsGroupExist) {
		user.profile.questionsGroups = [{
			_id: questionsGroupExist._id,
			added: false
		}];
	} else { // If no let the user profile empty regarding questions group
		user.profile.questionsGroups = [];
	}
	return user;
});
