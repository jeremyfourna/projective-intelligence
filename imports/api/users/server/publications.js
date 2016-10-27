import { Meteor } from 'meteor/meteor';

Meteor.publish('allUsersForQuestionsGroup', (questionsGroupId) => {
	let pos = `profile.score.${questionsGroupId}`;
	return Meteor.users.find({
		'profile.questionsGroups._id': questionsGroupId
	}, {
		sort: {
			[pos]: -1
		}
	});
});

Meteor.publish('aUser', (userId) => {
	return Meteor.users.find({
		_id: userId
	});
});
