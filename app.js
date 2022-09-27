// DOM PROJECTS
// PROJECT NO1 - TASKS LIST APP
// define UI vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')


//create function to load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners(){ 
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit', addTask)

  // Remove task event
  taskList.addEventListener('click',removeTask)

  // Clear task event
  clearBtn.addEventListener('click', clearTasks)

  // Filter tasks event
  filter.addEventListener('keyup', filterTasks)
}

// Get tasks from local storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.id = 'new-item'

    // create text node and append to li
    li.appendChild(document.createTextNode(task))

    // ceate new link element
    const link = document.createElement('a')
    // add class name to the link
    link.className = 'delete-item secondary-content'
    // add icon html to the link
    link.innerHTML = '<i class="fa fa-remove"></i>'

    // append link to the li
    li.appendChild(link)

    // append li to the ul
    taskList.appendChild(li)
  })
}


// Add task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task')
  }

  // Create li element
  const li = document.createElement('li')
  li.className = 'collection-item'
  li.id = 'new-item'

  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value))

  // ceate new link element
  const link = document.createElement('a')
  // add class name to the link
  link.className = 'delete-item secondary-content'
  // add icon html to the link
  link.innerHTML = '<i class="fa fa-remove"></i>'

  // append link to the li
  li.appendChild(link)

  // append li to the ul
  taskList.appendChild(li)


  // Store task list in the local storage
  storeTaskInLocalStorage(taskInput.value);


  // Clear input after submission
  taskInput.value = ''

  e.preventDefault()
}

// store Tasks in LS
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));
}


// Remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    // remove from the UI
    if(confirm('Are You Sure?')){
       e.target.parentElement.parentElement.remove()

      //  Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
   
    console.log(e.target)
  }

  e.preventDefault()
}

// Remove Task from the Local Storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks))
  
  console.log(taskItem)
}


// Clear Tasks
function clearTasks(e){
  // taskList.innerHTML = ''

  // Faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild)
  }

  // Clear tasks from LS
  clearTasksFromLocalStorage();

  // explaination link - https://jsperf.com/innerhtml-vs-removechild

  e.preventDefault()
}

// clear tasks from Local Storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}


// Filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase()

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })

  console.log(text)

  e.preventDefault()
}


