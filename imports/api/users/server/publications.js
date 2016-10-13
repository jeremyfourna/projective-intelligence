import { Meteor } from 'meteor/meteor';

Meteor.publish('allUsersForQuestionsGroup', (questionsGroupId) => {
	return Meteor.users.find({
		'profile.questionsGroups._id': questionsGroupId
	});
});

Meteor.publish('aUser', (userId) => {
	return Meteor.users.find({
		_id: userId
	});
});
