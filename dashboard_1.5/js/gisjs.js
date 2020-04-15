var data=[];
function getSiteList( ) {

    var xhr = new XMLHttpRequest();
    let user = getCookie('user');
    console.log(user);
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            drawPlantTable(this.responseText);
        }
    });
	let url ="http://13.233.236.200:5000/getSiteList?user="+user
    xhr.open("GET", url);
	console.log(url);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send();

}


function setSiteId(siteId) {
    setCookie('siteId', siteId, 1);
    window.location.href = "index.html";
}


function drawPlantTable( inputdata ) {
    data = JSON.parse(inputdata);
	console.log("data");
    
    let dataTable = "";
    dataTable += "<table class='table table-striped'><thead class='thead-blue'>";
    dataTable += "<tr><th>#</th><th>Plant Name</th><th>Capacity</th><th>Todays Energy</th><th>CUF (%)</th><th>Last Update</th></tr></thead>";
    dataTable += "<tbody>";
    let tbody = "<tbody id='tb'>";

    for(let i in data.site_list) {
		
        tbody += "<tr>";

        tbody += "<td>"+'<i class="far fa-bell" style="font-size:25px;color:green"></i>'+"</td>";
        tbody += "<td><a href='#' onclick='setSiteId("+data.site_list[i].site_id+")'>" + data.site_list[i].site_name +"</a></td>";
        tbody += "<td>"+ data.site_list[i].plant_capacity +"KW </td>";
        tbody += "<td>"+ data.site_list[i].today_energy +"</td>";
        tbody += "<td>"+ data.site_list[i].cuf*100 +"</td>";
		tbody += "<td style='font-size:13px'>"+ data.site_list[i].update_time +"</td>";

        tbody += "</tr>";
    }

    tbody += "</tbody>";
    dataTable += tbody;
    dataTable += "</tbody></table>";

    document.getElementById('planttable').innerHTML = dataTable;

}
