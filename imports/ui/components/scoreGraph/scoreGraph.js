/*eslint no-undef: "off"*/

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import 'meteor/peernohell:c3';

import './scoreGraph.jade';
import '../loader.jade';

Template.scoreGraph.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allUsersForQuestionsGroup', this.data.questionsGroupId);
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
			x: 'x',
			type: 'bar',
			columns: []
		},
		tooltip: {
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
		},
		axis: {
			x: {
				type: 'category'
			},
			rotated: true
		}
	});

	this.autorun(() => {
		const questionsGroupId = this.data.questionsGroupId
		let pos = 'profile.score.' + questionsGroupId;
		let data = Meteor.users.find({
			'profile.questionsGroups._id': questionsGroupId
		}, {
			fields: {
				[pos]: 1,
				emails: 1,
				'profile.firstName': 1,
				'profile.lastName': 1
			}
		}).fetch();
		let xList = ['x'];
		let list = ['score'];
		if (data) {
			data.sort((a, b) => {
				if (a.profile.score[questionsGroupId] < b.profile.score[questionsGroupId]) {
					return 1;
				}
				if (a.profile.score[questionsGroupId] > b.profile.score[questionsGroupId]) {
					return -1;
				}
				return 0;
			});
			data.map((cur) => {
				xList.push(`${cur.profile.firstName} ${cur.profile.lastName}`);
				list.push(cur.profile.score[questionsGroupId]);
			});
			chart.load({
				columns: [xList, list]
			});
		}
	});
});
