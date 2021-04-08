import {Options} from 'highcharts';

export const barChartOptions: Options = {
    chart: {
        type: 'bar',
    },
    credits:{
        enabled: false
    },
    title: {
        text: 'Summary Report'
    },
    yAxis:{
        visible: false
    },
    legend:{
        enabled: true
    },
    xAxis: {
        lineColor: '#fff',
        categories: [
            '1BHK',
            '2BHK',
            '3BHK',
        ],
    },
    plotOptions:{
        series:{
            borderRadius: 5,
        }as any,
    },
    series: [
        {
            type: 'column',
            color: '#506ef9',
            data: [
                { y: 144.0, color: '#6a35ca' },
                { y: 216.4, color: '#95CA35' },
                { y: 54.4 , color: '#32BBCD'},
            ],
        }
    ]
}