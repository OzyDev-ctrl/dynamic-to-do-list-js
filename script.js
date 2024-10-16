// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Load tasks from Local Storage
  loadTasks();

  // Step 2: Select DOM Elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Step 3: Create the addTask Function
  function addTask(taskText, save = true) {
      // Retrieve and trim the task input
      if (save) {
          taskText = taskInput.value.trim();
      }

      // Check if taskText is not empty
      if (taskText === "") {
          alert("Please enter a task.");
          return;
      }

      // Task Creation and Removal
      const li = document.createElement('li');
      li.textContent = taskText;

      // Create remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = "Remove";
      removeButton.classList.add('remove-btn'); // Use classList.add

      // Assign onclick event to the remove button
      removeButton.onclick = function() {
          taskList.removeChild(li);
          removeTaskFromStorage(taskText); // Remove from Local Storage
      };

      // Append the remove button to the li element
      li.appendChild(removeButton);
      // Append the li to taskList
      taskList.appendChild(li);

      // Clear the task input field
      taskInput.value = '';

      // Save task to Local Storage
      if (save) {
          saveTaskToStorage(taskText);
      }
  }

  // Function to load tasks from Local Storage
  function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
  }

  // Function to save task to Local Storage
  function saveTaskToStorage(taskText) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }

  // Function to remove task from Local Storage
  function removeTaskFromStorage(taskText) {
      let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks = storedTasks.filter(task => task !== taskText); // Remove the task
      localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update Local Storage
  }

  // Step 4: Attach Event Listeners
  // Add an event listener to addButton that calls addTask when the button is clicked
  addButton.addEventListener('click', addTask);

  // Add an event listener to taskInput for the 'keypress' event
  taskInput.addEventListener('keypress', (event) => {
      // Check if event.key is equal to 'Enter' before calling addTask
      if (event.key === 'Enter') {
          addTask();
      }
  });
});
