import { Meteor } from 'meteor/meteor';

Meteor.publish('allUsersForQuestionsGroup', (questionsGroupId) => {
	return Meteor.users.find({
		'profile.questionsGroups._id': questionsGroupId
	});
});
