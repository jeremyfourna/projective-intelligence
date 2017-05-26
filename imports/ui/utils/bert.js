import { Bert } from 'meteor/themeteorchef:bert'
import R from 'ramda'

// dangerAlert :: string -> BertAlert
export function dangerAlert(message) {
	return Bert.alert(message, 'danger', 'growl-top-right')
}

// successAlert :: string -> BertAlert
export function successAlert(message) {
	return Bert.alert(message, 'success', 'growl-top-right')
}

// errorInAsyncMethod :: Either undefined | Object -> Either undefined | BertAlert
export function errorInAsyncMethod(error) {
	return R.when(R.complement(R.isNil(error)), dangerAlert(error.message))
}
