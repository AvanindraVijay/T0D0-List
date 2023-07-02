// Toggle theme
function toggleTheme(theme) {
    const container = document.querySelector('.container');
    container.classList.toggle(theme + '-mode');
  }
  
  // Generate unique ID
  function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  // Add a new task
  function addTask(event) {
    event.preventDefault();
    
    const taskInput = document.querySelector('#taskInput');
    const taskDescriptionInput = document.querySelector('#taskDescriptionInput');
    const taskList = document.querySelector('#pendingTasks');
  
    if (taskInput.value.trim() === '') {
      return;
    }
  
    const taskId = generateId();
    const taskTitle = taskInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();
    const taskTimestamp = new Date().toLocaleString();
  
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <div class="task-container" id="${taskId}">
        <div>
          <h3>${taskTitle}</h3>
          <p>${taskDescription}</p>
          <p class="timestamp">Added: ${taskTimestamp}</p>
        </div>
        <div>
          <button class="btn-complete" onclick="completeTask('${taskId}')">Complete</button>
          <button class="btn-edit" onclick="editTask('${taskId}')">Edit</button>
          <button class="btn-delete" onclick="deleteTask('${taskId}')">Delete</button>
        </div>
      </div>
    `;
  
    taskList.appendChild(taskItem);
  
    taskInput.value = '';
    taskDescriptionInput.value = '';
  }
  
  // Complete a task
  function completeTask(taskId) {
    const task = document.getElementById(taskId);
    const completedTasks = document.querySelector('#completedTasks');
  
    completedTasks.appendChild(task);
    task.classList.add('completed');
  
    const timestamp = task.querySelector('.timestamp');
    timestamp.textContent = 'Completed: ' + new Date().toLocaleString();
  }
  
  // Edit a task
  function editTask(taskId) {
    const task = document.getElementById(taskId);
    const taskTitle = task.querySelector('h3').textContent;
    const taskDescription = task.querySelector('p').textContent;
  
    const taskInput = document.querySelector('#taskInput');
    const taskDescriptionInput = document.querySelector('#taskDescriptionInput');
  
    taskInput.value = taskTitle;
    taskDescriptionInput.value = taskDescription;
  
    deleteTask(taskId);
  }
  
  // Delete a task
  function deleteTask(taskId) {
    const task = document.getElementById(taskId);
    task.remove();
  }
  
  // Clear all tasks
  function clearTasks() {
    const pendingTasks = document.querySelector('#pendingTasks');
    const completedTasks = document.querySelector('#completedTasks');
  
    pendingTasks.innerHTML = '';
    completedTasks.innerHTML = '';
  }
  
  // Event Listeners
  document.querySelector('#taskForm').addEventListener('submit', addTask);
  