import React, { Component } from 'react'
import { connect }          from 'react-redux'
import actions              from '../../actions'

class BlogEdit extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:'',
            post:''
        }
    }
    componentDidMount(){
        let blog = this.props.blogs.filter(blog => blog.id == this.props.match.params.id)[0]
        this.setState({title: blog.title})
        this.setState({post: blog.post})
    }
    updateBlog(){
        let blog = this.props.blogs.filter(blog => blog.id == this.props.match.params.id)[0]
        this.props.updateBlogPost(blog, {title:this.state.title, post:this.state.post})
        .then(result=>{
            this.props.history.push('/')
        })
        .catch(err => {
            throw err
        })
    }
    render(){
        
        return(
            <div className="container">
                <h1>Edit the Post!</h1>
                <hr/>
                <input type="text"
                    className="form-control"
                    placeholder="Title?"
                    onChange={ (e) => this.setState({title: e.target.value }) }
                    value={this.state.title}
                />
                <br/>
                <textarea className="form-control" 
                placeholder="Every blog needs some text. right?"
                cols="30" rows="15"
                onChange={ (e) => this.setState({post: e.target.value}) }
                value={this.state.post}
                ></textarea>
                <br/>
                <button 
                    className="btn btn-success"
                    onClick={ () => this.updateBlog() }
                >Submit to Turbo</button>
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { blogs } = state
    return{
        blogs
    }
}

const dispatchToProps = dispatch => {
    return{
        updateBlogPost: (org,params) => dispatch(actions.updateBlogPost(org,params))
    }
}

export default connect(mapStateToProps,dispatchToProps)(BlogEdit)