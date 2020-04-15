// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}



var bar_ctx = document.getElementById("myBarChart");

function draw_dailyenergy_chart( bar_data_str, bar_ctx ) {
    // Bar Chart Example
    console.log(bar_data_str);
    let bar_data_json = JSON.parse(bar_data_str);
    let bar_data = {};
    bar_data['labels'] = bar_data_json.timestamp;
	//console.log("time stamp");
	//console.log(bar_data_json.timestamp);
    bar_data['data'] = bar_data_json.energy;
    var myBarChart = new Chart(bar_ctx, {
        type: 'bar',
        data: {
            labels: bar_data.labels,
            datasets: [{
                label: "Energy",
                backgroundColor: "rgba(14, 163, 248, 0.5)",
                hoverBackgroundColor: "rgba(14, 163, 248, 0.7)",
                borderColor: "#3399ff",
                data: bar_data.data,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    time: {
                        unit: 'day'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 20
                    },
                    maxBarThickness: 40,
                }],
                yAxes: [{
                    ticks: {
                        padding: 10,
			beginAtZero: true
                        // Include a dollar sign in the ticks
                        //callback: function(value, index, values) {
                        //    return '$' + number_format(value);
                        //}
                    },
                    gridLines: {
                        color: "rgb(212, 214, 215)",
                        zeroLineColor: "rgb(212, 214, 215)",
                        drawBorder: true,
                        borderDash: [0],
                        zeroLineBorderDash: [0]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                titleMarginBottom: 15,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
                callbacks: {
                    label: function(tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ' '+ Math.round( tooltipItem.yLabel ) + ' KW';
                    }
                }
            },
        }
    });
}



function getDailyEnergyChartData( siteId ) {
    console.log("getting daily energy chart data");
    // send it out
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://13.233.236.200:5000/dashboard/dailyenergychart?site_id="+siteId);
    xhr.send();

    xhr.onload = () => draw_dailyenergy_chart(xhr.response, bar_ctx);

}

