const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("todoInput");
const prio = document.getElementById("priority");
const todoList = document.getElementById("todo-item");
addBtn.addEventListener("click", () => {
const inp = todoInput.value;
const pri = priority.value;

if(!inp || !pri) {
    alert("Please fill in the fields");
    return;
};

const todo = {
    inp,
    pri,
};

fetch("/todo",{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),

}).then(function(response){

    if(response.status === 200){
    //display todo to UI
    showTodoToUI(todo);
    }
    else{
        alert("Something went wrong");
    }

});
});

function showTodoToUI(todo) 
{
    const todoText = document.createElement("mangesh");
    todoText.innerText = "Todo : "+ todo.inp + " || Priority : " + todo.pri ;
    todoList.appendChild(todoText);
}

fetch("/tododata").then(function(response){
     if(response.status === 200){
         return response.json();
     }
     else{
            alert("Something went wrong");
     }
}).then(function(todos){
    todos.forEach(function(todo){
        showTodoToUI(todo);
    }
    );
});
