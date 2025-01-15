import maplibregl from "maplibre-gl";
export const fitMapToBounds = (map, points, padding = 50, zoom = 15) => {
	const bounds = new maplibregl.LngLatBounds();
	points.forEach((point) => {
		bounds.extend([point.x, point.y]);
	});
	map?.fitBounds(bounds, {
		padding: padding,
		maxZoom: zoom,
		duration: 1000,
	});
};
