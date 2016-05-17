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
            sql: "SELECT * FROM matrix_formatted_data",
            // IS Region -- Structure count
            cartocss: '#matrix_formatted_data{polygon-fill: #F2D2D3;polygon-opacity: 1;  line-color: #FFF;  line-width: 0.5;  line-opacity: 1;} #matrix_formatted_data [ structure_count <= 7963] {polygon-fill: #67000d;  line-color: #FFF;  line-width: 0.5;  line-opacity: 1}#matrix_formatted_data [ structure_count <= 6370.4] {   polygon-fill: #a50f15;  line-color: #FFF;  line-width: 0.5;  line-opacity: 1}#matrix_formatted_data [ structure_count <= 4777.799999999999] {   polygon-fill: #cb181d;  line-color: #FFF;  line-width: 0.5;  line-opacity: 1}#matrix_formatted_data [ structure_count <= 3185.2] {   polygon-fill: #ef3b2c;  line-color: #FFF;  line-width: 0.5;  line-opacity: 1}#matrix_formatted_data [ structure_count <= 1592.6] {   polygon-fill: #fb6a4a;  line-color: #FFF;  line-width: 0.5;  line-opacity: 1}',
        }, 
        {
            sql: "SELECT * FROM matrix_formatted_data",
            // IS Region -- Age of pocket
            cartocss: '#matrix_formatted_data {   polygon-opacity: 1;   line-color: #FFF;   line-width: 0.5;   line-opacity: 1;}#matrix_formatted_data[age_of_pocket="0 - 5 years"] {   polygon-fill: #b40903;}#matrix_formatted_data[age_of_pocket="10 - 15 years"] {   polygon-fill: #ffa300;}#matrix_formatted_data[age_of_pocket="15 - 20 years"] {   polygon-fill: #a53ed5;}#matrix_formatted_data[age_of_pocket="5 - 10 years"] {   polygon-fill: #ff5c00;}#matrix_formatted_data[age_of_pocket="> 20 years"] {   polygon-fill: #0f3b82;}'
        }, 
        {
            sql: "SELECT * FROM matrix_formatted_data",
            // IS Region -- Temporary sanitation
            cartocss: '#matrix_formatted_data{polygon-fill: #FFFFB2;  polygon-opacity: 1;  line-color: #FFF;  line-width: 0.5;  line-opacity: 1;} #matrix_formatted_data [ temp_sanitation <= 100] {   polygon-fill: #BD0026;}#matrix_formatted_data [ temp_sanitation <= 80] {   polygon-fill: #F03B20;}#matrix_formatted_data [ temp_sanitation <= 60] {   polygon-fill: #FD8D3C;}#matrix_formatted_data [ temp_sanitation <= 40] {   polygon-fill: #FECC5C;}#matrix_formatted_data [ temp_sanitation <= 20] {   polygon-fill: #FFFFB2;}'
        }, 
        {
            sql: "SELECT * FROM matrix_formatted_data",
            // IS Region -- Upgrade category
            cartocss: '#matrix_formatted_data {   polygon-opacity: 1;   line-color: #FFF;   line-width: 0.5;   line-opacity: 1;} #matrix_formatted_data[upgrade_category="City land. Can be upgraded"] {   polygon-fill: #A6CEE3;}#matrix_formatted_data[upgrade_category="National land. Can be upgraded"] {   polygon-fill: #1F78B4;} #matrix_formatted_data[upgrade_category="Provincial land. Can be upgraded"] {   polygon-fill: #B2DF8A;}#matrix_formatted_data[upgrade_category="Some constraints. May need to be relocated"] {   polygon-fill: #33A02C;}'
        }, 
        {
            sql: "SELECT * FROM matrix_formatted_data",
            // IS Region -- Housing density
            cartocss: '#matrix_formatted_data{  polygon-fill: #1a9850;  polygon-opacity: 1;  line-color: #FFF;  line-width: 0.5;  line-opacity: 1;}#matrix_formatted_data [ density_dwellings_per_ha <= 3007.299270073] {   polygon-fill: #d73027;}#matrix_formatted_data [ density_dwellings_per_ha <= 263.73626373626] {   polygon-fill: #f79272;}#matrix_formatted_data [ density_dwellings_per_ha <= 199.76635514019] {   polygon-fill: #fff2cc;}#matrix_formatted_data [ density_dwellings_per_ha <= 131.31313131313] {   polygon-fill: #8cce8a;}#matrix_formatted_data [ density_dwellings_per_ha <= 66.666666666667] {   polygon-fill: #1a9850;}'
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
            sublayer.setInteractivity('pocket_name, ratio_toilets_dwellings, is_cluster, area_ha, ward_id, toilets_container, toilets_chemical, toilets_full_flush, toilets_other, toilets_portable, cns_waterbodies, cns_private_land, cns_metro_roads, cns_servitude, cns_biodiversity_core1, cns_biodiversity_core2, cns_power_lines, cns_railway, cns_landfill_1, cns_landfill_2, cns_flood_prone, cns_irt, cns_noise_zones, cns_heritage, cns_koeberg, structure_count, density_dwellings_per_ha, age_of_pocket, temp_sanitation, upgrade_category');
            console.log("num layers", layer.getSubLayerCount());
            
            sublayer.on('featureClick', function(e, latlng, pos, data, layerNumber) {
                $('#dashboard').removeClass("hidden")
                cartodb.log.log(e, latlng, pos, data, layerNumber);
                $("#pocket_name").text(data.pocket_name);
                $("#upgrade_category").text(data.upgrade_category);
                $("#ratio_toilets_dwellings").text(data.ratio_toilets_dwellings);
                $("#is_cluster").text(data.is_cluster);
                $("#area_ha").text(data.area_ha);
                $("#ward_id").text(data.ward_id);
                $("#structure_count").text(data.structure_count);
                $("#density_dwellings_per_ha").text(data.density_dwellings_per_ha);
                $("#age_of_pocket").text(data.age_of_pocket);
                $("#temp_sanitation").text(data.temp_sanitation);
                cartodb.log.log(e, latlng, pos, data, layerNumber);
                drawToilet([data.toilets_chemical, data.toilets_container, data.toilets_full_flush, data.toilets_other, data.toilets_portable], data.is_cluster);
                drawConstraints([data.cns_waterbodies, data.cns_private_land, data.cns_metro_roads, data.cns_servitude, data.cns_biodiversity_core1, data.cns_biodiversity_core2, data.cns_power_lines, data.cns_railway, data.cns_landfill_1, data.cns_landfill_2, data.cns_flood_prone, data.cns_irt, data.cns_noise_zones, data.cns_heritage, data.cns_koeberg], data.is_cluster);
            });
        
        }
        var densityLegend = new cdb.geo.ui.Legend.Density({
            left: "0",
            right: "3010",
            colors: ["#1a9850", "#8cce8a", "#fff2cc", "#f79272", "#d73027"]
        });
        $('.legend').append(densityLegend.render().el);
        $('.cartodb-legend').prepend('<p class="legend-title">Numbers of households per km<sup>2</sup></p>').show();

        for (var i = 0; i < layer.getSubLayerCount(); i++) {
            sublayers[i] = layer.getSubLayer(i);
        }
        
        
        
        // define ZIndex of the CartoDB layer
        layer.setZIndex(9000);
        // define basemap options
        $('.base-satellite').click(function() {
            if (map_object.hasLayer(basemap1) || (map_object.hasLayer(basemap2))) {
                map_object.removeLayer(basemap1);
                map_object.removeLayer(basemap2);
            }
            
            map_object.addLayer(basemap1);
            return true;
        });
        
        $('.base-map').click(function() {
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
    
    // draw chart function
    function drawToilet(dataArr, options) {
        var dataDt = google.visualization.arrayToDataTable([
        ['Type', 'population'], 
        ['Chemical', dataArr[0]], 
        ['Container', dataArr[1]], 
        ['Full Flush', dataArr[2]], 
        ['Other', dataArr[3]], 
        ['Portable', dataArr[4]]
        ]);
        
        var options = {
            title: '',
            width: '90%',
            height: '250',
            pieSliceText: 'value',
            fontName: 'Open Sans',
            chartArea: {
                left: 0,
                top: 10,
                bottom: 10,
                width: '90%',
                height: '250',
            }
        };

        var hasToilets = false;
        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i]) {
                hasToilets = true;
            }
        }

        // Instantiate and draw the chart.
        var chart = new google.visualization.PieChart(document.getElementById('toilet_chart'));
        chart.draw(dataDt, options);

        if (!hasToilets) {
        document.getElementById("toilet_chart").innerHTML = "This pocket has no toilets";
        };

    }
    
    function drawConstraints(dataArr, options) {
        var dataDt = google.visualization.arrayToDataTable([
        ['Contraint', 'data', {
            role: 'annotation'
        }], 
        ['Waterbodies', dataArr[0], dataArr[0]], 
        ['Private land', dataArr[1], dataArr[1]], 
        ['Metro roads', dataArr[2], dataArr[2]], 
        ['Servitude', dataArr[3], dataArr[3]], 
        ['Biodiversity core 1', dataArr[4], dataArr[4]], 
        ['Biodiversity core 2', dataArr[5], dataArr[5]], 
        ['Power lines', dataArr[6], dataArr[6]], 
        ['Railway', dataArr[7], dataArr[7]], 
        ['Landfill 1', dataArr[8], dataArr[8]], 
        ['Landfill 2', dataArr[9], dataArr[9]], 
        ['Flood prone', dataArr[10], dataArr[10]], 
        ['IRT', dataArr[11], dataArr[11]], 
        ['Noise zones', dataArr[12], dataArr[12]], 
        ['Heritage', dataArr[13], dataArr[13]], 
        ['Koeberg', dataArr[14], dataArr[14]],
        ]);
        
        var formatter = new google.visualization.NumberFormat({
            pattern: '#.##\'%\''
        });
        formatter.format(dataDt, 2);
        
        var options = {
            title: '',
            legend: {
                position: "none"
            },
            width: '100%',
            height: 400,
            annotations: {
                textStyle: {
                    color: '#222',
                }
            },
            fontName: 'Open Sans',
            enableInteractivity: 'false',
            hAxis: {
                format: '#\'%\'',
                title: 'Area of cluster',
                viewWindow: {
                    min: 0,
                    max: 100
                },
                ticks: [0, 25, 50, 75, 100]
            },
            chartArea: {
                top: 0,
                height: 360,
            }
        };
        
        // Instantiate and draw the chart.
        var chart = new google.visualization.BarChart(document.getElementById('constraints_chart'));
        chart.draw(dataDt, options);

          google.visualization.events.addListener(chart, 'error', function (googleError) {
      google.visualization.errors.removeError(googleError.id);
      document.getElementById("constraints_chart").innerHTML = "There are no constraints for this cluster";
  });
    }
    
    
    
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
        $('.legend').append(densityLegend.render().el);
        $('.cartodb-legend').prepend('<p class="legend-title">Number of households</p>').show();
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
        $('.legend').append(legend.render().el);
        $('.cartodb-legend').prepend('<p class="legend-title">Age of pocket</p>').show();
    
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

        $('.legend').append(densityLegend.render().el);
        $('.cartodb-legend').prepend('<p class="legend-title">Percentage of toilets that are temporary</p>').show();
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
        $('.legend').append(legend.render().el);
        $('.cartodb-legend').prepend('<p class="legend-title">Upgrade category</p>').show();

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
        $('.legend').append(densityLegend.render().el);
        $('.cartodb-legend').prepend('<p class="legend-title">Numbers of households per km<sup>2</sup></p>').show();
    });
    
    $("#layer-select > .btn").click(function() {
        $("#layer-select > .btn").removeClass("active");
        $(this).addClass("active");
    });
    
    $("#layer-select-mobile > .btn").click(function() {
        $("#layer-select-mobile > .btn").removeClass("active");
        $(this).addClass("active");
    });
    
    $("#layer-select-tiny > .btn").click(function() {
        $("#layer-select-tiny > .btn").removeClass("active");
        $(this).addClass("active");
    });
    
    $(".basemap-select > .btn").click(function() {
        $(".basemap-select > .btn").removeClass("active");
        $(this).addClass("active");
    });
}
//closes function
