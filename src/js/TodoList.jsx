import React from 'react'
import { observer, inject } from "mobx-react"

// @inject('todoStore', 'dogsStore')
@inject(stores => ({
    filter: stores.todoStore.filter,
    setFilter: stores.todoStore.setFilter,
    filteredTodos: stores.todoStore.filteredTodos,
    pushTodo: stores.todoStore.pushTodo,
    clearCompleteTodos: stores.todoStore.clearCompleteTodos,
    fetchDog: stores.dogsStore.fetchDog,
    img: stores.dogsStore.img
}))

@observer
class TodoList extends React.Component {
    search = (e) => {
        this.props.setFilter(e.target.value)
    }

    pushTodo = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            this.props.pushTodo(e.target.value)
            e.target.value = ""
        }
    }

    toggleComplete = (todo) => (e) => {
        // 이 로직은 store 쪽 으로 어떻게 분리??
        todo.isComplete = !todo.isComplete
    }

    render() {
        const { filter, filteredTodos, clearCompleteTodos, img, fetchDog } = this.props
        const todoList = filteredTodos.map(todo => (
            <li key={todo.id}>
                <input type="checkbox" value={todo.isComplete} checked={todo.isComplete} onChange={this.toggleComplete(todo)} />
                {todo.value}
            </li>
        ))

        return (
            <div>
                <h1>Todos</h1>
                <input onKeyPress={this.pushTodo} />
                Searching
                <input className="filter" value={filter} onChange={this.search} />
                {filter}
                <ul>{todoList}</ul>
                <button onClick={clearCompleteTodos}>Clear Complete</button>
                <h1>Random Dogs</h1>
                <button onClick={fetchDog}>Click here!</button>
                <img alt="dogs" src={img} />
            </div>
        )
    };
}

export default TodoList
