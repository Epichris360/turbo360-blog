import constants from '../constants'

const blog = ( state = {}, action ) =>{
    let newState = Object.assign({}, state)
    
    switch (action.type) {
        case constants.ADD_BLOG_POST:
            newState =  action.data
            return newState
        case constants.UPDATE_BLOG:
            return ( state.id == action.data.id ) ?
                action.data : state
        default:
            return state
    }
}

// blogs
export default (state = [], action) => {
    switch (action.type){
        case constants.ADD_BLOG_POST:
            return [
                blog({},action),
                ...state
            ]

        case constants.ALL_BLOGS:
            return [...action.data]

        case constants.UPDATE_BLOG:
            return state.map(
                b => blog(b,action)
            )

        default:
            return state
    }
}