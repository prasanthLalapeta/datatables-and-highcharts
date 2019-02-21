var draw = false;

var dataSet = [
  ["China", "1,409,517,397", "150", "37"],
  ["India", "1,339,180,127", "450", "27"],
  ["U.S", "324,459,463", "35", "38"],
  ["Indonesia", "263,991,379", "146", "28"],
  ["Brazil", "209,288,278", "25", "31"],
  ["Pakistan", "197,015,955", "256", "22"],
  ["Nigeria", "190,886,311", "210", "18"],
  ["Bangladesh", "164,669,751", "1,265", "26"],
  ["Russia", "143,989,754", "9", "39"],
  ["Mexico", "129,163,276", "66", "28"],
  ["Japan", "127,484,450", "350", "46"],
  ["Ethiopia", "104,957,438", "105", "19"],
  ["Philippines", "104,918,090", "352", "24"],
  ["Egypt", "97,553,151", "98", "25"],
  ["Viet Nam", "95,540,800", "308", "30"],
  ["Germany", "82,114,224", "236", "46"],
  ["DR Congo", "81,339,988", "36", "17"],
  ["Iran", "81,162,788", "50", "30"],
  ["Turkey", "80,745,020", "105", "30"],
  ["Thailand", "69,037,513", "135", "38"],
  ["U.K.", "66,181,585", "274", "40"],
  ["France", "64,979,548", "119", "49"],
  ["Italy", "59,359,900", "202", "46"],
  ["Tanzania", "57,310,019", "65", "17"],
  ["South Africa", "56,717,156", "47", "26"]
];

init();

/** FUNCTIONS **/

function init() {
  $('#dt-table').DataTable( {
    data: dataSet,
    "columns": [
        { title: "Country" },
        { title: "Population (2019)" },
        { title: "Density (P/Km²)" },
        { title: "Med. Age" }
    ]
} );
  // initialize DataTables
  var table = $("#dt-table").DataTable();
  console.log(table,'tableData');
  // get table data
  var tableData = getTableData(table);
  // create Highcharts
  createHighcharts(tableData);
  // table events
  setTableEvents(table);
}

function getTableData(table) {
  var dataArray = [],
  countryArray = [],
  populationArray = [],
  densityArray = [];

  // loop table rows
  table.rows({ search: "applied" }).every(function () {
    var data = this.data();
    countryArray.push(data[0]);
    populationArray.push(parseInt(data[1].replace(/\,/g, "")));
    densityArray.push(parseInt(data[2].replace(/\,/g, "")));
  });

  // store all data in dataArray
  dataArray.push(countryArray, populationArray, densityArray);

  return dataArray;
}

function createHighcharts(data) {
  Highcharts.setOptions({
    lang: {
      thousandsSep: "," } });



  Highcharts.chart("chart", {
    title: {
      text: "DataTables to Highcharts" },

    subtitle: {
      text: "Data from worldometers.info" },

    xAxis: [
    {
      categories: data[0],
      labels: {
        rotation: -45 } }],



    yAxis: [
    {
      // first yaxis
      title: {
        text: "Population (2017)" } },


    {
      // secondary yaxis
      title: {
        text: "Density (P/Km²)" },

      min: 0,
      opposite: true }],


    series: [
    {
      name: "Population (2019)",
      color: "#0071A7",
      type: "column",
      data: data[1],
      tooltip: {
        valueSuffix: " M" } },


    {
      name: "Density (P/Km²)",
      color: "#FF404E",
      type: "spline",
      data: data[2],
      yAxis: 1 }],


    tooltip: {
      shared: true },

    legend: {
      backgroundColor: "#ececec",
      shadow: true },

    credits: {
      enabled: false },

    noData: {
      style: {
        fontSize: "16px" } } });



}

function setTableEvents(table) {
  // listen for page clicks
  table.on("page", function () {
    draw = true;
  });

  // listen for updates and adjust the chart accordingly
  table.on("draw", function () {
    if (draw) {
      draw = false;
    } else {
      var tableData = getTableData(table);
      createHighcharts(tableData);
    }
  });
}
