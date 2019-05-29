import React from 'react'
import { observer } from "mobx-react"
import { toUnicode } from 'punycode';

@observer
class TodoList extends React.Component {
    filter = (e) => {
        this.props.store.filter = e.target.value
    }

    pushTodo = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            this.props.store.pushTodo(e.target.value)
            e.target.value = ""
        }
    }

    toggleComplete = (todo) => (e) => {
        todo.isComplete = !todo.isComplete
    }

    render() {
        const { filter, filteredTodos } = this.props.store
        const todoList = filteredTodos.map(todo => (
            <li key={todo.id}>
                <input type="checkbox" value={todo.isComplete} checked={todo.isComplete} onChange={this.toggleComplete(todo)} />
                {todo.value}
            </li>
        ))

        return (
            <div>
                <h1>todos</h1>
                <input onKeyPress={this.pushTodo} />
                Searching
                <input className="filter" value={filter} onChange={this.filter} />
                {filter}
                <ul>{todoList}</ul>
                <button onClick={this.props.store.clearCompleteTodos}>Clear Complete</button>
            </div>
        )
    };
}

export default TodoList
