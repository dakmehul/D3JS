var app = angular.module('d3App', ['ui.router','ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('bar', {
            url: '/barChart',
            templateUrl: 'scripts/app/charts/bar-chart/bar-chart.html',
            controller: 'barChartCtrl'
        })
        .state('line', {
            url: "/lineChart",
            templateUrl: "scripts/app/charts/line-chart/line-chart.html",
            controller: 'lineChartCtrl'
        })
        .state('scatterPlot', {
            url: "/scatter-plot",
            templateUrl: "scripts/app/charts/scatter-plot/scatter-plot.html",
            controller: 'scatterPlotCtrl'
        })
        .state('hivePlot', {
            url: "/hive-plot",
            templateUrl: "scripts/app/hive-plot/hive-plot.html",
            controller: 'hivePlotCtrl'
        })
        .state('hiveJson', {
            url: "/hive-with-Json",
            templateUrl: "scripts/app/hive-plot/hive-json.html",
            controller: 'hiveJsonCtrl'
        })
});