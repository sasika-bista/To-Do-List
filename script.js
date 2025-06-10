const taskInput = document.querySelector(".inToDO");
const addTaskBtn = document.querySelector(".addTask");
const taskList = document.querySelector(".taskList");

function addTask(taskText) {
  if (!taskText.trim()) return;

  const taskIteam = document.createElement("li");
  taskIteam.className = "task-iteam";

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;

  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑️";
  delBtn.className = "deleteBtn";

  taskIteam.appendChild(checkBox);
  taskIteam.appendChild(span);
  taskIteam.appendChild(delBtn);

  taskList.appendChild(taskIteam);

  checkBox.addEventListener("change", () => {
    taskIteam.classList.toggle("completed");
    saveTasksToLocalStorage();
  });

  delBtn.addEventListener("click", () => {
    taskList.removeChild(taskIteam);
    saveTasksToLocalStorage();
  });

  saveTasksToLocalStorage();
}

addTaskBtn.addEventListener("click", () => {
  addTask(taskInput.value);
  console.log(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask(taskInput.value);
    taskInput.value = "";
  }
});

function saveTasksToLocalStorage() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task.text);
    if (task.completed) {
      const lastTask = taskList.lastElementChild;
      lastTask.classList.add("completed");
      lastTask.querySelector('input[type="checkbox"]').checked = true;
    }
  });
}

window.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
