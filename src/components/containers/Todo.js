import React, { Component } from 'react'

class Todo extends Component{

    constructor(props){
        super(props)
        this.state = {
            text:'',
            todos:[]
        }
    }

    addToDo(){
        if(this.state.text != ''){
            this.setState({todos: [{text:this.state.text, timestamp:new Date().toString(), state:''}, ...this.state.todos] })
            this.setState({text: ''})
        }
    }

    removeToDo(t){
        let todos = this.state.todos.filter( todo => todo != t )
        this.setState({todos:todos})
    }

    orderByDate(){
        let todos = this.state.todos.sort( (a,b) => {
            return a.timestamp < b.timestamp
        })
        this.setState({todos})
    }

    orderByText(){
        let todos = this.state.todos.sort( (a,b) => {
            return a.text > b.text
        })
        this.setState({todos}) 
    }

    todoState(todo, todoState){
        todo.state = todoState
        let todos = this.state.todos.map( (t,i) => {
            return todo.text == t.text ? todo : t
        })
        this.setState({todos})
    }

    changeText(e){
        this.setState({text: e.target.value})
        console.log('e.key',e.key)
    }

    render(){
        return(
            <div>
                <h1>Todos!</h1>
                {
                    this.state.todos.length > 0 ? 
                        <div>
                            <button 
                                onClick={this.orderByDate.bind(this)}
                                className="btn btn-default"
                            >Order By Date</button>
                            <button 
                                onClick={this.orderByText.bind(this)}
                                className="btn btn-default"
                            >Order By Name</button>
                        </div> : null
                }
                <hr/>
                {
                    this.state.todos.length > 0 ? 
                        <ul>
                            {
                                this.state.todos.map( (t,i) => {
                                    return <div key={i}>
                                        <li style={{ listStyle:'none' }}>
                                            {t.text + "  "}
                                                {
                                                    t.state == '' ? 
                                                        <button 
                                                            className="btn btn-xs btn-success" 
                                                            onClick={ this.todoState.bind(this, t, 'start') }
                                                        >
                                                            Start
                                                        </button> : t.state == 'start' ? 
                                                            <button 
                                                                className="btn btn-xs btn-danger"
                                                                onClick={ this.todoState.bind(this,t,'Finished') }
                                                            >
                                                                Finished
                                                            </button>  : <button 
                                                                            className="btn btn-xs btn-danger"
                                                                            onClick={ this.removeToDo.bind(this,t) }
                                                                        >X</button>
                                                }
                                        </li>
                                        
                                    </div>
                                }) 
                            }
                        </ul> :null 
                }
                <input type="text"
                    className="form-control"
                    onChange={ e =>  this.changeText(e) }
                    value={ this.state.text }
                />
                <button 
                    onClick={ () => this.addToDo() } 
                    className="btn btn-success"
                    style={{marginTop:'10px'}}
                >
                    Add To List!
                </button>

                <button onClick={ () => { console.log('state',this.state) } }>
                    State?
                </button>

            </div>
        )
    }
}


export default Todo