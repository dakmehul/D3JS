/**
 * Created by mehul on 11-Jul-16.
 */
angular.module('d3App').controller('hiveJsonCtrl', ['$scope', function ($scope) {

    var width = 900,
        height = 950,
        innerRadius = 50,
        outerRadius = 500,
        ds,
        axis,
        totalNodes,
        nodes,
        dist,
        size;

    var angle = d3.scale.ordinal().domain(d3.range(7)).rangePoints([0, 2 * Math.PI]),
        radius = d3.scale.linear().range([innerRadius, outerRadius]),
        color = d3.scale.category10().domain(d3.range(20));

    /*console.log("Angle == =="+angle);*/

    function uniqueAxis(ds) {
        totalNodes = _.map(ds.nodes, function (d) {
            return {'axis': d.axis, 'axisName': d.axisName};
        });
        axis = _.uniqBy(totalNodes, 'axis', 'axisName');
        /*console.log("Total axis == =="+angular.toJson(axis));*/
        return axis.length;
    }

    function findNodes(ds) {
        var arrayOfIndex =[];
        for(var i=0;i<totalNodes.length;i++){
            arrayOfIndex.push(i+1);
        }

        totalNodes = _.map(ds.nodes, function (d) {
            return {'axis': d.axis, 'size': d.size};
        });

        console.log("Total nodes == ==" + angular.toJson(totalNodes));
        return totalNodes;
    }

    /*function generatedNodes(ds){
        nodeAxis = _.map(ds.nodes, function (d) {
            return {'size': d.size};
        })
        var arrayOfIndex =[];
        for(var i=0;i<nodeAxis.length;i++){
            arrayOfIndex.push(i+1);
        }
        console.log("Index of array = = "+angular.toJson(arrayOfIndex));

        var dist = d3.scale.ordinal().domain(arrayOfIndex).rangeRoundPoints([innerRadius,outerRadius]);
        dist.range();
        console.log("Distance = = "+angular.toJson(dist.range()));

        /!*nodes = _.map(,function(d){
            return {
                'axis':d.axis,
                'dist':dist
            };
        })
        console.log("Fianl Nodes = = "+angular.toJson(nodes));*!/
        return dist.range();
    }*/


    function drawAxis(ds) {
        $scope.svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        $scope.svg.selectAll(".axis")
            .data(d3.range(uniqueAxis(ds)))
            .enter().append("line")
            .attr("class", "axis")
            .attr("transform", function (d) {
                return "rotate(" + degrees(angle(d)) + ")";
            })
            .attr("x1", radius.range()[0])
            .attr("x2", radius.range()[1]);
    }

    function drawLink(ds) {
        console.log("no of edges: "+ds.edges.length);
        $scope.svg.selectAll(".link")
            .data(ds.edges)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d3.hive.link()
                .angle(function (d) {

                    return angle(d.axis);
                })
                .radius(function (d) {
                    return radius(d.size*0.1);
                })
                /*.startRadius(function (d) {
                    return radius(d.size*0.1);
                })
                .endRadius(function (d) {
                    return radius(d.size*0.1);
                })*/
            )
            .attr('transform', function(d){
                if(d.source.axis == d.target.axis){
                    var y = radius(d.target.size*0.1);
                    var x = radius(d.source.size*0.1);
                    var ty = (y-x)/2;
                    var xCo = x*Math.cos(angle(d.target.axis));
                    var ySi = x*Math.sin(angle(d.target.axis));

                    var tyCO = ty*Math.cos(angle(d.target.axis));
                    var tySi = ty*Math.sin(angle(d.target.axis));

                    console.log(xCo);
                    console.log(ySi);
                    return "translate("+ (ySi+tySi) +","+ (-xCo-tyCO) +")";
                }
                return "translate(0,0)"
            })
            .style("stroke", function (d) {
                return color(d.source.axis);
            });
    };

    function drawBubble(ds) {
        $scope.svg.selectAll(".node")
            .data(findNodes(ds))
            .enter().append("circle")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "rotate(" + degrees(angle(d.axis)) + ")";
            })
            .attr("cx", function (d) {
                return radius(d.size*.1);
            })
            .attr("r", function (d) {
                return ((d.size)*5);
            })
            .style("fill", function (d) {
                return color(d.axis);
            })
            .on("mouseover", function(d) {
                d3.select(this)
                    .transition()
                    .duration(150)
                    .style("stroke-width", 3)
                $scope.svg.selectAll(".link")
                    .data(ds.edges)
                    .style("stroke-width", function (dl) {
                        if (dl.source == d) {
                            /*console.log(ds.edges);*/
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
    };

    d3.json("scripts/app/json-files/ila-hive-plot.json", function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log(data);
            ds = data;
        }
        uniqueAxis(ds);
        findNodes(ds);
        /*generatedNodes(ds);*/
        drawAxis(ds);
        drawLink(ds);
        drawBubble(ds);
    });

    function degrees(radians) {
        return radians / Math.PI * 180 - 90;
    }
}]);