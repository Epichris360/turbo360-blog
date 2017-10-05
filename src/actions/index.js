import constants from '../constants'
import { TurboClient } from '../utils'

export default {

	fetchUsers: (params) => {
		return dispatch => {
			return dispatch(TurboClient.getRequest('user', params, constants.USERS_RECEIVED))
		}
	},

	addUser: (params) => {
		return dispatch => {
			return dispatch(TurboClient.postRequest('user', params, constants.USER_CREATED))
		}
	},

	loginUser: (credentials) => {
		return dispatch => {
			return dispatch(TurboClient.login(credentials, constants.CURRENT_USER_RECEIVED))
		}
	},

	logoutUser: () => {
		return dispatch => {
			return dispatch(TurboClient.logout(constants.LOGOUT_USER))
		}
	},

	currentUser: () => {
		return dispatch => {
			return dispatch(TurboClient.currentUser(constants.CURRENT_USER_RECEIVED))
		}
	},

	addBlogPost: (params) => {
		return dispatch => {
			return dispatch(TurboClient.postRequest('blog',params, constants.ADD_BLOG_POST))
		}
	},

	getBlogPosts: () => {
		return dispatch => {
			return dispatch(TurboClient.getRequest('blog',null,constants.ALL_BLOGS))
		}
	},

	updateBlogPost:(org,params) => {
		return dispatch => {
			return dispatch(TurboClient.updateRequest('blog',org,params,constants.UPDATE_BLOG))
		}
	}

	
}
