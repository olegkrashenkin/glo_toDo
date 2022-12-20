'use strict'

const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')
const toDo = JSON.parse(localStorage.getItem('toDo')) || []

const render = () => {
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''
    toDo.forEach((item, idx) => {
        const li = document.createElement('li')

        li.classList.add('todo-item')

        li.innerHTML = `<span class="text-todo">${item.text}</span>
            <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
            </div>`

        item.completed ? todoCompleted.append(li) : todoList.append(li)

        li.querySelector('.todo-complete').addEventListener('click', () => {
            item.completed = !item.completed
            render()
        })

        li.querySelector('.todo-remove').addEventListener('click', () => {
            toDo.splice(idx, 1)
            render()
        })
    })

    localStorage.setItem('toDo', JSON.stringify(toDo))
}

todoControl.addEventListener('submit', (event) => {
    event.preventDefault()
    if (headerInput.value.trim()) {
        const newtoDo = { text: headerInput.value, completed: false }

        toDo.push(newtoDo)
        headerInput.value = ''
        render()
    } else {
        headerInput.value = ''
    }
})

render()
