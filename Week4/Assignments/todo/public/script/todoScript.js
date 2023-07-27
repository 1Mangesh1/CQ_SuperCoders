// Get references to the DOM elements
const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("todoInput");
const priority = document.getElementById("priority");
const todoList = document.getElementById("todo-item");

// Event listener for Add button
addBtn.addEventListener("click", () => {
  const inp = todoInput.value;
  const pri = priority.value;

  if (!inp || !pri) {
    alert("Please fill in the fields");
    return;
  }

  const todo = {
    id: Date.now(),
    inp,
    pri,
    done: "pending",
  };

  fetch("/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then(function (response) {
    if (response.status === 200) {
      // Display todo to UI
      showTodoToUI(todo);
    } else {
      alert("Something went wrong");
    }
  });
});

// Function to create and display a new Todo on the UI
function showTodoToUI(todo) {
  const todoText = document.createElement("mangesh");
  todoText.innerText = "Todo: " + todo.inp;

  const todoPrio = document.createElement("bide");
  todoPrio.style.fontWeight = "bold";

  todoPrio.innerText = "Priority: " + todo.pri;

  const doneCheckbox = document.createElement("input");
  doneCheckbox.type = "checkbox";
  doneCheckbox.id = "statusCheckbox-" + todo.id; // Assign a unique ID to each checkbox
  doneCheckbox.checked = todo.done === "done"; // Set the initial checkbox state

  const delBtn = document.createElement("button");
  delBtn.innerText = "X";
  delBtn.classList.add("del-btn");

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-item");

  todoDiv.appendChild(todoText);
  todoDiv.appendChild(todoPrio);
  todoDiv.appendChild(doneCheckbox);
  todoDiv.appendChild(delBtn);

  // Create and append the status label for marking the task as completed
  updateStatusText(doneCheckbox.checked, todoDiv);

  handleCheckboxChange(todo, todoText, todoPrio, doneCheckbox, todoDiv);
  handleDeleteClick(todo, todoDiv, delBtn);

  if (todo.done === "done") {
    todoText.style.textDecoration = "line-through";
    todoPrio.style.textDecoration = "line-through";
  }

  todoList.appendChild(todoDiv);
}

// Fetch existing todos from the server and display them on the UI
fetch("/tododata")
  .then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("Something went wrong");
    }
  })
  .then(function (todos) {
    todos.forEach(function (todo) {
      showTodoToUI(todo);
    });
  });

// Function to handle checkbox change for marking Todo as done/pending
function handleCheckboxChange(todo, todoText, todoPrio, doneCheckbox, todoDiv) {
  doneCheckbox.addEventListener("change", function () {
    if (doneCheckbox.checked) {
      todoText.style.textDecoration = "line-through";
      todoPrio.style.textDecoration = "line-through";
      todo.done = "done";
    } else {
      todoText.style.textDecoration = "none";
      todoPrio.style.textDecoration = "none";
      todo.done = "pending";
    }

    // Update the existing todo on the server (if needed)
    fetch("/todo", {
      method: "PUT", // Use PUT or PATCH method to update existing todo
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(function (response) {
      if (response.status === 200) {
        // Todo successfully updated on the server
        updateStatusText(doneCheckbox.checked, todoDiv);
      } else {
        alert("Something went wrong");
      }
    });
  });
}

// Function to handle Todo deletion
function handleDeleteClick(todo, todoDiv, delBtn) {
  delBtn.addEventListener("click", function () {
    // Delete the existing todo on the server
    fetch("/todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(function (response) {
      if (response.status === 200) {
        // Todo successfully deleted on the server

        // Remove the todo from the UI
        todoDiv.remove();
      } else {
        alert("Something went wrong");
      }
    });
  });
}

function updateStatusText(checked, todoDiv) {
  // Remove any existing status label
  const existingStatusLabel = todoDiv.querySelector(".status-label");
  if (existingStatusLabel) {
    existingStatusLabel.remove();
  }

  const statusLabel = document.createElement("label");
  
  statusLabel.classList.add("status-label");
  statusLabel.style.textDecoration = checked ? "line-through" : "none";
  statusLabel.innerText = checked ? "Completed" : "Pending";
  todoDiv.appendChild(statusLabel);
}
