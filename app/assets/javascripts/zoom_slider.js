
$(document).ready(function() {

    if ($("#search_page").length == 0) {
        return;
    }

    $("#zoom_slider").slider({
        orientation: "vertical",
        min: 1,
        max: 10,
        value: 10,
        change: zoom_change

    });

});

function zoom_change(evt, ui) {
    var new_zoom = 10-ui.value;
    svg_hack.call(zoom);
    svg_hack.attr("transform", "scale( " + new_zoom + ")");
}
