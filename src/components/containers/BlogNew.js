import React, { Component } from 'react'
import { connect }          from 'react-redux'
import actions              from '../../actions'

class BlogNew extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:"",
            post:""
        }
    }
    submitBlog(){
        const { title,post } = this.state
        const params = { title, post, author:this.props.user.username }
        this.props.addBlogPost(params)
		.then(response => {
            console.log('LOGIN: '+JSON.stringify(response))
            this.props.history.push('/')
		})
		.catch(err => {
			alert(err.message)
        })
        
    }
    render(){
        return(
            <div className="container">
                <h1>Create a new Turbo Blog</h1>
                <hr/>
                <input type="text"
                    className="form-control"
                    placeholder="Title?"
                    onChange={ (e) => this.setState({title: e.target.value }) }
                />
                <br/>
                <textarea className="form-control" 
                placeholder="Every blog needs some text. right?"
                cols="30" rows="15"
                onChange={ (e) => this.setState({post: e.target.value}) }></textarea>
                <br/>
                <button 
                    className="btn btn-success"
                    onClick={ () => this.submitBlog() }
                >Submit to Turbo</button>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state
    return{
        user
    }
}

const dispatchToProps = (dispatch) => {
    return {
        addBlogPost: (params) => dispatch(actions.addBlogPost(params))
    }
}


export default connect(mapStateToProps,dispatchToProps)(BlogNew)

