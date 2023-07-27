const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("todoInput");
const prio = document.getElementById("priority");
const todoList = document.getElementById("todo-item");

addBtn.addEventListener("click", () => {
  const inp = todoInput.value;
  const pri = priority.value;

  if (!inp || !pri) {
    alert("Please fill in the fields");
    return;
  }

  const todo = {
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
      //display todo to UI
      showTodoToUI(todo);
    } else {
      alert("Something went wrong");
    }
  });
});

function showTodoToUI(todo) {
  const todoText = document.createElement("mangesh");
  todoText.innerText = "Todo: " + todo.inp;

  const todoPrio = document.createElement("bide");
  todoPrio.innerText = "Priority: " + todo.pri;

  const doneCheckbox = document.createElement("input");
  doneCheckbox.type = "checkbox";

  const delBtn = document.createElement("button");
  delBtn.innerText = "X";
  delBtn.classList.add("del-btn");

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-item");

  todoDiv.appendChild(todoText);
  todoDiv.appendChild(todoPrio);
  todoDiv.appendChild(doneCheckbox);
  todoDiv.appendChild(delBtn);

  handleCheckboxChange(todo, todoText, todoPrio, doneCheckbox);
  handleDeleteClick(todo, todoDiv, delBtn);

  if (todo.done === "done") {
    doneCheckbox.checked = true;
    todoText.style.textDecoration = "line-through";
    todoPrio.style.textDecoration = "line-through";
  }
  todoList.appendChild(todoDiv);
}

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

function handleCheckboxChange(todo, todoText, todoPrio, donecheckbox) {
  donecheckbox.addEventListener("change", function () {
    if (donecheckbox.checked) {
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
      } else {
        alert("Something went wrong");
      }
    });
  });
}

function handleDeleteClick(todo,todoDiv,delBtn) {
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
