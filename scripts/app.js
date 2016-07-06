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
});