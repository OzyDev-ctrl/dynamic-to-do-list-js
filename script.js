// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Step 2: Select DOM Elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Step 3: Create the addTask Function
  function addTask() {
      // Retrieve and trim the task input
      const taskText = taskInput.value.trim();

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
      removeButton.className = 'remove-btn';

      // Assign onclick event to the remove button
      removeButton.onclick = function() {
          taskList.removeChild(li);
      };

      // Append remove button to the li element
      li.appendChild(removeButton);
      // Append li to taskList
      taskList.appendChild(li);

      // Clear the task input field
      taskInput.value = '';
  }

  // Step 4: Attach Event Listeners
  // Add task when button is clicked
  addButton.addEventListener('click', addTask);

  // Add task when Enter key is pressed
  taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          addTask();
      }
  });

  addTask();
});
