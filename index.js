// Model

let todos;

const getData = () => {

    const savedTodos = JSON.parse(localStorage.getItem('todos'))
    if(Array.isArray(savedTodos)){
        return todos = savedTodos
    }else{
        // Default array or sample data
        return todos = []
    }

}
getData();

const saveData = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos)) 
}

const createTodoData = (title) => {
    const id = Math.floor(Math.random() * 100000000)

    todos.push({
        title: title,
        id: id,
        completed: false
    })
}

const removeTodoData = (todoId) => {
    
    todos = todos.filter( todo => {
        if(parseInt(todoId) === todo.id && todo.completed === true){
            return false
        }else {
            return true
        }
    })
}

const completedTodo = (todoId, checked) => {

   todos.forEach(todo => {
       if(todo.id === parseInt(todoId)){
            todo.completed = checked
       }
    })
}

// Controller

const addTodo = () => {
    const input = document.getElementById('todo_input').value
    
    input === '' ? alert('Please enter a todo') :
    createTodoData(input)
    saveData(todos)
    render();
}

const deleteTodo = (e) => {
    const todoToDelete = e.target.id
    removeTodoData(todoToDelete)
    saveData(todos)
    render();
}

const toggleTodo = (e) => {
   const targetTodo= e.target
   const selected = e.target.dataset.todoId
   const checked = targetTodo.checked
   const todoText = document.getElementsByClassName('todo')
   console.log(todoText)

   completedTodo(selected, checked)
   saveData(todos)
   render();
}

const deleteAllTodos = () => {
  todos.length = 0
  saveData(todos)
  render();
}   


//View


const render = () => {
    // Refresh the list when there is a new data

    document.getElementById('todo_list').innerHTML = ''

    todos.forEach(todo => {
      
        const element = document.getElementById('todo_list')

        const task = document.createElement('div')
        task.classList = 'todos'
        element.appendChild(task)

        const title = document.createElement('p')
        title.innerText = todo.title;
        task.appendChild(title)
        
        const checkBox = document.createElement('input')
        checkBox.type = 'checkbox'
        checkBox.className = 'checkBox'
        checkBox.dataset.todoId = todo.id
        checkBox.checked = todo.completed
    
        checkBox.onchange = toggleTodo;
        task.prepend(checkBox)

        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.id = todo.id
        deleteButton.className = 'delete_btn'
        deleteButton.onclick = deleteTodo;
        task.appendChild(deleteButton)

        if (checkBox.checked === false){
            title.className = 'todo'
            deleteButton.disabled = true
        }else if (checkBox.checked === true){
            title.className = 'checked'
            deleteButton.disabled = false
        }


    })

}

render();


