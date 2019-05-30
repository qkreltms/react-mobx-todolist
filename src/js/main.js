import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import TodoList from './TodoList'
import stores from './stores'

ReactDOM.render(
    <Provider {...stores}>
        <TodoList />
    </Provider>, document.getElementById('root'))