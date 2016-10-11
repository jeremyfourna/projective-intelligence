/*eslint no-undef: "off"*/

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import 'meteor/peernohell:c3';

import './scoreGraph.jade';

Template.listUsers.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allUsersForQuestionsGroup', Router.current().params._id);
	})
});

Template.scoreGraph.onRendered(function() {
	let chart = c3.generate({
		bindto: '#scoreGraph',
		size: {
			height: 480
		},
		legend: {
			show: false
		},
		data: {
			type: 'bar',
			columns: []
		},
		tooltip: {
			grouped: false,
			format: {
				title() {
					return 'Score du questionnaire';
				}
			}
		},
		grid: {
			y: {
				show: true
			}
		}
	});

	this.autorun(() => {
		let pos = 'profile.score.' + Router.current().params._id;
		let data = Meteor.users.find({
			'profile.questionsGroups._id': Router.current().params._id
		}, {
			fields: {
				[pos]: 1,
				emails: 1,
				'profile.firstName': 1,
				'profile.lastName': 1
			}
		}).fetch();
		let list = [];
		if (data) {
			data.map((cur) => {
				let score = 0;
				let name = `${cur.profile.firstName} ${cur.profile.lastName}`;
				if (cur.profile.score) {
					score = cur.profile.score[Router.current().params._id];
				}
				list.push([name, score]);
			});
			list.sort((a, b) => {
				if (a[0] > b[0]) {
					return 1;
				}
				if (a[0] < b[0]) {
					return -1;
				}
				return 0;
			});
			chart.load({
				columns: list
			});
		}
	});
});
