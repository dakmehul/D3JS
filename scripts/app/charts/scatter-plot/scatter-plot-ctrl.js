/**
 * Created by mehul on 08-Jul-16.
 */

angular.module('d3App').controller('scatterPlotCtrl', ['$scope', function($scope) {
    var w = 400;
    var h = 350;

    var monthlySales = [
        {"month":10, "sales":100},
        {"month":20, "sales":130},
        {"month":30, "sales":250},
        {"month":40, "sales":300},
        {"month":50, "sales":265},
        {"month":60, "sales":225},
        {"month":70, "sales":180},
        {"month":80, "sales":120},
        {"month":90, "sales":145},
        {"month":100, "sales":130}
    ];

    function showMinMax(ds, col, val, type){
        var max = d3.max(ds, function(d){return d[col]; });
        var min = d3.min(ds, function(d){return d[col]; });

        if(type == 'minmax' && (val == max || val ==min)){
            return val;
        }else{
            if(type == 'all'){
                return val;
            }
        }
    }

//KPI color
    function salesKPI(d){
        if (d>=250){return "#33CC66"; }else
        if(d<250){return "#666666"; }
    }

//create scatter Plot
    var svg = d3.select("body").append("svg").attr({
        width:w,height:h
    });

//add dots
    $scope.dots = svg.selectAll("circle")
        .data(monthlySales)
        .enter()
        .append("circle")
        .attr({
            cx: function(d){return d.month*3;},
            cy: function(d){return h-d.sales;},
            r: 5,
            "fill": function(d){return salesKPI(d.sales);}
        });

    $scope.labels = svg.selectAll("text")
        .data(monthlySales)
        .enter()
        .append("text")
        .text(function(d){ return showMinMax(monthlySales, 'sales', d.sales, 'minmax'); })
        .attr({
            x:function(d){ return (d.month*3)-28; },
            y:function(d){ return h-d.sales; },
            "font-size":"12px",
            "font-family": "sans-serif",
            "fill":"#666666",
            "text-anchor": "start"
        });

}]);

/*JS Bin*/

/*
 var w = 400;
 var h = 350;

 var monthlySales = [
 {"month":10, "sales":100},
 {"month":20, "sales":130},
 {"month":30, "sales":250},
 {"month":40, "sales":300},
 {"month":50, "sales":265},
 {"month":60, "sales":225},
 {"month":70, "sales":180},
 {"month":80, "sales":120},
 {"month":90, "sales":145},
 {"month":100, "sales":130}
 ];

 function showMinMax(ds, col, val, type){
 var max = d3.max(ds, function(d){return d[col]; });
 var min = d3.min(ds, function(d){return d[col]; });

 if(type == 'minmax' && (val == max || val ==min)){
 return val;
 }else{
 if(type == 'all'){
 return val;
 }
 }
 }

 //KPI color
 function salesKPI(d){
 if (d>=250){return "#33CC66"; }else
 if(d<250){return "#666666"; }
 }

 //create scatter Plot
 var svg = d3.select("body").append("svg").attr({
 width:w,height:h
 });

 //add dots
 var dots = svg.selectAll("circle")
 .data(monthlySales)
 .enter()
 .append("circle")
 .attr({
 cx: function(d){return d.month*3;},
 cy: function(d){return h-d.sales;},
 r: 5,
 "fill": function(d){return salesKPI(d.sales);}
 });

 var labels = svg.selectAll("text")
 .data(monthlySales)
 .enter()
 .append("text")
 .text(function(d){ return showMinMax(monthlySales, 'sales', d.sales, 'minmax'); })
 .attr({
 x:function(d){ return (d.month*3)-28; },
 y:function(d){ return h-d.sales; },
 "font-size":"12px",
 "font-family": "sans-serif",
 "fill":"#666666",
 "text-anchor": "start"
 });

 */