
function CreateMapChart() {

    am5.ready(function () {

        var root = am5.Root.new("chartdiv");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(am5map.MapChart.new(root, {
            panX: "translateX",
            panY: "translateY",
            projection: am5map.geoMercator()
        }));

        var customGeoJSON = JSON.parse(JSON.stringify(am5geodata_worldLow));

        customGeoJSON.features = customGeoJSON.features.filter(function (feature) {
            return !["SM"].includes(feature.id);
        });

        var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow,
            exclude: ["AQ"],
        }));

        polygonSeries.mapPolygons.template.events.on("click", function (ev) {
            var countryName = ev.target.dataItem.dataContext.name;
            console.log("Kliknieto w: ", countryName);
        });

        polygonSeries.mapPolygons.template.setAll({
            tooltipText: "{name}",
            toggleKey: "active",
            interactive: true,
            strokeWidth: 1.5,
        });

        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: root.interfaceColors.get("primaryButtonHover")
        });

        polygonSeries.mapPolygons.template.states.create("active", {
            fill: root.interfaceColors.get("primaryButtonHover")
        });

        var previousPolygon;

        polygonSeries.mapPolygons.template.on("active", function (active, target) {
            if (previousPolygon && previousPolygon != target) {
                previousPolygon.set("active", false);
            }
            if (target.get("active")) {
                polygonSeries.zoomToDataItem(target.dataItem);
            }
            else {
                chart.goHome();
            }
            previousPolygon = target;
        });

        var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
        zoomControl.homeButton.set("visible", true);

        chart.chartContainer.get("background").events.on("click", function () {
            chart.goHome();
        })

        chart.appear(1000, 100);
    }); 
}