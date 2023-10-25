function updateCalendar() {
    const year = parseInt(document.getElementById("year").value);
    const month = parseInt(document.getElementById("month").value);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    console.log("Year:", year);
    console.log("Month:", month);
    console.log("Days in Month:", daysInMonth);
    console.log("First Day:", firstDay);

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
                const td = document.createElement("td");
                row.appendChild(td);
            } else {
                // 유효한 날짜
                const td = document.createElement("td");
                td.textContent = date;
                td.onclick = () => displayImage(year, month, date);
                row.appendChild(td);
                date++;
            }
        }

        table.appendChild(row);
    }

    calendarContainer.appendChild(table);
}

// 년도 옵션 생성
const yearSelect = document.getElementById("year");
const currentYear = new Date().getFullYear();
for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
}
