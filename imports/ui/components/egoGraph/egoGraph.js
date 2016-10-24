/*eslint no-undef: "off"*/

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import 'meteor/peernohell:c3';

import { Answers } from '../../../api/answers/schema.js';
import { UserQuestions } from '../../../api/userQuestions/schema.js';

import './egoGraph.jade';

Template.egoGraph.onCreated(function() {
	this.autorun(() => {
		this.subscribe('egoCentreAnswer', this.data.questionsGroupId);
		this.subscribe('allUsersQuestions', this.data.questionsGroupId);
		this.subscribe('allUsersForQuestionsGroup', this.data.questionsGroupId);
	})
});

Template.egoGraph.onRendered(function() {
	let chart = c3.generate({
		bindto: '#egoGraph',
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
					return 'Score pour la partie Ego centré';
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

		function resultForAnswer(answer) {
			let resultList = [];
			let userQuestionsForResult = UserQuestions.find({
				questionId: {
					$in: answer.questionsIdLinked,
				},
				answered: true,
				questionsGroupId: answer.questionsGroupId
			}, {
				fields: {
					userId: 1,
					answered: true,
					questionId: 1,
					questionsGroupId: 1,
					points: 1
				},
				sort: {
					userId: 1
				}
			}).fetch();
			let result = {
				userId: '',
				score: 0
			};
			userQuestionsForResult.map((cur) => {
				if (!result.userId) {
					result.userId = cur.userId;
				}
				if (result.userId !== cur.userId) {
					resultList.push(result);
					result.userId = cur.userId;
					result.score = 0;
				}
				return result.score += cur.points;
			});
			return resultList;
		}

		function addNameToUserId(userIdAndScore) {
			let user = Meteor.users.findOne({ _id: userIdAndScore.userId });
			userIdAndScore.firstName = user.profile.firstName;
			userIdAndScore.lastName = user.profile.lastName;
			return userIdAndScore;
		}

		const questionsGroupId = this.data.questionsGroupId
		let answer = Answers.findOne({
			questionsGroupId,
			title: 'Ego centré'
		});
		//console.log(answer);
		let data = resultForAnswer(answer);
		data.map((cur) => {
			return addNameToUserId(cur);
		})
		let xList = ['x'];
		let list = ['score'];
		if (data) {
			data.sort((a, b) => {
				if (a.score < b.score) {
					return 1;
				}
				if (a.score > b.score) {
					return -1;
				}
				return 0;
			});
			data.map((cur) => {
				xList.push(`${cur.firstName} ${cur.lastName}`);
				list.push(cur.score);
			});
			chart.load({
				columns: [xList, list]
			});
		}
	});
});
