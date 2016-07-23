/**
 * Created by mehul on 08-Jul-16.
 */
angular.module('d3App').controller('hivePlotCtrl', ['$scope', function ($scope) {

    var width = 960,
        height = 700,
        innerRadius =40,
        outerRadius = 300;
    var angle = d3.scale.ordinal().domain(d3.range(4)).rangePoints([0, 2* Math.PI]),
        radius = d3.scale.linear().range([innerRadius, outerRadius]),
        color = d3.scale.category20().domain(d3.range(20));
    var nodes = [
        {x: 0 ,y: .5},
        {x: 0, y: .9},
        {x: 1, y: .2},
        {x: 1, y: .7},
        {x: 2, y: .5},
        {x: 2, y: .8},

    ];
    var links = [
        {source: nodes[0], target: nodes[2]},
        {source: nodes[1], target: nodes[3]},
        {source: nodes[2], target: nodes[4]},
        {source: nodes[2], target: nodes[5]},
        {source: nodes[3], target: nodes[5]},
        {source: nodes[4], target: nodes[0]},
        {source: nodes[5], target: nodes[1]},
        

    ];
    

    $scope.svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    $scope.svg.selectAll(".axis")
        .data(d3.range(3))
        .enter().append("line")
        .attr("class", "axis")
        .attr("transform", function(d) { return "rotate(" + degrees(angle(d)) + ")"; })
        .attr("x1", radius.range()[0])
        .attr("x2", radius.range()[1]);
    // TODO: Instead of passing links directly from what is received from server, it should be done like this:
    // source = findNodeById(id)
    // target = findNodeById(id)
    $scope.svg.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.hive.link()
            .angle(function(d) { return angle(d.x); })
            .radius(function(d) { return radius(d.y); }))
        .style("stroke", function(d) { return color(d.source.x); });
    $scope.svg.selectAll(".node")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("transform", function(d) { return "rotate(" + degrees(angle(d.x)) + ")"; })
        .attr("cx", function(d) { return radius(d.y); })
        .attr("r", function(d) {
            console.log(d.y);
            return (100 - (d.y)*50);
        })
        .style("fill", function(d) { return color(d.x); })
        .on("mouseover", function(d) {
            d3.select(this)
                .transition()
                .duration(150)
                .style("stroke-width", 3)
            $scope.svg.selectAll(".link")
                .data(links)
                .style("stroke-width", function (dl) {
                    if (dl.source == d) {
                        /*console.log(dl);*/
                        return 5;
                    } else if (dl.target == d) {
                        return 5;
                    }

                })
        })
        .on("mouseout", function(){
            d3.select(this)
                .style("stroke-width", 1.5)
            d3.selectAll(".link")
                .style("stroke-width", 1.5)
        });

    function degrees(radians) {
        return radians / Math.PI * 180 - 90;
    }

}]);

/*angular.module('d3App').controller('hivePlotCtrl', ['$scope', function ($scope) {

 var width = 960,
 height = 1000,
 innerRadius = 40,
 outerRadius = 300;
 var angle = d3.scale.ordinal().domain(d3.range(4)).rangePoints([0, 2 * Math.PI]),
 radius = d3.scale.linear().range([innerRadius, outerRadius]),
 color = d3.scale.category10().domain(d3.range(20));
 var nodes = [
 {x: 0, y: .1},
 {x: 0, y: .9},
 {x: 1, y: .2},
 {x: 1, y: .3},
 {x: 2, y: .1},
 {x: 2, y: .8}
 ];
 var links = [
 {source: nodes[0], target: nodes[2]},
 {source: nodes[1], target: nodes[3]},
 {source: nodes[2], target: nodes[4]},
 {source: nodes[2], target: nodes[5]},
 {source: nodes[3], target: nodes[5]},
 {source: nodes[4], target: nodes[0]},
 {source: nodes[5], target: nodes[1]}
 ];
 $scope.svg = d3.select("body").append("svg")
 .attr("width", width)
 .attr("height", height)
 .append("g")
 .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
 $scope.svg.selectAll(".axis")
 .data(d3.range(3))
 .enter().append("line")
 .attr("class", "axis")
 .attr("transform", function(d) { return "rotate(" + degrees(angle(d)) + ")"; })
 .attr("x1", radius.range()[0])
 .attr("x2", radius.range()[1]);
 $scope.svg.selectAll(".link")
 .data(links)
 .enter().append("path")
 .attr("class", "link")
 .attr("d", d3.hive.link()
 .angle(function(d) { return angle(d.x); })
 .radius(function(d) { return radius(d.y); }))
 .style("stroke", function(d) { return color(d.source.x); });
 $scope.svg.selectAll(".node")
 .data(nodes)
 .enter().append("circle")
 .attr("class", "node")
 .attr("transform", function(d) { return "rotate(" + degrees(angle(d.x)) + ")"; })
 .attr("cx", function(d) { return radius(d.y); })
 .attr("r", function(d) {
 console.log(d.y);
 return Math.sqrt(height - d.y);
 })
 .style("fill", function(d) { return color(d.x); });
 function degrees(radians) {
 return radians / Math.PI * 180 - 90;
 }
 }]);*/