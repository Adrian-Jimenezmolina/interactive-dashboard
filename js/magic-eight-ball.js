// Array of Magic Eight Ball answers
const answers = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes – definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful"
];

// Function that picks and shows a random answer
function displayAnswer() {
  let index = Math.floor(Math.random() * answers.length);
  const circle = document.getElementById("circle");
  
  circle.style.display = "flex";
  circle.style.alignItems = "center";
  circle.style.justifyContent = "center";
  circle.style.textAlign = "center";
  circle.innerHTML = answers[index];
}

// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", function () {

  // When user clicks/holds the ball
  document.getElementById("ball").addEventListener("mousedown", function () {
    const question = document.getElementById("question").value.trim();

    if (question === "") {
      alert("Please type a yes/no question first!");
    } else {
      displayAnswer();
    }
  });

  // When user clicks the Reset button
  document.getElementById("reset").addEventListener("click", function () {
    document.getElementById("circle").style.display = "none";
    document.getElementById("question").value = "";
  });

});