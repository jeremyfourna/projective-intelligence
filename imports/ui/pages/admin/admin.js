import { Template } from 'meteor/templating'

import { QuestionsGroups } from '../../../api/questionsGroups/schema.js'

import './admin.jade'
import '../../components/loader.jade'

Template.admin.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allQuestionsGroups')
	})
})

Template.admin.helpers({
	questionsGroup() {
		return QuestionsGroups.find({})
	}
})
