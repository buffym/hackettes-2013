var svg_hack;
var projection_hack;
var zoom, scale;

$(function() {
	$("#plus").button({
		icons: {
			primary: "ui-icon-zoomin"
		},
	test: false
	});
});

$(function() {
	$("#minus").button({
		icons: {
			primary: "ui-icon-zoomout"
		},
	test: false
	});
});

$(document).ready(function() {

    if ($("#search_page").length == 0) {
        return;
    }

    var width = 700;
    var height = 600;

    var nById = function (d) { return d.n };

    var quantile = d3.scale.threshold()
        .domain([0, 150, 250, 350, 6000])
        .range(d3.range(5).map(function(i) { return "q" + i + "-5";}));

    zoom = d3.behavior.zoom().on("zoom", redraw);
    
    svg_hack = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
		.call(zoom)
		.append('svg:g');
		
	svg_hack.attr("transform", "scale( " + 1.03383283565496 + ")");


    function redraw() {
	
	  scale = d3.event.scale;
      svg_hack.attr("transform","translate(" + d3.event.translate + ")"+ " scale(" + d3.event.scale + ")");
	  
	  //var scale = d3.event.scale;
	  
	  zoom.center;
	  d3.selectAll("circle")
		.attr("r", 4/scale);
	   
   }

    projection_hack = d3.geo.transverseMercator()
        .rotate([73.211914, -44.481565])
        .translate([width / 10, height / 4])
        .scale([13500]);

    var path = d3.geo.path().projection(projection_hack);

    var tooltip = d3.select("body").append("div")
  	  .attr("class", "tooltip")
  	  .style("opacity", 1e-6)
  	  .style("background", "rgba(250,250,250,.7)");
	
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

			svg_hack.append("path")
                .datum(vermont)
                .attr("d", path);

            svg_hack.selectAll(".county")
                .data(topojson.feature(vt, vt.objects.vt_towns).features)
                .enter().append("path")
                .attr("d", path)
                .attr("class", function (d) { return quantile(nById(d.properties));}).attr("title", function(d) {
                    return d.properties.TOWNNAME;
                });

                d3.json('/photos.json?has_location=true&year=1910',
                function (jsondata) {
				if (typeof scale === 'undefined') {
					scale = 1;
				}
				svg_hack.selectAll("circles.points")
                  .data(jsondata)
                  .enter()
                  .append("circle")
                  .attr("r",4/scale)
                  .attr("transform", function(d) {
                    if (d.longitude != null) {
                      return "translate(" + projection_hack([-d.longitude,d.latitude]) + ")";
                    }
                  })
                  .attr("data-photo-id", function(d) {
                          return d.id;
                      });

                });

        });

    });

});
