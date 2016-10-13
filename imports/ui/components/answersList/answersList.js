import { Template } from 'meteor/templating';

import './answersList.jade';

Template.answersList.helpers({
	answerForGroup() {
		if (this.answerLevel > 1) {
			return true;
		} else {
			return false;
		}
	}
});
