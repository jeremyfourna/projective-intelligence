import { Accounts } from 'meteor/accounts-base';

import { QuestionsGroups } from '../../api/questionsGroups/schema.js';

Accounts.onCreateUser((options, user) => {
	// We still want the default hook's 'profile' behavior.
	const questionsGroupExist = QuestionsGroups.findOne({
		_id: options.questionnaireId
	}, {
		fields: {
			_id: 1
		}
	});
	if (options.profile) {
		user.profile = options.profile;
		user.profile.admin = false;
	} else {
		user.profile = {
			firstName: '',
			lastName: '',
			admin: false
		};
	}
	if (questionsGroupExist) {
		user.profile.questionsGroups = [{ _id: questionsGroupExist._id, added: false }];
	} else {
		user.profile.questionsGroups = [];
	}
	return user;
});
