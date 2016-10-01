import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Meteor.methods({
	addQuestionsGroupIntoUser(data) {
		let methodSchema = new SimpleSchema({
			userId: { type: String },
			questionsGroupId: { type: String }
		});
		check(data, methodSchema);
		const pos = `profile.questionsGroups.${data.questionsGroupId}`;
		console.log(pos);
		return Meteor.users.update({ _id: data.userId }, {
			$set: {
				[pos]: true
			}
		});
	}
});
