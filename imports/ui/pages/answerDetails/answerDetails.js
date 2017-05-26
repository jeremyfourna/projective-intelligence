import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Router } from 'meteor/iron:router'
import { Bert } from 'meteor/themeteorchef:bert'
import R from 'ramda'

import { Answers } from '../../../api/answers/schema.js'
import { Questions } from '../../../api/questions/schema.js'

import './answerDetails.jade'
import '../../components/loader.jade'
import { dangerAlert, errorInAsyncMethod, successAlert } from '../../utils/bert.js'

Template.answerDetails.onCreated(function() {
	this.autorun(() => {
		this.subscribe('anAnswer', Router.current().params._id)
		this.subscribe('allQuestionsForAnswers', Router.current().params._id)
		this.subscribe('allAnswers')
	})
})

Template.answerDetails.onRendered(function() {
	$('textarea').trigger('autoresize')
})

Template.answerDetails.helpers({
	answer() {
		return Answers.findOne({ _id: Router.current().params._id })
	},
	answerForGroup() {
		return R.gt(this.answerLevel, 1)
	},
	lowerLevelAnswer() {
		return Answers.find({
			answerLevel: this.answerLevel - 1,
			_id: {
				$nin: this.answersIdLinked
			}
		}, {
			sort: {
				level: 1
			},
			fields: {
				title: 1,
				level: 1
			}
		})
	},
	questionNotInAnswer() {
		return Questions.find({
			_id: {
				$nin: this.questionsIdLinked
			},
			questionsGroupId: this.questionsGroupId,
			displayType: this.type
		}, {
			sort: {
				level: 1
			},
			fields: {
				title: 1,
				level: 1
			}
		})
	},
	notYesNoAnswer() {
		return R.complement(R.equals(this.type, 'yesNo'))
	},
	answerData() {
		return Answers.findOne({
			_id: this.toString()
		}, {
			fields: {
				title: 1,
				level: 1
			}
		})
	},
	question() {
		return Questions.findOne({
			_id: this.toString()
		}, {
			fields: {
				title: 1,
				level: 1
			}
		})
	}
})

Template.answerDetails.events({
	'click #return': function(event) {
		event.preventDefault()
		return Router.go('questionsGroupDetails', { _id: this.questionsGroupId })
	},
	'click .addToAnswer': function(event) {
		event.preventDefault()
		const data = {
			answerId: Router.current().params._id,
			questionId: this._id
		}
		return Meteor.call('addQuestionToAnswer', data, errorInAsyncMethod)
	},
	'click .addToAnswersLinked': function(event) {
		event.preventDefault()
		const data = {
			answerId: Router.current().params._id,
			lowerAnswerId: this._id
		}
		return Meteor.call('addAnswerToAnswersLinked', data, errorInAsyncMethod)
	},
	'click .removeFromAnswer': function(event) {
		event.preventDefault()
		const data = {
			answerId: Router.current().params._id,
			questionId: this._id
		}
		return Meteor.call('removeQuestionFromAnswer', data, errorInAsyncMethod)
	},
	'click .removeFromAnswerLinked': function(event) {
		event.preventDefault()
		const data = {
			answerId: Router.current().params._id,
			lowerAnswerId: this._id
		}
		return Meteor.call('removeQuestionFromAnswersLinked', data, errorInAsyncMethod)
	},
	'click #updateAnswer': function(event) {
		event.preventDefault()
		const data = {
			answerId: Router.current().params._id,
			level: Number($('#level').val()),
			lowAnswer: $('#lowAnswer').val(),
			midAnswer: $('#midAnswer').val(),
			highAnswer: $('#highAnswer').val(),
			title: $('#title').val()
		}
		return Meteor.call('updateAnswer', data, (error) => {
			return R.ifElse(R.isNil(error), successAlert('Réponse mise à jour'), dangerAlert(error.message))
		})
	}
})
