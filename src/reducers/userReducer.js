import constants from '../constants'
const initialState = {
	role:'normal'
}
export default (state = initialState, action) => {

	switch (action.type) {

		case constants.CURRENT_USER_RECEIVED:
			return action.data

		case constants.USER_CREATED:
			return action.data
		case constants.LOGOUT_USER:
			console.log('user logged out?',action.data)
			return {}

		default:
			return state
	}
}