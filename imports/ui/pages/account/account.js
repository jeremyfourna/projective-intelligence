import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Router } from 'meteor/iron:router'
import R from 'ramda'

import './account.jade'
import { dangerAlert } from '../../utils/bert.js'

Template.account.events({
	'click #logOut': function(event) {
		event.preventDefault()
		return Meteor.logout((error) => {
			return R.ifElse(R.isNil(error), Router.go('home'), dangerAlert(error.message))
		})
	}
})
