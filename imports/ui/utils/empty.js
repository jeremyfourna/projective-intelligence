import R from 'ramda'

export function notEmpty(data) {
	return R.complement(R.isEmpty(data))
}
