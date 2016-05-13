window.onload = function() {
    
    // Instantiate new map object, place it in 'map' element -- Uses Leaflet.js
    var map_object = new L.Map('map',{
        center: [-34.0000, 18.5800],
        // Starting Point
        zoom: 12,
    });
    
    // Put layer data into a JS object
    var layerSource = {
        user_name: 'adi45',
        type: 'cartodb',
        sublayers: [{
            sql: "SELECT * FROM is_matrix_epsg4326_region_1",
            // IS Region -- Structure count
            cartocss: '#is_matrix_epsg4326_region_1{polygon-fill: #F2D2D3;polygon-opacity: 1;  line-color: #FFF;  line-width: 0.5;  line-opacity: 1;} #is_matrix_epsg4326_region_1 [ structure_count <= 7963] {polygon-fill: #67000d;  line-color: #d60000;  line-width: 1;  line-opacity: 1}#is_matrix_epsg4326_region_1 [ structure_count <= 6370.4] {   polygon-fill: #a50f15;  line-color: #d60000;  line-width: 1;  line-opacity: 1}#is_matrix_epsg4326_region_1 [ structure_count <= 4777.799999999999] {   polygon-fill: #cb181d;  line-color: #d60000;  line-width: 1;  line-opacity: 1}#is_matrix_epsg4326_region_1 [ structure_count <= 3185.2] {   polygon-fill: #ef3b2c;  line-color: #d60000;  line-width: 1;  line-opacity: 1}#is_matrix_epsg4326_region_1 [ structure_count <= 1592.6] {   polygon-fill: #fb6a4a;  line-color: #d60000;  line-width: 1;  line-opacity: 1}',
        },
        {
            sql: "SELECT * FROM is_matrix_epsg4326_region_1",
            // IS Region -- Age of pocket
            cartocss: '#is_matrix_epsg4326_region_1 {   polygon-opacity: 1;   line-color: #FFF;   line-width: 0.5;   line-opacity: 1;}#is_matrix_epsg4326_region_1[age_of_pocket="0 - 5 years"] {   polygon-fill: #b40903;}#is_matrix_epsg4326_region_1[age_of_pocket="10 - 15 years"] {   polygon-fill: #ffa300;}#is_matrix_epsg4326_region_1[age_of_pocket="15 - 20 years"] {   polygon-fill: #a53ed5;}#is_matrix_epsg4326_region_1[age_of_pocket="5 - 10 years"] {   polygon-fill: #ff5c00;}#is_matrix_epsg4326_region_1[age_of_pocket="> 20 years"] {   polygon-fill: #0f3b82;}'
        },
        {
            sql: "SELECT * FROM is_matrix_epsg4326_region_1",
            // IS Region -- Temporary sanitation
            cartocss: '#is_matrix_epsg4326_region_1{polygon-fill: #FFFFB2;  polygon-opacity: 1;  line-color: #FFF;  line-width: 0.5;  line-opacity: 1;} #is_matrix_epsg4326_region_1 [ temp_sanitation <= 100] {   polygon-fill: #BD0026;}#is_matrix_epsg4326_region_1 [ temp_sanitation <= 80] {   polygon-fill: #F03B20;}#is_matrix_epsg4326_region_1 [ temp_sanitation <= 60] {   polygon-fill: #FD8D3C;}#is_matrix_epsg4326_region_1 [ temp_sanitation <= 40] {   polygon-fill: #FECC5C;}#is_matrix_epsg4326_region_1 [ temp_sanitation <= 20] {   polygon-fill: #FFFFB2;}'
        },
        {
            sql: "SELECT * FROM is_matrix_epsg4326_region_1",
            // IS Region -- Upgrade category
            cartocss: '#is_matrix_epsg4326_region_1 {   polygon-opacity: 1;   line-color: #FFCC00;   line-width: 1;   line-opacity: 1;} #is_matrix_epsg4326_region_1[upgrade_category="City land. Can be upgraded"] {   polygon-fill: #A6CEE3;}#is_matrix_epsg4326_region_1[upgrade_category="National land. Can be upgraded"] {   polygon-fill: #1F78B4;} #is_matrix_epsg4326_region_1[upgrade_category="Provincial land. Can be upgraded"] {   polygon-fill: #B2DF8A;}#is_matrix_epsg4326_region_1[upgrade_category="Some constraints. May need to be relocated"] {   polygon-fill: #33A02C;}'        
        },
        {
            sql: "SELECT * FROM is_matrix_epsg4326_region_1",
            // IS Region -- Housing density
            cartocss: '#is_matrix_epsg4326_region_1{  polygon-fill: #1a9850;  polygon-opacity: 1;  line-color: #F11810;  line-width: 1;  line-opacity: 1;}#is_matrix_epsg4326_region_1 [ density_dwellings_per_ha <= 3007.299270073] {   polygon-fill: #d73027;}#is_matrix_epsg4326_region_1 [ density_dwellings_per_ha <= 263.73626373626] {   polygon-fill: #f79272;}#is_matrix_epsg4326_region_1 [ density_dwellings_per_ha <= 199.76635514019] {   polygon-fill: #fff2cc;}#is_matrix_epsg4326_region_1 [ density_dwellings_per_ha <= 131.31313131313] {   polygon-fill: #8cce8a;}#is_matrix_epsg4326_region_1 [ density_dwellings_per_ha <= 66.666666666667] {   polygon-fill: #1a9850;}'
        }]
    }
    
    // For storing the sublayers
    var sublayers = [];
    
    // Basemap pull tiles
        var basemap2 = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: 'CartoDB'
    }).addTo(map_object);
    // add new basemap option
    var basemap1 = L.tileLayer('https://maps.nlp.nokia.com/maptiler/v2/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?lg=eng&token=61YWYROufLu_f8ylE0vn0Q&app_id=qIWDkliFCtLntLma2e6O', {
      attribution: 'Nokia'
    });
    
    
    
    // Basemap function
    // Add data layer to your map
    cartodb.createLayer(map_object, layerSource)
    .addTo(map_object)
    
    .done(function(layer) {
        
        var hovers = [];
        layer.bind('featureOver', function(e, latlon, pxPos, data, layer) {
            hovers[layer] = 1;
            if (_.any(hovers)) {
                $('#map').css('cursor', 'pointer');
            }
        });
        layer.bind('featureOut', function(m, layer) {
            hovers[layer] = 0;
            if (!_.any(hovers)) {
                $('#map').css('cursor', 'auto');
            }
        });
        
        
        for (var i = 0; i < 5; i++) {
            sublayer = layer.getSubLayer(i);
            sublayer.setInteraction(true);
            sublayer.setInteractivity('pocket_name, ward_councillor, ratio_toilets_dwellings, is_cluster, area_ha, ward_id');
            console.log("num layers", layer.getSubLayerCount());
            
            sublayer.on('featureClick', function(e, latlng, pos, data, layerNumber) {
                $('#dashboard').removeClass("hidden")
                cartodb.log.log(e, latlng, pos, data, layerNumber);
                $("#pocket_name").text(data.pocket_name);                
                $("#ward_councillor").text(data.ward_councillor);                                
                $("#ratio_toilets_dwellings").text(data.ratio_toilets_dwellings);
                $("#is_cluster").text(data.is_cluster);
                $("#area_ha").text(data.area_ha);
                $("#ward_id").text(data.ward_id);                
            });
        }
        var densityLegend = new cdb.geo.ui.Legend.Density({
            left: "0",
            right: "3010",
            colors: ["#1a9850", "#8cce8a", "#fff2cc", "#f79272", "#d73027"]
        });
        $('#map').append(densityLegend.render().el);
        for (var i = 0; i < layer.getSubLayerCount(); i++) {
            sublayers[i] = layer.getSubLayer(i);
            //alert("Congrats, you added sublayer #" + i + "!");
        }
        
        
        
        // define ZIndex of the CartoDB layer
        layer.setZIndex(9000);
        // define basemap options
        $('#base-satellite').click(function() {
                if (map_object.hasLayer(basemap1) || (map_object.hasLayer(basemap2))) {
                    map_object.removeLayer(basemap1);
                    map_object.removeLayer(basemap2);
                }
                
                map_object.addLayer(basemap1);
                return true;         
        });

        $('#base-map').click(function() {
                if (map_object.hasLayer(basemap1) || (map_object.hasLayer(basemap2))) {
                    map_object.removeLayer(basemap1);
                    map_object.removeLayer(basemap2);
                }
                map_object.addLayer(basemap2);
                return true;       
        });

    
    })// end function
    
    .error(function(err) {
        console.log("error: " + err);
    });
    
    
    // Add button events Sublayer 0 - Structure count
    var sublayer0Shown = true;
    $(".select-sublayer0").on('click', function() {
        sublayers[1].hide();
        sublayers[2].hide();
        sublayers[3].hide();
        sublayers[4].hide();
        sublayers[0].show();
        $('.cartodb-legend').addClass("hidden")
        var densityLegend = new cdb.geo.ui.Legend.Density({
            left: "0",
            right: "8000",
            colors: ["#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"]
        });
        $('#map').append(densityLegend.render().el);
    });
    
    // Add button events Sublayer 1 - Age of pocket
    var sublayer1Shown = true;
    $(".select-sublayer1").on('click', function() {
        sublayers[0].hide();
        sublayers[2].hide();
        sublayers[3].hide();
        sublayers[4].hide();
        sublayers[1].show();
        $('.cartodb-legend').addClass("hidden")
        var legend = new cdb.geo.ui.Legend({
            type: "custom",
            data: [
            {
                name: "0 - 5 years",
                value: "#b40903"
            }, 
            {
                name: "5 - 10 years",
                value: "#ff5c00"
            }, 
            {
                name: "10 - 15 years",
                value: "#ffa300"
            }, 
            {
                name: "15 - 20 years",
                value: "#a53ed5"
            },
            {
                name: "> 20 years",
                value: "#0f3b82"
            }            
            ]
        });
        $('#map').append(legend.render().el);
    
    });
    
    // Add button events Sublayer 2 - Temporary sanitation
    var sublayer2Shown = true;
    $(".select-sublayer2").on('click', function() {
        sublayers[0].hide();
        sublayers[1].hide();
        sublayers[3].hide();
        sublayers[4].hide();
        sublayers[2].show();
        $('.cartodb-legend').addClass("hidden")
        var densityLegend = new cdb.geo.ui.Legend.Density({
            left: "0",
            right: "100",
            colors: ["#FFFFB2", "#FECC5C", "#FD8D3C", "#F03B20", "#BD0026"]
        });
        $('#map').append(densityLegend.render().el);
  
    });
    
    // Add button events Sublayer 3 - Upgrade category
    var sublayer3Shown = true;
    $(".select-sublayer3").on('click', function() {
        sublayers[0].hide();
        sublayers[2].hide();
        sublayers[1].hide();
        sublayers[4].hide();
        sublayers[3].show();
        $('.cartodb-legend').addClass("hidden")
        var legend = new cdb.geo.ui.Legend({
            type: "custom",
            title: "Test",            
            data: [
            {
                name: "City land. Can be upgraded",
                value: "#a6cee3"
            }, 
            {
                name: "National land. Can be upgraded",
                value: "#1f78b4"
            }, 
            {
                name: "Provincial land. Can be upgraded",
                value: "#b2df8a"
            }, 
            {
                name: "Some constraints. May need to be relocated",
                value: "#33a02c"
            }
            ]
        });
        $('#map').append(legend.render().el);
    });
    // Add button events Sublayer 4 - Housing density
    var sublayer4Shown = true;
    $(".select-sublayer4").on('click', function() {
        sublayers[0].hide();
        sublayers[2].hide();
        sublayers[1].hide();
        sublayers[3].hide();
        sublayers[4].show();
        $('.cartodb-legend').addClass("hidden")
        var densityLegend = new cdb.geo.ui.Legend.Density({
            left: "0",
            right: "3010",
            colors: ["#1a9850", "#8cce8a", "#fff2cc", "#f79272", "#d73027"]
        });
        $('#map').append(densityLegend.render().el);
    });

$("#layer-select > .btn").click(function(){
    $("#layer-select > .btn").removeClass("active");
    $(this).addClass("active");
});

$("#layer-select-mobile > .btn").click(function(){
    $("#layer-select-mobile > .btn").removeClass("active");
    $(this).addClass("active");
});

$("#layer-select-tiny > .btn").click(function(){
    $("#layer-select-tiny > .btn").removeClass("active");
    $(this).addClass("active");
});

$("#basemap-select > .btn").click(function(){
    $("#basemap-select > .btn").removeClass("active");
    $(this).addClass("active");
});
}
//closes function