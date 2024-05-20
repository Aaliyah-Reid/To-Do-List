let tasksByCategory = {};

document.addEventListener('DOMContentLoaded', (event) => {
  // Retrieve tasks and strike-through state from local storage
  const storedTasks = JSON.parse(localStorage.getItem('tasksByCategory')) || {};
  const storedStrikethroughState = JSON.parse(localStorage.getItem('strikethroughState')) || {};
  tasksByCategory = storedTasks;

  document.querySelectorAll('.category').forEach(categoryElement => {
    categoryElement.addEventListener('click', function() {
      const categoryName = this.getAttribute('data-property');
      console.log(categoryName);
      window.location.href = `list.html?category=${encodeURIComponent(categoryName)}`;
    });
  });

  // To add a task
  addBtn = document.getElementById('add-icon-pos');
  inputField = document.getElementById('added-task');
  taskContainer = document.getElementById('task-container');

  // Get the category from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const currentCategory = urlParams.get('category');

  // Initialize the tasks array and strike-through state for the current category
  if (!tasksByCategory[currentCategory]) {
    tasksByCategory[currentCategory] = [];
  }
  if (!storedStrikethroughState[currentCategory]) {
    storedStrikethroughState[currentCategory] = [];
  }

  // Render tasks for the current category
  tasksByCategory[currentCategory].forEach((taskText, index) => {
    const newTaskContainer = createTaskContainer(taskText);
    taskContainer.appendChild(newTaskContainer);

    // Add click event listener to delete task
    const trashIconContainer = newTaskContainer.querySelector('.trash-icon-pos');
    trashIconContainer.addEventListener('click', () => deleteTask(taskText, currentCategory));

    // Add click event listener to strike-through/remove strike-through task text
    const taskElement = newTaskContainer.querySelector('p');
    taskElement.addEventListener('click', () => toggleStrikethrough(taskElement, storedStrikethroughState, currentCategory, index));

    // Apply strike-through state based on stored state
    const isStrikethrough = storedStrikethroughState[currentCategory][index] || false;
    if (isStrikethrough) {
      taskElement.classList.add('strike-through');
    }
  });

  addBtn.addEventListener('click', function() {
    const newTaskText = inputField.value.trim();
    console.log(newTaskText);
    if (newTaskText) {
      const newTaskContainer = createTaskContainer(newTaskText);

      // Add the task to the tasks array for the current category
      tasksByCategory[currentCategory].push(newTaskText);
      storedStrikethroughState[currentCategory].push(false); // Initialize strike-through state as false

      // Save tasks and strike-through state to local storage 
      localStorage.setItem('tasksByCategory', JSON.stringify(tasksByCategory));
      localStorage.setItem('strikethroughState', JSON.stringify(storedStrikethroughState));

      // Append the task container to the task container in the DOM
      taskContainer.appendChild(newTaskContainer);
      inputField.value = ''; // Clear the input field

      // Add click event listener to delete task
      const trashIconContainer = newTaskContainer.querySelector('.trash-icon-pos');
      trashIconContainer.addEventListener('click', () => deleteTask(newTaskText, currentCategory));

      // Add click event listener to strike-through/remove strike-through task text
      const taskElement = newTaskContainer.querySelector('.container-frame');
      taskElement.addEventListener('click', () => toggleStrikethrough(taskElement, storedStrikethroughState, currentCategory, tasksByCategory[currentCategory].length - 1));
    }
  });
}); 

function createTaskContainer(taskText) {
  const container = document.createElement('div');
  const newTaskContainer = document.createElement('div');
  container.classList.add('container-frame')
  newTaskContainer.classList.add('task');
  const newTaskElement = document.createElement('p');
  newTaskElement.textContent = taskText;
  const trashIconContainer = document.createElement('div');
  trashIconContainer.classList.add('icon-container', 'trash-icon-pos');
  trashIconContainer.innerHTML = '<i class="fa-solid fa-trash"></i>';
  newTaskContainer.appendChild(newTaskElement);
  container.appendChild(newTaskContainer);
  container.appendChild(trashIconContainer);
  return container;
}

function deleteTask(taskText, category) {
  // Remove the task from the tasks array for the category
  const taskIndex = tasksByCategory[category].indexOf(taskText);
  tasksByCategory[category] = tasksByCategory[category].filter((task, index) => index !== taskIndex);

  // Save tasks and strike-through state to local storage
  localStorage.setItem('tasksByCategory', JSON.stringify(tasksByCategory));
  // localStorage.setItem('strikethroughState', JSON.stringify(storedStrikethroughState));

  // Remove the task element from the DOM
  document.querySelectorAll('.container-frame').forEach(taskElement => {
    if (taskElement.firstChild.textContent === taskText) {
      taskElement.remove();
    }
  });
}


function toggleStrikethrough(taskElement, storedStrikethroughState, currentCategory, taskIndex) {
  taskElement.classList.toggle('strike-through');

  // Update strike-through state in storedStrikethroughState
  storedStrikethroughState[currentCategory][taskIndex] = !storedStrikethroughState[currentCategory][taskIndex];

  // Save strike-through state to local storage
  localStorage.setItem('strikethroughState', JSON.stringify(storedStrikethroughState));
}