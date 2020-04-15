



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




function drawCurrentVsVoltagePlant(selected_inverter,selected_MPPT) {

    //console.log(chartData);
    document.getElementById('dash_chart_div').innerHTML = "";
    $('#dash_chart_div').append('<canvas id="dash_chart"></canvas>');
    let pw_irr_ctx = document.getElementById('dash_chart').getContext('2d');


    //let timestamps = invStringTs;
	//for(let i in timestamps){
		//timestamps[i] = timestamps[i].slice(10);
	//}
	console.log("timestamps");
	//console.log(invStringTs);
	let voltageArr =[];
	let currentArr = [];
	let voltageArr_selected_inverter =[];
	let voltageArr_selected_inverter1 =[];
	let currentArr_selected_inverter =[];
	let mpptvoltageArr =[];
	//console.log(invertersVoltageArr);
	for(let i in invertersVoltageArr ){
    voltageArr.push(invertersVoltageArr[i]);
	 
	}
	//console.log(invertersCurrentArr);
	for(let j in invertersCurrentArr ){
    currentArr.push(invertersCurrentArr[j]);
	 
	}
	for(let k in voltageArr[selected_inverter] ){
		voltageArr_selected_inverter.push( voltageArr[selected_inverter][k][selected_MPPT]);
		//voltageArr_selected_inverter1.push( voltageArr[selected_inverter][k]);
		
	}
	let selectHtml ="";
	for( let j=0;j<voltageArr[selected_inverter][0].length;j++ ) {
		
                 selectHtml += "<li id='inv' ><a class='dropdown-item'  type='button' onclick='mpptfunction("+ j +")' name="+ j +">" +"MPPT"+[j+1]+ "</a></li>"  ;
             }
	document.getElementById('MS').innerHTML = selectHtml;
	console.log("mpptvoltageArr");
	//console.log(voltageArr_selected_inverter);
	/*	
	for(let i in voltageArr_selected_inverter1){
		for(let j=0;j<6;j++){
		mpptvoltageArr.push(voltageArr_selected_inverter1[i][j]);
		}
	}
	*/
	
	//console.log(mpptvoltageArr);
   for(let k in currentArr[selected_inverter] ){
		currentArr_selected_inverter.push( currentArr[selected_inverter][k][selected_MPPT]);
	}
     //console.log(voltageArr_selected_inverter);
	 //console.log(currentArr_selected_inverter);

    let StringData = {
			  labels: invStringTs,
			  datasets: [{
				    label: 'Current',
				    borderColor: window.chartColors.red,
				    backgroundColor: window.chartColors.red,
				    fill: false,
				    data: currentArr_selected_inverter,
				    yAxisID: 'y-axis-1',
			  }, {
				    label: 'Voltage',
				    borderColor: window.chartColors.blue,
				    backgroundColor: window.chartColors.blue,
				    fill: false,
				    data: voltageArr_selected_inverter,
				    yAxisID: 'y-axis-2'
			  }]
    };
	 
    let plantPowerIrrChartData = {
        data: StringData,
        title_on:true,
        title: 'Current Vs Voltage',
        y1_label: 'Current',
        y2_label: 'Voltage',
        x_label: 'Time'
    };

    //console.log(plantPowerIrrData);
    draw_multi_axis_line_chart( plantPowerIrrChartData, pw_irr_ctx );
//    e.preventDefault();
}




function drawacCurrentVsVoltageGraph(selected_inverter) {

    //console.log(chartData);
    document.getElementById('dash_chart_div').innerHTML = "";
    $('#dash_chart_div').append('<canvas id="dash_chart"></canvas>');
    let pw_irr_ctx = document.getElementById('dash_chart').getContext('2d');


    //let timestamps = invStringTs;
	//for(let i in timestamps){
		//timestamps[i] = timestamps[i].slice(10);
	//}
	//console.log("timestamps");
	//console.log(invacTs);
	let voltageArr =[];
	let currentArr = [];
	let voltageArr_selected_inverter =[];
	let currentArr_selected_inverter =[];
	//console.log(invertersVoltageArr);
	for(let i in invertersacVoltageArr ){
    voltageArr.push(invertersacVoltageArr[i]);
	 
	}
	//console.log(invertersCurrentArr);
	for(let j in invertersacCurrentArr ){
    currentArr.push(invertersacCurrentArr[j]);
	 
	}
	for(let k in voltageArr[selected_inverter] ){
		voltageArr_selected_inverter.push( voltageArr[selected_inverter][k][0]);
	}
   for(let k in currentArr[selected_inverter] ){
		currentArr_selected_inverter.push( currentArr[selected_inverter][k][0]);
	}
     //console.log(voltageArr_selected_inverter);
	 //console.log(currentArr_selected_inverter);
    let StringData = {
			  labels: invacTs,
			  datasets: [{
				    label: 'AC Voltage',
				    borderColor: window.chartColors.red,
				    backgroundColor: window.chartColors.red,
				    fill: false,
				    data: currentArr_selected_inverter,
				    yAxisID: 'y-axis-1',
			  }, {
				    label: 'AC Current',
				    borderColor: window.chartColors.blue,
				    backgroundColor: window.chartColors.blue,
				    fill: false,
				    data: voltageArr_selected_inverter,
				    yAxisID: 'y-axis-2'
			  }]
    };

    let plantPowerIrrChartData = {
        data: StringData,
        title_on:true,
        title: 'AC Current Vs AC Voltage',
        y1_label: 'AC Voltage',
        y2_label: 'AC Current',
        x_label: 'Time'
    };

    //console.log(plantPowerIrrData);
    draw_multi_axis_line_chart( plantPowerIrrChartData, pw_irr_ctx );
//    e.preventDefault();
}



