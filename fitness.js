const addBtn = document.getElementById("add-btn");
const tableBody = document.querySelector("#activity-table tbody");
const totalWorkouts = document.getElementById("total-workouts");
const totalCalories = document.getElementById("total-calories");
const progressBar = document.getElementById("progress-bar");

let activities = JSON.parse(localStorage.getItem("fitnessData")) || [];

function renderActivities() {
  tableBody.innerHTML = "";
  let totalCal = 0;

  activities.forEach((activity) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${activity.date}</td>
      <td>${activity.exercise}</td>
      <td>${activity.duration} min</td>
      <td>${activity.calories} kcal</td>
    `;
    tableBody.appendChild(row);
    totalCal += activity.calories;
  });

  totalWorkouts.textContent = activities.length;
  totalCalories.textContent = totalCal;

  // Progress bar: goal = 500 kcal/day
  let progress = Math.min((totalCal / 500) * 100, 100);
  progressBar.style.width = progress + "%";
}

addBtn.addEventListener("click", () => {
  const date = document.getElementById("date").value;
  const exercise = document.getElementById("exercise").value;
  const duration = document.getElementById("duration").value;
  const calories = document.getElementById("calories").value;

  if (!date || !exercise || !duration || !calories) {
    alert("Please fill all fields!");
    return;
  }

  const newActivity = {
    date,
    exercise,
    duration: parseInt(duration),
    calories: parseInt(calories),
  };

  activities.push(newActivity);
  localStorage.setItem("fitnessData", JSON.stringify(activities));
  renderActivities();

  // Clear input fields
  document.getElementById("exercise").value = "";
  document.getElementById("duration").value = "";
  document.getElementById("calories").value = "";
});

window.onload = renderActivities;
