import { Meteor } from 'meteor/meteor';

import { QuestionsGroups } from '../schema.js';

Meteor.publish('allQuestionsGroups', () => {
	return QuestionsGroups.find({}, {
		fields: {
			title: 1,
			company: 1,
			companyPicture: 1,
			users: 1
		}
	});
});

Meteor.publish('aQuestionsGroup', (questionsGroupId) => {
	return QuestionsGroups.find({ _id: questionsGroupId });
});
