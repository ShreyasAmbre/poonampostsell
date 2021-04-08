import {Options} from 'highcharts'

export const donutChartOptions: Options = {
  chart:{
    type: 'pie',
    plotShadow: false,
    width: 320,
    height: 250
  },
  credits:{
    enabled: false
  },
  
  plotOptions:{
    pie:{
      innerSize: '90%',
      borderWidth: 15,
      borderColor: null,
      slicedOffset: 20,
      dataLabels: {
        enabled: false, 
        connectorWidth:0
      },
      showInLegend: true

    }
  },
  title:{
    verticalAlign: 'middle',
    floating: false,
    text: 'BOOKINGS',
  },
  series:[
    {
      type:'pie',
      data: [
        {name: 'Today', y: 1, color: '#2680EB'},
        {name: 'Week', y: 2, color: '#FF0000 '},
        {name: 'Month', y: 3, color: '#FFCC00'},
        {name: 'Year', y: 4, color: '#71D875'},
        // {name: 'Total', y: 5, color: '#71D875'},
      ]
    }
  ],
  legend: {
    align:'center',
    itemDistance: 50
  },
}

export const donutChartOptions2: Options = {
  chart:{
    type: 'pie',
    plotShadow: false,
    width: 350,
    height: 250
  },
  
  credits:{
    enabled: false
  },
  plotOptions:{
    pie:{
      innerSize: '90%',
      borderWidth: 15,
      borderColor: null,
      slicedOffset: 20,
      dataLabels: {
        enabled: false, 
        connectorWidth:0
      },
      showInLegend: true
    }
  },
  title:{
    verticalAlign: 'middle',
    floating: false,
    text: 'PAYMENTS',
  },
  series:[
    {
      type:'pie',
      data: [
        {name: 'Today', y: 1, color: '#6a35ca'},
        {name: 'Week', y: 2, color: '#95CA35 '},
        {name: 'Month', y: 3, color: '#32BBCD'},
        {name: 'Year', y: 4, color: '#CD4432'},
        // {name: 'Total', y: 5, color: '#71D875'},
      ]
    }
  ],

  legend: {
    align:'center',
    itemDistance: 50
},
}

export const donutChartOptions3: Options = {
  chart:{
    type: 'pie',
    plotShadow: false,
    width: 350,
    height: 250
  },
  credits:{
    enabled: false
  },
  plotOptions:{
    pie:{
      innerSize: '90%',
      borderWidth: 15,
      borderColor: null,
      slicedOffset: 20,
      dataLabels: {
        enabled: false, 
        connectorWidth:0
      },
      showInLegend: true
    }
  },
  title:{
    verticalAlign: 'middle',
    floating: false,
    text: 'INVENTORY',
  },
  series:[
    {
      type:'pie',
      data: [
        {name: 'Today', y: 1, color: '#D926D6'},
        {name: 'Week', y: 2, color: '#26D929 '},
        {name: 'Month', y: 3, color: '#C1E01F'},
        {name: 'Year', y: 4, color: '#3E1FE0'},
        // {name: 'Total', y: 5, color: '#71D875'},
      ]
    }
  ],
  legend: {
    align:'center',
    itemDistance: 50
  },
}
export const donutChartOptions4: Options = {
  chart:{
    type: 'pie',
    plotShadow: false,
    width: 350,
    height: 250
  },
  credits:{
    enabled: false
  },
  plotOptions:{
    pie:{
      innerSize: '90%',
      borderWidth: 15,
      borderColor: null,
      slicedOffset: 20,
      dataLabels: {
        enabled: false, 
        connectorWidth:0
      },
      showInLegend: true
    }
  },
  title:{
    verticalAlign: 'middle',
    floating: false,
    text: 'REGISTRATION',
  },
  series:[
    {
      type:'pie',
      data: [
        {name: 'Today', y: 11315292.00, color: '#6336BB'},
        {name: 'Week', y: 5078472.00, color: '#BE61CA '},
        {name: 'Month', y: 2491100.00, color: '#F2BC5E'},
        {name: 'Year', y: 1701000.00, color: '#F13C59'},
        // {name: 'Total', y: 5, color: '#71D875'},
      ]
    }
  ],
  legend: {
    align:'center',
    itemDistance: 50
  },
}

