document.addEventListener("DOMContentLoaded", function () {
    const goalBtn = document.getElementById("goal-btn");

    goalBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const userName = document.getElementById("user-name").value;
        const dailyGoal = Number(document.getElementById("daily-goal").value);
        const bonusTasks = Number(document.getElementById("bonus-tasks").value);

        weeklyGoal(userName, dailyGoal, bonusTasks);
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