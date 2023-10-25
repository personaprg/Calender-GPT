function updateCalendar() {
    const year = parseInt(document.getElementById("year").value);
    const month = parseInt(document.getElementById("month").value);
    //캘린더에 입력된 데이터("string") 형태로 가져온 후 number 값으로 변환한다.
    //이는 어떤 행위(사용자가 날짜를 선택하거나 수정한 경우)를 하였을 경우 동적으로 값의 변화가 필요하기 때문이다.
    //앞으로 "어떤 행위"를 위와 같은 방식으로 정의한다.


    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    //여기서+1을 한 이유는 알고리즘 분석시 시작값이 0 이기 때문에 발생원인 인듯 하다.

    // 생성자 함수를 사용하였는데 사용자의 "어떤 행위"가 이루어졌을 경우 동적으로 할당하기 위함이다.
    // 이 동정할당 방식은 new Date(생성자) 함수를 이용하였다.


    console.log("Year:", year);
    console.log("Month:", month);
    console.log("Days in Month:", daysInMonth);
    console.log("First Day:", firstDay);

    const calendarContainer = document.getElementById("calendarContainer");
    calendarContainer.innerHTML = "";
    //사용 후 초기화 작업이 필요한 것 같다. 왜냐하면 "어떤 행위"를 했을 경우 데이터가 지속적으로 쌓이는게 아닌, 지속적으로 값을 업데이트 해주어야 하기 때문이다.

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    // 요일 헤더 생성
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    // daysOfWeek의 날자 데이터를담은 이유는 table 속성 부분에 해당 값이 정적인 데이터이고, 미리 선안된 상태가 기본 값 이기 때문이다.
    daysOfWeek.forEach(day => {
        const th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    let date = 1;

    // 달력 일자 채우기
    //이 또한 정적인 데이터를 테이블에 채우기 위한 행위이다.
    //동적인 데이터는 테이블의 내용에 해당한다.
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
