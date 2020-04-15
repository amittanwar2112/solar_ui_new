let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();




let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
	
	
	let datefrominverter=[];
	console.log("date from inverter");
	console.log(data);
	
	for(let j in data){
		datefrominverter[j]=data[j].record_time.slice(8);
		console.log("date from inverter");
		console.log(datefrominverter[j]);
	}

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
				//cell.appendChild("amit");
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
				let x="";
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
				cell.style.height = '100px';
				cell.style.width = '100px';
				//cell.style.text-align = 'right';
				//cell.style.width = '10%';
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
 
                } // color today's da
				 cell.appendChild(cellText);
				 for(let k in datefrominverter){
				 if(datefrominverter[k] == date){
					let textnode = document.createElement("h2");
					textnode.innerHTML="  ";
					cell.appendChild(textnode);

					let newnode=document.createElement("div");
					newnode.innerHTML=data[k].p_today_energy + " " + "KWh"
					//newnode.classList.add("btn-success");
					newnode.setAttribute("style", "font-size:17px;font-weight:bold;padding:0px;height:20px;color:#00b300;"); 
					cell.appendChild(newnode);
					//let textnode = document.createElement("h6");
					//textnode.innerHTML="KWh";
					//textnode.setAttribute("style", "font-size:12px;color: #00cccc;font-weight:bold;text-align:left;"); 
					//textnode.classList.add("btn-info");
					//cell.appendChild(textnode);
					
				 }
				 }


				
                
				
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}