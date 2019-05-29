import { computed, observable, autorun, values } from 'mobx'

// Object
class Todo {
    @observable value
    @observable id
    @observable isComplete

    constructor(value = "") {
        this.value = value
        this.id = Date.now()
        this.isComplete = false
    }
}

class TodoStore {
    @observable todos = []
    @observable filter = ""
    // filter에 따라서 정규식 통과한 todo 만 가져옴
    @computed get filteredTodos() {
        const matchesFilter = new RegExp(this.filter, "i") // 대소문자 구분안함
        return this.todos.filter(todo => matchesFilter.test(todo.value))
    }

    pushTodo = (todo) => {
        this.todos.push(new Todo(todo))
    }

    clearCompleteTodos = () => {
        const incompleteTodos = this.todos.filter(todo => !todo.isComplete)
        this.todos = [...incompleteTodos]
    }
}

// const store = window.store = new TodoStore

export default new TodoStore

// autorun(() => {
//     console.log(store.filter)
//     console.log(store.todos[0])
// })