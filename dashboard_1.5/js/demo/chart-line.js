


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
    xhr.open("GET", "http://13.233.236.200:5000/plantpowergraph/?site_id="+siteId+"&date="+recDate);
    console.log("http://13.233.236.200:5000/plantpowergraph/?site_id="+siteId+"&date="+recordDate);
    xhr.send();

    xhr.onload = () => drawPlantPowerChart(xhr.response);

}

function drawPlantPowerChart( chartDataStr ) {
    let chartData = JSON.parse(chartDataStr);
    console.log("chartData time");
	let sliceinvPowerChartTs =[];
	let powerArr = chartData.power;
	for(let j in powerArr){
	 powerArr[j] = powerArr[j].toFixed(2);
	}
	//console.log(chartData.record_time);
	for(let i in chartData.record_time){
	
	  sliceinvPowerChartTs[i] = chartData.record_time[i].slice(10);
	//console.log(splittime[i]);
	}
	console.log(sliceinvPowerChartTs);
    let plantPowerData = {
        labels: sliceinvPowerChartTs,
        datasets: [{
				    label: 'Plant Power (KW)',
				    backgroundColor: window.chartColors.red,
				    borderColor: window.chartColors.red,
				    data: powerArr,
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
//http://13.233.236.200:5000/powergraph/?site_id="+1+"&date="+2020-02-01
    xhr.onload = () => drawInverterPower(xhr.response);
}

function drawInverterPower( invArr ) {
    console.log('Drawing inverter power');
    let invDataSetArr = [];
	console.log("invArr");
	console.log(invArr);
    for( idx in invArr ) {
		console.log("invertersPowerArrinsidealoop");
		console.log(invertersPowerArr[invArr[idx]]);
        //console.log(Samples.utils.color(idx));
        let invPwrDataset = {
				    label: invArr[idx],
				    backgroundColor: Samples.utils.color(idx),
				    borderColor: Samples.utils.color(idx),
				    data: invertersPowerArr[invArr[idx]],
				    fill: false,
		    };
        invDataSetArr.push(invPwrDataset);
    }
		console.log("invPwrDataset");
		console.log(invDataSetArr);

    let invPowerChartData = {
        labels:sliceinvPowerTs,
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


function drawirradance( invirr) {
    console.log('Drawing irradance');
    
   
        let invPwrDataset = {
				    label: invArr[idx],
				    backgroundColor: Samples.utils.color(0),
				    borderColor: Samples.utils.color(0),
				    data: invirr ,
				    fill: false,
		    };
        invDataSetArr.push(invPwrDataset);
    

    let invPowerChartData = {
        labels:sliceinvPowerTs,
        datasets: invDataSetArr,
        title:"AC Power",
        title_on: true,
        x_label: "Time",
        y_label: "AC Power"
    };
    console.log(invDataSetArr);

    document.getElementById('dash_chart_div').innerHTML = "";
    $('#dash_chart_div').append('<canvas id="dash_chart"></canvas>');
    let pwr_ctx = document.getElementById('dash_chart').getContext('2d');

    draw_line_chart( invPowerChartData, pwr_ctx );
}


function drawString(selected_inverter) {

 
	var invDataSetArr = [];

	console.log("timestamps");
	
	let currentArr = [];
	
	let currentArr_selected_inverter =[];
    let currentArr_selected_inverter1 =[];

	for(idx in selected_inverter  ){
		
	currentArr_selected_inverter1.push( invertersCurrentArr[selected_inverter[idx]]);
	   
	}


	console.log("currentArr_selected_inverter1");
	console.log(selected_inverter);

	console.log("mpptcount.mppt");
	console.log(mpptcount.mppt);
	for(idx in selected_inverter){
      for( let j=0;j<mpptcount.mppt[selected_inverter[idx]];j++ ) {
		  console.log( "mpptcount.mppt[selected_inverter[idx]]");
	  console.log( mpptcount.mppt[selected_inverter[idx]]);
        console.log(Samples.utils.color(idx));
		console.log("invertersCurrentArr[selected_inverter[idx]]")
		//console.log(invertersCurrentArr[selected_inverter[idx]]);
        let invPwrDataset = {
				    label: selected_inverter[idx]+"_"+"MPPT"+(j+1),
				    backgroundColor: Samples.utils.color(j+idx),
				    borderColor: Samples.utils.color(j),
				    data: invertersCurrentArr[selected_inverter[idx]],
				    fill: false,
		    };
        invDataSetArr.push(invPwrDataset);
    }
	}
	console.log("invDataSetArr");
	console.log(invDataSetArr);
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


