// ============================================================
// Task Manager – Array of objects + dynamic DOM rendering
// ============================================================

/** @type {Array<{id:number, name:string, priority:string, isImportant:boolean, isCompleted:boolean}>} */
let tasks = [];
let nextId = 1;

// ---------- DOM references ----------
const form = document.getElementById("task-form");
const nameInput = document.getElementById("task-name");
const prioritySelect = document.getElementById("task-priority");
const importantCheckbox = document.getElementById("task-important");
const taskListEl = document.getElementById("task-list");
const deleteListBtn = document.getElementById("delete-list-btn");
const statTotal = document.getElementById("stat-total");
const statCompleted = document.getElementById("stat-completed");

// ---------- Helpers ----------
function logTasks() {
  console.log(JSON.stringify(tasks));
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.isCompleted).length;
  statTotal.textContent = `${total} task${total !== 1 ? "s" : ""}`;
  statCompleted.textContent = `${completed} completed`;
}

/**
 * Create a single task DOM node.
 * Styles applied with .style property as required by the assignment.
 */
function createTaskNode(task) {
  const item = document.createElement("div");
  item.className = "card mb-2";
  item.dataset.id = task.id;

  // Important → red highlight
  if (task.isImportant) {
    item.style.borderLeft = "4px solid #dc3545";
    item.style.backgroundColor = "rgba(220, 53, 69, 0.05)";
  }

  const body = document.createElement("div");
  body.className = "card-body py-2 px-3";

  // Task name
  const nameEl = document.createElement("div");
  nameEl.className = "fw-medium";
  nameEl.textContent = task.name;

  // Completed → strikethrough
  if (task.isCompleted) {
    nameEl.style.textDecoration = "line-through";
    nameEl.style.opacity = "0.65";
  }

  // Important text color
  if (task.isImportant) {
    nameEl.style.color = "#dc3545";
  }

  // Meta badges (priority + important)
  const meta = document.createElement("div");
  meta.className = "mt-1 small";

  const priorityBadge = document.createElement("span");
  priorityBadge.className = "badge me-1";
  priorityBadge.textContent = task.priority;

  // Priority colors via .style
  if (task.priority === "High") {
    priorityBadge.style.backgroundColor = "#fd7e14";
  } else if (task.priority === "Medium") {
    priorityBadge.style.backgroundColor = "#ffc107";
    priorityBadge.style.color = "#000";
  } else {
    priorityBadge.style.backgroundColor = "#198754";
  }
  meta.appendChild(priorityBadge);

  if (task.isImportant) {
    const impBadge = document.createElement("span");
    impBadge.className = "badge bg-danger";
    impBadge.textContent = "Important";
    meta.appendChild(impBadge);
  }

  // Action buttons
  const actions = document.createElement("div");
  actions.className = "mt-2 d-flex gap-2";

  const completeBtn = document.createElement("button");
  completeBtn.type = "button";
  completeBtn.className = "btn btn-sm btn-success";
  completeBtn.textContent = task.isCompleted ? "Undo" : "Complete";
  completeBtn.addEventListener("click", () => toggleComplete(task.id));

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn-sm btn-outline-danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  // Assemble the card
  body.appendChild(nameEl);
  body.appendChild(meta);
  body.appendChild(actions);
  item.appendChild(body);

  return item;
}

/**
 * Render the entire task list into #task-list using DOM nodes
 */
function renderTasks() {
  // Clear previous content
  while (taskListEl.firstChild) {
    taskListEl.removeChild(taskListEl.firstChild);
  }

  if (tasks.length === 0) {
    const empty = document.createElement("p");
    empty.className = "text-muted";
    empty.textContent = "No tasks yet. Add one above!";
    taskListEl.appendChild(empty);
  } else {
    tasks.forEach((task) => {
      taskListEl.appendChild(createTaskNode(task));
    });
  }

  updateStats();
}

// ---------- Core functions required by the assignment ----------

/**
 * Add a new task
 */
function addTask(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  if (!name) return;

  const task = {
    id: nextId++,
    name: name,
    priority: prioritySelect.value,
    isImportant: importantCheckbox.checked,
    isCompleted: false
  };

  tasks.push(task);
  logTasks();          // required: console.log(JSON.stringify(tasks))
  renderTasks();

  // Reset form
  nameInput.value = "";
  prioritySelect.value = "Medium";
  importantCheckbox.checked = false;
  nameInput.focus();
}

/**
 * Mark a task complete / undo (DOM-node driven)
 */
function toggleComplete(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.isCompleted = !task.isCompleted;
  logTasks();
  renderTasks();
}

/**
 * Delete a single task
 */
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  logTasks();
  renderTasks();
}

/**
 * Delete the entire task list
 */
function deleteTaskList() {
  if (tasks.length === 0) return;
  if (!confirm("Delete all tasks? This cannot be undone.")) return;

  tasks = [];
  logTasks();
  renderTasks();
}

// ---------- Event listeners ----------
form.addEventListener("submit", addTask);
deleteListBtn.addEventListener("click", deleteTaskList);

// Initial render
renderTasks();
logTasks(); // logs empty array on page load