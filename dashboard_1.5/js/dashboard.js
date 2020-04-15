function draw_line_chart( line_data, dash_chart_ctx ) {
    var config = {
			  type: 'line',
			  data: {
				    labels: line_data.labels,
				    datasets: line_data.datasets
			  },
			  options: {
				    responsive: true,
            maintainAspectRatio: false,
				    title: {
					      display: line_data.title_on,
					      text: line_data.title
				    },
				    tooltips: {
					      mode: 'index',
					      intersect: false,
				    },
				    hover: {
					      mode: 'nearest',
					      intersect: true
				    },
				    scales: {
					      xAxes: [{
						        display: true,
						        scaleLabel: {
							          display: true,
							          labelString: line_data.x_label
						        }
					      }],
					      yAxes: [{
						        display: true,
						        scaleLabel: {
							          display: true,
							          labelString: line_data.y_label
						        }
					      }]
				    }
			  }
		};

		var myLineChart = new Chart(dash_chart_ctx, config);

}

function drawirradance( irr ,time) {
   
    //console.log(chartData);
    let plantPowerData = {
        labels: time,
        datasets: [{
				    label: 'Irradiance',
				    backgroundColor: window.chartColors.red,
				    borderColor: window.chartColors.red,
				    data: irr,
				    fill: false,
		    }],
        title:"Irradiance",
        title_on: true,
        x_label: "Time",
        y_label: "Irradiance"
    };

    document.getElementById('dash_chart_div1').innerHTML = "";
    $('#dash_chart_div1').append('<canvas id="dash_chart1"></canvas>');
    let pwr_ctx = document.getElementById('dash_chart1').getContext('2d');

    draw_line_chart( plantPowerData, pwr_ctx );
}

function IrradiationChartData( siteId, recDate ) {
    console.log("getting chart data");
    // send it out
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://13.233.236.200:5000/irradianceVspower/?site_id="+siteId+"&date="+recDate);
	console.log("http://13.233.236.200:5000/irradianceVspower/?site_id="+siteId+"&date="+recDate);
    xhr.send();

    xhr.onload = () => drawIrradiationPlant(xhr.response);

}
function drawIrradiationPlant(response){
	let data = JSON.parse(response);
	let timestamps = data.record_time;
    for(let i in timestamps){
	
	  timestamps[i] = timestamps[i].slice(10);
	//console.log(splittime[i]);
	}
	let irradiation = data.irradiation;
	console.log(" irradance");
	console.log(irradiation);
	drawirradance(irradiation,timestamps);
}


function updatePlantData( plantInfo ) {
 plantInfo = JSON.parse(plantInfo);
    if(plantInfo == null ){
        return;
    }

    var plantPower = plantInfo['p_total_act_pwr'];
    var plantEnergy = plantInfo['p_total_energy'];
    var plantTodayEnergy = plantInfo['p_today_energy'];
    var plantCapacity = plantInfo['plant_capacity'];

    var commisionedOn = plantInfo['commisioned_date'];
    var integratedOn = plantInfo['integration_date'];
    var irradiance = plantInfo['irradiation'];
    var moduleTemp = plantInfo['module_temp'];
    var cuf = 0.9;
    var lastUpdate = plantInfo['record_time'];
    var site_name = plantInfo['site_name'];
    var plant_pr = plantInfo['p_pr']
	
    document.getElementById('lifetime_gen').innerHTML=(plantEnergy)/1000+' MWh';
    document.getElementById('plant_capacity').innerHTML=plantCapacity+' KWp';
    document.getElementById('plant_tenergy').innerHTML=plantTodayEnergy+' KWh';
    document.getElementById('plant_power').innerHTML=plantPower.toFixed(2)+' KW';
    document.getElementById('plant_capacity2').innerHTML=plantCapacity+' KWp';
    document.getElementById('comm_on').innerHTML=commisionedOn;
     document.getElementById('module_temp').innerHTML=moduleTemp+' C';
	 document.getElementById('irradation').innerHTML=irradiance+' W/m2';
    document.getElementById('irradiation_dash').innerHTML=irradiance+' W/m2';
    document.getElementById('module_temp_dash').innerHTML=moduleTemp+' C';
    document.getElementById('plant_cuf').innerHTML=0.9;
    document.getElementById('plant_pr').innerHTML=plant_pr.toFixed(2)+'%';
    document.getElementById('plant_last_update').innerHTML=lastUpdate;
    document.getElementById('site_name').innerHTML=site_name;
}


