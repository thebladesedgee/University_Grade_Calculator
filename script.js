let semestersData = [];

function addSemester() {
  const semestersDiv = document.getElementById('semesters');
  
  const semesterDiv = document.createElement('div');
  semesterDiv.classList.add('semester', 'my-4');
  semesterDiv.innerHTML = `
    <h3>Semester ${semestersData.length + 1}</h3>
    <div class="courses"></div>
    <button class="btn btn-primary mr-2" onclick="addCourse(this)">Add Course</button>
    <button class="btn btn-danger mr-2" onclick="removeSemester(this)">Remove Semester</button>
    <button class="btn btn-info" onclick="showSemesterAverage(this)">Show Semester Average</button>
  `;
  
  semestersDiv.appendChild(semesterDiv);
  

  semestersData.push({ courses: [] });
}

function addCourse(button) {
  const semesterDiv = button.parentElement;
  const coursesDiv = semesterDiv.querySelector('.courses');
  
  const courseDiv = document.createElement('div');
  courseDiv.classList.add('course', 'my-3');
  courseDiv.innerHTML = `
    <div class="row">
      <div class="col-md-5">
        <input type="text" class="form-control" placeholder="Course Name">
      </div>
      <div class="col-md-4">
        <select class="form-control">
          <option value="" disabled selected>Select Grade</option>
          <option value="AA">AA</option>
          <option value="BA">BA</option>
          <option value="BB">BB</option>
          <option value="CB">CB</option>
          <option value="CC">CC</option>
          <option value="DC">DC</option>
          <option value="DD">DD</option>
          <option value="FD">FD</option>
          <option value="FF">FF</option>
        </select>
      </div>
      <div class="col-md-2">
        <input type="number" class="form-control" min="0.5" max="30" step="0.5" placeholder="Credit">
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-danger" onclick="removeCourse(this)">Remove</button>
      </div>
    </div>
  `;
  
  coursesDiv.appendChild(courseDiv);
  

  const semesterIndex = Array.from(semesterDiv.parentElement.children).indexOf(semesterDiv);
  semestersData[semesterIndex].courses.push(courseDiv);
}

function removeCourse(button) {
  const courseDiv = button.parentElement.parentElement.parentElement;
  const semesterDiv = courseDiv.closest('.semester');
  
  
  const semesterIndex = Array.from(semesterDiv.parentElement.children).indexOf(semesterDiv);
  const courseIndex = Array.from(courseDiv.parentElement.children).indexOf(courseDiv);
  semestersData[semesterIndex].courses.splice(courseIndex, 1);
  
  
  courseDiv.remove();

  updateSemesterNumbering();
}

function removeSemester(button) {
  const semesterDiv = button.parentElement;
  const semestersContainer = semesterDiv.parentElement;
  

  const semesterIndex = Array.from(semestersContainer.children).indexOf(semesterDiv);
  semestersData.splice(semesterIndex, 1);
  

  semesterDiv.remove();
  

  updateSemesterNumbering();
}

function updateSemesterNumbering() {
  const semesters = document.querySelectorAll('.semester');
  semesters.forEach((semester, index) => {
    semester.querySelector('h3').textContent = `Semester ${index + 1}`;
  });
}

function calculateGPA() {
  let totalGradePoints = 0;
  let totalCredits = 0;

  semestersData.forEach(semester => {
    const courses = semester.courses;
    
  
    courses.forEach(course => {
      const grade = course.querySelector('select').value;
      const credit = parseFloat(course.querySelector('input[type="number"]').value);
      
      if (!isNaN(credit) && credit >= 0.5 && credit <= 30) {
        switch (grade) {
          case "AA":
            totalGradePoints += 4 * credit;
            break;
          case "BA":
            totalGradePoints += 3.5 * credit;
            break;
          case "BB":
            totalGradePoints += 3 * credit;
            break;
          case "CB":
            totalGradePoints += 2.5 * credit;
            break;
          case "CC":
            totalGradePoints += 2 * credit;
            break;
          case "DC":
            totalGradePoints += 1.5 * credit;
            break;
          case "DD":
            totalGradePoints += 1 * credit;
            break;
          case "FD":
            totalGradePoints += 0.5 * credit;
            break;
        }
        totalCredits += credit;
      }
    });
  });
  
  const gpa = totalGradePoints / totalCredits;
  
  if (!isNaN(gpa)) {
    alert('GPA: ' + gpa.toFixed(2));
  } else {
    alert('Please enter grades and credits correctly.');
  }
}

function showSemesterAverage(button) {
  const semesterDiv = button.parentElement;
  const courses = semesterDiv.querySelectorAll('.course');
  let totalGrade = 0;
  let totalCredit = 0;

  courses.forEach(course => {
    const selectElement = course.querySelector('select');
    const creditInput = course.querySelector('input[type="number"]');
    
    if (selectElement && creditInput) {
      const grade = selectElement.value;
      const credit = parseFloat(creditInput.value);
      
      if (!isNaN(credit) && credit >= 0.5 && credit <= 30) {
        switch (grade) {
          case "AA":
            totalGrade += 4 * credit;
            break;
          case "BA":
            totalGrade += 3.5 * credit;
            break;
          case "BB":
            totalGrade += 3 * credit;
            break;
          case "CB":
            totalGrade += 2.5 * credit;
            break;
          case "CC":
            totalGrade += 2 * credit;
            break;
          case "DC":
            totalGrade += 1.5 * credit;
            break;
          case "DD":
            totalGrade += 1 * credit;
            break;
          case "FD":
            totalGrade += 0.5 * credit;
            break;
          case "FF":
            break;
        }
        totalCredit += credit;
      }
    }
  });

  const averageGrade = totalGrade / totalCredit;

  if (!isNaN(averageGrade)) {
    alert('Semester Average: ' + averageGrade.toFixed(2));
  } else {
    alert('Please enter grades and credits correctly.');
  }
}
