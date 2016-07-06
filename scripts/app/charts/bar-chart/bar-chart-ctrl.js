angular.module('d3App').controller('barChartCtrl', ['$scope', function ($scope) {

    $scope.inputText = "Hey, Mehul...!!!!";

    var w = 300;
    var h = 120;
    var padding = 2;
    var dataSet = [5, 10, 15, 20, 25, 11, 25, 22, 18, 7];

    $scope.svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    function colorPicker(v) {
        if (v <= 20) {
            return "#666666";
        }
        else if (v > 20) {
            return "#FF0033";
        }
    }

    $scope.svg.selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
            return (i* (w / dataSet.length));
        })
        .attr("y",function(d){
            return h - (d*4);
        })
        .attr("width",w / dataSet.length-padding)
        .attr("height",function(d){
            return (d*4);
        })
        .attr("fill",function (d) {
            return colorPicker(d);
        })

    $scope.svg.selectAll("text")
        .data(dataSet)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", function(d,i){
            return i * (w / dataSet.length) + (w / dataSet.length - padding) / 2;
        })
        .attr("y",function(d){
            return h - (d*4)+14;
        })
        .attr("font-family", "sans-serif ")
        .attr("font-size", 12)
        .attr("fill", "white")
}]);

/*var w = 300;
 var h = 120;
 var padding = 2;
 var dataSet = [5, 10, 15, 20, 25, 11, 25, 22, 18, 7];

 svg = d3.select("body")
 .append("svg")
 .attr("width",w)
 .attr("height",h);

 function colorPicker(v) {
 if(v<=20){return "#666666";}
 else if(v>20){return "#FF0033";}
 }

 svg.selectAll("rect")
 .data(dataSet)
 .enter()
 .append("rect")
 .attr({
 x: function (d, i) { return i * (w / dataSet.length); },
 y: function (d) { return h - (d * 4); },
 width: w / dataSet.length - padding,
 height: function (d) { return (d * 4);},
 fill: function (d) { return colorPicker(d); }
 });
 svg.selectAll("text")
 .data(dataSet)
 .enter()
 .append("text")
 .text(function(d){return d;})
 .attr({
 "text-anchor" : "middle",
 x: function(d,i){ return i* (w / dataSet.length)+(w/dataSet.length-padding)/2;},
 y: function(d){ return h - (d*4)+14;},
 "font-family": "sans-serif",
 "font-size": 12,
 "fill": "white"
});*/
