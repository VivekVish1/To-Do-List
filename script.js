const TodoInput = document.getElementById("TodoInput");
const addBtn = document.getElementById("addBtn");
const TodoList = document.getElementById("TodoList");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addBtn.addEventListener("click", () => {
    const taskText = TodoInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const task = { text: taskText, completed: false };
    tasks.push(task);
    saveTasks();

    TodoInput.value = "";
    renderTasks();
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    TodoList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) li.classList.add("completed");

        li.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // Delete button //
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(deleteBtn);
        TodoList.appendChild(li);
    });
}
