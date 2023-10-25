// Calendar-Script.js

// JavaScript 코드...
// 예시: toggleDarkMode 함수
function toggleDarkMode() {
  const body = document.body;
  const darkModeToggle = document.getElementById("darkModeToggle");

  if (body.style.backgroundColor === "beige" || body.style.backgroundColor === "") {
      body.style.backgroundColor = "#303030";
      body.style.color = "white";
      darkModeToggle.textContent = "라이트 모드";
  } else {
      body.style.backgroundColor = "beige";
      body.style.color = "black";
      darkModeToggle.textContent = "다크 모드";
  }
}

// 예시: previousMonth 함수
function previousMonth() {
  const year = parseInt(yearSelect.value);
  let month = parseInt(monthSelect.value);
  if (month === 0) {
      // If the current month is January, go back to December of the previous year.
      yearSelect.value = year - 1;
      monthSelect.value = 11; // December
  } else {
      monthSelect.value = month - 1;
  }
  updateCalendar();
}

// 예시: nextMonth 함수
function nextMonth() {
  const year = parseInt(yearSelect.value);
  let month = parseInt(monthSelect.value);
  if (month === 11) {
      // If the current month is December, go to January of the next year.
      yearSelect.value = year + 1;
      monthSelect.value = 0; // January
  } else {
      monthSelect.value = month + 1;
  }
  updateCalendar();
}
