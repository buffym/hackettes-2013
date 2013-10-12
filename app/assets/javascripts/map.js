$(document).ready(function() {

    if ($("#search_page").length == 0) {
        return;
    }

    var width = 700;
    var height = 600;

    var nById = function (d) { return d.n };

    var quantize = d3.scale.quantize()
        .domain([1, 4192])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9";}));

    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

    var projection = d3.geo.transverseMercator()
        .rotate([72.5623, -44.2035])
        .translate([width / 3, height / 3])
        .scale([13500]);

    var path = d3.geo.path().projection(projection);

    d3.csv("/assets/counts.csv", function (data) {

        d3.json("/assets/vt.json", function(error, vt) {

            data.map(function (d) {
                return { id: d.CtyID, county: d.CtyName, town: d.townName, n: +d.n };
            });

            for (var i = 0; i < data.length; i ++) {
                var id = data[i].townName;
                id = id.toUpperCase();
                var n = +data[i].n;

                for (var j = 0; j < vt.objects.vt_towns.geometries.length; j++) {
                    var mapID = vt.objects.vt_towns.geometries[j].properties.TOWNNAME;

                    if (id == mapID) {
                        vt.objects.vt_towns.geometries[j].properties.n = n;
                        break;
                    };
                };
            };

            var vermont = topojson.feature(vt, vt.objects.vt_towns);

            svg.append("path")
                .datum(vermont)
                .attr("d", path);

            svg.selectAll(".county")
                .data(topojson.feature(vt, vt.objects.vt_towns).features)
                .enter().append("path")
                .attr("d", path)
                .attr("class", function (d) { return quantize(nById(d.properties));})
                .on("mouseover", function(d, i) {
                    d3.select(this.parentNode.appendChild(this)).transition().duration(300)
                        .style("stroke", "black")
                        .style("stroke-width", "7");
                })
                .on("mouseout", function(d,i) {
                    d3.select(this.parentNode.appendChild(this)).transition().duration(300)
                        .style("stroke", "black")
                        .style("stroke-width", "1");
                });

        });

    });

});