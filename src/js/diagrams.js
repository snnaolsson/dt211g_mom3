import Chart from "chart.js/auto";

const courseEl = document.getElementById("courses");
const programEl = document.getElementById("programs");

window.onload = init();

async function init() {
  displayCourses();
  displayPrograms();
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
    const admissionStatistics = await loadStatistics(); //Kör funktionen som hämtar datan från API och lagrar i admissionStatistics

    //Filtrerar admissionStatistics utifrån att de ska vara kurser och sparar i variabeln courses. Sorterar sedan dessa flest antal sökande till lägst antal.
    const courses = admissionStatistics.filter((item) => item.type === "Kurs");
    courses.sort((a, b) => {
      const applicantsA = parseInt(a.applicantsTotal);
      const applicantsB = parseInt(b.applicantsTotal);
      return applicantsB - applicantsA;
    });

    const coursesTop = courses.slice(0, 6); //Skapar ny variabel och sparar de första 6 kurserna från den sorterade arrayen

    const courseName = coursesTop.map((course) => course.name); //Skapar en array med kursnamn från objekten i coursesTop
    const applicants = coursesTop.map(
      (course) => parseInt(course.applicantsTotal) //// Skapar en array med antalet sökande (som heltal) från objekten i coursesTop
    );
    //Skapar nytt bar-diagram, och använder kursnamnen och antal sökande till kurserna som label och data
    new Chart(courseEl, {
      type: "bar",
      data: {
        labels: courseName,
        datasets: [
          {
            label: "Antal sökande",
            data: applicants,
            borderWidth: 1,
            indexAxis: "y",
          },
        ],
      },
    });
  } catch (error) {
    console.log("Något gick fel!");
  }
}
//Funktion för att sortera programmen utifrån antal sökande, visa de 5 populäraste programmen och sedan skriva ut de till gränssnittet i ett pie-diagram
async function displayPrograms() {
  try {
    const admissionStatistics = await loadStatistics();
    const programs = admissionStatistics.filter(
      (item) => item.type === "Program"
    );
    programs.sort((a, b) => {
      const appliA = parseInt(a.applicantsTotal);
      const appliB = parseInt(b.applicantsTotal);
      return appliB - appliA;
    });

    const programTop = programs.slice(0, 5);

    const programName = programTop.map((programs) => programs.name);
    const applicants = programTop.map((programs) =>
      parseInt(programs.applicantsTotal)
    );

    new Chart(programEl, {
      type: "pie",
      data: {
        labels: programName,
        datasets: [
          {
            label: "Antal sökande",
            data: applicants,
          },
        ],
      },
    });
  } catch (error) {
    console.log("Något gick fel!");
  }
}
