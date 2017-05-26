import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Bert } from 'meteor/themeteorchef:bert'
import { Router } from 'meteor/iron:router'
import { lodash } from 'meteor/stevezhu:lodash'
import R from 'ramda'

import { UserQuestions } from '../../../api/userQuestions/schema.js'

import './answerQuestions.jade'
import '../../components/loader.jade'
import '../../components/userProfile/userProfile.js'
import { notEmpty } from '../../utils/empty.js'

Template.answerQuestions.onCreated(function() {
	this.autorun(() => {
		this.subscribe('tenQuestionAtATime', Meteor.userId(), Router.current().params._id)
	})
})

Template.answerQuestions.helpers({
	questionLevel() {
		return R.dec(this.level)
	},
	userProfileOK() {
		let data = Meteor.user().profile
		return R.allPass([
			notEmpty(R.prop('firstName')),
			notEmpty(R.prop('lastName')),
			notEmpty(R.prop('year')),
			notEmpty(R.prop('month')),
			notEmpty(R.prop('currentPosition')),
			notEmpty(R.prop('gender')),
		], data)
	},
	questionData() {
		return UserQuestions.findOne({
			userId: Meteor.userId(),
			questionsGroupId: Router.current().params._id,
			answered: false
		}, {
			sort: {
				level: 1
			}
		})
	},
	questionTypeRadio() {
		return R.either(R.equals(this.displayType, 'qcm'), R.equals(this.displayType, 'yesNo'))
	}
})

Template.answerQuestions.events({
	'click #goSeeResult': function(event) {
		event.preventDefault()
		return Router.go('seeQuestionnaireResult', { _id: Router.current().params._id, user: Meteor.userId() })
	},
	'click #validateChoice': function(event) {
		event.preventDefault()
		const data = {
			userQuestionId: this._id,
			userId: Meteor.userId(),
			questionsGroupId: Router.current().params._id,
			displayType: this.displayType,
			questionsGroupIndex: lodash.findIndex(Meteor.user().profile.questionsGroups, ['_id', Router.current().params._id])
		}

		function pointForScaleQuestion(choiceSelected) {
			return R.cond([
				R.lt(choiceSelected, 4), R.always(1),
				R.lt(choiceSelected, 7), R.always(2),
				R.T(), R.always(3)
			])
		}

		if (R.equals(this.displayType, 'scale')) {
			data.choiceSelected = $('#answerForRange').val()
			data.qcmPoints = pointForScaleQuestion(Number($('#answerForRange').val()))
		} else {
			data.choiceSelected = $('input[name="radioChoices"]:checked').val()
			data.qcmPoints = Number($('input[name="radioChoices"]:checked').attr('data-points'))
		}
		if (!data.choiceSelected) {
			return Bert.alert('Vous devez sélectionner une réponse', 'danger', 'growl-top-right')
		}
		return Meteor.call('answerQuestion', data, (error) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right')
			} else {
				$('input[name="radioChoices"]:checked').removeAttr('checked')
				$('#answerForRange').val('5')
			}
		})
	}
})
