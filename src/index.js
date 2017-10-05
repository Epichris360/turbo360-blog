import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './stores'
import { Provider } from 'react-redux'
import Intro from './components/presentation/Intro'
import { BlogNew, Blogs, BlogShow, Nav, BlogEdit, SignIn, SignUp, Todo } from './components/containers'
import { Switch, BrowserRouter as Router, Route  } from 'react-router-dom'

const app = (
	<Provider store={store.configure(null)}>
		<Router>
            <div>
            	<Nav />
				<div className="container">
					<Switch>
						<Route exact path="/" component={Blogs} />
						<Route path='/new' component={BlogNew} />
						<Route exact path="/blog/:id" component={BlogShow} />
						<Route path="/blog/:id/edit" component={BlogEdit} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
					</Switch>
				</div>
			</div>
		</Router>
	</Provider>
)


ReactDOM.render(app, document.getElementById('root'))