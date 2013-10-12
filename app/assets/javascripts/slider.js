var hack_current_year = 1800;

$(document).ready(function() {

    if ($("#search_page").length == 0) {
        return;
    }

    $("#time_slider").slider({
        orientation: "vertical",
        min: 1800,
        max: 2013,
        change: timeslider_change

    });

});

function timeslider_change(evt, ui) {
    var new_year = ui.value;

    if (new_year != hack_current_year) {
        hack_current_year = new_year;
        // update the map
        svg_hack.selectAll("circle").remove();

        d3.json('/photos.json?has_location=true&year=' + hack_current_year,
            function (jsondata) {
                svg_hack.selectAll("circles.points")
                    .data(jsondata)
                    .enter()
                    .append("circle")
                    .attr("r",5)
                    .attr("transform", function(d) {
                        if (d.longitude != null) {
                            return "translate(" + projection_hack([-d.longitude,d.latitude]) + ")";
                        }
                    });

            });

    }
}