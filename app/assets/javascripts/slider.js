var hack_current_year = 1800;

var leaf_map;

var geo_layer;

var image_data_layer = null;

var town_counts = new Array();

$(document).ready(function() {

    if ($("#search_page").length == 0) {
        return;
    }


    leaf_map = L.map('leaf').setView([44.051949, -72.819188], 8);

    L.tileLayer('http://{s}.tile.cloudmade.com/9a4efc5fc79b4e94ac374f2ce5ed9334/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(leaf_map);

    geo_layer = L.geoJson().addTo(leaf_map);

    timeslider_change(1910);


    $.ajax("/assets/vt_towns.json", {
        dataType: 'json',
        success: load_geo_data
    });

    $("#time_slider").slider({
        orientation: "vertical",
        min: 1850,
        max: 2013,
        change: function(evt, ui) { timeslider_change(ui.value) },
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

function timeslider_change(year) {

    $("#gallery h3").html("");
    $("#gallery .thumb_list").html("");


    if (image_data_layer) {
        leaf_map.removeLayer(image_data_layer);
    }

    var new_year = year;

    if (new_year != hack_current_year) {

        $(".slider_wrapper p").html(new_year);
        hack_current_year = new_year;
        // update the map
        //svg_hack.selectAll("circle").remove();

        d3.json('/photos.json?has_location=true&year=' + hack_current_year,
            function (jsondata) {

                var collection = {
                    type: "FeatureCollection",
                    features: new Array()
                }

                var i;

                for (i=0; i < jsondata.length; i++) {
                    var photo = jsondata[i];

                    var geojsonMarkerOptions = {
                        radius: 3,
                        fillColor: "#000000",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8,
                        clickable: true
                    };


                    var photo_feature = {
                        type: 'Feature',
                        geometry: { type: "Point", coordinates: [ -parseFloat(photo.longitude), parseFloat(photo.latitude) ]},
                        properties: { photo_id: photo.id, photo_url: photo.url, town: photo.town }
                    }

                    collection.features[collection.features.length] = photo_feature;

                    /*
                    image_data_layer.addData(photo_feature, {pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, geojsonMarkerOptions);
                    }});
                    */
                    /*
                    L.geoJson(photo_feature, {
                        pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, geojsonMarkerOptions);
                        }
                    }).addTo(leaf_map);
                    */

                }

                image_data_layer = L.geoJson(collection, {
                    pointToLayer: function(feature, latlng) {
                        return new L.CircleMarker(latlng, geojsonMarkerOptions);
                    },
                    onEachFeature: function(myfeature, mylayer) {
                        mylayer.on('click', function (e) {
                            var photo_id = e.target.feature.properties.photo_id;
                            $.ajax("/photos/" + photo_id + ".js");
                            get_town_data(e.target.feature.properties.town);
                        });
                    }
                });

                leaf_map.addLayer(image_data_layer);
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

function load_geo_data(data) {
    var i;

    for (i=0; i < data.features.length; i++) {
        var feature = data.features[i];

        var myLines = [{
            "type": "LineString",
            "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
        }, {
            "type": "LineString",
            "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
        }];

        var myStyle = {
            "color": "#00FF00",
            "weight": 5,
            "opacity": 0.65
        };

        /*
        L.geoJson(myLines, {
            style: myStyle
        }).addTo(leaf_map);

        leaf_map[.addData(feature);
        */
        L.geoJson(feature, {
            style: myStyle
        }).addTo(leaf_map);
    }
}

function getColor(feature) {

};
