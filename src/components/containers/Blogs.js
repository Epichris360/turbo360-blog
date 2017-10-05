import React, { Component } from 'react'
import { connect }          from 'react-redux'
import actions              from '../../actions'
import { Link }             from 'react-router-dom'
class Blogs extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true
        }
    }
    componentDidMount(){
        console.log(this.props)
        if( this.props.blogs.length == 0 ){
            this.props.getBlogPosts()
            .then(response => {
                this.setState({loading: false})
            })
            .catch(err => {
                //console.log('ERROR: '+err.message)
            })
        }else{
            this.setState({loading:false})
        }

    }
    render(){
        const { blogs } = this.props
        return(
            <div>
                <h1>Blogs Posts</h1>
                {
                    this.state.loading ? 
                        <h1>Loading....</h1> :
                        <div>
                            {

                                <ul>
                                    {
                                        blogs.map( (b,i) =>  {
                                            return(
                                                <div key={i} style={{backgroundColor: '#ebebe0'}}>
                                                    <Link to={`/blog/${b.id}`}>
                                                        <h4>{b.title}</h4>
                                                    </Link>
                                                </div>
                                                
                                            )
                                        })
                                    }
                                </ul>

                            }
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { blogs } = state
    console.log('state',state)
    return{
        blogs
    }
}

const dispatchToProps = dispatch => {
    return{
        getBlogPosts: () => dispatch(actions.getBlogPosts())
    }
}

export default connect(mapStateToProps,dispatchToProps)(Blogs)