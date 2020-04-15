


var line_data = {
    labels:['08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30'],
    datasets: [{
				label: 'Inverter1',
				backgroundColor: window.chartColors.red,
				borderColor: window.chartColors.red,
				data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor()
				],
				fill: false,
		}, {
				label: 'Inverter2',
				fill: false,
				backgroundColor: window.chartColors.blue,
				borderColor: window.chartColors.blue,
				data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor()
				],
		}],
    title:"AC Power",
    title_on: true,
    x_label: "Time",
    y_label: "AC Power"
};


var dash_chart_ctx = document.getElementById('dash_chart').getContext('2d');

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


//draw_line_chart(line_data, dash_chart_ctx);


function getPlantPowerChartData( siteId, recDate ) {
    console.log("getting power chart data");
    // send it out
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://13.233.236.200:5000/dashboard/plant/power_vs_irradiation?site_id="+siteId+"&date="+recordDate);
    xhr.send();

    xhr.onload = () => drawPlantPowerChart(xhr.response);

}

function drawPlantPowerChart( chartDataStr ) {
    let chartData = JSON.parse(chartDataStr);
    console.log(chartData);
    let plantPowerData = {
        labels: chartData.timestamp,
        datasets: [{
				    label: 'Plant Power (KW)',
				    backgroundColor: window.chartColors.red,
				    borderColor: window.chartColors.red,
				    data: chartData.power,
				    fill: false,
		    }],
        title:"AC Power",
        title_on: true,
        x_label: "Time",
        y_label: "AC Power"
    };

    document.getElementById('dash_chart_div').innerHTML = "";
    $('#dash_chart_div').append('<canvas id="dash_chart"></canvas>');
    let pwr_ctx = document.getElementById('dash_chart').getContext('2d');

    draw_line_chart( plantPowerData, pwr_ctx );
}


function getInverterPowerData( siteId, recordDate ) {
    console.log("getting inverter power chart data");
    // send it out
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://13.233.236.200:5000/powergraph/?site_id="+siteId+"&date="+recordDate);
    xhr.send();

    xhr.onload = () => drawInverterPower(xhr.response);
}


function drawInverterPower( selected_inverter ) {
    
    var invDataSetArr = [];
	let inverter_name=Object.keys(invertersPowerArr);
	let power_arr=Object.values(invertersPowerArr);
	console.log("inverterpower");
 
	 //console.log(invPowerTs);
	//console.log("only_time");
	//console.log(inverter_name);
        //console.log(Samples.utils.color(idx));
        var invPwrDataset = {
				    label: inverter_name[selected_inverter],
				    backgroundColor: Samples.utils.color(0),
				    borderColor: Samples.utils.color(0),
				    data: power_arr[selected_inverter],
				    fill: false,
		    };
			
			//console.log(invertersPowerArr[selected_inverter]);
			//console.log(power_arr[selected_inverter]);
        
   
	//console.log("power_arr");
	//console.log(power_arr);
	//console.log(Object.values(invertersPowerArr));
	invDataSetArr.push(invPwrDataset);
 

    let invPowerChartData = {
        labels:splitpowertime,
        datasets: invDataSetArr,
        title:"AC Power",
        title_on: true,
        x_label: "Time",
        y_label: "AC Power"
    };
    //console.log(invDataSetArr);

    document.getElementById('dash_chart_div').innerHTML = "";
    $('#dash_chart_div').append('<canvas id="dash_chart"></canvas>');
    let pwr_ctx = document.getElementById('dash_chart').getContext('2d');

    draw_line_chart( invPowerChartData, pwr_ctx );
}

function drawInverterEnergy( selected_inverter ) {
    
    var invDataSetArr = [];
	let inverter_name=Object.keys(invertersEnergyArr);
	let energy_arr=Object.values(invertersEnergyArr);
	console.log("inverterenergy");
    for(let i in invPowerTs){
	   var only_time = i.split("  ");
	    //invPowerTs.push(only_time[0]);
	  }
	 //console.log(invPowerTs);
	//console.log("only_time");
	//console.log(only_time);
        //console.log(Samples.utils.color(idx));
        var invPwrDataset = {
				    label: inverter_name[selected_inverter],
				    backgroundColor: Samples.utils.color(0),
				    borderColor: Samples.utils.color(0),
				    data: energy_arr[selected_inverter],
				    fill: false,
		    };
			
			//console.log(invertersPowerArr[selected_inverter]);
			//console.log(power_arr[selected_inverter]);
        
   
	//console.log("energy_arr");
	//console.log(energy_arr);
	//console.log(Object.values(invertersPowerArr));
	invDataSetArr.push(invPwrDataset);
 

    let invPowerChartData = {
        labels:splitenergytime,
        datasets: invDataSetArr,
        title:" Energy",
        title_on: true,
        x_label: "Time",
        y_label: " Energy"
    };
    //console.log(invDataSetArr);

    document.getElementById('dash_chart_div').innerHTML = "";
    $('#dash_chart_div').append('<canvas id="dash_chart"></canvas>');
    let pwr_ctx = document.getElementById('dash_chart').getContext('2d');

    draw_line_chart( invPowerChartData, pwr_ctx );
}

function drawString(selected_inverter) {

 
	var invDataSetArr = [];


	console.log("timestamps");
	//console.log(invStringTs);
	
	let currentArr = [];
	
	let currentArr_selected_inverter =[];



	for(let j in invertersCurrentArr ){
    currentArr.push(invertersCurrentArr[j]);
	 
	}
    console.log("currentArr");
	console.log(currentArr);
	
   for(let k in currentArr[selected_inverter] ){
	   
	   	for( let j=0;j<currentArr[selected_inverter][0].length;j++ ){
		currentArr_selected_inverter.push( currentArr[selected_inverter][k][j]);
	   }
		
	}
	console.log(currentArr_selected_inverter);
	

    console.log("length");
	console.log(currentArr[selected_inverter][0].length)
   for( let j=0;j<currentArr[selected_inverter][0].length;j++ ) {
	   
        console.log(Samples.utils.color(idx));
        let invPwrDataset = {
				    label: "MPPT"+(j+1),
				    backgroundColor: Samples.utils.color(j),
				    borderColor: Samples.utils.color(j),
				    data: currentArr_selected_inverter,
				    fill: false,
		    };
        invDataSetArr.push(invPwrDataset);
    }
	 
     let invPowerChartData = {
        labels:invStringTs,
        datasets: invDataSetArr,
        title:"Dc Current",
        title_on: true,
        x_label: "Time",
        y_label: "Dc Current"
    };


    document.getElementById('dash_chart_div').innerHTML = "";
    $('#dash_chart_div').append('<canvas id="dash_chart"></canvas>');
    let pwr_ctx = document.getElementById('dash_chart').getContext('2d');

    draw_line_chart( invPowerChartData, pwr_ctx );
    //console.log(plantPowerIrrData);
   
//    e.preventDefault();
}	

