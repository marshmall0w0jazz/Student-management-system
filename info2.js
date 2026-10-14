const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function addStudent() {
  const name = await ask("Enter student name: ");
  const studentClass = await ask("Enter class: ");
  const rollNo = await ask("Enter roll number: ");

  const subjectCount = Number(await ask("How many subjects? "));
  if (!Number.isInteger(subjectCount) || subjectCount < 0) {
    console.log("Please enter a valid number of subjects.");
    return;
  }

  const subjects = [];
  for (let i = 0; i < subjectCount; i++) {
    subjects.push(await ask(`Enter subject ${i + 1}: `));
  }

  let students = [];
  if (fs.existsSync("students.json")) {
    try {
      students = JSON.parse(fs.readFileSync("students.json", "utf8"));
    } catch {
      console.log("Could not read students.json. Check that the file contains valid JSON.");
      return;
    }
  }

  students.push({ name, studentClass, rollNo, subjects });
  fs.writeFileSync("students.json", JSON.stringify(students, null, 2));

  console.log("Student information saved to students.json.");
}

function viewStudents() {
  if (!fs.existsSync("students.json")) {
    console.log("No student records found yet.");
    return;
  }

  try {
    const students = JSON.parse(fs.readFileSync("students.json", "utf8"));

    if (students.length === 0) {
      console.log("No student records found.");
      return;
    }

    students.forEach((student, index) => {
      console.log(`\n--- Student ${index + 1} ---`);
      console.log(`Name: ${student.name}`);
      console.log(`Class: ${student.studentClass}`);
      console.log(`Roll number: ${student.rollNo}`);
      console.log(`Subjects: ${student.subjects.join(", ")}`);
    });
  } catch {
    console.log("Could not read student records.");
  }
}

async function main() {
  while (true) {
    console.log("\nStudent Information Manager");
    console.log("1. Add student");
    console.log("2. View all students");
    console.log("0. Exit");

    const choice = await ask("Choose an option: ");

    if (choice === "1") {
      await addStudent();
    } else if (choice === "2") {
      viewStudents();
    } else if (choice === "0") {
      break;
    } else {
      console.log("Invalid option. Try again.");
    }
  }

  rl.close();
}

main();
