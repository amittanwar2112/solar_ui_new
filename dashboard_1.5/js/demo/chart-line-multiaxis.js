



var lineChartData1 = {
			labels: ['08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30'],
			datasets: [{
				label: 'AC Power',
				borderColor: window.chartColors.red,
				backgroundColor: window.chartColors.red,
				fill: false,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
				yAxisID: 'y-axis-1',
			}, {
				label: 'Irradiance',
				borderColor: window.chartColors.blue,
				backgroundColor: window.chartColors.blue,
				fill: false,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
				yAxisID: 'y-axis-2'
			}]
};



var multi_ax_data1 = {
    data: lineChartData1,
    title_on:true,
    title: 'Irradiance Vs AC Power',
    y1_label: 'AC Power',
    y2_label: 'Irradiance',
    x_label: 'Time'
};


var lineChartData2 = {
			labels: ['08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30'],
			datasets: [{
				label: 'DC Voltage',
				borderColor: window.chartColors.red,
				backgroundColor: window.chartColors.red,
				fill: false,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
				yAxisID: 'y-axis-1',
			}, {
				label: 'Current',
				borderColor: window.chartColors.blue,
				backgroundColor: window.chartColors.blue,
				fill: false,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
				yAxisID: 'y-axis-2'
			}]
};



var multi_ax_data2 = {
    data: lineChartData2,
    title_on:true,
    title: 'DC Voltage Vs Current',
    y1_label: 'DC Voltage',
    y2_label: 'Current',
    x_label: 'Time'
};



function draw_multi_axis_line_chart( multi_line_data, multi_line_ctx ) {
    var multi_line_chart = new Chart(multi_line_ctx, {
				type: 'line',
				data: multi_line_data.data,
				options: {
					  responsive: true,
            maintainAspectRatio: false,
					  hoverMode: 'index',
					  stacked: false,
					  title: {
						    display: multi_line_data.title_on,
						    text: multi_line_data.title
					  },
					  scales: {
						    yAxes: [{
							      type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							      display: true,
							      position: 'left',
                    id:'y-axis-1',
                    scaleLabel: {
							          display: true,
							          labelString: multi_line_data.y1_label
						        }
						    },{
							      type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							      display: true,
							      position: 'right',
                    id:'y-axis-2',
                    scaleLabel: {
							          display: true,
							          labelString: multi_line_data.y2_label
						        }
						    }],
                xAxes: [{
						        display: true,
						        scaleLabel: {
							          display: true,
							          labelString: multi_line_data.x_label
						        }
					      }]
					  }
				}
		});
}


function getPowerVsIrradiationChartData( siteId, recDate ) {
    console.log("getting chart data");
    // send it out
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://13.233.236.200:5000/irradianceVspower/?site_id="+siteId+"&date="+recDate);
	console.log("http://13.233.236.200:5000/irradianceVspower/?site_id="+siteId+"&date="+recDate);
    xhr.send();

    xhr.onload = () => drawPowerVsIrradiationPlant(xhr.response);

}

function drawPowerVsIrradiationPlant(chartDataStr) {
    console.log(chartDataStr);
    let chartData = JSON.parse(chartDataStr);
    if(chartData == null){
        return;
    }
    console.log(chartData);
    document.getElementById('dash_chart_div').innerHTML = "";
    $('#dash_chart_div').append('<canvas id="dash_chart"></canvas>');
    let pw_irr_ctx = document.getElementById('dash_chart').getContext('2d');


    let timestamps = chartData.record_time;
    let powerArr = chartData.power;
	for(let j in powerArr){
	 powerArr[j] = powerArr[j].toFixed(2);
	}
		console.log("power arr");
		console.log(powerArr);
    let irradiation = chartData.irradiation;
	for(let i in timestamps){
	
	  timestamps[i] = timestamps[i].slice(10);
	//console.log(splittime[i]);
	}

    let plantPowerIrrData = {
			  labels: timestamps,
			  datasets: [{
				    label: 'AC Power',
				    borderColor: window.chartColors.red,
				    backgroundColor: window.chartColors.red,
				    fill: false,
				    data: powerArr,
				    yAxisID: 'y-axis-1',
			  }, {
				    label: 'Irradiance',
				    borderColor: window.chartColors.yellow,
				    backgroundColor: window.chartColors.yellow,
				    fill: false,
				    data: irradiation,
				    yAxisID: 'y-axis-2'
			  }]
    };

    let plantPowerIrrChartData = {
        data: plantPowerIrrData,
        title_on:true,
        title: 'Irradiance Vs AC Power',
        y1_label: 'AC Power',
        y2_label: 'Irradiance',
        x_label: 'Time'
    };

    console.log(plantPowerIrrData);
    draw_multi_axis_line_chart( plantPowerIrrChartData, pw_irr_ctx );
//    e.preventDefault();
}



