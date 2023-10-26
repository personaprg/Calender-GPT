// 년도 옵션 생성
const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

yearSelect.innerHTML = ""; // 기존 옵션 제거
for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
}

yearSelect.value = currentYear; // 현재 년도 설정
monthSelect.value = currentMonth; // 현재 월 설정

// 년도와 월을 업데이트하는 함수
function updateCalendar() {
    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const calendarContainer = document.getElementById("calendarContainer");
    calendarContainer.innerHTML = "";

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    // 요일 헤더 생성
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    daysOfWeek.forEach(day => {
        const th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    let date = 1;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    // 달력 일자 채우기
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                // 첫 번째 주의 시작 이전
                const td = document.createElement("td");
                row.appendChild(td);
            } else if (date > daysInMonth) {
                // 마지막 날짜 이후
                break;
            } else {
                const td = document.createElement("td");
                td.textContent = date;

                if (year === currentYear && month === currentMonth && date === currentDay) {
                    td.classList.add("today");
                }

                if (j === 6) {
                    td.classList.add("saturday");
                } else if (j === 0) {
                    td.classList.add("sunday");
                }

                td.addEventListener("click", () => {
                    alert(`클릭한 날짜: ${year}년 ${month + 1}월 ${date}일`);
                });

                row.appendChild(td);
                date++;
            }
        }

        table.appendChild(row);
    }

    calendarContainer.appendChild(table);
}

// 초기 캘린더 표시
updateCalendar();

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

// 이미지 로드 함수
function loadBannerImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = aFileReader();
            reader.onload = function () {
                const bannerImage = document.getElementById("bannerImage");
                bannerImage.src = reader.result;
                bannerImage.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}