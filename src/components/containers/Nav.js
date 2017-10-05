import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '../../actions'

class NavBar extends Component{
    constructor(props){
        super(props)
    }
    logout(){
        this.props.logout()
        this.props.history.push('/')
    }
    render(){
        return(
            <div className="container">

                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <span className="navbar-brand">React Project</span>
                        </div>
                        <ul className="nav navbar-nav">
                            <li> <Link to="/">All Posts</Link> </li>
                            {
                                this.props.user.role == 'admin' ? 
                                    <li> <Link to="/new">New Blog</Link> </li> : null
                            }
                            
                            
                        </ul>
                        {
                            this.props.user.role === 'admin'  ? 
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="" onClick={ this.logout.bind(this) }>Logout</Link></li>
                                </ul> : 
                                <ul className="nav navbar-nav navbar-right">
                                    <li> <Link to="/SignIn">SignIn</Link> </li>
                                    <li><Link to="/SignUp">Signup</Link></li>
                                </ul>
                        }
                        
                    </div>
                </nav>

            </div>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state
    return {
        user
    }
}
const dispatchToProps = dispatch => {
    return{
        logout: () => dispatch(actions.logoutUser())
    }
}
export default connect(mapStateToProps,dispatchToProps)(NavBar)