function getInstantDataFromServer( siteId ) {

    // send it out
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://13.233.236.200:5000/dashboard/instantaneous?site_id="+siteId);
    xhr.send();

    xhr.onload = () => updatePlantData(xhr.response);

}

function myFunction() {
let today = new Date();
console.log("new date");
//var n = today.getTime();
//console.log(n);
let date = today.getFullYear()+'-'+("0" + (today.getMonth()+1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2);
let time = today.getHours() + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + "00";
let dateTime = date+' '+time; 
console.log(" today date time");
 console.log(dateTime);
return dateTime
}


function getInverterDataFromServer( siteId ) {
$("#dataTable").dataTable().fnDestroy();
    // send it out
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://13.233.236.200:5000/inverters/?site_id="+siteId);
    xhr.send();

    xhr.onload = () => addInverterToDataTable(xhr.response);

}

function addInverterToDataTable( inverterdata ) {
	
    console.log(inverterdata);
    let invDataArr = [];
	let inverterData = null;
     inverterData = JSON.parse(inverterdata);
	let invData=[];
	console.log("inverterData");
    console.log(inverterData);
	let current_time = myFunction();
	current_time = new Date(current_time);
	current_time = current_time.getTime();
	let n = "2020-03-21 14:35:00";
	n = new Date(n)
	console.log(" current_time");
	console.log(n.getTime());
	
	let d= new Date("2020-03-21 14:00:00");
	//let diff = (current_time - only_hours);
	console.log("diff");
	console.log(d.getTime());
	console.log(n.getTime()- d.getTime());
	//console.log(typeof diff);
	
	//console.log(only_hours);
    for(idx in inverterData) {
        console.log(inverterData[idx]);
		let inverter_time = new Date(inverterData[idx].record_time);
		 inverter_time = inverter_time.getTime();
		//let only_hours ="05";
		console.log(" time comparsion");
		console.log(current_time);
		console.log(inverter_time);
		let diff =(current_time - inverter_time);
		console.log(diff);
			
		  if(diff < 2100000){
		  
		    invData = [
		    document.innerHTML = '<i class="fas fa-wifi" style="font-size:25px;color:green"></i>',
		    inverterData[idx].controller_name,
		    inverterData[idx].inv_cap,
            inverterData[idx].ac_freq[0],
            
            inverterData[idx].total_acp,
            inverterData[idx].total_energy,
            inverterData[idx].today_energy,
			inverterData[idx].op_state,
            inverterData[idx].record_time
            ];
		
		  }
		  else{
			  
			invData = [
		    document.innerHTML = '<i class="fas fa-wifi" style="font-size:25px;color:red"></i>',
		    inverterData[idx].controller_name,
		    inverterData[idx].inv_cap,
            inverterData[idx].ac_freq[0],
            
            inverterData[idx].total_acp,
            inverterData[idx].total_energy,
            inverterData[idx].today_energy,
			inverterData[idx].op_state,
            inverterData[idx].record_time
            ];
			  
			  
			  
		  }
		  

        invDataArr.push(invData);
    }

    inverterDataStore = invDataArr;
	
    $('#dataTable').DataTable( {
        data: inverterDataStore
    } );
}


function getInverterPowerChartData( siteId, recordDate, chartCallback, invArr, drawChart ) {

    // send it out
	console.log("getInverterPowerChartData");
    let xhr = new XMLHttpRequest();
    let url = 'http://13.233.236.200:5000/powergraph/?site_id='+siteId+'&date='+recordDate;
	console.log("url");
    console.log(url);
	
    xhr.open("GET", url);
    xhr.send();
    let dummyinvdata = {
        DLT01_pwr: [30.0, 33.2],
        DLT02_pwr: [43.4, 34.6],
        DLT01_ts: ["14:00", "14:05"],
        DLT02_ts:["14:00", "14:05"]
    };
    xhr.onload = () => populateInvertersPower(xhr.response, chartCallback, invArr, drawChart);
}


function populateInvertersPower( chartDataStr, chartCallback, invArr, drawChart ) {

    //console.log(chartDataStr);
    let chartData = JSON.parse( chartDataStr );
    console.log("chartData");
	console.log(chartData);
    let invSelect = document.getElementById('inverter_select_pwr');
	
	
    inverterList = chartData.inv_list;
    for( let key in chartData ) {
        let splitKey = key.split("_");
        if(splitKey[1] === "pwr") {
            //inverterList.push(splitKey[0]);
            invertersPowerArr[splitKey[0]] = chartData[key];
        } else if(splitKey[1] === "ts") {
            invPowerTs = chartData[key];
        }
        console.log(chartData[key]);
    }
    let selectHtml = "";
	
    for( idx in inverterList ) {
		
        selectHtml += "<option value="+inverterList[idx]+">"+inverterList[idx]+"</option>";
	}
		
    if(drawChart) {
        chartCallback(invArr);
    }else {
        invSelect.innerHTML = selectHtml;
		 //invSelectM.innerHTML = selectHtmlM;
        console.log('Enabling select picker');
        $('#inverter_select_pwr').selectpicker({noneSelectedText: 'Select Inverter'});
		
    }
    //console.log("Inverter List");
    //console.log(inverterList);

    //onsole.log(invPowerTs);
	for(let i in invPowerTs){
	
	 sliceinvPowerTs[i] = invPowerTs[i].slice(10);
	//console.log(splittime[i]);
	}
	console.log(invPowerTs);
}



	function getInverterStringChartData(site_Id,recordDate, chartCallback, invArr, drawChart) {

	           // send it out
	           let xhr = new XMLHttpRequest();
			   
	           let url = 'http://13.233.236.200:5000/dcvoltagevscurrentplot/?site_id='+site_Id+'&date='+recordDate;
	           console.log(url);
	           xhr.open("GET", url);
	           xhr.send();

	           xhr.onload = () => populateInvertersString(xhr.response,chartCallback, invArr, drawChart);
         }
		 
				 
	function populateInvertersString(chartDataStr,chartCallback, invArr, drawChart){
		
		
		let StringchartData = JSON.parse( chartDataStr );
		//console.log("string data");
		//console.log(StringchartData);
		invStringTs =[];
		invertersCurrentArr = {};
	    invertersVoltageArr = {};
		
		mpptcount={};
             for( let key in StringchartData ) {
                 let splitKey = key.split("_");
                 if(splitKey[1] === "dcvoltage") {
                     //inverterList.push(splitKey[0]);
                     invertersVoltageArr[splitKey[0]] = StringchartData[key];
                 } else if(splitKey[1] === "ts") {
                     invStringTs = StringchartData[key];
                 } else if(splitKey[1] === "dccurrent"){
				  invertersCurrentArr[splitKey[0]] = StringchartData[key];
				 } else if(splitKey[1] === "count"){
				  mpptcount[splitKey[0]] = StringchartData[key];
				 }
				 
                 //console.log(chartData[key]);
             }
			  if(drawChart) {
               chartCallback(invArr);
                }

			//console.log("mpptcount");
			let mpps = [];
			let value =[];

			 
			 for(let i in mpptcount.mppt){
			 value.push(mpptcount.mppt[i])
			 }
			//console.log("invertersCurrentArr");	
			 //console.log(invertersCurrentArr);
			
			for(let i in invStringTs){ 
	             invStringTs[i] = invStringTs[i].slice(10);  
	           }

	           
		}	





