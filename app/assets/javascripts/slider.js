var hack_current_year = 1800;

$(document).ready(function() {

    if ($("#search_page").length == 0) {
        return;
    }

    $("#time_slider").slider({
        orientation: "vertical",
        min: 1850,
        max: 2013,
        change: timeslider_change,
        value: 1910
    });

    $(document).on('click', 'circle', function() {
        var circle = $(this);
        $.ajax('/photos/' + circle.attr('data-photo-id') + '.js');
    });

    $(document).on('click', '.gallery_thumb', function() {
        var circle = $(this);
        $.ajax('/photos/' + circle.attr('data-photo-id') + '.js');
    });
});

function timeslider_change(evt, ui) {

    $("#gallery h3").html("");
    $("#gallery .thumb_list").html("");


    var new_year = ui.value;

    if (new_year != hack_current_year) {

        $(".slider_wrapper p").html(new_year);
        hack_current_year = new_year;
        // update the map
        svg_hack.selectAll("circle").remove();

        d3.json('/photos.json?has_location=true&year=' + hack_current_year,
            function (jsondata) {
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

    }
}

function open_modal_txt(text, dont_show_close) {
    $.modal.close();
    if (dont_show_close === 'undefined')  {
        dont_show_close = false;
    }
    if (dont_show_close) {
        $.modal(text, { opacity: 90, close: false, focus: false });
    }
    else {
        $.modal(text, { opacity: 90, focus: false });
    }
}

function get_town_data(town) {

    $("#gallery h3").html(town);
    $("#gallery .thumbs_list").html("");
    $.ajax("/photos.json?has_location=false&year=" + $("p.year").html() + "&town=" + town, {
        dataType: 'json',
        success: function(data) {
            var i;
            for (i =0; i < data.length; i++) {
                var photo = data[i];
                $("#gallery .thumbs_list").append("<div class='gallery_thumb' style=\"background-image: url('" + photo.url + "')\" data-photo-id='" + photo.id + "'></div>");
            }
        }
    });
}
