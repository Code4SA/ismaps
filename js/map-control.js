window.onload = function() {

    $(".startStory").on('click', function() {
        $("#mapOverlay").fadeOut("slow")
        ga('send', 'event', 'start-button', 'clicked');
    });

    $("#skip-stories").on('click', function() {
        ga('send', 'event', 'story started but skipped', 'clicked');
    });    
    
    // Instantiate new map object, place it in 'map' element -- Uses Leaflet.js
    var map_object = new L.Map('map',{
        center: [-33.99943, 18.61679],
        // Starting Point
        zoom: 10,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        dragging: false,
        touchZoom: false,
        keyboard: false,
    });
    
    var clickedPocket = false;
    var clickedLayer = false;
    
    // Put layer data into a JS object
    var layerSource = {
        user_name: 'adi45',
        type: 'cartodb',
        sublayers: [{
            sql: "SELECT * FROM matrix_formatted_data",
            // IS Region -- Structure count
            cartocss: '#matrix_formatted_data {polygon-opacity: 1;line-color: #FFF;line-width: 1;line-opacity: 1;}#matrix_formatted_data[structure_count <= 8000] {polygon-fill: #a50f15;}#matrix_formatted_data[structure_count <= 5000] {polygon-fill: #de2d26;}#matrix_formatted_data[structure_count <= 1000] {polygon-fill: #fb6a4a;}#matrix_formatted_data[structure_count <= 750] {polygon-fill: #fc9272;}#matrix_formatted_data[structure_count <= 500] {polygon-fill: #fcbba1;}#matrix_formatted_data[structure_count <= 250] {polygon-fill: #fee5d9;}'
        }, 
        {
            sql: "SELECT * FROM matrix_formatted_data",
            // IS Region -- Age of pocket
            cartocss: '#matrix_formatted_data {polygon-opacity: 1;line-color: #FFF;line-width: 1;line-opacity: 1;}#matrix_formatted_data[age_of_pocket="0 - 5 years"] {polygon-fill: #dadaeb;}#matrix_formatted_data[age_of_pocket="10 - 15 years"] {polygon-fill: #bcbddc;}#matrix_formatted_data[age_of_pocket="15 - 20 years"] {polygon-fill: #9e9ac8;}#matrix_formatted_data[age_of_pocket="5 - 10 years"] {polygon-fill: #756bb1;}#matrix_formatted_data[age_of_pocket="> 20 years"] {polygon-fill: #54278f;}'
        }, 
        {
            sql: "SELECT * FROM matrix_formatted_data",
            // IS Region -- Temporary sanitation
            cartocss: '#matrix_formatted_data{polygon-fill: #FFFFCC;polygon-opacity: 1;line-color: #FFF;line-width: 1;line-opacity: 1;}#matrix_formatted_data [ temp_sanitation <= 100] {polygon-fill: #ca0020;}#matrix_formatted_data [ temp_sanitation <= 80] {polygon-fill: #f4a582;}#matrix_formatted_data [ temp_sanitation <= 60] {polygon-fill: #f7f7f7;}#matrix_formatted_data [ temp_sanitation <= 40] {polygon-fill: #92c5de;}#matrix_formatted_data [ temp_sanitation <= 20] {polygon-fill: #0571b0;}#matrix_formatted_data [ toilets_total <= 0] {polygon-fill: #333;}'
        }, 
        {
            sql: "SELECT * FROM matrix_formatted_data",
            // IS Region -- Upgrade category
            cartocss: '#matrix_formatted_data {polygon-opacity: 1;line-color: #FFFFFF;line-width: 1;line-opacity: 1;}#matrix_formatted_data[upgrade_category="City land. Can be upgraded"] {polygon-fill: #67a9cf;}#matrix_formatted_data[upgrade_category="Provincial or National Government land.  Some constraints"] {polygon-fill: #fddbc7;}#matrix_formatted_data[upgrade_category="City land.  Some constraints"] {polygon-fill: #ef8a62;}#matrix_formatted_data[upgrade_category="Many constraints. May need to be relocated"] {polygon-fill: #b2182b;}'
        }, 
        {
            sql: "SELECT * FROM matrix_formatted_data",
            // IS Region -- Housing density
            cartocss: '#matrix_formatted_data{polygon-opacity: 1;line-color: #FFFFFF;line-width: 1;line-opacity: 1;}#matrix_formatted_data [ density_dwellings_per_ha <= 465] {polygon-fill: #a50f15;}#matrix_formatted_data [ density_dwellings_per_ha <= 372] {polygon-fill: #de2d26;}#matrix_formatted_data [ density_dwellings_per_ha <= 279] {polygon-fill: #fb6a4a;}#matrix_formatted_data [ density_dwellings_per_ha <= 186] {polygon-fill: #fcae91;}#matrix_formatted_data [ density_dwellings_per_ha <= 93] {polygon-fill: #fee5d9;}'
        }, 
        {
            sql: "SELECT * FROM matrix_formatted_data",
            // IS Region -- Boundary layer
            cartocss: '#matrix_formatted_data {polygon-fill: #fff;polygon-opacity: 0;line-color: #000;line-width: 1;line-opacity: 1;}'
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
    

        $('.scene7-btn, .skiptomap').click(function() {
        
        for (var i = 0; i < 6; i++) {
            sublayer = layer.getSubLayer(i);
            sublayer.setInteraction(true);
            sublayer.setInteractivity('pocket_name, ratio_toilets_dwellings, is_cluster, area_ha, ward_id, ward_councillor, toilets_container, toilets_chemical, toilets_full_flush, toilets_other, toilets_portable, cns_waterbodies, cns_private_land, cns_metro_roads, cns_servitude, cns_biodiversity_core1, cns_biodiversity_core2, cns_power_lines, cns_railway, cns_landfill_1, cns_landfill_2, cns_flood_prone, cns_irt, cns_noise_zones, cns_heritage, cns_koeberg, structure_count, density_dwellings_per_ha, age_of_pocket, temp_sanitation, upgrade_category');
            
            console.log("num layers", layer.getSubLayerCount());
            
            sublayer.on('featureClick', function(e, latlng, pos, data, layerNumber) {
                $("#mapcontainer").removeClass("mapstart");
                $("#mapcontainer").addClass("mapdashboard"); 
                $('#footer').removeClass("hidden");
                $('#logos').removeClass("hidden");                                                               
                $(".scene8-next").removeClass("disabled");                
                $('#back-to-map').removeClass("hidden");
                $("#click-pocket").addClass("hidden");                                
                $('#dashboard').removeClass("hidden");
                $('.arrow-down').removeClass("fade-out");
                $('.arrow-down').removeClass("hidden");
                setTimeout(function() {
                    $(".arrow-down").addClass("fade-out");
                }, 6000);
                cartodb.log.log(e, latlng, pos, data, layerNumber);
                $("#pocket_name").text(data.pocket_name);
                $("#upgrade_category").text(data.upgrade_category);
                $("#ratio_toilets_dwellings").text(data.ratio_toilets_dwellings);
                $("#is_cluster").text(data.is_cluster);
                $("#area_ha").text(data.area_ha);
                $("#ward_id").text(data.ward_id);
                $("#ward_councillor").text(data.ward_councillor);                
                $("#structure_count").text(data.structure_count);
                $("#density_dwellings_per_ha").text(data.density_dwellings_per_ha);
                $("#age_of_pocket").text(data.age_of_pocket);
                $("#temp_sanitation").text(data.temp_sanitation);
                cartodb.log.log(e, latlng, pos, data, layerNumber);
                drawToilet([data.toilets_full_flush, data.toilets_chemical, data.toilets_container, data.toilets_portable, data.toilets_other], data.is_cluster);
                drawConstraints([data.cns_waterbodies, data.cns_private_land, data.cns_metro_roads, data.cns_servitude, data.cns_biodiversity_core1, data.cns_biodiversity_core2, data.cns_power_lines, data.cns_railway, data.cns_landfill_1, data.cns_landfill_2, data.cns_flood_prone, data.cns_irt, data.cns_noise_zones, data.cns_heritage, data.cns_koeberg], data.is_cluster);
                ga('send', 'event', 'pocket', data.is_cluster, data.pocket_name);
                if (!clickedPocket) {
                    ga('send', 'event', 'at least one pocket', 'clicked');
                }
                clickedPocket = true;
            });


            sublayer.on('featureOver', function(e, latlng, pos, data, layerNumber) {
                $(".tooltip-name").text(data.pocket_name);
                $(".tooltip-name").removeClass("hidden");
            });

            sublayer.on('featureOut', function(e, latlng, pos, data, layerNumber) {
                $(".tooltip-name").text('');
                $(".tooltip-name").addClass("hidden");
            });

        }

        });
        
        for (var i = 0; i < layer.getSubLayerCount(); i++) {
            sublayers[i] = layer.getSubLayer(i);
        }
        
        sublayers[0].hide();
        sublayers[1].hide();
        sublayers[2].hide();
        sublayers[3].hide();
        sublayers[4].hide();
        sublayers[5].hide();

        
        // define ZIndex of the CartoDB layer
        layer.setZIndex(9000);
        // define basemap options
        $('.base-satellite').click(function() {
            if (map_object.hasLayer(basemap1) || (map_object.hasLayer(basemap2))) {
                map_object.removeLayer(basemap1);
                map_object.removeLayer(basemap2);
            }
            
            map_object.addLayer(basemap1);
            ga('send', 'event', 'basemap', 'satellite');
            return true;
        });
        
        $('.base-map').click(function() {
            if (map_object.hasLayer(basemap1) || (map_object.hasLayer(basemap2))) {
                map_object.removeLayer(basemap1);
                map_object.removeLayer(basemap2);
            }
            map_object.addLayer(basemap2);
            ga('send', 'event', 'basemap', 'map');
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
        ['Full Flush', dataArr[0]], 
        ['Chemical', dataArr[1]], 
        ['Container', dataArr[2]], 
        ['Porta-potty', dataArr[3]], 
        ['Other', dataArr[4]], 
        ]);
        
        var options = {
            title: '',
            width: '90%',
            height: '250',
            backgroundColor: '#efefef',
            colors: ['#377eb8', "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c"],
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
        }
        ;
    
    }
    
    function drawConstraints(dataArr, options) {
        var dataDt = google.visualization.arrayToDataTable([
        ['Contraint', 'data', {
            role: 'annotation'
        }, {
            role: 'style'
        }], 
        ['Waterbodies', dataArr[0], dataArr[0], 'color: #333; stroke-width: 0'], 
        ['Private land', dataArr[1], dataArr[1], 'color: #333; stroke-width: 0'], 
        ['Metro roads', dataArr[2], dataArr[2], 'color: #333; stroke-width: 0'], 
        ['Servitude', dataArr[3], dataArr[3], 'color: #333; stroke-width: 0'], 
        ['Biodiversity core 1', dataArr[4], dataArr[4], 'color: #333; stroke-width: 0'], 
        ['Biodiversity core 2', dataArr[5], dataArr[5], 'color: #333; stroke-width: 0'], 
        ['Power lines', dataArr[6], dataArr[6], 'color: #333; stroke-width: 0'], 
        ['Railway', dataArr[7], dataArr[7], 'color: #333; stroke-width: 0'], 
        ['Near to landfills', dataArr[8], dataArr[8], 'color: #333; stroke-width: 0'], 
        ['Proposed / closed landfills', dataArr[9], dataArr[9], 'color: #333; stroke-width: 0'], 
        ['Flood prone', dataArr[10], dataArr[10], 'color: #333; stroke-width: 0'], 
        ['IRT', dataArr[11], dataArr[11], 'color: #333; stroke-width: 0'], 
        ['Noise zones', dataArr[12], dataArr[12], 'color: #333; stroke-width: 0'], 
        ['Heritage', dataArr[13], dataArr[13], 'color: #333; stroke-width: 0'], 
        ['Koeberg', dataArr[14], dataArr[14], 'color: #333; stroke-width: 0'], 
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
            backgroundColor: '#efefef',
            annotations: {
                textStyle: {
                    color: '#222',
                    fontSize: 12,
                }
            },
            fontName: 'Open Sans',
            enableInteractivity: 'false',
            vAxis: { title: "",
                textStyle: {fontSize: 12}
                },
            hAxis: {
                format: '#\'%\'',
                title: 'Area of cluster',
                textStyle: {fontSize: 12 },
                viewWindow: {min: 0, max: 100},
                ticks: [0, 25, 50, 75, 100]
            },
            chartArea: {
                top: 0,
                height: 360,
                width: '65%'
            }
        };
        
        // Instantiate and draw the chart.
        var chart = new google.visualization.BarChart(document.getElementById('constraints_chart'));
        chart.draw(dataDt, options);
        
        google.visualization.events.addListener(chart, 'error', function(googleError) {
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
        sublayers[5].hide();
        sublayers[0].show();
        $('.cartodb-legend').addClass("hidden");
        var legend = new cdb.geo.ui.Legend({
            type: "custom",
            data: [
            {
                name: "≤ 8000",
                value: "#a50f15"
            }, 
            {
                name: "≤ 5000",
                value: "#de2d26"
            }, 
            {
                name: "≤ 1000",
                value: "#fb6a4a"
            }, 
            {
                name: "≤ 750",
                value: "#fc9272"
            }, 
            {
                name: "≤ 500",
                value: "#fcbba1"
            }, 
            {
                name: "≤ 250",
                value: "#fee5d9"
            }
            ]
        });
        $('.legend').append(legend.render().el);
        $('.cartodb-legend').prepend('<p class="legend-title">Number of households</p>').show();
        
        $('#infoHousing').removeClass("hidden").show();
        $('#infoAge').addClass("hidden").hide();
        $('#infoTempSani').addClass("hidden").hide();
        $('#infoUpgrade').addClass("hidden").hide();
        $('#infoDensity').addClass("hidden").hide();
        $('#infoDefault').addClass("hidden").hide();
        $('#infoBoundary').addClass("hidden").hide();
        ga('send', 'event', 'layers', 'number of households');
        if (!clickedLayer) {
            ga('send', 'event', 'at least one layer', 'changed');
        }
        clickedLayer = true;
    });
    
    // Add button events Sublayer 1 - Age of pocket
    var sublayer1Shown = true;
    $(".select-sublayer1").on('click', function() {
        sublayers[0].hide();
        sublayers[2].hide();
        sublayers[3].hide();
        sublayers[4].hide();
        sublayers[5].hide();
        sublayers[1].show();
        $('.cartodb-legend').addClass("hidden");
        $('.scene7-next-zukiswa').removeClass("disabled");        
        var legend = new cdb.geo.ui.Legend({
            type: "custom",
            data: [
            {
                name: "0 - 5 years",
                value: "#dadaeb"
            }, 
            {
                name: "5 - 10 years",
                value: "#bcbddc"
            }, 
            {
                name: "10 - 15 years",
                value: "#9e9ac8"
            }, 
            {
                name: "15 - 20 years",
                value: "#756bb1"
            }, 
            {
                name: "> 20 years",
                value: "#54278f"
            }
            ]
        });
        $('.legend').append(legend.render().el);
        $('.cartodb-legend').prepend('<p class="legend-title">Age of pocket</p>').show();
        
        $('#infoAge').removeClass("hidden").show();
        $('#infoHousing').addClass("hidden").hide();
        $('#infoTempSani').addClass("hidden").hide();
        $('#infoUpgrade').addClass("hidden").hide();
        $('#infoDensity').addClass("hidden").hide();
        $('#infoDefault').addClass("hidden").hide();
        $('#infoBoundary').addClass("hidden").hide();
        $('#click-layer-zukiswa-age').addClass("hidden");                
        ga('send', 'event', 'layers', 'age of pocket');
        if (!clickedLayer) {
            ga('send', 'event', 'at least one layer', 'changed');
        }
        clickedLayer = true;
    });
    
    // Add button events Sublayer 2 - Temporary sanitation
    var sublayer2Shown = true;
    $(".select-sublayer2").on('click', function() {
        sublayers[0].hide();
        sublayers[1].hide();
        sublayers[3].hide();
        sublayers[4].hide();
        sublayers[5].hide();
        sublayers[2].show();
        $('.cartodb-legend').addClass("hidden");
        $('.scene6-next-asithandile').removeClass("disabled");
        var densityLegend = new cdb.geo.ui.Legend.Density({
            left: "0%",
            right: "100%",
            colors: ["#0571b0", "#92c5de", "#f7f7f7", "#f4a582", "#ca0020"]
        });
        
        $('.legend').append(densityLegend.render().el);


        $('.cartodb-legend').prepend('<p class="legend-title">Percentage of toilets that are temporary</p>').show();
        $('.cartodb-legend').append('<br><div class="bullet-box"></div><p class="leg-toi-text">No toilets</p>').show();
        
        $('#infoTempSani').removeClass("hidden").show();
        $('#infoHousing').addClass("hidden").hide();
        $('#infoAge').addClass("hidden").hide();
        $('#infoUpgrade').addClass("hidden").hide();
        $('#infoDensity').addClass("hidden").hide();
        $('#infoDefault').addClass("hidden").hide();
        $('#infoBoundary').addClass("hidden").hide();
        $('#click-layer-asithandile').addClass("hidden");
        ga('send', 'event', 'layers', 'temporary toilets');
        if (!clickedLayer) {
            ga('send', 'event', 'at least one layer', 'changed');
        }
        clickedLayer = true;
    });
    
    // Add button events Sublayer 3 - Upgrade category
    var sublayer3Shown = true;
    $(".select-sublayer3").on('click', function() {
        sublayers[0].hide();
        sublayers[2].hide();
        sublayers[1].hide();
        sublayers[4].hide();
        sublayers[5].hide();
        sublayers[3].show();
        $('.scene6-next-zukiswa').removeClass("disabled");
        $('.cartodb-legend').addClass("hidden");
        var legend = new cdb.geo.ui.Legend({
            type: "custom",
            title: "Test",
            data: [
            {
                name: "City land. Can be upgraded",
                value: "#67a9cf"
            }, 
            {
                name: "Provincial or National Government land.  Some constraints",
                value: "#fddbc7"
            }, 
            {
                name: "City land.  Some constraints",
                value: "#ef8a62"
            }, 
            {
                name: "Many constraints. May need to be relocated",
                value: "#b2182b"
            }
            ]
        });
        $('.legend').append(legend.render().el);
        $('.cartodb-legend').prepend('<p class="legend-title">Upgrade category</p>').show();
        
        $('#infoUpgrade').removeClass("hidden").show();
        $('#infoHousing').addClass("hidden").hide();
        $('#infoTempSani').addClass("hidden").hide();
        $('#infoAge').addClass("hidden").hide();
        $('#infoDensity').addClass("hidden").hide();
        $('#infoDefault').addClass("hidden").hide();
        $('#infoBoundary').addClass("hidden").hide();
        $('#click-layer-zukiswa').addClass("hidden");        
        ga('send', 'event', 'layers', 'upgrade category');
        if (!clickedLayer) {
            ga('send', 'event', 'at least one layer', 'changed');
        }
        clickedLayer = true;
    });
    // Add button events Sublayer 4 - Housing density
    var sublayer4Shown = true;
    $(".select-sublayer4").on('click', function() {
        sublayers[0].hide();
        sublayers[2].hide();
        sublayers[1].hide();
        sublayers[3].hide();
        sublayers[5].hide();
        sublayers[4].show();
        $('.cartodb-legend').addClass("hidden");
        var densityLegend = new cdb.geo.ui.Legend.Density({
            left: "0",
            right: "465",
            colors: ["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"]
        });
        $('.legend').append(densityLegend.render().el);
        $('.cartodb-legend').prepend('<p class="legend-title">Numbers of households per hectare</p>').show();
        
        $('#infoDensity').removeClass("hidden").show();
        $('#infoUpgrade').addClass("hidden").hide();
        $('#infoTempSani').addClass("hidden").hide();
        $('#infoAge').addClass("hidden").hide();
        $('#infoHousing').addClass("hidden").hide();
        $('#infoDefault').addClass("hidden").hide();
        $('#infoBoundary').addClass("hidden").hide();
        ga('send', 'event', 'layers', 'housing density');
        if (!clickedLayer) {
            ga('send', 'event', 'at least one layer', 'changed');
        }
        clickedLayer = true;
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
    // Add button events Sublayer 5 - Boundaries    
    var sublayer5Shown = true;
    $(".select-sublayer5").on('click', function() {
        sublayers[0].hide();
        sublayers[2].hide();
        sublayers[1].hide();
        sublayers[3].hide();
        sublayers[4].hide();
        sublayers[5].show();
        $('.cartodb-legend').addClass("hidden");
        $('#infoBoundary').removeClass("hidden").show();
        $('#infoDensity').addClass("hidden").hide();
        $('#infoUpgrade').addClass("hidden").hide();
        $('#infoTempSani').addClass("hidden").hide();
        $('#infoAge').addClass("hidden").hide();
        $('#infoHousing').addClass("hidden").hide();
        $('#infoDefault').addClass("hidden").hide();
        ga('send', 'event', 'layers', 'boundary');
        if (!clickedLayer) {
            ga('send', 'event', 'at least one layer', 'changed');
        }
        clickedLayer = true;
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
    
    
    var minimized_elements = $('p.minimize');
    
    minimized_elements.each(function() {
        var t = $(this).text();
        if (t.length < 400)
            return;
        
        $(this).html(
        t.slice(0, 400) + '<span>... </span><a href="#" class="more">more</a>' + 
        '<span style="display:none;">' + t.slice(400, t.length) + ' <a href="#" class="less">less</a></span>'
        );
    
    });
    
    $('a.more', minimized_elements).click(function(event) {
        event.preventDefault();
        $(this).hide().prev().hide();
        $(this).next().show();
    });
    
    $('a.less', minimized_elements).click(function(event) {
        event.preventDefault();
        $(this).parent().hide().prev().show().prev().show();
    });

    // scene 0 -- overlay
    $(".scene0-btn").on('click', function() {
    $("#mapOverlay").fadeIn("slow");
    });

    // scene 1 -- empty map
    $(".scene1-btn").on('click', function() {
    sublayers[5].hide();
    map_object.setView([-33.99943, 18.61679], 10);
    $("#layer-select").addClass("hidden");    

    $(".scene-btn").addClass("hidden");
    $(".scene0-back").removeClass("hidden");
    $(".scene2-next").removeClass("hidden");


    $(".text").addClass("hidden");
    $(".scene1-text").removeClass("hidden");    
    });

    // scene 2 -- with borders
    $(".scene2-btn").on('click', function() {
    sublayers[5].show();
    map_object.setView([-33.99943, 18.61679], 10);
    $("#layer-select").addClass("hidden");    

    $(".scene-btn").addClass("hidden");
    $(".scene1-back").removeClass("hidden");
    $(".scene3-next").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene2-text").removeClass("hidden");        
    });    

    // scene 3 -- zoomed to cape flats
    $(".scene3-btn").on('click', function() {
    map_object.setView([-34.017147, 18.631967], 12);
    $("#layer-select").addClass("hidden");
    $("#click-layer-asithandile").addClass("hidden"); 
    $("#click-layer-zukiswa").addClass("hidden"); 
    $("#click-layer-zukiswa-age").addClass("hidden"); 
    $(".cartodb-legend").addClass("hidden"); 
    $("#dashboard").addClass("hidden"); 
    $(".scene8-next").addClass("disabled");                

    sublayers[5].show();
    sublayers[2].hide();           

    $(".scene-btn").addClass("hidden");
    $(".scene2-back").removeClass("hidden");
    $(".scene4-next").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene3-text").removeClass("hidden");
    $("#bm-map").click();
    });

    // scene 4a -- zoomed to pocket Asithandile
    $(".scene4-btn-asithandile").on('click', function() {
    map_object.setView([-34.017396, 18.587218], 16);
    $("#layer-select").addClass("hidden");
    $("#click-layer-asithandile").addClass("hidden");
    $(".select-sublayer2").addClass("disabled");    

    $(".scene-btn").addClass("hidden");
    $(".scene3-back").removeClass("hidden");
    $(".scene4b-next-asithandile").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene4a-text-asithandile").removeClass("hidden");  
    $("#bm-sat").click();  

    $("#mapcontainer").addClass("mapstart");
    $("#mapcontainer").removeClass("mapdashboard"); 
    $('#dashboard').addClass("hidden");     
    $('#footer').addClass("hidden");
    $('#logos').addClass("hidden");
    $(".select-sublayer5").click();  
    ga('send', 'event', 'story started', 'asithandile');                
    });

    // scene 4b -- zoomed to pocket Asithandile
    $(".scene4b-btn-asithandile").on('click', function() { 

    $(".scene-btn").addClass("hidden");
    $(".scene4-back-asithandile").removeClass("hidden");
    $(".scene4c-next-asithandile").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene4b-text-asithandile").removeClass("hidden");  
    });

    // scene 4c -- zoomed to pocket Asithandile
    $(".scene4c-btn-asithandile").on('click', function() { 
    map_object.setView([-34.017396, 18.587218], 16);

    $(".scene-btn").addClass("hidden");
    $(".scene4b-back-asithandile").removeClass("hidden");
    $(".scene5-next-asithandile").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene4c-text-asithandile").removeClass("hidden");  +


    $("#layer-select").addClass("hidden");
    $("#click-layer-asithandile").addClass("hidden");
    $(".select-sublayer2").addClass("disabled");    

    $(".select-sublayer5").click();    
    });
 
    // scene 4a -- zoomed to pocket Zukiswa
    $(".scene4-btn-zukiswa").on('click', function() {
    map_object.setView([-34.016949, 18.660423], 16);
    $("#layer-select").addClass("hidden");
    $("#click-layer-zukiswa").addClass("hidden");
    $(".select-sublayer2").addClass("disabled");    

    $(".scene-btn").addClass("hidden");
    $(".scene3-back").removeClass("hidden");
    $(".scene4b-next-zukiswa").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene4a-text-zukiswa").removeClass("hidden");  
    $("#bm-sat").click();  

    $("#mapcontainer").addClass("mapstart");
    $("#mapcontainer").removeClass("mapdashboard"); 
    $('#dashboard').addClass("hidden");     
    $('#footer').addClass("hidden");
    $('#logos').addClass("hidden");
    $(".select-sublayer5").click();
    ga('send', 'event', 'story started', 'zukiswa');                    
    });

    // scene 4b -- zoomed to pocket Zukiswa
    $(".scene4b-btn-zukiswa").on('click', function() { 

    $(".scene-btn").addClass("hidden");
    $(".scene4-back-zukiswa").removeClass("hidden");
    $(".scene4c-next-zukiswa").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene4b-text-zukiswa").removeClass("hidden");  
    });

    // scene 4c -- zoomed to pocket Zukiswa
    $(".scene4c-btn-zukiswa").on('click', function() { 

    $(".scene-btn").addClass("hidden");
    $(".scene4b-back-zukiswa").removeClass("hidden");
    $(".scene4d-next-zukiswa").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene4c-text-zukiswa").removeClass("hidden");  
    });    

    // scene 4d -- zoomed to pocket Zukiswa
    $(".scene4d-btn-zukiswa").on('click', function() { 
    map_object.setView([-34.016949, 18.660423], 16);

    $(".scene-btn").addClass("hidden");
    $(".scene4c-back-zukiswa").removeClass("hidden");
    $(".scene5-next-zukiswa").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene4d-text-zukiswa").removeClass("hidden");

    $("#layer-select").addClass("hidden");
    $("#click-layer-zukiswa").addClass("hidden");
    $(".select-sublayer3").addClass("disabled");    
    $(".select-sublayer5").click();    
    });

    // scene 5 -- with change layer buttons Asithandile
    $(".scene5-btn-asithandile").on('click', function() {
    $(".select-sublayer5").click();
    $("#bm-map").click();                        
    $("#layer-select").removeClass("hidden");
    $("#click-layer-asithandile").removeClass("hidden");  
    $(".ssub").addClass("disabled");      
    $(".select-sublayer2").removeClass("disabled");
    $(".scene6-next-asithandile").addClass("disabled");

    $(".scene-btn").addClass("hidden");
    $(".scene4c-back-asithandile").removeClass("hidden");
    $(".scene6-next-asithandile").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene5-text-asithandile").removeClass("hidden"); 
    ga('send', 'event', 'story halfway', 'asithandile');                                   
    });

    // scene 5 -- with change layer buttons Zukiswa
    $(".scene5-btn-zukiswa").on('click', function() {
    $(".select-sublayer5").click();
    $("#bm-map").click();                        
    $("#layer-select").removeClass("hidden");
    $("#click-layer-zukiswa").removeClass("hidden");
    $("#click-layer-zukiswa-age").addClass("hidden");
    $(".ssub").addClass("disabled");          
    $(".select-sublayer3").removeClass("disabled");
    $(".scene6-next-zukiswa").addClass("disabled");
    $(".select-sublayer1").addClass("disabled");    

    $(".scene-btn").addClass("hidden");
    $(".scene4d-back-zukiswa").removeClass("hidden");
    $(".scene6-next-zukiswa").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene5-text-zukiswa").removeClass("hidden");
    ga('send', 'event', 'story halfway', 'zukiswa');                                                   
    });

    // scene 6 -- changed text Asithandile
    $(".scene6-btn-asithandile").on('click', function() {
    $("#layer-select").removeClass("hidden");

    $(".scene-btn").addClass("hidden");
    $(".scene5-back-asithandile").removeClass("hidden");
    $(".scene7-next-asithandile").removeClass("hidden");
    $(".scene7-next-zukiswa").addClass("disabled");    

    $(".text").addClass("hidden");
    $(".scene6-text-asithandile").removeClass("hidden"); 
    $("#click-pocket").addClass("hidden");    
    });

    // scene 6 -- changed text Zukiswa
    $(".scene6-btn-zukiswa").on('click', function() {
    $(".select-sublayer3").click();                                            
    $("#layer-select").removeClass("hidden");

    $(".scene-btn").addClass("hidden");
    $(".scene5-back-zukiswa").removeClass("hidden");
    $(".scene7-next-zukiswa").removeClass("hidden");

    $("#layer-select").removeClass("hidden");
    $("#click-layer-zukiswa-age").removeClass("hidden");    
    $(".select-sublayer1").removeClass("disabled");    

    $(".text").addClass("hidden");
    $(".scene6-text-zukiswa").removeClass("hidden"); 
    $("#click-pocket").addClass("hidden");                                
    });    

    // scene 7 -- clickable pocket Asithandile
    $(".scene7-btn-asithandile").on('click', function() {
    $("#layer-select").removeClass("hidden");
    $(".select-sublayer2").removeClass("disabled");

    $(".scene-btn").addClass("hidden");
    $(".scene6-back-asithandile").removeClass("hidden");
    $(".scene8-next-asithandile").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene7-text-asithandile").removeClass("hidden");
    $("#click-pocket").removeClass("hidden");                 
    });

    // scene 7 -- clickable pocket Zukiswa
    $(".scene7-btn-zukiswa").on('click', function() {
    $("#layer-select").removeClass("hidden");
    $(".select-sublayer3").removeClass("disabled");

    $(".scene-btn").addClass("hidden");
    $(".scene6-back-zukiswa").removeClass("hidden");
    $(".scene8-next-zukiswa").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene7-text-zukiswa").removeClass("hidden");
    $("#click-pocket").removeClass("hidden");                 
    });    

    // scene 8 -- three options Asithandile
    $(".scene8-btn-asithandile").on('click', function() {
    $("#click-pocket").addClass("hidden");

    $(".scene-btn").addClass("hidden");
    $(".scene7-back-asithandile").removeClass("hidden");
    $(".other-story-asithandile").removeClass("hidden");        
    $(".explore-map").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene8-text-asithandile").removeClass("hidden");
    ga('send', 'event', 'story finished', 'asithandile');                    
    });

    // scene 8 -- three options Zukiswa
    $(".scene8-btn-zukiswa").on('click', function() {
    $("#click-pocket").addClass("hidden");

    $(".scene-btn").addClass("hidden");
    $(".scene7-back-zukiswa").removeClass("hidden");
    $(".other-story-zukiswa").removeClass("hidden");        
    $(".explore-map").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene8-text-zukiswa").removeClass("hidden");
    ga('send', 'event', 'story finished', 'zukiswa');                
    });    

    // explore map
    $(".explore-map").on('click', function() {
    $("#click-pocket").removeClass("hidden");
    $(".basemap-select").removeClass("hidden");

    $(".text").addClass("hidden");
    $(".scene8-text").removeClass("hidden");
    $("#click-pocket").addClass("hidden");    
    $("#map").addClass("col-xs-12");
    $("#map").removeClass("col-xs-8");       
    $("#storyboard").remove();
    map_object.dragging.enable();
    map_object.touchZoom.enable();
    map_object.keyboard.enable();
    $(".leaflet-control-zoom").removeClass("hidden"); 
    map_object.setView([-33.99943, 18.61679], 12); 
    $(".ssub").removeClass("disabled");
    $("#mapGradient").addClass("hidden");
    $("#bm-map").click();    
    $(".layer-info").removeClass("hidden"); 
    $("#layer-select-tiny").removeClass("hidden");                        
    $("#layer-select-mobile").removeClass("hidden"); 
    $("#skip-stories").addClass("hidden");    
    ga('send', 'event', 'explore-map', 'clicked');
    map_object.invalidateSize(true);
    });

    $(".leaflet-control-zoom").addClass("hidden");    

    $(".skiptomap").on('click', function() {
    $("#mapOverlay").fadeOut("slow");
    $("#layer-select").removeClass("hidden");
    $(".select-sublayer5").click();
    $("#skip-stories").addClass("hidden");
    });

    $(".close-layertext").on('click', function() {
    $(".layer-info").addClass("hidden");
    $(".open-layertext").removeClass("hidden");
    });

    $(".open-layertext").on('click', function() {
    $(".layer-info").removeClass("hidden");
    $(".open-layertext").addClass("hidden");
    ga('send', 'event', 'skip-to-map', 'clicked');            
    });
}
//closes function

document.onreadystatechange = function () {
  var state = document.readyState
  if (state == 'complete') {
         document.getElementById('interactive');
         document.getElementById('load').style.visibility="hidden";
  }
}