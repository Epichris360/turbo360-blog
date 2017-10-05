import React, { Component } from 'react'
import { connect }          from 'react-redux'
import turbo                from 'turbo360'
import pkg                  from '../../../package.json'
import actions              from '../../actions'
const APP_ID = pkg.app || ''

class BlogShow extends Component{
    constructor(props){
        super(props)
        this.state = {
            comment:'',
            comments:[],
            loading: false
        }
    }
    
    componentDidMount(){
        turbo({site_id:APP_ID}).fetch('comments', { blog_id: this.props.match.params.id })
        .then(data => {
            this.setState({comments:[ ...data ]})
            return
        })
        .catch(err => {
            console.log('err',err)
        })
    }
    
    
    commentSubmit(){
        console.log(this.state.comment)
        if(this.state.comment != ''){
            let payload = null
            turbo({site_id:APP_ID}).create('comments', { blog_id: this.props.match.params.id, comment:this.state.comment })
            .then(data => {
                this.setState({comments:[data, ...this.state.comments]})
                //console.log('data',data)
                return
            })
            .catch(err => {
                console.log('err',err)
            })
            this.setState({comment:''})
            //console.log('comments',this.state.comments)
        }
    }
    editBlog(){
        this.props.history.push(`/blog/${this.props.match.params.id}/edit`)
    }
    render(){
        let blog = this.props.blogs.filter(blog => blog.id == this.props.match.params.id)[0]
        return(
            <div>
                <div>
                    <h1 className="panel panel-default" style={{padding:'10px'}}>{blog.title}</h1> 
                    
                    {
                        this.props.user.role == 'admin' ? 
                            <button className="btn btn-danger" onClick={ () => this.editBlog() }>Edit?</button>
                            : null

                    }
                    <hr/>
                    <div className="panel panel-default" style={{ padding:'10px' }}>
                        {
                            blog.post.split('\n').map(function(item, key) {
                                return (
                                    <span key={key}>
                                    {item}
                                    <br/>
                                    </span>
                                )
                            })
                        }
                        <br />
                        <br />
                        by {blog.author}
                    </div>
                    <hr/>
                    
                    
                    <input type="text"
                        className="form-control"
                        placeholder="Comment? Got one?"
                        onChange={ (event) => this.setState({comment: event.target.value}) }
                        value={this.state.comment}
                    /><br />
                    <button 
                        className="btn btn-success"
                        onClick={ () => this.commentSubmit() }
                    >Post It!</button>

                </div>
                <hr/>
                {
                    this.state.loading ?
                        <h1>Loading....</h1> : 
                        <div>
                            {
                                this.state.comments.map((c,i) => {
                                    return(
                                        <p style={{padding: '10px'}} key={i}
                                            className="panel panel-default"
                                        >{c.comment}</p>
                                    )
                                })
                            }
                        </div>
                        
                }
                
            </div>
        )
    }

}

const mapStateToProps = state => {
    const { blogs,user } = state
    console.log(state)
    return{
        blogs, user
    }
}



export default connect(mapStateToProps,null)(BlogShow)