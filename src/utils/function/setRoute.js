import polyline from "@mapbox/polyline";

export const setRoute = (map, data) => {
	const routes = [];
	const points = [];

	for (let k = 0; k < data.routes.length; k++) {
		for (let j = 0; j < data.routes[k].legs.length; j++) {
			for (let i = 0; i < data.routes[k].legs[j].steps.length; i++) {
				const step = data.routes[k].legs[j].steps[i]["polyline"];
				const point = data.routes[k].legs[j].steps[i]["start_location"];

				const route = polyline.decode(step, 5);

				route.map((item) => {
					item.reverse();
				});

				routes.push(route);
				points.push(point);
			}
		}
	}

	if (map) {
		map.addSource("route", {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				features: [
					{
						type: "Feature",
						geometry: {
							type: "MultiLineString",
							coordinates: routes,
						},
						properties: null,
					},
				],
			},
		});
		map.addSource("points1", {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				features: [
					{
						type: "Feature",
						geometry: {
							type: "MultiPoint",
							coordinates: points,
						},
						properties: null,
					},
				],
			},
		});

		map.addLayer({
			id: "route-line",
			type: "line",
			source: "route",
			layout: {
				"line-join": "round",
				"line-cap": "round",
			},
			paint: {
				"line-color": "#250ECD",
				"line-width": 9,
			},
		});
		map.addLayer({
			id: "points1",
			type: "circle",
			source: "points1",
			paint: {
				"circle-color": "#9fbef9",
				"circle-stroke-color": "#FFFFFF",
				"circle-stroke-width": 2,
				"circle-radius": 5,
			},
		});
	}
};

export const clearMap = (map) => {
	if (map) {
		if (map.getLayer("route-line")) {
			map.removeLayer("route-line");
		}
		if (map.getLayer("points1")) {
			map.removeLayer("points1");
		}

		if (map.getSource("route")) {
			map.removeSource("route");
		}
		if (map.getSource("points1")) {
			map.removeSource("points1");
		}
	}
};
