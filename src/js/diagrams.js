const courseEl = document.getElementById("courses");
const programEl = document.getElementById("programs");

window.onload = init();

async function init() {
  displayCourses();
}

async function loadStatistics() {
  try {
    const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
    const admissionStatistics = await response.json();
    return admissionStatistics;
  } catch (error) {
    console.log("Något gick fel!");
  }
}

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
    console.log(coursesTop);
  } catch (error) {
    console.log("Något gick fel!");
  }
}
