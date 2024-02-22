import Chart from "chart.js/auto";

const courseEl = document.getElementById("courses");
const programEl = document.getElementById("programs");

window.onload = init();

async function init() {
  displayCourses();
}

//Funktion för att hämta information från API:t.
async function loadStatistics() {
  try {
    const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
    const admissionStatistics = await response.json();
    return admissionStatistics;
  } catch (error) {
    console.log("Något gick fel!");
  }
}
//Funktion för att sortera kurserna utifrån antal sökande, visa de 6 populäraste kurserna och sedan skriva ut de till gränssnittet i ett stapeldiagram
async function displayCourses() {
  try {
    const admissionStatistics = await loadStatistics();
    const courses = admissionStatistics.filter((item) => item.type === "Kurs");
    courses.sort((a, b) => {
      const applicantsA = parseInt(a.applicantsTotal);
      const applicantsB = parseInt(b.applicantsTotal);
      return applicantsB - applicantsA;
    });

    const coursesTop = courses.slice(0, 6);

    const courseName = coursesTop.map((course) => course.name);
    const applicants = coursesTop.map((course) =>
      parseInt(course.applicantsTotal)
    );

    new Chart(courseEl, {
      type: "bar",
      data: {
        labels: courseName,
        datasets: [
          {
            label: "Antal sökande",
            data: applicants,
            borderWidth: 1,
          },
        ],
      },
    });

    console.log(coursesTop);
  } catch (error) {
    console.log("Något gick fel!");
  }
}
