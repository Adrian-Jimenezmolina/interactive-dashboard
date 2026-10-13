document.addEventListener("DOMContentLoaded", function () {
    // ===== Existing Goal Calculator Logic =====
    const goalBtn = document.getElementById("goal-btn");

    goalBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const userName = document.getElementById("user-name").value;
        const dailyGoal = Number(document.getElementById("daily-goal").value);
        const bonusTasks = Number(document.getElementById("bonus-tasks").value);

        weeklyGoal(userName, dailyGoal, bonusTasks);
    });

    // ===== New Task List Logic (Assignment) =====
    // Global array to track tasks
    let myTasks = [];

    // Create the unordered list dynamically
    const taskListDiv = document.getElementById("task-list");
    const userTasksList = document.createElement("ul");
    userTasksList.id = "user-tasks";
    userTasksList.className = "list-group mt-3";
    taskListDiv.appendChild(userTasksList);

    // Add Task button logic
    const addTaskBtn = document.getElementById("add-task");
    const taskInput = document.getElementById("task-name");

    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        // Ignore empty input
        if (taskText === "") return;

        // Store in array
        myTasks.push(taskText);

        // Create list item
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = taskText + " ";

        // Create Remove button
        const removeBtn = document.createElement("button");
        removeBtn.className = "btn btn-sm btn-outline-danger";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", function () {
            li.remove();
            const index = myTasks.indexOf(taskText);
            if (index > -1) {
                myTasks.splice(index, 1);
            }
        });

        // Assemble: button → li → ul
        li.appendChild(removeBtn);
        userTasksList.appendChild(li);

        // Clear input
        taskInput.value = "";
        taskInput.focus();
    });
});

function weeklyGoal(userName, dailyGoal, bonusTasks) {
    const weeklyGoalValue = dailyGoal * 5;
    const totalGoal = weeklyGoalValue + bonusTasks;

    const output = `
        <strong>Hello, ${userName}!</strong><br>
        Your daily task goal is <strong>${dailyGoal}</strong>.<br>
        Over 5 workdays that equals <strong>${weeklyGoalValue}</strong> tasks.<br>
        Adding <strong>${bonusTasks}</strong> bonus tasks brings your total weekly target to <strong>${totalGoal}</strong> tasks.
    `;

    const messageEl = document.getElementById("goal-message");
    messageEl.innerHTML = output;
    messageEl.style.display = "block";
}